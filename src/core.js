import axios from 'axios';
import authClient from '@outlawdesigns/authenticationclient';

import createAnime from './models/anime.js';
import createDocs from './models/doc.js';
import createEpisodes from './models/episode.js';
import createHoldingbay from './models/holdingBay.js';
import createMovies from './models/movie.js';
import createSongs from './models/song.js';
import createComics from './models/comic.js';


export function createApiClient(baseURL, requestedScope){
  const oauthScope = requestedScope;
  const oauthResource = baseURL;
  const axiosInstance = axios.create({baseURL:baseURL});
  let onRefreshCallback;
  authClient.onTokenUpdate((tokenSet)=>{
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokenSet.access_token}`;
    if(onRefreshCallback){
      onRefreshCallback(tokenSet);
    }
  });
  axiosInstance.interceptors.request.use(async (config)=>{
    let token = authClient.getAccessToken();
    if(!token) throw new Error(`Authenticate before making API calls.`);
    let user;
    try{
      user = await authClient.verifyAccessToken(token,[oauthResource]);
    }catch(err){
      if(err.code === 'ERR_JWT_EXPIRED'){
        const refreshToken = authClient.getRefreshToken();
        if(refreshToken){
          await authClient.refreshToken(oauthScope,[oauthResource]);
        }else{
          await authClient.clientCredentialFlow(oauthScope,[oauthResource]);
        }
        token = authClient.getAccessToken();
        config.headers['Authorization'] = `Bearer ${token}`;
      }else{
        throw err;
      }
    }
    return config;
  });
  return {
    auth:authClient,
    movies:createMovies(axiosInstance),
    songs:createSongs(axiosInstance),
    holdingBay:createHoldingbay(axiosInstance),
    episodes:createEpisodes(axiosInstance),
    docs:createDocs(axiosInstance),
    anime:createAnime(axiosInstance),
    comics:createComics(axiosInstance),
    onRefresh(cb){
      onRefreshCallback = cb;
    }
  }
}

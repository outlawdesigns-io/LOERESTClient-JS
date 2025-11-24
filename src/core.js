import axios from 'axios';
import authClient from '@outlawdesigns/authenticationclient';

import createAnime from './models/anime.js';
import createDocs from './models/doc.js';
import createEpisodes from './models/episode.js';
import createHoldingbay from './models/holdingBay.js';
import createMovies from './models/movie.js';
import createSongs from './models/song.js';

export function createApiClient(baseURL, requestedScope){
  const oauthScope = requestedScope;
  const oauthResource = baseURL;
  const oauthRefreshBuffer = 300;
  let oauthTokenExpiryTime;
  const axiosInstance = axios.create({baseURL:baseURL});
  authClient.onTokenUpdate((token)=>{
    let tmpDate = new Date();
    let secondsToAdd = token.expires_in;
    tmpDate.setSeconds(tmpDate.getSeconds() + secondsToAdd);
    oauthTokenExpiryTime = tmpDate.getSeconds();
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
  });
  axiosInstance.interceptors.request.use(async (config)=>{
    const token = authClient.getAccessToken();
    if(!token) throw new Error(`Authenticate before making API calls.`);
    const refreshToken = authClient.getRefreshToken();
    if(refreshToken && oauthTokenExpiryTime){
      const now = Math.floor(Date.now() / 1000);
      const timeDiffSeconds = oauthTokenExpiryTime - now;
      if(timeDiffSeconds <= oauthRefreshBuffer || now >= oauthTokenExpiryTime){
        await authClient.refreshToken(oauthScope,[oauthResource]);
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
    anime:createAnime(axiosInstance)
  }
}

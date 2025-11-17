const resource = '/anime';

export default function createAnime(axios){
  return {
    async getAll(){
      const res = await axios.get(`${resource}`);
      return res.data;
    },
    async get(id){
      if(!id){
        throw new Error('Id argument reguired.');
      }
      const res = await axios.get(`${resource}/${id}`);
      return res.data;
    },
    async create(animeObj){
      const res = await axios.post(`${resource}`,animeObj);
      return res.data;
    },
    async search(field, query){
      const res = await axios.get(`${resource}/search/${field}/${query}`);
      return res.data;
    },
    async browse(field){
      const res = await axios.get(`${resource}/browse/${field}`);
      return res.data;
    },
    async getRecent(limit){
      const res = await axios.get(`${resource}/recent/${limit}`);
      return res.data;
    },
    async getMyPlaylists(){
      const res = await axios.get(`${resource}/list/`);
      return res.data;
    },
    async getPlaylist(id){
      const res = await axios.get(`${resource}/list/${id}`);
      return res.data;
    },
    async savePlaylist(playlistObj){
      const res = await axios.post(`${resource}/list`,playlistObj);
      return res.data;
    },
    async rate(animeId, rating){
      const res = await axios.post(`${resource}/rate/${animeId}`,{rating:rating});
      return res.data;
    },
    async getRating(id){
      const res = await axios.get(`${resource}/rate/${id}`);
      return res.data;
    },
    async count(){
      const res = await axios.get(`${resource}/count/`);
      return res.data;
    },
    async group(field){
      const res = await axios.get(`${resource}/group/${field}`);
      return res.data;
    },
    async getRandomPlaylist(genre, limit){
      const res = await axios.get(`${resource}/random/${genre}/${limit}`);
      return res.data;
    }
  }
}

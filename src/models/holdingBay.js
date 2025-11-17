const resource = '/holdingbay';

export default function createHoldingbay(axios){
  return {
    async getMovies(){
      const res = await axios.get(`${resource}/movies`);
      return res.data;
    },
    async getSongs(){
      const res = await axios.get(`${resource}/music`);
      return res.data;
    },
    async getTv(){
      const res = await axios.get(`${resource}/tv`);
      return res.data;
    },
    async getComics(){
      const res = await axios.get(`${resource}/comic`);
      return res.data;
    }
  }
}

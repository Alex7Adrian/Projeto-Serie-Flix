import fetch from "node-fetch";

const api_tmdb_key = 'd349eb82b1dbdd57cedbf1764658e88a';

export const getpopularMovies = async ()=>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_tmdb_key}&page=1`);
    const data = await response.json();

    return data.results || [];
};

export const getpopularSeries = async()=>{
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_tmdb_key}&page=1`);
    const data = await response.json();

    return data.results || [];
};


export const getmoviesbypage = async(page)=>{
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_tmdb_key}&page=${page}`);
      const data = await response.json();

      return data;
};

export const getseriesbypage = async(page)=>{
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_tmdb_key}&page=${page}`);
    const data = await response.json();

    return data;
};

export const getGenerosFilmes = async (genreId,page=1) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_tmdb_key}&with_genres=${genreId}&page=${page}&language=pt-BR`);
    const data = await response.json();

    return data;
};

export const getGenerosSeries = async(genreId,page=1)=>{
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_tmdb_key}&with_genres=${genreId}&page=${page}&language=pt-BR`);
    const data = response.json();

    return data;
}
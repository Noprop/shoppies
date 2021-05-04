export const getMovies = async (input: string, pageNum: number) => {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${input}&type=movie&page=${pageNum}`, {
    method: 'GET'
  });

  const res = await response.json();

  return res;
}
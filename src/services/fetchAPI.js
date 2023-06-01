const fetchApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const planetsList = data.results;
  return planetsList.map((planet) => {
    const { residents, ...rest } = planet;
    return rest;
  });
};

export default fetchApi;

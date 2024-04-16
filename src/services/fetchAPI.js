const fetchApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planetsArray = data.results;
  return planetsArray;
};
export default fetchApi;

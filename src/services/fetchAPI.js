import { useState } from 'react';

function useFetch(url) {
  const [planetas, setPlanets] = useState([]);
  const [carregando, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const fetchApi = () => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data da API');
        }
        return response.json();
      })
      .then((data) => {
        const remove = data.results.map((element) => {
          const { residents, ...rest } = element;
          return rest;
        });
        setPlanets(remove);
      })
      .catch((errors) => {
        setError(errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    planets: planetas,
    loading: carregando,
    error,
    fetchApi,
  };
}

export default useFetch;

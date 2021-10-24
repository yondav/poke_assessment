/**
 * @file /client/src/hooks/usePokemon.js
 * @desc Custom Hook: fetches api and sets state accordingly
 * @see {@link https://www.npmjs.com/package/axios Axios}
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePokemon(url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [splitRes, setSplitRes] = useState({
    list: [],
    perPage: 25,
    page: 0,
    pages: 0,
    sort: 'default',
  });

  const fetchData = () =>
    axios
      .get(url)
      .then(res => {
        setResponse(res.data.results);
        setSplitRes(prevState => ({
          ...prevState,
          list: res.data.results,
          pages: Math.floor(res.data.results.length / splitRes.perPage),
        }));
      })
      .catch(err => setError(err))
      .finally(() => setloading(false));

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, splitRes, setSplitRes, error, loading };
}

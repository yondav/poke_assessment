/**
 * @file /client/src/hooks/usePokemon.js
 * @desc Custom Hook: fetches api and sets state accordingly
 * @see {@link https://www.npmjs.com/package/axios Axios}
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePokemon(url, page) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [splitRes, setSplitRes] = useState({
    list: [],
    perPage: 25,
    page: page || 1,
    pages: 0,
    sort: 'asc',
  });

  const fetchData = () =>
    axios
      .get(url)
      .then(res => {
        setResponse(res.data.results);
        setSplitRes(prevState => ({
          ...prevState,
          list: res.data.results,
          pages: Math.ceil(res.data.count / splitRes.perPage),
        }));
      })
      .catch(err => setError(err))
      .finally(() => setTimeout(() => setloading(false), 2000));

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, splitRes, setSplitRes, error, loading };
}

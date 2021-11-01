/**
 * @file /client/src/hooks/usePokemon.js
 * @desc Custom Hook: fetches api and sets state accordingly
 * @see {@link https://www.npmjs.com/package/axios Axios}
 */

import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

export default function usePokemon(url) {
  const cache = useRef({});

  const initialState = {
    status: 'pending',
    list: [],
    perPage: 25,
    page: 1,
    pages: 0,
    offset: 0,
    error: null,
  };

  const [state, dispatch] = useReducer(
    (state = initialState, { type, payload }) => {
      console.log(type);
      return {
        ...state,
        ...payload,
      };
    },
    initialState
  );

  const fetchData = async (url, offset, page, cancelReq) => {
    let endpoint = url + offset;

    dispatch({ type: 'request_initiated', payload: { status: 'pending' } });

    if (cache.current[endpoint]) {
      const data = cache.current[url];
      console.log(data);
      dispatch({
        type: 'request_cached',
        payload: { ...data, status: 'data from cache' },
      });
    } else {
      try {
        const res = await axios.get(endpoint);
        const data = await res.data;
        cache.current[endpoint] = data;

        if (cancelReq) return;

        dispatch({
          type: 'request_succeeded',
          payload: {
            list: data.results,
            page,
            pages: Math.ceil(data.count / state.perPage),
            offset: state.page > 0 && (state.page - 1) * state.perPage,
            status: 'succeeded',
          },
        });
      } catch (err) {
        if (cancelReq) return;

        dispatch({
          type: 'request_failed',
          payload: { err, status: 'failed' },
        });
      }
    }
  };

  useEffect(() => {
    let cancelReq = false;
    if (!url) return;

    fetchData(url, state.offset, state.page, cancelReq);
    return () => {
      cancelReq = true;
    };
  }, [url, state.offset]);

  return { state, dispatch, fetchData };
}

/**
 * @file /client/src/App.js
 * @author Yoni David <yoni@yondav.us>
 * @version 0.1.0
 * @see {@link http://github.com/yondav GitHub}
 *
 * @program Frontend Assessment - Pokemon API exercise
 * @client Underdog Fantasy
 * ...
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router';
import usePokemon from './hooks/usePokemon';
import PrimaryContainer from './components/PrimaryContainer';
import Loading from './components/Loading';
import Error from './components/Error';
import pokeball from './assets/pokeball.svg';
import useQuery from './hooks/useQuery';

const App = () => {
  const [redirect, setRedirect] = useState(false);
  const query = useQuery();
  const perPage = 25;
  const page = parseInt(query.get('page'));
  const offset = (page - 1) * perPage;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`;

  const { response, splitRes, setSplitRes, error, loading } = usePokemon(
    url,
    page
  );

  useEffect(() => {
    if (page > splitRes.pages || page < 1) setRedirect(true);
  }, [page]);

  return (
    <div className='wrapper'>
      {redirect && <Redirect to='/' />}
      {loading && <Loading />}
      {response && !loading && (
        <>
          <motion.img
            src={pokeball}
            alt='pokeball'
            className='pokeball'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
            }}
          />
          <PrimaryContainer
            response={response}
            splitRes={splitRes}
            setSplitRes={setSplitRes}
          />
        </>
      )}
      {error && <Error />}
    </div>
  );
};

export default App;

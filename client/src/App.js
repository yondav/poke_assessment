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

import React from 'react';
import { motion } from 'framer-motion';
import usePokemon from './hooks/usePokemon';
import PrimaryContainer from './components/PrimaryContainer';
import Loading from './components/Loading';
import Error from './components/Error';
import pokeball from './assets/pokeball.svg';

const App = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=25&&offset=';

  const {
    state: { error, list, pages },
    dispatch,
    fetchData,
  } = usePokemon(url);

  return (
    <div className='wrapper'>
      {list && (
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
            url={url}
            list={list}
            pages={pages}
            dispatch={dispatch}
            fetchData={fetchData}
          />
        </>
      )}
      {error && <Error />}
    </div>
  );
};

export default App;

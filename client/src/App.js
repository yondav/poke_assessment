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
import usePokemon from './hooks/usePokemon';
import PrimaryContainer from './components/PrimaryContainer';
import pokeball from './assets/pokeball.svg';

const App = () => {
  const { response, splitRes, setSplitRes, error, loading } = usePokemon(
    'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=200'
  );

  return (
    <div className='wrapper'>
      <img src={pokeball} alt='pokeball' className='pokeball' />
      {response && (
        <PrimaryContainer
          response={response}
          splitRes={splitRes}
          setSplitRes={setSplitRes}
        />
      )}
    </div>
  );
};

export default App;

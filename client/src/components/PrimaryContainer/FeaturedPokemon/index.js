/**
 * @file /client/src/components/PrimaryContainer/FeaturedPokemon/index.js
 * @desc component for each pokemon in api return
 * @see {@link https://www.npmjs.com/package/axios Axios}
 * @see {@link https://mui.com/ Material-UI}
 * @see {@link https://react-icons.github.io/react-icons React-Icons}
 * @see {@link https://www.framer.com/motion/ Framer Motion}
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import Types from './Types';
import Stats from './Stats';

import './featured-pokemon.css';

const FeaturedPokemon = ({ name, url }) => {
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState();
  const [prevData, setPrevData] = useState([]);

  // fetch single pokemon's data
  const getSinglePokemon = async () => {
    // we are looking through our prevData state to see if we've already made this http request
    // if so, we want to use the data we already have. If not, we will make our api call and we will add the return to our prevData state so we don't have to fetch the data again
    let storedData = prevData.filter(data => data.url === url);

    if (storedData.length !== 0) {
      setData(storedData[0]);
    } else {
      try {
        const res = await axios.get(url);

        if (res) {
          setData(res.data);
          setPrevData(prevState => [...prevState, { url: url, ...res.data }]);
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // click handler for expand icon
  const expandPokemon = e => {
    !expand ? setExpand(true) : setExpand(false);
  };

  // side effect to fetch api when expand state is true.
  // This is more effective than attaching the call to our click handler in case the order of rendered results changes and perhaps an expanded element is no longer associated with the character for which the data was initially fetched.
  // This side effect will take the url as a dependency to say that if the url changes, we want to make our fetch to the api again
  useEffect(() => expand && getSinglePokemon(), [url, expand]);

  return (
    <Grid item xs={12}>
      <div className='poke-name-card'>
        <h1 className='poke-name' style={{ opacity: !expand ? 1 : 0 }}>
          {name}
        </h1>
        {!expand ? (
          <AiOutlinePlus
            className='expand-btn'
            onClick={expandPokemon}
            style={{ cursor: 'pointer' }}
            size='1.8em'
          />
        ) : (
          <AiOutlineMinus
            className='expand-btn'
            onClick={expandPokemon}
            style={{ cursor: 'pointer' }}
            size='1.8em'
          />
        )}
      </div>
      <AnimatePresence>
        {expand && (
          <motion.article
            initial={{ height: 0, y: -200, opacity: 0 }}
            animate={{ height: '100%', y: 0, opacity: 1 }}
            exit={{ height: 0, y: -500, opacity: 0 }}
            transition={{ duration: 1, ease: 'anticipate' }}
          >
            <Grid container spacing={2}>
              {data && (
                <>
                  <Grid item xs={12} md={3}>
                    <div className='poke-img'>
                      <img
                        src={
                          data.sprites.other.dream_world.front_default
                            ? data.sprites.other.dream_world.front_default
                            : data.sprites.front_shiny
                        }
                        alt={name}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div className='poke-specs'>
                          <h1 className='poke-name'>{name}</h1>
                          <div className='inner-specs'>
                            <div className='weight-types'>
                              <h3>Weight: {data.weight} pounds</h3>
                              <Types types={data.types} />
                            </div>
                            <Stats stats={data.stats} />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </motion.article>
        )}
      </AnimatePresence>
    </Grid>
  );
};

export default FeaturedPokemon;

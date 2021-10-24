/**
 * @file /client/src/components/PrimaryContainer/FeaturedPokemon/index.js
 * @desc component for each pokemon in api return
 * @see {@link https://www.npmjs.com/package/axios Axios}
 * @see {@link https://mui.com/ Material-UI}
 * @see {@link https://react-icons.github.io/react-icons React-Icons}
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { AiOutlinePlus } from 'react-icons/ai';
import Types from './Types';
import Stats from './Stats';

const FeaturedPokemon = ({ name, url }) => {
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  const getSinglePokemon = async () => {
    try {
      const res = await axios.get(url);

      if (res) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const expandPokemon = e => {
    setLoading(true);
    !expand ? setExpand(true) : setExpand(false);
    getSinglePokemon();
  };

  useEffect(() => {
    data && setLoading(false);
    console.log('loading: ', loading);
    console.log('---------------------');
    console.log('data: ', data);
  }, [data, loading]);

  return (
    <Grid item xs={12}>
      <h1>{name}</h1>
      <AiOutlinePlus onClick={expandPokemon} style={{ cursor: 'pointer' }} />
      {expand && (
        <Grid container spacing={2}>
          {data ? (
            <>
              <Grid item xs={12} md={4}>
                <img
                  src={
                    data.sprites.other.dream_world.front_default
                      ? data.sprites.other.dream_world.front_default
                      : data.sprites.front_shiny
                  }
                  alt={name}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p>Weight: {data.weight} pounds</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Types types={data.types} />
                  </Grid>
                  <Grid item xs={12}>
                    <Stats stats={data.stats} />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <h1>Loading</h1>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default FeaturedPokemon;

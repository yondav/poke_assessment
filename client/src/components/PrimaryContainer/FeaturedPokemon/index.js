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
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Types from './Types';
import Stats from './Stats';
import Loading from '../../Loading';

import './featured-pokemon.css';

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
      <div className='poke-name-card'>
        <h1 className='poke-name' style={{ opacity: !expand ? 1 : 0 }}>
          {name}
        </h1>
        {!expand ? (
          <AiOutlinePlus
            onClick={expandPokemon}
            style={{ cursor: 'pointer' }}
            size='1.8em'
          />
        ) : (
          <AiOutlineMinus
            onClick={expandPokemon}
            style={{ cursor: 'pointer' }}
            size='1.8em'
          />
        )}
      </div>
      {expand && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data ? (
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
            ) : (
              <Loading />
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FeaturedPokemon;

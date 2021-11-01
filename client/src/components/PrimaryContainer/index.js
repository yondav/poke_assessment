/**
 * @file /client/src/components/PrimaryContainer/index.js
 * @desc container for all content in current phase of the app
 * @see {@link https://mui.com/ Material-UI}
 * @see {@link https://www.framer.com/motion/ Framer Motion}
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { Redirect } from 'react-router';
import { motion } from 'framer-motion';
import FeaturedPokemon from './FeaturedPokemon';

import './primary-container.css';

const PrimaryContainer = ({ splitRes, setSplitRes }) => {
  const { list, page, pages } = splitRes;
  const [pagHeight, setPagHeight] = useState();
  const [redirect, setRedirect] = useState(false);
  const pagRef = useRef();

  // gets selected page number and stores it in state
  const handlePageClick = e => {
    let str = e.target.getAttribute('aria-label').split(' ');
    let pageNum = parseInt(str[str.length - 1]);
    setSplitRes(prevState => ({ ...prevState, page: pageNum }));
    setRedirect(pageNum);
  };

  // side effect to get height of the filter container and pagination container to dynamically set the height of the list container
  useEffect(() => {
    setPagHeight(pagRef.current.offsetHeight + 30);
  }, [pagRef]);

  return (
    <motion.main
      className='primary-container'
      initial={{ y: 1000, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1, delay: 0.3 } }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <section
          className='pokemon-list'
          style={{
            height: `calc(100% - ${pagHeight}px)`,
            bottom: pagHeight,
          }}
        >
          <Grid container spacing={2}>
            {list.map((poke, i) => (
              <FeaturedPokemon key={i} name={poke.name} url={poke.url} />
            ))}
          </Grid>
        </section>
        <footer ref={pagRef} className='pagination-container'>
          <Pagination
            count={pages}
            page={page}
            onChange={handlePageClick}
            size='small'
            variant='string'
            hidePrevButton
            hideNextButton
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </footer>
        {redirect && <Redirect to={`/?page=${redirect}`} />}
      </Box>
    </motion.main>
  );
};

export default PrimaryContainer;

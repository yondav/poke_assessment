/**
 * @file /client/src/components/PrimaryContainer/index.js
 * @desc container for all content in current phase of the app
 * @see {@link https://mui.com/ Material-UI}
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import Filters from './Filters';

import './primary-container.css';
import FeaturedPokemon from './FeaturedPokemon';

const PrimaryContainer = ({ response, splitRes, setSplitRes }) => {
  const { list, perPage, page, pages, sort } = splitRes;
  const [poke25, setPoke25] = useState([]);
  const [filterHeight, setFilterHeight] = useState();
  const [pagHeight, setPagHeight] = useState();
  const filterRef = useRef();
  const pagRef = useRef();

  // side effect shifts to the 25 corresponding pokemon for the selected page
  useEffect(
    () => list && setPoke25(list.slice(page * perPage, (page + 1) * perPage)),
    [splitRes, list]
  );

  // gets selected page number and stores it in state
  const handlePageClick = e => {
    let str = e.target.getAttribute('aria-label').split(' ');
    let pageNum = parseInt(str[str.length - 1]);
    setSplitRes(prevState => ({ ...prevState, page: pageNum }));
  };

  // side effect to get height of the filter container and pagination container to dynamically set the height of the list container
  useEffect(() => {
    setFilterHeight(filterRef.current.offsetHeight + 30);
    setPagHeight(pagRef.current.offsetHeight + 30);
  }, [filterRef, pagRef]);

  return (
    <main className='primary-container'>
      <Box sx={{ flexGrow: 1 }}>
        <header ref={filterRef} className='filters'>
          <Filters sort={sort} response={response} setSplitRes={setSplitRes} />
        </header>
        <section
          className='pokemon-list'
          style={{
            height: `calc(100% - ${filterHeight + pagHeight}px)`,
            bottom: pagHeight,
          }}
        >
          <Grid container spacing={2}>
            {poke25.map((poke, i) => (
              <FeaturedPokemon key={i} name={poke.name} url={poke.url} />
            ))}
          </Grid>
        </section>
        <footer ref={pagRef} className='pagination-container'>
          <Pagination count={pages} onChange={handlePageClick} />
        </footer>
      </Box>
    </main>
  );
};

export default PrimaryContainer;

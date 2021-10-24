import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';

const PrimaryContainer = ({ response, splitRes, setSplitRes }) => {
  const { list, perPage, page, pages, sort } = splitRes;
  const [poke25, setPoke25] = useState([]);

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

  return (
    <main className='primary-container'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}></Grid>
        <Pagination count={pages} onChange={handlePageClick} />
      </Box>
    </main>
  );
};

export default PrimaryContainer;

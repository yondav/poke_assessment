/**
 * @file /client/src/components/PrimaryContainer/Filters/index.js
 * @desc search bar and sorting dropdown for all pokemon
 * @see {@link https://mui.com/ Material-UI}
 */

import React, { useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const Filters = ({ sort, response, splitRes, setSplitRes }) => {
  let filteredList = response;

  // side effect uses switch statement for sorting options
  useEffect(() => {
    let sorted;

    switch (sort) {
      case 'asc':
        const sortAsc = (x, y) => x.name.localeCompare(y.name);
        sorted = filteredList.sort(sortAsc);
        setSplitRes(prevState => ({ ...prevState, list: sorted }));
        break;
      case 'des':
        const sortDes = (x, y) => y.name.localeCompare(x.name);
        sorted = filteredList.sort(sortDes);
        setSplitRes(prevState => ({ ...prevState, list: sorted }));
        break;
      default:
        break;
    }
  }, [sort]);

  // gets selected sort and stores it in state
  const handleSort = e =>
    setSplitRes(prevState => ({ ...prevState, sort: e.target.value }));

  // gets value of search bar, filters pokemon and sets state on value change to filter results in real time
  const handleSearch = e => {
    let filtered = filteredList.filter(poke =>
      poke.name
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    );
    setSplitRes(prevState => ({
      ...prevState,
      list: filtered,
      pages: Math.ceil(filtered.length / splitRes.perPage),
      page: 1,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={2}>
        <FormControl fullWidth>
          <InputLabel id='select-sort-label'>Sort</InputLabel>
          <Select
            labelId='select-sort-label'
            id='select-sort'
            value={sort}
            onChange={handleSort}
          >
            <MenuItem value={'asc'}>A to Z</MenuItem>
            <MenuItem value={'des'}>Z to A</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8} md={10}>
        <FormControl fullWidth>
          <TextField
            id='search'
            label='Search'
            variant='outlined'
            onChange={handleSearch}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;

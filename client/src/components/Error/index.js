/**
 * @file /client/src/components/Error/index.js
 * @desc Component: renders a simple error message
 * @see {@link https://react-icons.github.io/react-icons/ React Icons}
 */
import React from 'react';
import pokerror from '../../assets/poerror.jpeg';
import { BiError } from 'react-icons/bi';

import './error.css';

const Error = () => {
  return (
    <div className='error-container'>
      <img src={pokerror} alt='error' />
      <BiError size='10em' />
      <h1 className='error'>Oops...Couldn't find any Pokemon!</h1>
    </div>
  );
};

export default Error;

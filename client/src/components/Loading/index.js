/**
 * @file /client/src/components/Loading/index.js
 * @desc Component: renders a custom spinner
 * @see {@link https://www.framer.com/motion/ Framer Motion}
 */

import React from 'react';
import pokeball from '../../assets/pokeball.svg';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.img
      src={pokeball}
      alt='loading'
      style={{
        width: '10%',
      }}
      animate={{ rotate: 350 }}
      transition={{ loop: Infinity, ease: 'linear', duration: 1 }}
    />
  );
};

export default Loading;

/**
 * @file /client/src/components/PrimaryContainer/FeaturedPokemon/Types.js
 * @desc component to render type badges
 */

import React from 'react';

const Types = ({ types }) => {
  return (
    <>
      {types.map(type => (
        <div key={type.slot} className='type-badge'>
          {type.type.name}
        </div>
      ))}
    </>
  );
};

export default Types;

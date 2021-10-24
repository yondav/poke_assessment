/**
 * @file /client/src/components/PrimaryContainer/FeaturedPokemon/Types.js
 * @desc component to render type badges
 */

import React from 'react';

const Types = ({ types }) => {
  const toTitleCase = str =>
    str
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
      .join(' ');

  // returns "Foo Bar Baz"
  return (
    <div className='types-container'>
      {types.map(type => (
        <div key={type.slot} className='type-badge'>
          <h3>{toTitleCase(type.type.name)}</h3>
        </div>
      ))}
    </div>
  );
};

export default Types;

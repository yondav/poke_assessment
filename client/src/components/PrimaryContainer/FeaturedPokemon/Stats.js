/**
 * @file /client/src/components/PrimaryContainer/FeaturedPokemon/Stats.js
 * @desc component to render statistics
 * @see {@link https://www.npmjs.com/package/react-chartjs-2 React-ChartsJS-2}
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';

const Stats = ({ stats }) => {
  // configuration for graph as per documentation
  const data = {
    labels: stats.map(stat => stat.stat.name),
    datasets: [
      {
        label: 'Base',
        data: stats.map(stat => stat.base_stat),
        backgroundColor: '#ffcb05',
        stack: 'Base Stat',
      },
      {
        label: 'Effort',
        data: stats.map(stat => stat.effort),
        backgroundColor: '#2a75bb',
        stack: 'Effort',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default Stats;

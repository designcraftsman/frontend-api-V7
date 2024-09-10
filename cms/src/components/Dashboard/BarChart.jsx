// components/BarChart.js
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChart = ({ data }) => {
  return (
    <RechartsBarChart width={500} height={300} data={data} className='bg-light rounded shadow'>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="students" fill="#8884d8" />
    </RechartsBarChart>
  );
}

export default BarChart;

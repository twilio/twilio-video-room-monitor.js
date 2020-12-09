import React from 'react';
import Plotly from 'react-plotly.js';

export default class Plot extends React.Component {
  render() {
    return (
      <Plotly
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 10, 30, 20],
            y: [2, 6, 3, 2, 3, 10, 111, 111, 211],
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 100, height: 500, title: 'RANDOM' }}
        config={{ displaylogo: false }}
      />
    );
  }
}

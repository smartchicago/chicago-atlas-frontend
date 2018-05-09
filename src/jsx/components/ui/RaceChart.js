import React from 'react';

export default (props) => (

  <div className="chart-container">
    <div className="c-race-chart">{renderGraph(props.data)}</div>
    <p>{props.title}</p>
  </div>

);

function renderGraph(data) {
  if (!data) {
    return null;
  }
  return data.map((d, i) => {
    if (!d.value.match(/\d/g)) {
      return null;
    } else {
      return (
        <span
          key={i}
          className="c-race-chart__segment"
          data-label={d.label}
          style={{ width: d.value }}
        >
          {d.value}
        </span>
      );
    }
  });
}

import React from 'react';

import isEmpty from 'lodash/isEmpty';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const SimpleBarChart = React.createClass({

  render() {
    return (
      <div className="chart-container">
        <ResponsiveContainer aspect={3}>
          <BarChart
            data={this._dataChart(this.props.data, this.props.totalPopulation)}
            margin={{top: 20, right: 0, left: 0, bottom: 0}}
          >
            <YAxis
              tick={
                <Tick
                  data={this.props.data}
                  maxValue={this.props.maxValue}
                  cityWide={this.props.cityWide}
                  totalPopulation={this.props.totalPopulation}
                />
              }
              tickLine={false}
              padding={{ top: 10 }}
            />
            <XAxis
              tickLine={false}
              dataKey="label"
              padding={{ bottom: 2 }}
            />
            <Bar
              dataKey="value"
              fill="#afddf9"
              isAnimationActive={false}
              label={<CustomizedLabel />}
            />
          </BarChart>
        </ResponsiveContainer>
        <p>Age</p>
      </div>
    );
  },

  _dataChart(data, totalPopulation) {
    if (isEmpty(data)) {
      return [];
    }
    return data.demographic_data.map((item, i) => {
      return {
        label: item.age_group,
        value: item.pop_2010,
        total_population: totalPopulation
      };
    });
  }
});

function parseStringToInt(s) {
  return parseInt(s.replace(/[^0-9]/g, ''));
};

function getPercentage(total, value) {
  const number = value * 100 / total;
  return (Math.round(number * 100) / 100).toFixed(1);
}

const CustomizedLabel = (props) => {
  const { width, height, x, y, fill } = props;
  return (
    <text
      width={width}
      height={height}
      x={x}
      y={y}
      fill={'#333'}
      textAnchor={'middle'}
    >
      <tspan x={x} dy="-1.5em">
        {`${getPercentage(parseStringToInt(props.total_population), props.payload.value)}%`}
      </tspan>
      <tspan x={x} dy="1.5em" fill={'#6b7d8f'} fontSize="12">
        {`(${props.payload.value})`}
      </tspan>
    </text>
  );
};

const Tick = (props) => {
  const { width, height, x, y, fill, totalPopulation, payload: { value } } = props;
  if (value !== 0) {
    return (
      <text
        width={width}
        height={height}
        x={x}
        y={y}
        fill={fill}
        textAnchor={'end'}
      >{`${Math.round(getPercentage(parseStringToInt(totalPopulation), value))}%`}</text>
    );
  } else {
    return null;
  }
};

export default SimpleBarChart;

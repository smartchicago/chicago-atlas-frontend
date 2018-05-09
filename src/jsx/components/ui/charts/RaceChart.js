import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Sector,
  Cell,
  Pie
} from 'recharts';

const COLORS = ['#5286b9', '#769fc8', '#bfd2e5', '#9ab9d7', '#3e6c9a'];

const getSortedData = (data) => {
  return data.sort((a, b) => {
    const floatA = parseFloat(a.value);
    const floatB = parseFloat(b.value);

    return (floatA > floatB) ? 1 : ((floatB > floatA) ? -1 : 0);
  });
};

let deltaY = [];
const getDistance = (y) => {
  deltaY.sort();
  let distance = y;
  deltaY.forEach((delta) => {
    if (Math.abs(delta - distance) < 10) {
      distance = delta + 10;
    }
  });
  return distance;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (data, { cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  if (index === 0) {
    deltaY = [];
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 1.31;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  let y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (index > 0) {
    if (parseFloat(data[index].value) - 3 < parseFloat(data[index - 1].value)) {
      y = y - 5 - (4 * index);
    }
  } else {
    y = y + 5;
  }

  y = getDistance(y);
  deltaY.push(y);
  return (
    <text x={x} y={y} fill="black" className="pie-chart" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${data[index].value}  ${data[index].label}`}
    </text>
  );
};

export default React.createClass({
  render() {
    return (
      <div className="c-disparities__chart" data-length={this.props.data.length}>
        <h3 className="u-txt--capitalize u-txt--center u-font--serif">
          Race / Ethnicity
        </h3>

        <ResponsiveContainer aspect={2.5}>
          <PieChart
            className={'c-race-ethnicity__chart'}
            margin={{top: 20, right: 50, left: 0, bottom: 10}}
          >
            <Pie
              data={this.props.data.map(x => { return { ...x, value: parseInt(x.value) }; })}
              labelLine={true}
              label={renderCustomizedLabel.bind(null, getSortedData(this.props.data))}
              fill="#8884d8"
            >
              {
                this.props.data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
});

import React from 'react';
import TopicTrendsTooltip from '../TopicTrendsTooltip';

import {
  LineChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';

import VerticalLabel from './VerticalLabel';

import util from '../../../utils';

import {
  CITY_NAME,
  NO_DATA_AVAILABLE,
  ALL_RACE_GROUP_NAME
 } from '../../../constants/specialNames';

function getLines(props) {

  if (!props.demo) {
    return;
  }

  const grouped = groupBy(props.demo, 'demo_group');
  const lines = [];

  const colors = [
    '#4573A7',
    '#AA4644',
    '#89A54E',
    '#43ABCC',
    '#DB843D',
    '#93A9D0',
    '#D09392',
    '#BACD96',
    '#A99BBE'
  ];

  for (const demoGroup in grouped) {
    const i = !isNaN(i) ? i + 1 : 0;
    lines.push({
      // If demo_group == All race ethn, replace with Chicago
      name: demoGroup === ALL_RACE_GROUP_NAME ? CITY_NAME : demoGroup,
      color: colors[i]
    });
  }

  return lines;
};

// Here its a hack for ReCharts
// Tooltip is not shown if the value is null or undefined
// Tooltip is shown if the value is '' but is calculated internally like 0
// The only way to show the tooltip without affecting calculation of values
// is passing an string !== '', so we pass 'No Data Available', tricking ReCharts
function getDemoGroupValue(value) {
  return value || NO_DATA_AVAILABLE;
}

function reMap(props) {
  const configObject = util.findConfigObject(
    props.demoName,
    props.demography.value
  );

  const graphKey = configObject ? configObject.value : null;

  const mapped = [];
  props.demo ? props.demo.map((cat) => {
    // If demo_group == All race ethn, replace with Chicago
    cat.demo_group = cat.demo_group === ALL_RACE_GROUP_NAME ? CITY_NAME : cat.demo_group;

    if (!mapped.find(mappedCat => mappedCat.name === cat.year)) {
      mapped.push({
        name: cat.year,
        year_to: cat.year_to,
        year_from: cat.year_from,
        [cat.demo_group]: getDemoGroupValue(cat[graphKey])
      });
    } else {
      mapped.find(mappedCat => mappedCat.name === cat.year)[cat.demo_group] = getDemoGroupValue(cat[graphKey]);
    }
  }) : null;

  const result = sortBy(mapped, [function(o) { return parseInt(o.name); }]);

  let lastYear;
  const missingYears = [];

  for (let indx = 0; indx < result.length; indx++) {
    if (indx === 0 || result[indx].year_from - lastYear === 1) {
      lastYear = result[indx].year_to;
    } else {
      const diff = result[indx].year_from - lastYear - 1;

      for (let x = 0; x < diff; x++) {
        const year = result[indx - 1].year_to + x + 1;
        missingYears.push(year);
        lastYear = year;
      }

      lastYear = result[indx].year_to;
    }
  }

  const template = Object.assign({}, result[0]);

  for (const key in template) {
    template[key] = NO_DATA_AVAILABLE;
  }

  for (let x = 0; x < missingYears.length; x++) {
    result.push({
      ...template,
      name: missingYears[x]
    });
  }

  return sortBy(result, [function(o) { return parseInt(o.name); }]);
}

function buildLines(lines) {
  return lines.map((line, i) => {
    return (
      <Line type="linear"
        dataKey={line.name}
        stroke={line.color}
        strokeWidth={1.15}
        legendType="square"
        dot={{r: 2.25}}
        key={i}
      />
    );
  });
}

function isPercentOrWeightPercent(configObject) {
  return configObject.value === 'percent' ||
         configObject.value === 'weight_percent';
}

function verticalLabel(value) {
  if (value === 'weight_percent') {
    return 'percent';
  } else {
    return value;
  }
}

function render(props) {

  if (!reMap(props).length) {
    return (
      <div className="c-placeholder">
        {NO_DATA_AVAILABLE}
      </div>
    );
  }

  const configObject = util.findConfigObject(props.demoName, props.demography.value);
  const isPercent = isPercentOrWeightPercent(configObject);

  let yAxisDomain;
  if (isPercent) {
    yAxisDomain = [0, 100];
  } else {
    yAxisDomain = [0, 'auto'];
  }

  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 2.5}>
      <LineChart
        data={reMap(props)}
        margin={{top: 15, right: 50, left: 15, bottom: 15}}
      >
        <XAxis dataKey="name" padding={{left: 30, right: 30}} />
        <YAxis
          domain={yAxisDomain}
          tickFormatter={(value) => isPercent ? `${value}%` : `${value}`}
          label={<VerticalLabel value={verticalLabel(configObject.value).replace('_', ' ').toUpperCase()} />}
        />
        <Tooltip
          content={<TopicTrendsTooltip />}
          keyName={verticalLabel(configObject.value)}
          graphSymbol={configObject.symbol}
        />
        <Legend />
        <CartesianGrid stroke="#eee" strokeDasharray="2 2" />
        {buildLines(getLines(props))}
        <ReferenceLine y={100} label="Max" stroke="#eee" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default (props) => (
  <div>
    <h2 className="u-txt--center">{props.demography.label}</h2>
    {render(props)}
  </div>
);

import React from 'react';

import {
  Bar,
  XAxis,
  YAxis,
  BarChart,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

import {
  CONTEXT_TABLE_COLUMN_FLAG,
  SUPPRESSED_TABLE_COLUMN_FLAG
} from '../../../constants/specialNames';

import VerticalLabel from './VerticalLabel';

const CITY_WIDE_MAX_RANGE = 1000;

function isTabletOrLess() {
  return window.innerWidth <= 768;
}

function getToFixedCityWide(props) {
  return props.cityWide ? props.cityWide.toFixed(1) : null;
}

const LineBar = (props) => {
  if (!props.upper_95ci_weight_percent || !props.lower_95ci_weight_percent) {
    return (
      <g>
        <text></text>
      </g>
    );
  }

  const scale = props.height / props.upper_95ci_weight_percent;
  const relativeHeight = scale * (props.upper_95ci_weight_percent - props.lower_95ci_weight_percent);
  const lineWidth = props.width / 6;
  const offset = (props.width - lineWidth) / 2;

  return (
    <g>
      <text
        x={props.x + offset}
        y={props.y}
        // dx={props.x + lineWidth + offset}
        dy={-3}
        fill={'red'}
        textAnchor={'start'}
        fontSize={13}
      >{props.upper_95ci_weight_percent ? props.upper_95ci_weight_percent.toFixed(1) : null}</text>
      <line
        x1={props.x + offset}
        x2={props.x + lineWidth + offset}
        y1={props.y}
        y2={props.y}
        stroke="red"></line>
      <line
        x1={props.x + offset + (lineWidth / 2)}
        x2={props.x + offset + (lineWidth / 2)}
        y1={props.y}
        y2={props.y + relativeHeight}
        stroke="red"></line>
      <line
        x1={props.x + offset}
        x2={props.x + lineWidth + offset}
        y1={props.y + relativeHeight}
        y2={props.y + relativeHeight}
        stroke="red"></line>
      <text
        fill={'red'}
        textAnchor={'start'}
        x={props.x + offset}
        y={props.y + relativeHeight}
        fontSize={13}
        dy={'1em'}
      >{props.lower_95ci_weight_percent ? props.lower_95ci_weight_percent.toFixed(1) : null}</text>
    </g>
  );
};

const Tick = (props) => {
  const { width, height, x, y, fill } = props;
  if (props.payload.value === 0 || Math.round(props.payload.value) === props.maxValue) {
    return (
      <text
        width={width}
        height={height}
        x={x}
        y={y}
        fill={fill}
        textAnchor={'end'}
      >{Math.round(props.payload.value)}</text>
    );
  }
  return null;
};

const CustomizedLabel = (props) => {
  const { width, height, x, y, fill } = props;
  const lower = Boolean(props.lower_95ci_weight_percent);
  const xAxis = (lower ? (x + (width / 3)) : x);
  let child;
  let fontWeight;
  if (props.flag === SUPPRESSED_TABLE_COLUMN_FLAG) {
    fontWeight = 'normal';
    child = (
      <tspan fill={'gray'}>
        <tspan x={xAxis} dy="-2.5em">
          {'Data'}
        </tspan>
        <tspan x={xAxis} dy="1.5em">
          {'Supressed'}
        </tspan>
      </tspan>
    );
  } else if (props.weight_percent || props.weight_percent === 0) {
    fontWeight = 'bold';
    child = (
      <tspan>
        {props.weight_percent.toFixed(1)}
        {props.flag === CONTEXT_TABLE_COLUMN_FLAG && <tspan
          fill={'red'}
        >*</tspan>}
      </tspan>
    );
  } else {
    fontWeight = 'normal';
    child = (
      <tspan fill={'gray'}>
        <tspan x={xAxis} dy="-2.5em">
          {'No Data'}
        </tspan>
        <tspan x={xAxis} dy="1.5em">
          {'Available'}
        </tspan>
      </tspan>
    );
  }

  return (
    <text
      width={width}
      height={height}
      x={xAxis}
      y={y}
      fill={fill}
      textAnchor={'middle'}
      fontSize={13}
      fontWeight={fontWeight}
    >{child}</text>
  );
};

let axisNumber = 0;

const CustomizedAxisTick = React.createClass({
  render() {
    const { x, y, stroke, payload } = this.props;

    if (payload.value.length > 20 || isTabletOrLess()) {
      return (
        <g transform={`translate(${x},${axisNumber++ % 2 === 0 ? y + 10 : y - 10})`}>
          <text x={0} y={0} dy={16} fontSize={isTabletOrLess() ? 11 : 13} textAnchor="middle" fill="#666">{payload.value}</text>
        </g>
      );
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fontSize={13} textAnchor="middle" fill="#666">{payload.value}</text>
      </g>
    );
  }
});

const ReferenceLineLabel = (props) => {
  const { dx, dy, x, y, fill, textAnchor } = props;
  let valueY = 0;

  if (isTabletOrLess()) {
    valueY = 40;
  } else if (props.value > CITY_WIDE_MAX_RANGE) {
    valueY = 55;
  }

  return (
    <text
      y={y + valueY}
      fill={'red'}
    >
      <tspan x={x + 15} textAnchor="middle" fontSize={isTabletOrLess() ? 12 : 15} dy="-2.5em">
        {props.value}
      </tspan>
      <tspan x={x + 15} textAnchor="middle" fontSize={isTabletOrLess() ? 12 : 15} dy="1.5em">
        Chicago
      </tspan>
    </text>
  );
};

const SimpleBarChart = React.createClass({
  render() {
    const fixedCityWide = getToFixedCityWide(this.props);
    const chartAspectRatio = this.props.maxValue <= 60 ? 3 : 2.5;

    return (
      <div className="c-disparities__chart" data-length={this.props.data.length}>
        <ResponsiveContainer aspect={chartAspectRatio}>
          <BarChart
            data={this.props.data}
            margin={{top: 20, right: 50, left: 0, bottom: 10}}
          >
            <YAxis
              domain={[0, this.props.maxValue]}
              tick={
                <Tick data={this.props.data}
                  maxValue={this.props.maxValue}
                  cityWide={this.props.cityWide}
                />
              }
              tickLine={false}
              xAxisId={0}
              label={<VerticalLabel value={this.props.valueType.toUpperCase()} />}
            />
            <XAxis
              dataKey="demo_group_name"
              tickLine={false}
              minTickGap={0}
              interval={0}
              tick={<CustomizedAxisTick />}
              allowDataOverflow={true}
            />
            <XAxis xAxisId={1} hide />
            <ReferenceLine
              y={fixedCityWide}
            />
            <Bar
              dataKey="weight_percent"
              xAxisId={0}
              maxBarSize={90}
              label={<CustomizedLabel />}
              isAnimationActive={false}
              animationDuration={500}
              animationEasing={'ease-out'}
            />
            <Bar
              dataKey="upper_95ci_weight_percent"
              xAxisId={1}
              shape={<LineBar />}
              isAnimationActive={false}
              animationDuration={500}
              animationEasing={'ease-out'}
            />
            <ReferenceLine
              y={fixedCityWide}
              stroke="none"
              isFront={true}
              strokeDasharray="0 0"
              label={<ReferenceLineLabel value={fixedCityWide} />}
            />
          </BarChart>
        </ResponsiveContainer>
        <h3 className="u-txt--capitalize u-txt--center u-font--serif">
          {this.props.title}
        </h3>
      </div>
    );
  }

});

export default SimpleBarChart;

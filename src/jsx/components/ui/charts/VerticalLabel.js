import React from 'react';

export default (props) => {
  const { width, height, x, y, value } = props;

  // position
  const cx = x + (width / 2);
  const cy = y + (height / 2);
  // translation
  const translateX = (-1 * (((height - y) / 2)));
  const translateY = (y + (height / 2));
  const translateXY = `${translateX}, ${translateY}`;
  // rotation
  const rotate = '-90';

  return (
    <text
      x={cx}
      y={cy}
      fill={'#727e82'}
      textAnchor={'end'}
      transform={`translate(${translateXY}) rotate(${rotate})`}
    >
      {value}
    </text>
  );
};

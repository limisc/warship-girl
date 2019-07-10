/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { areEqual } from 'react-window';

const StatsItem = memo(({ data, index, style }) => {
  const { list, checkList } = data;
  const id = list[index];
  const { name, value, weight, qty } = data.data[id];
  const [a, b] = checkList;
  return (
    <div className="flex list-item" style={style}>
      <div className="list-item-name ellipsis">{name}</div>
      <div>{value}</div>
      <div>{weight[a]}</div>
      <div>{weight[b]}</div>
      <div>{qty}</div>
    </div>
  );
}, areEqual);

export default StatsItem;

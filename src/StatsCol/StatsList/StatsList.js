/* eslint-disable no-unused-vars */
import React, { Fragment, memo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import memoize from 'memoize-one';
import StatsItem from './StatsItem';
import { WEIGHTS } from 'store';
import { translate } from 'actions';

const createItemData = memoize((list, data, checkList) => {
  return { list, data, checkList };
});

const StatsList = memo(({ data, checkList }) => {
  const list = Object.keys(data).sort((a, b) => data[b].value - data[a].value);
  const itemData = createItemData(list, data, checkList);
  let w0 = 0;
  let w1 = 0;
  let v = 0;
  let q = 0;
  const [a, b] = checkList;
  if (list.length !== 0) {
    list.forEach(id => {
      const { weight, value, qty } = data[id];
      w0 += qty * weight[a];
      w1 += qty * weight[b];
      v += qty * value;
      q += qty;
    });
  }
  return (
    <Fragment>
      {list.length !== 0 && (
        <Fragment>
          <div className="flex list-item">
            <div className="list-item-name ellipsis">NAME</div>
            <div>价值</div>
            <div>{translate(WEIGHTS[a])}</div>
            <div>{translate(WEIGHTS[b])}</div>
            <div>数目</div>
          </div>
          <div className="flex list-item">
            <div className="list-item-name ellipsis"></div>
            <div>
              <strong>{v}</strong>
            </div>
            <div>
              <strong>{w0}</strong>
            </div>
            <div>
              <strong>{w1}</strong>
            </div>
            <div>
              <strong>{q}</strong>
            </div>
          </div>
        </Fragment>
      )}
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={40}
            itemCount={list.length}
            itemData={itemData}
          >
            {StatsItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Fragment>
  );
});

export default StatsList;

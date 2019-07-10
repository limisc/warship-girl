/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { sortableContainer } from 'react-sortable-hoc';
import Checkbox from '@material-ui/core/Checkbox';
import { moveItem, translate } from 'actions';
import { WEIGHTS } from 'store';
import memoize from 'memoize-one';
import ListItem from './ListItem';

const createItemData = memoize((dragable, list, openEdit) => {
  return {
    dragable,
    list,
    openEdit,
  };
});

const DragableList = sortableContainer(({ list, openEdit }) => {
  const [dragable, setDrag] = useState(false);
  const handleChange = ({ target: { checked } }) => setDrag(checked);
  const itemData = createItemData(dragable, list, openEdit);
  return (
    <div className="fill-remains">
      <div className="flex list-item" style={{ height: '50px' }}>
        <div>
          <Checkbox
            color="primary"
            checked={dragable}
            onChange={handleChange}
            value="dragable"
          />
        </div>
        <div className="list-item-name">NAME</div>
        {WEIGHTS.map(w => (
          <div key={w}>{translate(w)}</div>
        ))}
        <div>{translate('qty')}</div>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={40}
            itemCount={list.length}
            itemData={itemData}
          >
            {ListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
});

const SelectList = ({ handleDrag, ...restProps }) => {
  return <DragableList useDragHandle onSortEnd={handleDrag} {...restProps} />;
};

const mapStateToProps = ({ list }) => {
  return { list };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDrag: index => dispatch(moveItem(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectList);

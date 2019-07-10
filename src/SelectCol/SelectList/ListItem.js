/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined, EditOutlined } from '@material-ui/icons';

const DragHandle = sortableHandle(() => <MenuOutlined />);

const ListItem = ({ data, index, style, stats }) => {
  const { dragable, list, openEdit } = data;
  const id = list[index];
  const { name, weight, qty } = stats[id];

  return (
    <div className="flex list-item" style={style}>
      <div>
        {dragable ? <DragHandle /> : <EditOutlined onClick={openEdit(index)} />}
      </div>
      <div className="list-item-name ellipsis">{name}</div>
      {weight.map((w, i) => (
        <div key={i}>{w || 0}</div>
      ))}
      <div>{qty === '' ? 20 : qty}</div>
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  return { stats };
};

export default connect(mapStateToProps)(sortableElement(ListItem));

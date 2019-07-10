/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { BtnGroups } from 'components';
import {
  createItem,
  removeItem,
  editItem,
  saveState,
  removeState,
  reloadState,
} from 'actions';
import uuid from 'uuid/v4';
import SelectList from './SelectList';
import Dialog from './Dialog';

const SelectCol = ({
  store,
  handleReload,
  handleRemove,
  handleCreate,
  handleEdit,
}) => {
  const { list, stats } = store;
  const btns = ['load', 'del', 'save', 'add'];
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { id: null, item: null, open: false }
  );

  const onClick = name => () => {
    switch (name) {
      case 'load':
        handleReload();
        break;
      case 'del':
        removeState('warship-girl');
        setTimeout(() => handleReload(), 0);
        break;
      case 'save':
        saveState('warship-girl', store);
        break;
      case 'add':
        setState({ id: null, item: null, open: true });
        break;
      default:
        break;
    }
  };

  const openEdit = index => () => {
    const id = list[index];
    const item = stats[id];
    setState({ id, index, item, open: true });
  };

  const handleClose = () => setState({ open: false });

  const handleDel = () => {
    const { index, id } = state;
    handleRemove(index, id);
    handleClose();
  };

  const handleConfirm = (e, item) => {
    const { id, name } = item;
    if (name) {
      handleClose();
      e.preventDefault();
      if (id) {
        handleEdit(item);
      } else {
        const newItem = { ...item, id: uuid() };
        handleCreate(newItem);
      }

    }
  };

  return (
    <div className="col">
      <BtnGroups btns={btns} onClick={onClick} />
      <SelectList openEdit={openEdit} />
      <Dialog
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleDel={handleDel}
        {...state}
      />
    </div>
  );
};

const mapStateToProps = store => {
  return { store };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCreate: item => dispatch(createItem(item)),
    handleRemove: (index, id) => dispatch(removeItem(index, id)),
    handleEdit: item => dispatch(editItem(item)),
    handleReload: () => dispatch(reloadState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCol);

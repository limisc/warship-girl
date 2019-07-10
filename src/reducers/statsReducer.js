import { actionTypes, reducerCreator } from '../actions';

const createItem = (stats, action) => {
  const { id, ...rest } = action.item;
  return {
    ...stats,
    [id]: rest,
  };
};

const removeItem = (stats, action) => {
  const { id } = action;
  const { [id]: omit, ...rest } = stats;
  return rest;
};

const statsReducer = reducerCreator({
  [actionTypes.CREATE_ITEM]: createItem,
  [actionTypes.REMOVE_ITEM]: removeItem,
  [actionTypes.EDIT_ITEM]: createItem,
});

export default statsReducer;

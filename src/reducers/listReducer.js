import { actionTypes, reducerCreator } from '../actions';
import arrayMove from 'array-move';

const createItem = (list, action) => {
  return [...list, action.item.id];
};

const moveItem = (list, action) => {
  const { oldIndex, newIndex } = action.index;
  if (oldIndex === newIndex) {
    return list;
  }

  return arrayMove(list, oldIndex, newIndex);
};

const removeItem = (list, action) => {
  const { index } = action;
  const { length } = list;

  if (index === 0) {
    return list.slice(1);
  } else if (index === length - 1) {
    return list.slice(0, length - 1);
  } else {
    return [...list.slice(0, index), ...list.slice(index + 1)];
  }
};

const listReducer = reducerCreator({
  [actionTypes.CREATE_ITEM]: createItem,
  [actionTypes.REMOVE_ITEM]: removeItem,
  [actionTypes.MOVE_ITEM]: moveItem,
});

export default listReducer;

import actionTypes from './actionTypes';

export const reducerCreator = handler => {
  return (state, action, ...args) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action, ...args);
    }

    return state;
  };
};

const actionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((v, i) => {
      action[v] = args[i];
    });

    return action;
  };
};

export const reloadState = actionCreator(actionTypes.RELOAD_STATE);
export const createItem = actionCreator(actionTypes.CREATE_ITEM, 'item');
export const removeItem = actionCreator(actionTypes.REMOVE_ITEM, 'index', 'id');
export const editItem = actionCreator(actionTypes.EDIT_ITEM, 'item');
export const moveItem = actionCreator(actionTypes.MOVE_ITEM, 'index');
export const setValues = actionCreator(actionTypes.SET_VALUES, 'values');
export const setChecked = actionCreator(actionTypes.SET_CHECKED, 'value', 'checked');
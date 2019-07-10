import { actionTypes, loadState } from '../actions';
import initState from '../store/state';
import listReducer from './listReducer';
import statsReducer from './statsReducer';

const valuesReducer = (values, action) => {
  if (action.type === actionTypes.SET_VALUES) {
    return action.values;
  }

  return values;
};

const checkedReducer = (checked, action) => {
  if (action.type === actionTypes.SET_CHECKED) {
    return {
      ...checked,
      [action.value]: action.checked,
    };
  }

  return checked;
};

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RELOAD_STATE) {
    return loadState('warship-girl') || initState;
  }

  const { list, stats, values, checked } = state;

  return {
    list: listReducer(list, action),
    stats: statsReducer(stats, action),
    values: valuesReducer(values, action),
    checked: checkedReducer(checked, action),
  };
};

export default rootReducer;

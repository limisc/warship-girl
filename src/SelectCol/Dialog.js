/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Input } from 'components';

const CustomDiglog = ({
  id,
  item,
  open,
  handleClose,
  handleConfirm,
  handleDel,
}) => {
  const initState = {
    name: '',
    qty: '',
    str: '',
    tor: '',
    def: '',
    air: '',
    fuel: '',
    ammo: '',
    steel: '',
    al: '',
  };

  const fields = ['str', 'tor', 'def', 'air', 'fuel', 'ammo', 'steel', 'al'];

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initState
  );

  const onChange = ({ target: { name, value } }) => setState({ [name]: value });

  const onClick = e => {
    const { name, qty, str, tor, def, air, fuel, ammo, steel, al } = state;
    const weight = [str, tor, def, air];
    const value = [fuel, ammo, steel, al];
    const item = { id, name, qty, weight, value };
    handleConfirm(e, item);
  };

  useEffect(() => {
    if (open) {
      let newState = initState;
      if (id && item) {
        const { name, qty, weight, value } = item;
        const [str, tor, def, air] = weight;
        const [fuel, ammo, steel, al] = value;
        newState = { name, qty, str, tor, def, air, fuel, ammo, steel, al };
      }

      setState(newState);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog open={open} maxWidth="sm">
      <form autoComplete="off">
        <DialogContent classes={{ root: 'wrap-box dialog-content' }}>
          <div className="fluid">
            <TextField
              required
              variant="filled"
              label="Name"
              value={state.name}
              InputProps={{ name: 'name' }}
              onChange={onChange}
            />
            <Input label="qty" value={state.qty} onChange={onChange} />
          </div>
          {fields.map(field => (
            <Input
              key={field}
              label={field}
              value={state[field]}
              onChange={onChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          {id && (
            <Button color="secondary" tabIndex="-1" onClick={handleDel}>
              <strong>删除</strong>
            </Button>
          )}
          <Button color="secondary" tabIndex="-1" onClick={handleClose}>
            取消
          </Button>
          <Button type="submit" color="primary" onClick={onClick}>
            <strong>确认</strong>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CustomDiglog;

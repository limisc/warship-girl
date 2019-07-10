/* eslint-disable no-unused-vars */
import React, { memo, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';
import { WEIGHTS } from 'store';
import {  translate } from 'actions';

const CheckField = memo(({ checked, handleCheck }) => {
  const [selected, setSelect] = useState(() =>
    WEIGHTS.reduce((sum, cur) => sum + (checked[cur] ? 1 : 0), 0)
  );

  const onChange = e => {
    const { value, checked } = e.target;
    if (selected === 2 && checked) {
      e.preventDefault();
    } else {
      handleCheck(value, checked);
      setSelect(selected + (checked ? 1 : -1));
    }
  };

  return (
    <FormControl required component="fieldset" className="col-2">
      <FormLabel component="legend">选择至多两项</FormLabel>
      <FormGroup>
        {WEIGHTS.map(w => (
          <FormControlLabel
            key={w}
            control={
              <Checkbox checked={checked[w]} value={w} onChange={onChange} />
            }
            label={translate(w)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
});

export default CheckField;

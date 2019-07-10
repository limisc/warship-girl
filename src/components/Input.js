import React, { memo } from 'react';
import { TextField } from '@material-ui/core';
import { translate } from 'actions';

const Input = memo(({ label, value, onChange }) => {
  const handleKeyPress = e => {
    //prevent user enter + - e in number input field.
    if (['+', '-', 'e'].indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  };

  return (
    <TextField
      type="number"
      variant="filled"
      label={translate(label)}
      value={value}
      onChange={onChange}
      InputProps={{
        name: label,
        onKeyPress: handleKeyPress,
      }}
    />
  );
});

export default Input;

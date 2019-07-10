/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import {
  Add,
  RefreshOutlined,
  DeleteForeverOutlined,
  SaveOutlined,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';

const btnIcons = {
  load: <RefreshOutlined />,
  del: <DeleteForeverOutlined />,
  save: <SaveOutlined />,
  add: <Add />,
};

const BtnGroups = memo(({ classes, btns, onClick }) => {
  return (
    <div className="flex fluid space-between">
      {btns.map(name => (
        <Button
          key={name}
          variant="contained"
          className={classes}
          onClick={onClick(name)}
        >
          {btnIcons[name]}
        </Button>
      ))}
    </div>
  );
});

BtnGroups.defaultProps = {
  classes: 'col-4',
};

export default BtnGroups;

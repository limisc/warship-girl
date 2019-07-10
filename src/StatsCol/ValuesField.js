/* eslint-disable no-unused-vars */
import React, { memo, Fragment } from 'react';
import { VALUES } from 'store';
import { Input } from 'components';

const ValuesField = memo(({ values, handleValues }) => {
  const onChange = ({ target: { name, value } }) => {
    const index = VALUES.indexOf(name);

    if (index !== -1) {
      const newValues = values.slice();
      newValues[index] = value;
      handleValues(newValues);
    }
  };

  return (
    <Fragment>
      资源价值权重
      <div className="wrap-box gutter-bottom">
        {VALUES.map((v, i) => (
          <Input key={v} label={v} value={values[i]} onChange={onChange} />
        ))}
      </div>
    </Fragment>
  );
});

export default ValuesField;

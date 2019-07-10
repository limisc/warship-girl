/* eslint-disable no-unused-vars */
import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Input } from 'components';
import { WEIGHTS } from 'store';
import { calc, getSackField, setChecked, setValues } from 'actions';
import ValuesField from './ValuesField';
import CheckField from './CheckField';
import { Button } from '@material-ui/core';
import StatsList from './StatsList';

const StatsCol = ({ state, handleCheck, handleValues }) => {
  const { checked, values } = state;
  const [weights, setWeights] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      str: '',
      tor: '',
      def: '',
      air: '',
    }
  );

  const [select, setSelect] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      data: {},
      checkList: [],
    }
  );
  const [isCalclating, setCalc] = useState(false);
  useEffect(() => {
    if (!isCalclating) return;
    const sackField = getSackField(weights, checked);
    const { checkList } = sackField;
    if (checkList.length === 0) {
      setCalc(false);
      return;
    }

    try {
      setTimeout(() => {
        const { result, data } = calc(sackField, state);
        if (result) {
          setSelect({ data, checkList });
        }
        setCalc(false);
      }, 0);
    } catch (error) {
      setCalc(false);
      console.log('error');
    }
  }, [isCalclating]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = ({ target: { name, value } }) => {
    setWeights({ [name]: value });
  };

  const onClick = () => setCalc(true);

  console.log(select);
  return (
    <div className="col">
      <ValuesField values={values} handleValues={handleValues} />
      <div className="flex">
        <CheckField checked={checked} handleCheck={handleCheck} />
        <div className="set-box">
          {WEIGHTS.map(w => {
            if (checked[w]) {
              return <Input key={w} label={w} onChange={handleChange} />;
            }

            return null;
          })}

          <Button
            variant="contained"
            color="primary"
            disabled={isCalclating}
            onClick={onClick}
          >
            CALC
          </Button>
        </div>
      </div>

      <div className="fill-remains">
        {isCalclating ? (
          <img
            alt="loading"
            className="lg"
            src={`${process.env.PUBLIC_URL}/images/loading.svg`}
          />
        ) : (
          <StatsList {...select} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheck: (value, checked) => dispatch(setChecked(value, checked)),
    handleValues: values => dispatch(setValues(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsCol);

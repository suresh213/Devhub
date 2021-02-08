import React, { Fragment } from 'react';
import spinner from './spin.gif';
const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: '50px',
          margin: 'auto',
          display: 'block',
          padding: '180px 0',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        alt='Loading...'
      ></img>
    </Fragment>
  );
};

export default Spinner;

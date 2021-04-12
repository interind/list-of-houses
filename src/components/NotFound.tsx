import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <h2>404</h2>
      <button type="button" onClick={() => history.push('/')}>на главную страницу</button>
    </>
  );
};

export default NotFound;

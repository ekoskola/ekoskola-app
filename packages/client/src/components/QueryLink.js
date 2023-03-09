import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const QueryLink = props => (
  <Link
    {...props}
    to={{
      ...props.to,
      search: queryString.stringify(props.to.query, { arrayFormat: 'bracket' }),
    }}
  />
);

export default QueryLink;

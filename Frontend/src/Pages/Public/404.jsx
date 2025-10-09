import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-100">
      <h1>404</h1>
      <h4>Not found</h4>

      <div>
        <p>Either:</p>
        <p>This page has not been created yet</p>
        <p>You are unauthorized to access this page </p>
        <p>Or:</p>
        <p>You entered the Wrong URL</p>
      </div>

      <a href="/"> Go Back Home</a>
    </div>
  );
};

export default NotFound;

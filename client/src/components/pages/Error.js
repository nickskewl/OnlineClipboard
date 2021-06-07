import React from "react";

const Error = () => {
  return (
    <div>
      <h1>Bad Request</h1>
      <p className="lead">
        Your browser sent a request that this server could not understand.
      </p>
      <p>Please try again with some other text.</p>
    </div>
  );
};

export default Error;

import React from "react";

const Created = () => {
  return (
    <div className="card">
      <h3 className="text-left text-success">Your online clip is created.</h3>
      <div>
        <h4 style={{ display: "inline-block", marginRight: "5px" }}>
          Access your content on any device using URL -
        </h4>
        <span className="text-primary">{window.location.href}</span>
      </div>
    </div>
  );
};

export default Created;

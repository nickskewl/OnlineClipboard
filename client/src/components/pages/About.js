import React from "react";

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className="my-1">
        It is the online clipboard that allows you to quickly access contents
        among devices via URL.
      </p>
      <div className="bg-light p">
        <div>
          <strong>Version: </strong> 1.0.0
        </div>
        <div>
          <strong>By - Nitesh Mittal </strong>
          <p>
            <i className="fas fa-envelope"></i>{" "}
            <a href="mailto:someone@example.com">niteshmit89@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

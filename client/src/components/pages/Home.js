import React, { useState, useContext, useEffect, Fragment } from "react";
import UserContext from "../../context/user/userContext";

const Home = (props) => {
  const [identifier, setIdentifier] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.resetGlobalState();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setIdentifier(([e.target.name] = e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/${identifier}`);
  };

  return (
    <Fragment>
      <h1 className="text-center">
        Welcome to <span className="text-primary">Online Clipboard</span>
      </h1>
      <div className="grid-2">
        <div className="card">
          <p className="text-left medium">
            Online clipboard allows you to quickly access contents among devices
            via URL.
          </p>
          <h3 className="text-left">Instructions:</h3>
          <ul style={{ listStyle: "square", marginLeft: "15px" }}>
            <li>
              Append any string at the end in URL{" "}
              <span className="text-primary">{window.location.origin}</span>.{" "}
              <div>
                <b>Example:</b> {window.location.origin}/test
              </div>
            </li>
            <li>Create any content you want.</li>
            <li>Use the same URL on another device to access your content.</li>
          </ul>
        </div>
        <div className="card">
          <form onSubmit={onSubmit}>
            <div>
              <div>
                <label className="lead text-primary">
                  <strong>Try it once!!</strong>
                </label>
              </div>
              <div style={{ marginTop: "15px" }}>
                <label className="medium">Navigate to</label>
              </div>

              <label>{window.location.origin}/</label>
              <input
                id="name"
                type="text"
                name="name"
                value={identifier}
                placeholder="Enter any text"
                onChange={onChange}
                required
                style={{
                  // display: "inline-block",
                  // width: "auto",
                  margin: "3px 0px",
                }}
              />

              <input
                type="submit"
                value="Go"
                className="btn btn-primary btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

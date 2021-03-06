import React, { Fragment, useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";
import Created from "../pages/Created";
import Spinner from "../layout/Spinner";

const User = ({ match }) => {
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const {
    createUserContent,
    getUserContent,
    userContent,
    expiresAt,
    loading,
    contentCreated,
    clearErrors,
    error,
  } = userContext;

  const [newContent, setNewContent] = useState("");
  const [expiresAfter, setExpiresAfter] = useState("0");

  // const [counter, setCounter] = useState(604800);

  let data;
  let isEmpty;

  useEffect(() => {
    getUserContent(match.params.name);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      alertContext.setAlert(error + " Try reloading the page...", "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  // useEffect(() => {
  //   const timer =
  //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  if (userContent === undefined) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }

  const onClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === "create") {
      const identifier = match.params.name;
      if (newContent === "") {
        alertContext.setAlert("Please add some content", "danger");
      } else {
        createUserContent(identifier, newContent, expiresAfter);
      }
      // history.push(`/user/${identifier}`);
    } else if (e.target.id === "copy") {
      // navigator.clipboard.writeText(userContent);
      document.getElementById("ta_content").select();
      document.execCommand("copy");
    }
  };

  const onChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "ta_content") {
      setNewContent(value);
    } else if (id === "destroy_dropdown") {
      setExpiresAfter(value);
    }
  };

  const formatExpireDate = () => {
    var currentDate = new Date();
    var formatedExpireDate = new Date(expiresAt);
    return Math.round((formatedExpireDate - currentDate) / 1000);
  };

  if (loading) {
    data = <Spinner />;
  } else if (isEmpty) {
    data = (
      <Fragment>
        <div>
          <button
            id="create"
            className="btn btn-dark btn-sm"
            style={{ display: "inline-block" }}
            onClick={onClick}
          >
            Create
          </button>
          <select
            id="destroy_dropdown"
            style={{ width: "100%", display: "inline-block" }}
            onChange={onChange}
            value={expiresAfter}
          >
            <option value="0">Destroy content when viewed</option>
            <option value="60">Destroy content in 1 min</option>
            <option value="600">Destroy content in 10 min</option>
            <option value="3600">Destroy content in 1 hour</option>
            <option value="86400">Destroy content in 1 day</option>
            <option value="604800">Destroy content in 1 week</option>
          </select>
        </div>
        <textarea
          id="ta_content"
          rows="12"
          placeholder="Please add content"
          style={{ marginTop: "10px" }}
          onChange={onChange}
          value={newContent}
        />
      </Fragment>
    );
  } else {
    data = (
      <Fragment>
        <div>
          <h4>{"Here is your content."}</h4>
        </div>
        <div>
          <button
            id="copy"
            style={{ marginRight: "5px" }}
            className="btn btn-dark btn-sm"
            onClick={onClick}
          >
            Copy
          </button>

          {formatExpireDate() >= 0 ? (
            <Fragment>
              Content will be destroyed after{" "}
              <font color="red">{formatExpireDate()}</font> seconds.
            </Fragment>
          ) : (
            <font color="red">Your content is now destroyed!!</font>
          )}
        </div>
        <textarea
          id="ta_content"
          rows="12"
          defaultValue={userContent}
          style={{ marginTop: "10px" }}
        />
      </Fragment>
    );
  }

  return (
    <div style={{ overflowX: "auto", overflowWrap: "break-word" }}>
      <h1>
        Hello <span className="text-primary">{match.params.name}</span>
      </h1>
      {contentCreated ? <Created /> : <Fragment>{data}</Fragment>}
    </div>
  );
};

export default User;

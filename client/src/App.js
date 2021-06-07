import { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import User from "./components/users/User";
import AlertState from "./context/alert/AlertState";
import UserState from "./context/user/UserState";

const App = () => {
  return (
    <UserState>
      <AlertState>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/:name" component={User} />
                <Route exact path="/error" component={Error} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </AlertState>
    </UserState>
  );
};

export default App;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//import $ from 'jquery';

import Navbar from './components/layout/Navbar';
import Navbarmobile from './components/layout/Navbarmobile';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddBodystate from './components/profile-forms/AddBodystate';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/Profile';

import Alert from './components/layout/Alert';


/*THEME IMPORTS*/
import './font-face.css';
import './vendor/font-awesome-4.7/css/font-awesome.min.css';
import './vendor/font-awesome-5/css/fontawesome-all.min.css';
import './vendor/mdi-font/css/material-design-iconic-font.min.css';
import './vendor/bootstrap-4.1/bootstrap.min.css';

/*VENDOR CSS*/
import './vendor/animsition/animsition.min.css';
import './vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css';
import './vendor/wow/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/slick/slick.css';
import './vendor/select2/select2.min.css';
import './vendor/perfect-scrollbar/perfect-scrollbar.css';

/*JS IMPORTS*/
//import './js/main';

/*
          <Sidebar />
          <Navbar />
            <Navbarmobile />
*/

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="page-wrapper">
            <Sidebar />
            <div className="page-container2">
              <Alert />

              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/body_state" component={AddBodystate} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>

            </div>
          </div>
        </Fragment >
      </Router>
    </Provider>
  );
};

export default App;

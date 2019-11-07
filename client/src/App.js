import React, { Fragment } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';


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




const App = () => (
  <Fragment>
    <Navbar />
    <Sidebar />
    <Landing />
  </Fragment>
);

export default App;

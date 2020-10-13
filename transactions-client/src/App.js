import React from 'react';

import Layout from './components/Layout/Layout';
import classes from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBuilder from './containers/ClientBuilder/AppBuilder';

function App() {
  return (
    <Router>
      <Layout className={classes.App}>
        <AppBuilder />
      </Layout>
    </Router>
  );
}

export default App;

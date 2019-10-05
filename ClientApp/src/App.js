import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchJobs from './components/FetchJobs';


class App extends Component {
    
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchjobs/:startDateIndex?' component={FetchJobs} />
            </Layout>
        );
    }
}

export default App;
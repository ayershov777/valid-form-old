import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import SignupPage from './components/SignupPage/SignupPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route to='/demos/signup'>
                    <SignupPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;

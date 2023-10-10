import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main'; // Make sure to import the Main component
import './styles/output.css';

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

export default App;


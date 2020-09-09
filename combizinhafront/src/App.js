import React from 'react';
import HeaderComponent from "./Components/HeaderComponent";
import Home from './Pages/Home'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css'
import FooterComponent from "./Components/FooterComponent";

function App() {
    return (
        <div className='App'>
            <HeaderComponent/>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={Home}/>
                    </Switch>
                </ BrowserRouter>
            <FooterComponent/>
        </div>
    );
}

export default App;

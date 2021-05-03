import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from "../services/AuthService";

const Home = () => {
    if(!AuthService.getCurrentUser()){
        return <Redirect to={'/login'}/>;
    }
    return (
        <main role="main" class="container">
            <div class="jumbotron">
                <h1>Добро пожаловать!</h1>
                <p class="lead">Система управления предприятием</p>
            </div>
        </main>
    );
}

export default Home;
import React from 'react';
import {Link, withRouter, useParams, Redirect} from 'react-router-dom';
import AuthService from "../services/AuthService";

const Subdivision = () => {
    let {id} = useParams();
    if(!AuthService.getCurrentUser()){
        return <Redirect to={'/login'}/>;
    }
    if(!isNaN(id)){
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                    <div>
                        <Link to={'/subdivisions/' + id + '/technics'}>Техника</Link>
                    </div>
                    <div>
                        <Link to={'/subdivisions/' + id + '/employees'}>Сотрудники</Link>
                    </div>
                </div>
            </main>
        );
    }
    return <div></div>
}

export default withRouter(Subdivision);
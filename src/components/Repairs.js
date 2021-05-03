import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import AuthService from "../services/AuthService";

class RepairsTechnics extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!AuthService.getCurrentUser()){
            return <Redirect to={'/login'}/>;
        }
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                    <div>
                        <Link to={'/repairs/technics'}>Техника в ремонте</Link>
                    </div>
                    <div>
                        <Link to={'/repairs/employees'}>Сотрудники мастерской</Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(RepairsTechnics);
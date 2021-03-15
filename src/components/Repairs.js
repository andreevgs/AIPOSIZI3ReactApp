import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class RepairsTechnics extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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
import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavBar = (props) => {

    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/">Главная</Link>
                    </li>
                    <li class="nav-item active">
                        <Link className="nav-link" to="/subdivisions">Подразделения</Link>
                    </li>
                    <li class="nav-item active">
                        <Link className="nav-link" to="/repairs">Ремонтная мастерская</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);
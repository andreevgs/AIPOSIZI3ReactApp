import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthService from "../services/AuthService";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          currentUser: undefined,
        };
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
          });
        }
    }
    
    logOut(){
        AuthService.logout();
    }

    render(){
        const { currentUser } = this.state;
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
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"#"} className="nav-link">
                        {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                        </a>
                    </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                        Login
                        </Link>
                    </li>
    
                    <li className="nav-item">
                        <Link to={"/registration"} className="nav-link">
                        Sign Up
                        </Link>
                    </li>
                    </div>
                )}
            </nav>
        );
    }
    
}

export default withRouter(NavBar);
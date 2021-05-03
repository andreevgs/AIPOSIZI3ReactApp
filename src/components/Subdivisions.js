import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/AuthService";

class Subdivisions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
            axios.get('http://127.0.0.1:5000/api/subdivisions', {headers: {'x-access-token': AuthService.getCurrentUser().accessToken}})
                .then((response) => {this.setState({rows: response.data.rows})})
                .catch(error => this.setState({ message: error.message }));          
        }
    }

    render() {
        
        if(!AuthService.getCurrentUser()){
            return <Redirect to={'/login'}/>;
        }
        return (
            <main role="main" class="container">
                <div>
                    <div class="jumbotron">
                        <Link to={'/subdivisions/add'}>Создать подразделение</Link>
                    </div>
                    {this.state.rows === null && <p>Loading menu...</p>}
                    {this.state.rows && this.state.rows.map(item => (
                            <div>
                                <Link to={'/subdivisions/' + item.id}>{item.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </main>
        );
    }
}

export default withRouter(Subdivisions);
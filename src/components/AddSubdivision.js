import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/AuthService";

class AddSubdivision extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {name} = this.state;
        axios.post('http://127.0.0.1:5000/api/subdivisions/add', JSON.stringify({'name': name}), {headers: {'Content-Type': 'application/json', 'x-access-token': AuthService.getCurrentUser().accessToken}})
            .then((response) => {
                this.setState({status: response.data.status});
            })
            .catch((error) => {console.log(error)});
    }

    render() {
        if(!AuthService.getCurrentUser()){
            return <Redirect to={'/login'}/>;
        }
        let {name} = this.state;
        if(this.state.status === 1) {
            return (
                <Redirect to={'/subdivisions'}/>
            );
        }
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <p>Введите название:</p>
                        <input type="text" name="name" value={name} onChange={this.onChange}/>
                        <input type="submit"/>
                    </form>
                </div>
            </main>
        );
    }
}

export default withRouter(AddSubdivision);
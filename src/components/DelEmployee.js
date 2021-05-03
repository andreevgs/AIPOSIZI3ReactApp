import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/AuthService";

class DelEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/employees/' + this.props.match.params.employee_id + '/del', {headers: {'x-access-token': AuthService.getCurrentUser().accessToken}})
            .then((response) => {this.setState({status: response.data.status});})
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
        if(!AuthService.getCurrentUser()){
            return <Redirect to={'/login'}/>;
        }
        if(this.state.status === 1){
            return (
                <Redirect to={'/subdivisions/' + this.props.match.params.id + '/employees'}/>
            );
        }
        return (
            <div>Error: {this.state.message}</div>
        );
    }
}

export default withRouter(DelEmployee);
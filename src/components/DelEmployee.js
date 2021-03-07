import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

class DelEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/employees/' + this.props.match.params.employee_id + '/del')
            .then((response) => {console.log(response.data); this.setState({status: response.data.status});})
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
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
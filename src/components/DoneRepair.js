import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

class DoneRepair extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/repairs/technics/' + this.props.match.params.id + '/done')
            .then((response) => {console.log(response.data);console.log(this.props.match.params.id); this.setState({status: response.data.status});})
            .catch((error) => {console.log(error); console.log(this.props.match.params.id); this.setState({ message: error.message })});
    }

    render() {
        if(this.state.status === 1){
            return (
                <Redirect to={'/repairs/technics'}/>
            );
        }
        return (
            <div>Error: {this.state.message}</div>
        );
    }
}

export default withRouter(DoneRepair);
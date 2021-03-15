import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Subdivisions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions')
            .then((response) => {this.setState({rows: response.data.rows});})
            .catch(error => this.setState({ message: error.message }));
    }

    render() {
        return (
            <main role="main" class="container">
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
            </main>
        );
    }
}

export default withRouter(Subdivisions);
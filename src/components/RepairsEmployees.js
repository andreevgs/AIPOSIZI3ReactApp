import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class RepairsEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/repairs/employees')
            .then((response) => {this.setState({rows: response.data.rows});})
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                    <div>
                        <Link to={'/repairs/employees/add'}>Добавить сотрудника</Link>
                    </div>
                </div>
                <div>
                {this.state.rows === null && <p>Loading menu...</p>}
                    <table>
                    <tr><th>ФИО</th><th>Подразделение</th><th>Возраст</th><th>Пол</th><th>Должность</th></tr>
                    {this.state.rows && this.state.rows.map(item => (
                            <tr><td>{item.full_name}</td><td>Ремонтная мастерская</td><td>{item.age}</td><td>{item.sex}</td><td>{item.position}</td></tr>
                        ))
                    }
                    </table>
                </div>
            </main>
        );
    }
}

export default withRouter(RepairsEmployees);
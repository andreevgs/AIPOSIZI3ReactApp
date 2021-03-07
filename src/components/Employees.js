import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/employees')
            .then((response) => {this.setState({rows: response.data.rows});})
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                    <div>
                        <Link to={'/subdivisions/' + this.props.match.params.id + '/employees/add'}>Добавить сотрудника</Link>
                    </div>
                </div>
                <div>
                {this.state.rows === null && <p>Loading menu...</p>}
                    <table>
                    <tr><th>ФИО</th><th>Подразделение</th><th>Возраст</th><th>Пол</th><th>Должность</th></tr>
                    {this.state.rows && this.state.rows.map(item => (
                            <tr><td>{item.full_name}</td><td>{item.subdivision}</td><td>{item.age}</td><td>{item.sex}</td><td>{item.position}</td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/employees/' + item.id + '/edit'}>Редактировать</Link></td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/employees/' + item.id + '/del'}>Удалить</Link></td></tr>
                        ))
                    }
                    </table>
                </div>
            </main>
        );
    }
}

export default withRouter(Employees);
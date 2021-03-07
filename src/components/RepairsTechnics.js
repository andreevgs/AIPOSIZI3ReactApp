import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Technics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/repairs/technics')
            .then((response) => {console.log(response.data.result.rows); this.setState({rows: response.data.result.rows});})
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
        return (
            <main role="main" class="container">
                <div>
                {this.state.rows === null && <p>Loading...</p>}
                <tr><th>Номер ремонта</th><th>Наименование</th><th>Модель</th><th>Дата передачи</th><th>Тип ремонта</th><th>Время ремонта(дни)</th></tr>
                {this.state.rows && this.state.rows.map(item => (
                        <table>
                            <tr><td>{item.id}</td><td>{item.name}</td><td>{item.model}</td><td>{item.date_of_hand_over_for_repair}</td><td>{item.type_of_repair}</td><td>{item.repair_time}</td><td><Link to={'/repairs/technics/' + item.technics_id + '/done'}>Завершить ремонт</Link></td></tr>
                        </table>
                    ))
                }
                </div>
            </main>
        );
    }
}

export default withRouter(Technics);
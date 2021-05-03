import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import AuthService from "../services/AuthService";
import axios from 'axios';

class Technics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if(user){
            axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/technics', {headers: {'x-access-token': AuthService.getCurrentUser().accessToken}})
            .then((response) => { this.setState({ rows: response.data.rows })})
            .catch((error) => { console.log(error); this.setState({ message: error.message }) });
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
                        <div>
                            <Link to={'/subdivisions/' + this.props.match.params.id + '/technics/add'}>Добавить технику</Link>
                        </div>
                    </div>
                    <div>
                        {this.state.rows === null && <p>Loading menu...</p>}
                        <tr><th>Наименование</th><th>Модель</th><th>Год</th></tr>
                        {this.state.rows && this.state.rows.map(item => (
                            <table>
                                {item.is_in_repair && <tr><td>{item.name}</td><td>{item.model}</td><td>{item.year}</td><td>В ремонте</td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/technics/' + item.id + '/edit'}>Редактировать</Link></td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/technics/' + item.id + '/decom'}>Списать</Link></td></tr>}
                                {!item.is_in_repair && <tr><td>{item.name}</td><td>{item.model}</td><td>{item.year}</td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/technics/' + item.id + '/torepair'}>Отправить в ремонт</Link></td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/technics/' + item.id + '/edit'}>Редактировать</Link></td><td><Link to={'/subdivisions/' + this.props.match.params.id + '/technics/' + item.id + '/decom'}>Списать</Link></td></tr>}
                            </table>
                        ))
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Technics);
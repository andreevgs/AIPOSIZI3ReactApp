import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
const axiosPOSTconfig = {headers: {'Content-Type': 'application/json'}};

class AddRepairsEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            sex: '',
            position: ''
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {name, age, sex, position} = this.state;
        axios.post('http://127.0.0.1:5000/api/repairs/employees/add', JSON.stringify({'name': name, 'age': age, 'sex': sex, 'position': position}), axiosPOSTconfig)
            .then((response) => {
                console.log(response);
                this.setState({status: response.data.status});
            })
            .catch((error) => {console.log(error)});
    }

    render() {
        let {name, age, sex, position} = this.state;
        return (
            <main role="main" class="container">
                <div class="jumbotron">
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <p>Введите ФИО:</p>
                        <input type="text" name="name" value={name} onChange={this.onChange}/>
                        <p>Введите возраст:</p>
                        <input type="text" name="age" value={age} onChange={this.onChange}/>
                        <p>Введите пол:</p>
                        <input type="text" name="sex" value={sex} onChange={this.onChange}/><br/>
                        <p>Введите должность:</p>
                        <input type="text" name="position" value={position} onChange={this.onChange}/><br/>
                        <input type="submit"/>
                    </form>
                </div>
            </main>
        );
    }
}

export default withRouter(AddRepairsEmployees);
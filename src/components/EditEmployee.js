import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
const axiosPOSTconfig = {headers: {'Content-Type': 'application/json'}};

class AddEmployees extends Component {

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
        axios.post('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/employees/' + this.props.match.params.employee_id + '/edit', JSON.stringify({'name': name, 'age': age, 'sex': sex, 'position': position, 'subdivision_id': this.props.match.params.id}), axiosPOSTconfig)
            .then((response) => {
                this.setState({status: response.data.status});
            })
            .catch((error) => {console.log(error)});
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/employees/' + this.props.match.params.employee_id + '/edit')
            .then((response) => {
                this.setState({name: response.data.result_emp.rows[0].full_name, age: response.data.result_emp.rows[0].age, sex: response.data.result_emp.rows[0].sex, position: response.data.result_emp.rows[0].position});
            })
            .catch((error) => {console.log(error); this.setState({ message: error.message })});
    }

    render() {
        let {name, age, sex, position} = this.state;
        if(this.state.status === 1) {
            return (
                <Redirect to={'/subdivisions/' + this.props.match.params.id + '/employees'}/>
            );
        }
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

export default withRouter(AddEmployees);
import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
const axiosPOSTconfig = {headers: {'Content-Type': 'application/json'}};

class AddTechnics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            model: '',
            year: ''
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {name, model, year} = this.state;
        console.log(JSON.stringify({'name': name, 'model': model, 'year': year}));
        axios.post('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/technics/add', JSON.stringify({'name': name, 'model': model, 'year': year}), axiosPOSTconfig)
            .then((response) => {
                console.log(response);
                this.setState({status: response.data.status});
            })
            .catch((error) => {console.log(error)});
    }

    render() {
        let {name, model, year} = this.state;
        if(this.state.status === 1) {
            return (
                <Redirect to={'/subdivisions/' + this.props.match.params.id + '/technics'}/>
            );
        }

        return (
            <main role="main" class="container">
                <div class="jumbotron">
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <p>Введите название:</p>
                        <input type="text" name="name" value={name} onChange={this.onChange}/>
                        <p>Введите модель:</p>
                        <input type="text" name="model" value={model} onChange={this.onChange}/>
                        <p>Введите год выпуска:</p>
                        <input type="text" name="year" value={year} onChange={this.onChange}/><br/>
                        <input type="submit"/>
                    </form>
                </div>
            </main>
        );
    }
}

export default withRouter(AddTechnics);
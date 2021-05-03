import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/AuthService";

class ToRepairTechnics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type_of_repair: '',
            repair_time: '',
            employee_id_who_gave: '',
            employee_id_who_accepted: '',
            employee_id_who_repair: '',
            emp_rows: [],
            rep_emp_rows: []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/technics/' + this.props.match.params.technics_id + '/torepair', {headers: {'x-access-token': AuthService.getCurrentUser().accessToken}})
            .then((response) => {
                this.setState({emp_rows: response.data.result_emp.rows});
                this.setState({rep_emp_rows: response.data.result_rep_emp.rows});
                this.setState({employee_id_who_gave: response.data.result_emp.rows[0].id, employee_id_who_accepted: response.data.result_rep_emp.rows[0].id, employee_id_who_repair: response.data.result_rep_emp.rows[0].id})
            })
            .catch((error) => {console.log('err: ', error); this.setState({ message: error.message })});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {type_of_repair, repair_time, employee_id_who_gave, employee_id_who_accepted, employee_id_who_repair} = this.state;
        axios.post('http://127.0.0.1:5000/api/subdivisions/' + this.props.match.params.id + '/technics/' + this.props.match.params.technics_id + '/torepair', JSON.stringify({'type_of_repair': type_of_repair, 'repair_time': repair_time, 'employee_id_who_gave': employee_id_who_gave, 'employee_id_who_accepted': employee_id_who_accepted, 'employee_id_who_repair': employee_id_who_repair}), {headers: {'Content-Type': 'application/json', 'x-access-token': AuthService.getCurrentUser().accessToken}})
            .then((response) => {
                this.setState({status: response.data.status});
            })
            .catch((error) => {console.log(error)});
    }

    render() {
        if(!AuthService.getCurrentUser()){
            return <Redirect to={'/login'}/>;
        }
        let {type_of_repair, repair_time, employee_id_who_gave, employee_id_who_accepted, employee_id_who_repair} = this.state;
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
                        <p>Укажите сотрудника, который сдал технику:</p>
                        <select name="employee_id_who_gave" onChange={this.onChange}>
                            {this.state.emp_rows && this.state.emp_rows.map((item, index) => (
                                    <option value={item.id}>{item.full_name}</option>
                                ))
                            }
                        </select>
                        <p>Укажите сотрудника, который принял технику:</p>
                        <select name="employee_id_who_accepted" onChange={this.onChange}>
                            {this.state.rep_emp_rows && this.state.rep_emp_rows.map(item => (
                                    <option value={item.id}>{item.full_name}</option>
                                ))
                            }
                        </select>

                        <p>Укажите сотрудника, который будет выполнять ремонт:</p>
                        <select name="employee_id_who_repair" onChange={this.onChange}>
                            {this.state.rep_emp_rows && this.state.rep_emp_rows.map(item => (
                                <option value={item.id}>{item.full_name}</option>
                            ))}
                        </select>
                        <p>Укажите срок ремонта (дней):</p>
                        <input type="number" name="repair_time" value={repair_time} onChange={this.onChange}/>
                        <p>Тип ремонта:</p>
                        <input type="text" name="type_of_repair" value={type_of_repair} onChange={this.onChange}/>

                        <input type="submit"/>
                    </form>
                </div>
            </main>
        );
    }
}

export default withRouter(ToRepairTechnics);
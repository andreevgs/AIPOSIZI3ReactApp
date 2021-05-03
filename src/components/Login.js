import React, { Component } from "react";
import {withRouter, Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LoginGithub from 'react-login-github';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';

import AuthService from "../services/AuthService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                this.props.history.push("/profile");
                window.location.reload();
                },
                error => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            });
        }
        else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        if(AuthService.getCurrentUser()){
            return <Redirect to={'/'}/>;
        }
        return (
        <div className="col-md-12">
            <div className="card card-container">

            <Form
                onSubmit={this.handleLogin}
                ref={c => {
                this.form = c;
                }}
            >
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                />
                </div>

                <div className="form-group">
                <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                >
                    {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                </button>
                </div>

                {this.state.message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {this.state.message}
                    </div>
                </div>
                )}
                <CheckButton
                style={{ display: "none" }}
                ref={c => {
                    this.checkBtn = c;
                }}
                />
            </Form>
            <GoogleLogin
                clientId='1065626692890-96855im7q9sjjrp5afmheuq5alhj8npn.apps.googleusercontent.com'
                buttonText='Log in with Google'
                onSuccess={AuthService.handleGoogleLogin}
                onFailure={AuthService.handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="1947842458696794"
                autoLoad={true}
                fields="name,email,picture"
                // onClick={AuthService.handleFaceboo}
                callback={AuthService.handleFacebookLogin}
            />
            <LoginGithub clientId="fd45f818de6c1865baf0"
                onSuccess={AuthService.handleGitHubLogin}
                onFailure={AuthService.handleGitHubLogin}
            />
            </div>
        </div>
        );
    }
}

export default withRouter(Login);
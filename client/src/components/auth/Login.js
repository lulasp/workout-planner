import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

import logo from '../../images/icon/logo.png';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
        console.log('success ');
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Fragment>
            <div className="page-content--bge5">
                <div className="login-wrap">
                    <div className="login-content">
                        <div className="login-logo">
                            <Link to="/">
                                <img src={logo} />
                            </Link>
                        </div>
                        <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                        <form className="login-form" onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <label>E-mail</label>
                                <input type="email" className="au-input au-input--full" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength="6"
                                    className="au-input au-input--full"
                                />
                            </div>
                            <input type="submit" className="au-btn au-btn--block au-btn--green m-b-20" value="Login" />
                        </form>
                        <p className="my-1">
                            Dont have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

login.PropTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);;

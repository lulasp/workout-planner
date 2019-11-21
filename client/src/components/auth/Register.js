import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import logo from '../../images/icon/logo.png';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Fragment>
            <div className="page-content--bge5">
                <div className="container">
                    <div className="login-wrap">
                        <div className="login-content">
                            <div className="login-logo">
                                <Link to="/">
                                    <img src={logo} />
                                </Link>
                            </div>
                            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                            <form className="login-form" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="au-input au-input--full" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                                </div>
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
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={password2}
                                        onChange={e => onChange(e)}
                                        minLength="6"
                                        className="au-input au-input--full"
                                    />
                                </div>
                                <input type="submit" className="au-btn au-btn--block au-btn--green m-b-20" value="Register" />
                            </form>
                            <p className="my-1">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);

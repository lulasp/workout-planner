import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
//import { setAlert } from '../../actions/alert';
//import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

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
                <div className="login-wrap">
                    <div className="login-content">
                        <h1 className="large text-primary">Sign Up</h1>
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
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;

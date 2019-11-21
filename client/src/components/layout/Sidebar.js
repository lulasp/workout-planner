import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import avatar from '../../images/icon/avatar-big-01.jpg';
import logo from '../../images/icon/logo.png';

const Sidebar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <div className="menu-sidebar2__content js-scrollbar1">
            <div className="account2">
                <div className="image img-cir img-120">
                    <img src={avatar} alt="John Doe" />
                </div>
                {user != null ? (
                    <h4 className="name">{user && user.name}</h4>
                ) : (
                        <h4 className="name">Username</h4>
                    )}
                <a onClick={logout} href="#!">Sign out</a>
            </div>
            <nav className="navbar-sidebar2">
                <ul className="list-unstyled navbar__list">
                    <li className="active">
                        <Link to="/dashboard">
                            <i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/">
                            <i className="fa fa-calendar-o"></i>Plans</Link>
                        <span className="inbox-num">3</span>
                    </li>
                    <li>
                        <Link to="/">
                            <i className="fa fa-sitemap"></i>Exercises</Link>
                    </li>
                    <li>
                        <Link to="/">
                            <i className="fa fa-user"></i>Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );

    const guestLinks = (
        <div className="menu-sidebar2__content js-scrollbar1">
            <div className="account2">
                <div className="image img-cir img-120">
                    <img src={avatar} alt="John Doe" />
                </div>
            </div>
            <nav className="navbar-sidebar2">
                <ul className="list-unstyled navbar__list">
                    <li className="active">
                        <Link to="/">
                            <i className="fa fa-home"></i>Home</Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <i className="fa fa-edit"></i>Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <i className="fa fa-key"></i>Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
    return (
        <aside className="menu-sidebar2">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Workout Planner" />
                </Link>
            </div>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </aside>
    )
}

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);

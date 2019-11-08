import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export const Navbarmobile = () => {
    return (
        <aside className="menu-sidebar2 js-right-sidebar d-block d-lg-none">
            <div className="logo">
                <Link to="/">
                    <img src="images/icon/logo-white.png" alt="Workout Planner" />
                </Link>
            </div>
            <div className="menu-sidebar2__content js-scrollbar2">
                <div className="account2">
                    <div className="image img-cir img-120">
                        <img src="images/icon/avatar-big-01.jpg" alt="John Doe" />
                    </div>
                    <h4 className="name">john doe</h4>
                    <Link to="/">Sign out</Link>
                </div>
                <nav className="navbar-sidebar2">
                    <ul className="list-unstyled navbar__list">
                        <li className="active">
                            <Link to="/">
                                <i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="inbox.html">
                                <i className="fas fa-chart-bar"></i>Plans</Link>
                            <span className="inbox-num">3</span>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fas fa-shopping-basket"></i>Exercises</Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fas fa-shopping-basket"></i>Profile</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Navbarmobile

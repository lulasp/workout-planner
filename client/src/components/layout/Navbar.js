import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';

const Navbar = () => {
    return (

        <header className="header-desktop2">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="header-wrap2">
                        <div className="logo d-block d-lg-none">
                            <Link to="/">
                                <img src="images/icon/logo-white.png" alt="CoolAdmin" />
                            </Link>
                        </div>
                        <div className="header-button2">
                            <div className="header-button-item js-item-menu">
                                <i className="zmdi zmdi-search"></i>
                                <div className="search-dropdown js-dropdown">
                                    <form action="">
                                        <input className="au-input au-input--full au-input--h65" type="text" placeholder="Search for datas &amp; reports..." />
                                        <span className="search-dropdown__icon">
                                            <i className="zmdi zmdi-search"></i>
                                        </span>
                                    </form>
                                </div>
                            </div>
                            <div className="header-button-item mr-0 js-sidebar-btn">
                                <i className="zmdi zmdi-menu"></i>
                            </div>
                            <div className="setting-menu js-right-sidebar d-none d-lg-block">
                                <div className="account-dropdown__body">
                                    <div className="account-dropdown__item">
                                        <Link to="/">
                                            <i className="zmdi zmdi-account"></i>Profile</Link>
                                    </div>
                                    <div className="account-dropdown__item">
                                        <Link to="/">
                                            <i className="zmdi zmdi-settings"></i>Settings</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

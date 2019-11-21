import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

import avatar from '../../images/icon/avatar-big-01.jpg';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />

    ) : (
            <Fragment>
                <section className="au-breadcrumb m-t-75">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="au-breadcrumb-content">
                                        <div className="au-breadcrumb-left">
                                            <span className="au-breadcrumb-span">Welcome, {user && user.name}</span>
                                        </div>
                                        <button className="au-btn au-btn-icon au-btn--green">
                                            <i className="zmdi zmdi-plus"></i>add item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {profile != null ? (
                    <Fragment>
                        <div className="main-content">
                            <div className="section__content section__content--p30">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="mx-auto d-block">
                                                        <img className="rounded-circle mx-auto d-block" src={avatar} alt="User image" id="profile_image" />
                                                        <h5 className="text-sm-center mt-2 mb-1">Welcome, {user.name}</h5>
                                                        <div className="location text-sm-left">
                                                            <i className="fa fa-crosshairs"></i> Objective: {profile.objective}
                                                        </div>
                                                        <div className="location text-sm-left">
                                                            <i className="fa fa-user"></i> Sex: {profile.sex}
                                                        </div>
                                                        <div className="location text-sm-left">
                                                            <i className="fa fa-building"></i> Job: {profile.job}
                                                        </div>
                                                        <div className="location text-sm-left">
                                                            <i className="fa fa-times"></i> Weekly Frequency: {profile.weekly_freq}
                                                        </div>
                                                        <div className="location text-sm-left">
                                                            <i className="fa fa-info"></i> Observations: {profile.obs}
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="card-text text-sm-center">
                                                        <Link to="/">
                                                            <i className="fa fa-info"> </i>
                                                        </Link>
                                                        <Link to="/">
                                                            <i className="fa fa-info"> </i>
                                                        </Link>
                                                        <Link to="/">
                                                            <i className="fa fa-info"> </i>
                                                        </Link>
                                                        <Link to="/">
                                                            <i className="fa fa-info"> </i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                        <Fragment>
                            <div className="main-content">
                                <div className="section__content section__content--p30">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="mx-auto d-block"></div>
                                                        <p>Welcome to Workout Planner {user && user.name}</p>
                                                        <p>You have not yet set up a profile. Please create your Profile below.</p>
                                                        <Link to="/create-profile" className="btn btn-primary my-1">
                                                            Create Profile
                    </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </Fragment >
        )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

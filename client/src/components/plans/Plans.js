import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';


import { getPlans } from '../../actions/plan';
import { getCurrentProfile } from '../../actions/profile';
import avatar from '../../images/icon/avatar-big-01.jpg';

import PlanItem from '../plans/PlanItem';

export const Plans = ({ getPlans, plan: { plans, loading }, auth: { user }, match }) => {
    useEffect(() => {
        getPlans();
    }, [getPlans]);

    return loading && plans === null ? (
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
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="mx-auto d-block">
                                                <img className="rounded-circle mx-auto d-block" src={avatar} alt="User image" id="profile_image" />
                                                <h5 className="text-sm-center mt-2 mb-1">Welcome, {user && user.name}</h5>
                                            </div>
                                            <hr></hr>
                                        </div>
                                        <div className="card-text text-sm-center">
                                            <hr></hr>
                                        </div>
                                    </div>
                                    {plans != null ? (
                                        <Fragment>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="mx-auto d-block">
                                                        <div className="user-data m-b-30">
                                                            <h2 className="title-5 m-b-35">Plans</h2>
                                                            <div class="table-responsive m-b-40">
                                                                <table className="table table-borderless table-data3">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Current</th>
                                                                            <th>Type</th>
                                                                            <th>Date Started</th>
                                                                            <th>Date Ended</th>
                                                                            <th>Observations</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {plans.map(plan => (
                                                                        <PlanItem key={plan._id} plan={plan} />
                                                                    ))}
                                                                </table>
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
                                                                            <p>You have not yet set up a Plan. Please create your Plan below.</p>
                                                                            <Link to="/create-profile" className="btn btn-primary my-1">
                                                                                Create Plan
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
}

Plans.propTypes = {
    getPlans: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    plan: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    plan: state.plan
});
export default connect(mapStateToProps, { getPlans })(Plans);
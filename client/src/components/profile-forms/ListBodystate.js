import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileBodystateById } from '../../actions/profile';

export const ListBodystate = ({ getProfileBodystateById, history }) => {
    useEffect(() => {
        getProfileBodystateById();
    }, [getProfileBodystateById]);

    const { height, weight, age, muscle_mass, fat_mass, heart_rate, blood_pressure, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>
            <div className="main-content">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        Add <strong>Body State</strong>
                                    </div>
                                    <div className="card-body card-block">
                                        <form className="form-horizontal" onSubmit={e => {
                                            e.preventDefault();
                                            addBodystate(formData, history);
                                        }}>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className=" form-control-label">Username</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <p className="form-control-static"></p>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Height (cm)</label>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <input type="text" id="text-input" name="height" placeholder="" className="form-control"
                                                        value={height} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your height for your Workout Plan</small>
                                                </div>
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Weight (kg)</label>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <input type="text" id="text-input" name="weight" placeholder="" className="form-control"
                                                        value={weight} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your weight for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Age</label>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <input type="text" id="text-input" name="age" placeholder="" className="form-control"
                                                        value={age} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your age for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Muscle Mass (%)</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="muscle_mass" placeholder="" className="form-control"
                                                        value={muscle_mass} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your muscle mass for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Fat Mass (%)</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="fat_mass" placeholder="" className="form-control"
                                                        value={fat_mass} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your fat mass for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Heart Rate (bpm)</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="heart_rate" placeholder="" className="form-control"
                                                        value={heart_rate} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your heart rate for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className=" form-control-label">Blood Pressure</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="blood_pressure" placeholder="" className="form-control"
                                                        value={blood_pressure} onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">From date</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="date" id="text-input" name="from" placeholder="From date" className="form-control"
                                                        value={from} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">Choose the From date</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Current</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                                                        setFormData({ ...formData, current: !current });
                                                        toggleDisabled(!toDateDisabled);
                                                    }} />{' '} Current Body State</p>
                                                    <small className="form-text text-muted">Check if this is your current Body State</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">To date</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="date" id="text-input" name="to" placeholder="To date" className="form-control"
                                                        value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                                                    <small className="form-text text-muted">Choose the To date</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Description</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <textarea name="description" id="textarea-input" rows="3" placeholder="" className="form-control"
                                                        value={description} onChange={e => onChange(e)}></textarea>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <input type="submit" className="btn btn-primary btn-sm" />

                                                <button type="reset" className="btn btn-danger btn-sm">
                                                    <i className="fa fa-ban"></i> Reset
                                    </button>
                                            </div>
                                        </form>
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

ListBodystate.propTypes = {
    getProfileBodystateById: PropTypes.func.isRequired
}

export default connect(null, { getProfileBodystateById })(withRouter(ListBodystate));

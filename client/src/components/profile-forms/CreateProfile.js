import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';


const CreateProfile = ({ auth: { user }, createProfile, history }) => {
    const [formData, setFormData] = useState({
        objective: '',
        sex: '',
        job: '',
        weekly_freq: '',
        obs: ''
    });

    const {
        objective,
        sex,
        job,
        weekly_freq,
        obs
    } = formData;


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }


    return (
        <Fragment>
            <div className="main-content">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Create</strong> Profile
                                    </div>
                                    <div className="card-body card-block">
                                        <form className="form-horizontal" onSubmit={e => onSubmit(e)}>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className=" form-control-label">Username</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <p className="form-control-static">{user && user.name}</p>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Objective*</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="objective" placeholder="Objective" className="form-control"
                                                        value={objective} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State your Objective for your Workout Plan</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Sex</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <select name="sex" id="select" className="form-control" value={sex} onChange={e => onChange(e)}>
                                                        <option value="">Please select</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className=" form-control-label">Job</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="job" placeholder="Job" className="form-control"
                                                        value={job} onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Weekly Frequency</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <input type="text" id="text-input" name="weekly_freq" placeholder="Weekly Frequency" className="form-control"
                                                        value={weekly_freq} onChange={e => onChange(e)} />
                                                    <small className="form-text text-muted">State how many times per week you go to the Gym</small>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col col-md-3">
                                                    <label className="form-control-label">Observation</label>
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <textarea name="obs" id="textarea-input" rows="9" placeholder="" className="form-control"
                                                        value={obs} onChange={e => onChange(e)}></textarea>
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
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));

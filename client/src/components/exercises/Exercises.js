import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getExercises } from '../../actions/exercise';

export const Exercises = ({ getExercises, exercise: { exercises, loading }, auth: { user }, match }) => {
    useEffect(() => {
        getExercises();
    }, [getExercises]);
    return (
        <Fragment>
            <div>
                {exercises.length > 0 ? (
                    exercises.map(exercise => (
                        //<ProfileItem key={plan._id} plan={plan} />
                        <p>{exercise._id}</p>
                    ))
                ) : <h4>No exercise found... </h4>}
            </div>
        </Fragment>
    )
}

Exercises.propTypes = {
    getExercises: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    exercise: state.exercise
});

export default connect(mapStateToProps, { getExercises })(Exercises);
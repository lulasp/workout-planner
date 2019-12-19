import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile';

export const Bodystate = ({ getCurrentProfile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return (
        <Fragment>
            bodystate
        </Fragment>
    )
}

Bodystate.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
export default connect(null, { getCurrentProfile })(Bodystate);
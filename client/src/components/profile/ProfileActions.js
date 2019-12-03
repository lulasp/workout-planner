import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div>
            <Link to="/edit-profile" className="btn btn-primary">
                <i className="fa fa-user"></i> Edit Profile
            </Link>
            <Link to="/body_state" className="btn btn-success">
                <i className="fa fa-user"></i> Add Body State
            </Link>
        </div>
    )
}

export default ProfileActions

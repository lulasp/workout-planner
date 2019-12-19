import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const PlanItem = ({ plan: {
    user: { _id, name },
    is_current,
    plan_type,
    date_started,
    date_ended,
    obs
} }) => {
    return (
        <tbody>
            <td>
                {is_current === true ? (
                    <label class="au-checkbox">
                        <input type="checkbox" checked />
                        <span class="au-checkmark"></span>
                    </label>
                ) : (
                        <label class="au-checkbox">
                            <input type="checkbox" />
                            <span class="au-checkmark"></span>
                        </label>
                    )}
            </td>
            <td>{plan_type}</td>
            <td><Moment format='DD/MM/YYYY'>{date_started}</Moment></td>
            <td>{!date_ended ? ' Now' : <Moment format='DD/MM/YYYY'>{date_ended}</Moment>}</td>
            <td>{obs}</td>
        </tbody>
    )
}
//TODO remove date_ended & add edit, remove and see more

PlanItem.propTypes = {
    plan: PropTypes.object.isRequired
}

export default PlanItem

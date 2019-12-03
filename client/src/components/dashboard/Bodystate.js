import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteBodystate } from '../../actions/profile';

export const Bodystate = ({ bodystate, deleteBodystate }) => {
    const bodystates = bodystate.map(bs => (

        <tr key={bs._id}>
            <td>{bs.height}</td>
            <td>{bs.weight}</td>
            <td>{bs.age}</td>
            <td>{bs.muscle_mass}</td>
            <td>{bs.fat_mass}</td>
            <td>{bs.heart_rate}</td>
            <td className="hide-sm">{bs.blood_pressure}</td>
            <td id="fromdate" className="">
                <Moment format='YYYY/MM/DD'>{bs.from}</Moment> -{' '}
                {bs.current === true ? (
                    ' Now'
                ) : (
                        <Moment format='YYYY/MM/DD'>{bs.to}</Moment>
                    )
                }
            </td>
            <td className="desc hide-sm">{bs.description}</td>
            <td>
                <button onClick={() => deleteBodystate(bs._id)} className="item" data-toggle="tooltip"><i className="fa fa-trash-o"></i></button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <div class="col-md-12">
                <h2 className="title-5 m-b-35">Current Body State</h2>
                <div class="table-responsive m-b-40">
                    <table className="table table-borderless table-data3">
                        <thead>
                            <tr>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Age</th>
                                <th>Muscle Mass</th>
                                <th>Fat Mass</th>
                                <th>Heart Rate</th>
                                <th class="hide-sm">Blood Pressure</th>
                                <th class="hide-sm">From - To</th>
                                <th class="hide-sm">Description</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{bodystates}</tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

Bodystate.propTypes = {
    bodystate: PropTypes.array.isRequired,
    deleteBodystate: PropTypes.func.isRequired
}

export default connect(null, { deleteBodystate })(Bodystate);

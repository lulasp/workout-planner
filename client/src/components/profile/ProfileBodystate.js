import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteBodystate, getProfileBodystateById } from '../../actions/profile';


const ProfileBodystate = ({ bodystate, deleteBodystate, getProfileBodystateById }) => {
    const bodystates = bodystate.map(bs => (
        <tr key={bs._id}>
            <td>
                {bs.current === true ? (
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
            <td>
                <div class="table-data__info">
                    <h6>{bs.height}</h6>
                </div>
            </td>
            <td>{bs.weight}</td>
            <td>{bs.age}</td>
            <td>{bs.muscle_mass}</td>
            <td>{bs.fat_mass}</td>
            <td id="fromdate" className="">
                <Moment format='DD/MM/YYYY'>{bs.from}</Moment> -{' '}
                {bs.current === true ? (
                    ' Now'
                ) : (
                        <Moment format='DD/MM/YYYY'>{bs.to}</Moment>
                    )
                }
            </td>
            <td className="desc hide-sm">{bs.description}</td>
            <td>
                <button className="item" data-toggle="tooltip"><i className="fa fa-edit"></i></button>

            </td>
            <td>
                <button onClick={() => deleteBodystate(bs._id)} className="item" data-toggle="tooltip"><i className="fa fa-trash-o"></i></button>
            </td>
            <td>
                <Link to={`/bodystate/${bs._id}`} className="item" data-toggle="tooltip"><i className="fa fa-info"></i></Link>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <div className="user-data m-b-30">
                <h2 className="title-5 m-b-35">Body State Data</h2>
                <div class="table-responsive m-b-40">
                    <table className="table table-borderless table-data3">
                        <thead>
                            <tr>
                                <th>Current</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Age</th>
                                <th>Muscle Mass</th>
                                <th>Fat Mass</th>
                                <th className="hide-sm">From - To</th>
                                <th className="hide-sm">Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>{bodystates}</tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

ProfileBodystate.propTypes = {
    bodystate: PropTypes.array.isRequired,
    deleteBodystate: PropTypes.func.isRequired
}

export default connect(null, { deleteBodystate })(ProfileBodystate);

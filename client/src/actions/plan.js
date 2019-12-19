import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PLANS,
    PLAN_ERROR

} from './types';

// GET PLANS
export const getPlans = () => async dispatch => {
    try {
        const res = await axios.get('/api/plans');

        dispatch({
            type: GET_PLANS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PLAN_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
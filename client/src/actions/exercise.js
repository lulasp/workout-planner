import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_EXERCISES,
    EXERCISE_ERROR

} from './types';

// GET EXERCISES
export const getExercises = () => async dispatch => {
    try {
        const res = await axios.get('/api/exercises');

        dispatch({
            type: GET_EXERCISES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EXERCISE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
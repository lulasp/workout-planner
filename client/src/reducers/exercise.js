import { GET_EXERCISES, EXERCISE_ERROR } from "../actions/types";

const initialState = {
    profile: null,
    plan: null,
    exercises: [],
    exercise: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_EXERCISES:
            return {
                ...state,
                exercises: payload,
                loading: false
            }
        case EXERCISE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }
}
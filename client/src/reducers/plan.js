import { GET_PLANS, PLAN_ERROR } from "../actions/types";

const initialState = {
    profile: null,
    plans: [],
    plan: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PLANS:
            return {
                ...state,
                plans: payload,
                loading: false
            }
        case PLAN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }
}
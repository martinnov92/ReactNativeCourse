import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {
    const { payload } = action;

    switch (action.type) {
        case EMPLOYEE_UPDATE:
            return {
                ...state,
                [payload.prop]: payload.value
            };
        case EMPLOYEE_CREATE:
            // reset state on succesfull save
            return INITIAL_STATE;
        default:
            return state;
    };
};

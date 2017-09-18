export default (state = null, action) => {
    switch (action.type) {
        case 'SELECT_LIBRARY':
            return action.payload;
        default:
            // return state if no type matches
            return state;
    }
};
/**
 * action creator => vrací funkci
 * @param {number} id => selected library
 */
export const selectLibrary = (id) => {
    return {
        type: 'SELECT_LIBRARY',
        payload: id
    };
};
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';


export const fetchPostsAndUsers = () => async (dispatch,getState) => {
    //console.log('About to fetch posts');
    await dispatch(fetchPosts());
    //console.log('fetched posts!');

    // WILL RETURN AN ARRAY WITH UNIQUE USER ID'S
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};

// export const fetchPosts = () => {
//     return async function(dispatch, getState) {
//         const response = await jsonPlaceholder.get('/posts');

//         dispatch({ type: 'FETCH_POSTS', payload: response })
//     };
// };

// REFACTORING ABOVE DEFAULT BASIC CODE
export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
    // const response = await jsonPlaceholder.get('/users' + id)
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

//MEMOIZED VERSION APPROACH

// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id,dispatch);
// };

// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });

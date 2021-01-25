const initalState = {
    username: '',
    profile_pic: ''
};

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function updateUser(user) {
    const action = {
        type: UPDATE_USER,
        payload: user
    }
    return action
};
export function logout() {
    const action = {
        type: LOGOUT_USER
    }
    return action
}

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, action.payload)
        case LOGOUT_USER:
            return Object.assign({}, state)
        default:
            return state
    }
};
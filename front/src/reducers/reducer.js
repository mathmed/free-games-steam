const INITIAL_STATE = {
    games: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "GET_GAMES_SUCCESS":
            return {...state, games: action.payload}
        default:
            return state;
    }
}
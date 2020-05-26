const INITIAL_STATE = {
    games: null,
    language: "en"
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "GET_GAMES_SUCCESS":
            return {...state, games: action.payload}
        case "CHANGE_LANGUAGE":
            return {...state, language: action.payload}
        default:
            return state;
    }
}
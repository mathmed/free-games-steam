const INITIAL_STATE = {
    games: null,
    language: "en",
    getting: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "GETTING_GAMES":
            return {...state, getting: true}
        case "GET_GAMES_SUCCESS":
            return {...state, games: action.payload, getting: false}
        case "GET_GAMES_SUCCESS":
            return {...state, getting: false}
        case "CHANGE_LANGUAGE":
            return {...state, language: action.payload}
        default:
            return state;
    }
}
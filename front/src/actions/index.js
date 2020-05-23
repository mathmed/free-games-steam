

export const get_games_free = () => {

    return dispatch => {
        
        dispatch({type: "GETTING_GAMES"})

        fetch("http://localhost:8081/api", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(result => {
            dispatch({type: "GET_GAMES_SUCCESS", payload: result});
        })

        .catch(err => dispatch({type: "GET_GAMES_ERROR"}))
    }
}
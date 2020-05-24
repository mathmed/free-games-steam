import React from "react";
import _ from "lodash";

export default class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {uid: ""}
    }

    componentWillMount = () => {
        this.setState({uid: Object.keys(this.props.game)})
    }

    render(){

        const game = this.props.game[this.state.uid].data

        let genres = _.map(game.genres, (genre, uid) => (
            <label style = {{paddingLeft: 3, paddingRight: 3}} className = "grey-color small-font">{genre.description}</label>
        ))

        return(
            <div className = "card-game col-md-3">
                <img className = "game-img" src = {game.header_image}></img>
                
                <div className = "center margin-top">
                    <label className = "medium-font bold primary-color">{game.name + " (" + game.release_date.date.split(",")[1].replace(" ", "") + ")"}</label>
                </div>

                <div className = "center">
                   { game.platforms.windows ? <i style = {{paddingLeft: 5, paddingRight: 5}} class="primary-color fab fa-windows"></i> : null }
                   { game.platforms.linux ? <i style = {{paddingLeft: 5, paddingRight: 5}} class="primary-color fab fa-linux"></i> : null }
                   { game.platforms.mac ? <i style = {{paddingLeft: 5, paddingRight: 5}} class="primary-color fab fa-apple"></i> : null }
                </div>

                <div className = "center">
                    {genres}
                </div>

                <div className = "center">
                    <label className = "label-price bold"><s>{game.price_overview.initial_formatted}</s></label>
                </div>

                <div className = "center">
                    <label className = "bold label-free">FREE</label>
                </div>

                <div className = "center" style = {{marginTop: 10, marginBottom: 10}}>
                    <a target = "_blank" href = {"https://store.steampowered.com/app/" + this.state.uid} className = "btn btn-get">
                        GET GAME
                    </a>
                </div>

                <div className = "margin-top center" style = {{marginBottom: 10}}>
                    <label className = "small-font grey-color">Developed by {game.developers[0]}</label>
                </div>
            </div>
        )
    }

}

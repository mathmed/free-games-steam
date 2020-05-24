import React from "react";
import Game from "./Game";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {get_games_free} from "../actions"
import _ from "lodash";
import * as animation from "../assets/loading.json";
import Lottie from 'react-lottie';

const options_animation = {
  loop: true,
  autoplay: true, 
  animationData: animation,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
}

class Home extends React.Component {

    componentDidMount = () => {
        this.props.get_games_free()
    }

    render_games_list = () => {
        let games = []
        _.map(this.props.games, (game, key) => (
            games.push( <Game game = {game} /> )
        ))
        return games
    }

    render(){
        return(
            <div className = "">
                <nav className="black-background navbar navbar-expand-lg">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <i className = "white-color big-font fab fa-steam"></i>
                    <a style = {{marginLeft: 20}} className="navbar-brand white-color" href="#">Free Games Steam</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        </ul>
                    </div>
                </nav>

                <div className = "row center">
                    {this.props.games ? 
                    this.render_games_list()
                    : 
                    <Lottie 
                        options = {options_animation}
                        height={300}
                        width={300}
                    />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    games: state.reducer.games
});

export default (connect(mapStateToProps, {get_games_free})(withRouter(Home)));
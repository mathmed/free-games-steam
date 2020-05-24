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
                    <a style = {{marginLeft: 20}} className="fgs navbar-brand white-color" href="#">FREE GAMES STEAM</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <a className = "see-project grey-color" target = "_blank" href = "https://github.com/mathmed/free-games-steam">See project in Github <i className = "fab fa-github"></i></a>
                        </ul>
                    </div>
                    <div class="my-2 my-lg-0">
                        <select class="form-control mr-sm-2" aria-label="Language">
                            <option>English</option>
                            <option>Portuguese</option>
                        </select>
                    </div>
                </nav>
                <div className = "center margin-top">
                    <label className = "bold grey-color">Let me know when a game is free</label>
                </div>
                <div className = "center">
                    <div className = "col-md-4">
                        <input type = "email" placeholder = "Tell us your email" className = "text-center grey-color form-control"></input>
                    </div>
    
                </div>
                <div style = {{marginTop: 5}} className = "center">
                    <button className = "btn btn-register">
                        Register <i className = "fas fa-envelope"></i>
                    </button>
                </div>

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
                <footer className = "footer">

                    <div className = "center">
                        <label className = "white-color">Made by <a target = "_blank" href = "https://github.com/mathmed" className = "bold primary-color made">mathmed</a></label>
                    </div>
                    <div className = "center">
                        <label className = "white-color bold">2020 © Free Games Steam</label>
                    </div>
                    <div className = "center">
                        <label className = "small-font white-color">
                            This site is not affiliated with Valve, Steam, or any of their partners. All copyrights reserved to their respective owners.
                        </label>
                    </div>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    games: state.reducer.games
});

export default (connect(mapStateToProps, {get_games_free})(withRouter(Home)));
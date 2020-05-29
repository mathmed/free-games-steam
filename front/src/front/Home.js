import React from "react"
import Game from "./Game"
import { connect } from "react-redux"
import {withRouter} from "react-router-dom"
import {get_games_free, change_language} from "../actions"
import * as animation from "../assets/loading.json"
import Lottie from 'react-lottie'

import pt from "../languages/pt.json"
import en from "../languages/en.json"

const options_animation = {
  loop: true,
  autoplay: true, 
  animationData: animation,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
}

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {text: this.props.language === "pt" ? pt : en}
    }

    componentDidMount = () => {
        this.props.get_games_free()
    }

    componentWillReceiveProps = (props) => {
        this.setState({text: props.language === "pt" ? pt : en})
    }

    render_games_list = () => {
        let games = []
        this.props.games.forEach(game => (
            games.push( <Game text = {this.state.text} game = {game} uid = {game.steam_appid} /> )
        ))
        return games
    }

    render(){
        return(
            <div className = "">
                <nav className="black-background navbar navbar-expand-lg">
                    <button className="navbar-toggler white-background" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <i className = "fa fa-bars"></i>
                    </button>
                    <i className = "white-color big-font fab fa-steam"></i>
                    <a style = {{marginLeft: 10}} className="bold fgs navbar-brand white-color">FREE GAMES STEAM</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <a className = "see-project grey-color" rel="noopener noreferrer" target = "_blank" href = "https://github.com/mathmed/free-games-steam">{this.state.text.see} <i className = "fab fa-github"></i></a>
                        </ul>
                        <ul className="navbar-nav mr-auto language">
                            <select onChange = {(option) => this.props.change_language(option.target.value)} className="form-control " aria-label="Language">
                                <option defaultValue selected = {this.props.language === "en" ? true : false} value = "en">{this.state.text.english}</option>
                                <option selected = {this.props.language === "pt" ? true : false} value = "pt">{this.state.text.portuguese}</option>
                            </select>
                        </ul>
                    </div>
                </nav>
                <div className = "center margin-top">
                    <label className = "bold grey-color">{this.state.text.alert}</label>
                </div>
                <div className = "center">
                    <div className = "col-md-4">
                        <input type = "email" placeholder = {this.state.text.tellus} className = "text-center grey-color form-control"></input>
                    </div>
    
                </div>
                <div style = {{marginTop: 5}} className = "center">
                    <button className = "btn btn-register small-font">
                        {this.state.text.register} <i style ={{marginLeft: 6, fontSize: 14}} className = "fas fa-envelope"></i>
                    </button>
                </div>

                <div className = "row center">
                    {this.props.getting ? 
                        <Lottie 
                            options = {options_animation}
                            height={300}
                            width={300}
                        />
                    : 
                    
                    (
                        this.props.games ?
                        this.render_games_list()
                        : 
                        <label className = "margin-top bold medium-font grey-color">{this.state.text.gamesfound} <i class="fas fa-sad-cry"></i></label>
                    )

                    }
                </div>
                <footer className = "footer">

                    <div className = "center">
                        <label className = "white-color">{this.state.text.madeby} <a rel="noopener noreferrer" target = "_blank" href = "https://github.com/mathmed" className = "bold primary-color made">mathmed</a></label>
                    </div>
                    <div className = "center">
                        <label className = "white-color bold">2020 © Free Games Steam</label>
                    </div>
                    <div className = "center">
                        <label className = "small-font white-color text-center">{this.state.text.cop}</label>
                    </div>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    games: state.reducer.games,
    language: state.reducer.language,
    getting: state.reducer.getting
});

export default (connect(mapStateToProps, {get_games_free, change_language})(withRouter(Home)));
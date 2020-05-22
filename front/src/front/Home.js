import React from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {get_games_free} from "../api/actions"

class Home extends React.Component {

    componentDidMount = () => {
        this.props.get_games_free()
    }

    render(){
        return(
            <label>eae</label>
        )
    }

}

const mapStateToProps = state => ({
});

export default (connect(mapStateToProps, {get_games_free})(withRouter(Home)));
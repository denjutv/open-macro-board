import { connect } from "react-redux";
import Board from "../component/board";
import { buttonPressed } from "../action"

const mapStateToProps = ( state, ownProps ) =>
({
    buttons: state.buttons
});

const mapDispatchToProps = ( dispatch, ownProps ) =>
({
    onButtonPressed: index => dispatch( buttonPressed( index ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Board );
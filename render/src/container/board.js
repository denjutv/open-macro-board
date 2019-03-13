import { connect } from "react-redux";
import Board from "../component/board";

const mapStateToProps = ( state, ownProps ) =>
({
    buttons: state.buttons
});

const mapDispatchToProps = ( dispatch, ownProps ) =>
({

});

export default connect( mapStateToProps, mapDispatchToProps )( Board );
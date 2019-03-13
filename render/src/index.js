/**
 * Entry point for the electron frontend.
 */
import frontend from "./frontend";
import style from "../../assets/css/main.css";

// inits the frontend
frontend.init( document.getElementById( "content" ) );

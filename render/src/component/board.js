import React from "react";

function Board( props )
{
    return props.buttons && props.buttons.map( (button, index) =>
        <Button key={"button_" + index} button={button} index={index} onButtonPressed={props.onButtonPressed} />
    );
}

function Button( props )
{
    return <div className="button" style={ props.button } onClick={props.onButtonPressed.bind( null, props.index )}></div>
}

export default Board;
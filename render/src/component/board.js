import React from "react";

function Board( props )
{
    return props.buttons && props.buttons.map( button => <Button button={button} /> );
}

function Button( props )
{
    return <div className="button" style={ props.button }></div>
}

export default Board;
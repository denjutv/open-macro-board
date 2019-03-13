const defaultButtonPositions = [];
// width
const pixelPerMmWidth = 7.4074074074;
const buttonSizeInPixelWidth = 20 * pixelPerMmWidth;
const buttonGapInPixelWidth = 2 * pixelPerMmWidth;
const buttonSizeIncGapInPixelWidth = buttonSizeInPixelWidth + buttonGapInPixelWidth;

// height
const pixelPerMmHeight = 7.5;
const buttonSizeInPixelHeight = 20 * pixelPerMmHeight;
const buttonGapInPixelHeight = 2 * pixelPerMmHeight;
const buttonSizeIncGapInPixelHeight = buttonSizeInPixelHeight + buttonGapInPixelHeight;

for( let row=0; row < 3; ++row )
{
    for( let column=0; column < 5; ++column )
    {
        defaultButtonPositions.push( { left: column * buttonSizeIncGapInPixelWidth, top: row * buttonSizeIncGapInPixelHeight, width: buttonSizeInPixelWidth, height: buttonSizeInPixelHeight } );
    }
}

module.exports =
{
    display:
    {
        width: 800,
        height: 480,
        fullscreen: true
    },
    buttons: defaultButtonPositions
};
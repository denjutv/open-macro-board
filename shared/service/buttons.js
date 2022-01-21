class ButtonsService {
  constructor() {
    this.settingsService = null;
  }

  init( settingsService ) {
    this.settingsService = settingsService;
  }

  getButtonPositions() {
    const { rows, columns } = this.settingsService.get('board');
    const {
      buttonSizeIncGapInPixelWidth,
      buttonSizeIncGapInPixelHeight,
      buttonSizeInPixelWidth,
      buttonSizeInPixelHeight
    } = this.getButtonSizeInclusiveGapInPixel();
    const defaultButtonSettings = [];

    for( var row=0; row < rows; ++row ) {
      for( var column=0; column < columns; ++column ) {
        defaultButtonSettings.push({
          left: column * buttonSizeIncGapInPixelWidth,
          top: row * buttonSizeIncGapInPixelHeight,
          width: buttonSizeInPixelWidth,
          height: buttonSizeInPixelHeight,
        });
      }
    }

    return defaultButtonSettings;
  }

  getButtonSizeInclusiveGapInPixel() {
    const { width: buttonWidth, height: buttonHeight, gapWidth, gapHeight } = this.settingsService.get('button');
    const pixelPerMmWidth = this.settingsService.get('pixelPerMmWidth');
    const pixelPerMmHeight = this.settingsService.get('pixelPerMmHeight');

    const buttonSizeInPixelWidth = buttonWidth * pixelPerMmWidth;
    const buttonGapInPixelWidth = gapWidth * pixelPerMmWidth;
    const buttonSizeIncGapInPixelWidth = buttonSizeInPixelWidth + buttonGapInPixelWidth;
    
    const buttonSizeInPixelHeight = buttonHeight * pixelPerMmHeight;
    const buttonGapInPixelHeight = gapHeight * pixelPerMmHeight;
    const buttonSizeIncGapInPixelHeight = buttonSizeInPixelHeight + buttonGapInPixelHeight;

    return {
      buttonSizeIncGapInPixelWidth,
      buttonSizeIncGapInPixelHeight,
      buttonSizeInPixelWidth,
      buttonSizeInPixelHeight,
    }
  }
}

module.exports = ButtonsService;
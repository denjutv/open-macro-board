const BaseButtonsService = require('#shared/service/buttons');

class ButtonsService extends BaseButtonsService {
  constructor() {
    super();
  }

  init( dbService, settingsService ) {
    super.init(settingsService);
    this.buttonsCollection = dbService.createCollection('buttons', { indices: ['id'] });
    this.insertDefaultButtonsOnEmptyButtons();
  }

  insertDefaultButtonsOnEmptyButtons() {
    if( this.isButtonsCollectionEmpty() ) {
      this.insertDefaultButtons();
    }
  }

  isButtonsCollectionEmpty() {
    return this.buttonsCollection.find().length == 0;
  }

  insertDefaultButtons() {
    console.log('create default buttons');

    const buttons = this.getButtonPositions();
    buttons.forEach(button => {
      this.buttonsCollection.insert(button);
    });
  }
}

module.exports = ButtonsService;
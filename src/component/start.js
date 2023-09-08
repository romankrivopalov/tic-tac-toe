class Start {
  constructor(setting) {
    this._setting = setting;
    this._startContainer = document.querySelector(this._setting.startContainerSelector);
    this._gameContainer = document.querySelector(this._setting.gameContainerSelector);
    this._btnTwoPlayers = document.querySelector(this._setting.btnTwoPlayersSelector);
    this._btnVsRobot = document.querySelector(this._setting.btnVsRobotSelector);
  }

  _toggleClasses = () => {
    this._startContainer.classList.add(this._setting.startContainerClassHide);

    this._gameContainer.classList.add(this._setting.gameContainerClassShow);
  }

  setEventListeners = () => {
    this._btnTwoPlayers.addEventListener('click', () => {
      console.log('players');

      this._toggleClasses();
    })

    this._btnVsRobot.addEventListener('click', () => {
      console.log('robots');
    })
  }
}

export default Start

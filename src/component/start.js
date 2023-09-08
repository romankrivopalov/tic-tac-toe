class Start {
  constructor(setting, handleStartGameWithPlayer, handleStartGameWithRobot) {
    this._setting = setting;
    this._startContainer = document.querySelector(this._setting.startContainerSelector);
    this._gameContainer = document.querySelector(this._setting.gameContainerSelector);
    this._btnTwoPlayers = document.querySelector(this._setting.btnTwoPlayersSelector);
    this._btnVsRobot = document.querySelector(this._setting.btnVsRobotSelector);
    this._handleStartGameWithPlayer = handleStartGameWithPlayer;
    this._handleStartGameWithRobot = handleStartGameWithRobot;
  }

  _toggleClasses = () => {
    this._startContainer.classList.add(this._setting.startContainerClassHide);

    this._gameContainer.classList.add(this._setting.gameContainerClassShow);
  }

  setEventListeners = () => {
    this._btnTwoPlayers.addEventListener('click', () => {
      this._toggleClasses();

      this._handleStartGameWithPlayer();
    })

    this._btnVsRobot.addEventListener('click', () => {
      this._handleStartGameWithRobot();
    })
  }
}

export default Start

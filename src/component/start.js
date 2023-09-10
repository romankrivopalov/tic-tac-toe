class Start {
  constructor(setting,
    handleResetRound,
    handleResetGame
  ) {
    this._setting = setting;
    this._startContainer = document.querySelector(this._setting.startContainerSelector);
    this._gameContainer = document.querySelector(this._setting.gameContainerSelector);
    this._btnTwoPlayers = document.querySelector(this._setting.btnTwoPlayersSelector);
    this._btnVsRobot = document.querySelector(this._setting.btnVsRobotSelector);
    this._btnContinue = document.querySelector(this._setting.btnContinueSelector);
    this._handleResetRound = handleResetRound;
    this._handleResetGame = handleResetGame;
  }

  _openGame = () => {
    this._startContainer.classList.add(this._setting.startContainerClassHide);
    this._gameContainer.classList.add(this._setting.gameContainerClassShow);
  }

  closeGame = () => {
    this._checkSavedGame();

    this._startContainer.classList.remove(this._setting.startContainerClassHide);
    this._gameContainer.classList.remove(this._setting.gameContainerClassShow);
  }

  // проверка данных сохраненной игры в localStorage
  _checkSavedGame = () => {
    if (localStorage.getItem('data') || localStorage.getItem('rounds')) {
      this._btnContinue.classList.remove('button_hide');

      return true
    } else {
      this._btnContinue.classList.add('button_hide');

      return false
    }
  }

  setEventListeners = () => {
    this._btnTwoPlayers.addEventListener('click', () => {
      this._handleResetRound();
      this._handleResetGame();

      this._openGame();
    })

    this._btnVsRobot.addEventListener('click', () => {

    })

    this._btnContinue.addEventListener('click', () => {
      this._openGame();
    })
  }
}

export default Start

class Start {
  constructor(setting,
    handleStartGameWithPlayer,
    handleStartGameWithRobot,
    handleResetRound,
    handleResetGame
  ) {
    this._setting = setting;
    this._startContainer = document.querySelector(this._setting.startContainerSelector);
    this._gameContainer = document.querySelector(this._setting.gameContainerSelector);
    this._btnTwoPlayers = document.querySelector(this._setting.btnTwoPlayersSelector);
    this._btnVsRobot = document.querySelector(this._setting.btnVsRobotSelector);
    this._btnContinue = document.querySelector(this._setting.btnContinueSelector);
    this._handleStartGameWithPlayer = handleStartGameWithPlayer;
    this._handleStartGameWithRobot = handleStartGameWithRobot;
    this._handleResetRound = handleResetRound;
    this._handleResetGame = handleResetGame;
  }

  _toggleClasses = () => {
    this._startContainer.classList.add(this._setting.startContainerClassHide);

    this._gameContainer.classList.add(this._setting.gameContainerClassShow);
  }

  // проверка данных сохраненной игры в localStorage
  _checkSavedGame = () => {
    if (localStorage.getItem('data') || localStorage.getItem('rounds')) {
      this._btnContinue.classList.remove('button_hide');

      return true
    }

    this._btnContinue.classList.add('button_hide');
  }

  setEventListeners = () => {
    const savedGame = this._checkSavedGame();

    this._btnTwoPlayers.addEventListener('click', () => {
      if (savedGame) {
        this._handleResetRound();
        this._handleResetGame();
      }

      this._toggleClasses();

      this._handleStartGameWithPlayer();
    })

    this._btnVsRobot.addEventListener('click', () => {
      this._handleStartGameWithRobot();
    })

    this._btnContinue.addEventListener('click', () => {
      if (savedGame) {
        this._toggleClasses();

        this._handleStartGameWithPlayer();
      }
    })
  }
}

export default Start

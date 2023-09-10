class Pause {
  constructor(setting) {
    this._setting = setting;
    this._pause = document.querySelector(this._setting.pauseSelector);
    this._pauseInfo = this._pause.querySelector(this._setting.pauseInfoSelector);
    this._pauseBtnHome = this._pause.querySelector(this._setting.btnHomeSelector);
    this._pauseResetHome = this._pause.querySelector(this._setting.btnResetSelector);
    console.log()
  }

  _breakPause = () => {
    this._pause.classList.remove('pause_active');
  }

  startPause = ({ message }) => {
    this._pause.classList.add('pause_active');

    this._pauseInfo.textContent = message;
  }

  setEventListeners = (handleRestartRound, handleResetGame, handleCloseGame) => {
    this._handleRestartRound = handleRestartRound;
    this._handleResetGame = handleResetGame;
    this._handleCloseGame = handleCloseGame;

    this._pauseBtnHome.addEventListener('click', () => {
      // сбрасывает игру
      this._handleRestartRound();
      this._handleResetGame();
      // открывает главное меню
      this._handleCloseGame();
      // выключает паузу
      this._breakPause();
    })

    this._pauseResetHome.addEventListener('click', () => {
      // сбрасывает игру
      this._handleRestartRound();
      this._handleResetGame();
      // выключает паузу
      this._breakPause();
    })
  }
}

export default Pause

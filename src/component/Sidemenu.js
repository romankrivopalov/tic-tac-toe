class Sidemenu {
  constructor(setting, handleResetRound, handleResetGame) {
    this._setting = setting;
    this._sidemenu = document.querySelector(this._setting.sidemenuSelector);
    this._sidemenuContainer = document.querySelector(this._setting.sidemenuContainerSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._btnRestart = document.querySelector(this._setting.btnRestartSelector);
    this._handleResetRound = handleResetRound;
    this._handleResetGame = handleResetGame;
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners = () => {
    this._sidemenu.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._setting.sidemenuToggleClass)) {
        this.close();
      }
    });

    this._btnRestart.addEventListener('click', () => {
      this._handleResetRound();
      this._handleResetGame();

      this.close();
    })
  }

  open = (burger) => {
    this._burger = burger
    this._burger.classList.add(this._setting.burgerActiveClass);
    this._sidemenu.classList.add(this._setting.sidemenuToggleClass);
    this._sidemenuContainer.classList.add(this._setting.sidemenuContainerToggleClass);

    document.addEventListener('keydown', this._handleEscClose)
  }

  close = () => {
    this._burger.classList.remove(this._setting.burgerActiveClass);
    this._sidemenu.classList.remove(this._setting.sidemenuToggleClass);
    this._sidemenuContainer.classList.remove(this._setting.sidemenuContainerToggleClass);

    document.removeEventListener('keydown', this._handleEscClose);
  }
}

export default Sidemenu

class Start {
  constructor(setting) {
    this._setting = setting;
    this._btnTwoPlayers = document.querySelector(this._setting.btnTwoPlayersSelector);
    this._btnVsRobot = document.querySelector(this._setting.btnVsRobotSelector);
  }

  setEventListeners = () => {
    this._btnTwoPlayers.addEventListener('click', () => {
      console.log('players');
    })

    this._btnVsRobot.addEventListener('click', () => {
      console.log('robots');
    })
  }
}

export default Start

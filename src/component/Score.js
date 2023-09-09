class Score {
  constructor(setting) {
    this._setting = setting;
    this._roundsElements = document.querySelectorAll(this._setting.roundSelector);
    this._activeRound = 0;
    this._rounds = [null, null, null, null]; // для проверки победителя без дом дерева
  }

  nextRound = (winnerLastRound) => {
    if (winnerLastRound === 1) {
      this._roundsElements[this._activeRound].classList.add('score__round_type_zero');
      this._rounds[this._activeRound] = 1;
    }

    if (winnerLastRound === 2) {
      this._roundsElements[this._activeRound].classList.add('score__round_type_cross');
      this._rounds[this._activeRound] = 2;
    }

    // проверка есть ли победитель
    this._activeRound++

    this._roundsElements[this._activeRound].classList.add('score__round_type_active');
  }
}

export default Score

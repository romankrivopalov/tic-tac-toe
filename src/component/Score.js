class Score {
  constructor(setting) {
    this._setting = setting;
    this._roundsElements = document.querySelectorAll(this._setting.roundSelector);
    this._activeRound = 0;
    this._rounds = [null, null, null, null]; // для проверки победителя без дом дерева
    this._winner = null;
  }

  _checkWinner = () => {
    let playerZero = 0;
    let playerCross = 0;

    this._rounds.forEach(round => {
      if (round === 1) playerZero++;
      if (round === 2) playerCross++;
    })

    if (playerZero > 2) this._winner = 1;
    if (playerCross > 2) this._winner = 2;

    return false;
  }

  setDraw = () => {
    this._roundsElements[this._activeRound].classList.add('score__round_type_draw');
    this._rounds[this._activeRound] = 3;

    this._checkWinner();

    if (this._winner) {
      console.log(`Winner ${this._winner}`)
    } else {
      this._activeRound++

      this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
    }
  }

  nextRound = (winnerLastRound) => {
    // установка отметки о победителе в счётчик раундов
    if (winnerLastRound === 1) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundZeroClass);
      this._rounds[this._activeRound] = 1;
    }

    if (winnerLastRound === 2) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundCrossClass);
      this._rounds[this._activeRound] = 2;
    }

    // если метод вызыван, значит закончился раунд, и нужно проверить есть ли победитель
    this._checkWinner();

    if (this._winner) {
      console.log(`Winner ${this._winner}`)
    } else {
      this._activeRound++

      this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
    }
  }
}

export default Score

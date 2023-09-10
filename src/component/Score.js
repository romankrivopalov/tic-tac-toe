class Score {
  constructor(setting) {
    this._setting = setting;
    this._roundsElements = document.querySelectorAll(this._setting.roundSelector);
    this._activeRound = 0;
    this.rounds = [null, null, null, null]; // для проверки победителя без дом дерева
    this._winner = null;
    this._textInfo = document.querySelector(this._setting.textInfoSelector);
  }

  _setWinner = () => {
    this._textInfo.textContent = `winner ${this._winner === 1 ? 'player # 1' : 'player # 2'}`
  }

  _checkWinner = () => {
    let playerZero = 0;
    let playerCross = 0;

    this.rounds.forEach(round => {
      if (round === 1) playerZero++;
      if (round === 2) playerCross++;
    })

    localStorage.setItem('rounds', JSON.stringify(this.rounds));

    if (playerZero > 2) this._winner = 1;
    if (playerCross > 2) this._winner = 2;

    return false;
  }

  resetGame = () => {
    this._activeRound = 0;
    this.rounds = this.rounds.map(round => null);
    this._winner = null;

    this._roundsElements.forEach(round => {
      round.classList.remove('score__round_type_draw', this._setting.roundActiveClass, this._setting.roundZeroClass, this._setting.roundCrossClass);
    });

    localStorage.setItem('rounds', JSON.stringify(this.rounds));

    this._roundsElements[0].classList.add(this._setting.roundActiveClass);
  }

  setDraw = () => {
    this._roundsElements[this._activeRound].classList.add('score__round_type_draw');
    this.rounds[this._activeRound] = 3;

    this._checkWinner();

    if (this._winner) {
      this._setWinner()
    } else {
      this._textInfo.textContent = `Draw!`

      this._activeRound++

      this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
    }
  }

  nextRound = (winnerLastRound) => {
    // установка отметки о победителе в счётчик раундов
    if (winnerLastRound === 1) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundZeroClass);
      this.rounds[this._activeRound] = 1;
    }

    if (winnerLastRound === 2) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundCrossClass);
      this.rounds[this._activeRound] = 2;
    }

    // если метод вызыван, значит закончился раунд, и нужно проверить есть ли победитель
    this._checkWinner();

    if (this._winner) {
      this._setWinner()
    } else {
      this._activeRound++

      this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
    }
  }

  // проверка сохраненных данных в localStorage
  setInitialRounds = () => {
    if (localStorage.getItem('rounds')) {
      this.rounds = JSON.parse(localStorage.getItem('rounds'));

      this.rounds.forEach((round, i) => {
        if (round) {
          if (round === 1) this._roundsElements[i].classList.add(this._setting.roundZeroClass);
          if (round === 2) this._roundsElements[i].classList.add(this._setting.roundCrossClass);
          if (round === 3) this._roundsElements[i].classList.add('score__round_type_draw');
        };

        // если round не записан и активный раунд 0, устанавливаем его активным раундом
        if (!round && this._activeRound === 0) {
          this._activeRound = this._roundsElements[i];
          this._activeRound.classList.add(this._setting.roundActiveClass);
        };
      })
    }
  }
}

export default Score

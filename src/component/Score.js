class Score {
  constructor(setting, handleStartPause) {
    this._setting = setting;
    this._roundsElements = document.querySelectorAll(this._setting.roundSelector);
    this._activeRound = 0;
    this._winner = null;
    this._textInfo = document.querySelector(this._setting.textInfoSelector);
    this.rounds = [null, null, null, null]; // для проверки победителя без дом дерева
    this._handleStartPause = handleStartPause;
    this._count = 2;
  }

  _setWinner = () => {
    if (this._winner) {
      this._handleStartPause({
        message: `${this._winner === 1 ? 'player # 1' : 'player # 2'} won!`,
      });
    }

    this.resetGame();
    this._handleRestartRound();
  }

  _checkWinner = () => {
    // устана результата в localStorage, тк если
    // вызван метод, значит была ничья или победа одного из игроков
    localStorage.setItem('rounds', JSON.stringify(this.rounds));

    let playerZero = null;
    let playerCross = null;

    this.rounds.forEach(round => {
      if (round === 1) playerZero++;
      if (round === 2) playerCross++;
      if (round === 3) this._count--;
    })

    // последний раунд и три ничьи
    if (this._activeRound < 3 && this._count > 0) {
      if (playerZero > this._count) this._winner = 1;
      if (playerCross > this._count) this._winner = 2;
    }

    // последний раунд и три ничьи
    if (this._activeRound > 1 && this._count < 2) {
      if (playerZero > 0) this._winner = 1;
      if (playerCross > 0) this._winner = 2;
    }

    return false;
  }

  resetGame = () => {
    this._activeRound = 0;
    this.rounds = this.rounds.map(round => null);
    this._winner = null;
    this._count = 2;

    this._roundsElements.forEach(round => {
      round.classList.remove('score__round_type_draw', this._setting.roundActiveClass, this._setting.roundZeroClass, this._setting.roundCrossClass);
    });

    localStorage.removeItem('rounds');

    this._roundsElements[0].classList.add(this._setting.roundActiveClass);
  }

  setDraw = () => {
    if (this._activeRound > 2) {
      this._handleStartPause({
        message: 'draw! try again!',
      });
    } else {
      this._roundsElements[this._activeRound].classList.add('score__round_type_draw');
      this.rounds[this._activeRound] = 3;

      this._checkWinner();

      if (this._winner) {
        this._setWinner();

        return this._winner;
      } else {
        this._activeRound++

        this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
      }
    }
  }

  nextRound = (winnerLastRound) => {
    this._round++
    // установка отметки о победителе в счётчик раундов
    if (winnerLastRound === 1) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundZeroClass);
      this.rounds[this._activeRound] = 1;
    }

    if (winnerLastRound === 2) {
      this._roundsElements[this._activeRound].classList.add(this._setting.roundCrossClass);
      this.rounds[this._activeRound] = 2;
    }

    // если метод вызван, значит закончился раунд, и нужно проверить есть ли победитель
    this._checkWinner();

    if (this._winner) {
      this._setWinner();

      return this._winner;
    } else {
      this._activeRound++

      this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
    }
  }

  // проверка сохраненных данных в localStorage
  setInitialRounds = (HandleRestartRound) => {
    this._handleRestartRound = HandleRestartRound;

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
          this._activeRound = i;
          this._roundsElements[this._activeRound].classList.add(this._setting.roundActiveClass);
        };
      })
    }
  }
}

export default Score

class Gameplay {
  constructor(setting, handleSetNextRound, handleSetDraw) {
    this._setting = setting;
    this._allItems = document.querySelectorAll(this._setting.itemSelector);
    this._allSteps = [null, null, null, null, null, null, null, null, null];
    this._activePlayer = 1;
    this._count = 0; // для отслеживания ничьи
    this._winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this._handleSetNextRound = handleSetNextRound;
    this._handleSetDraw = handleSetDraw;
    this._lastWinner = 0;
  }

  _resetRound = () => {
    this._count = 0;

    this._allSteps = this._allSteps.map(step => null);

    this._allItems.forEach(step => {
      step.classList.remove(
        this._setting.itemZeroClass,
        this._setting.itemCrossClass,
        this._setting.itemTypeIconClass
      )
    });
  }

  // переключить активного игрока
  _toggleActivePlayer = () => {
    this._activePlayer = this._activePlayer === 1 ? 2 : 1;
  }

  _checkWinner = () => {
    for (let i = 0; i < this._winCombo.length; i++) {
      if (
        this._allSteps[this._winCombo[i][0]] === 1 &&
        this._allSteps[this._winCombo[i][1]] === 1 &&
        this._allSteps[this._winCombo[i][2]] === 1
      ) {
        return true
      }

      if (
        this._allSteps[this._winCombo[i][0]] === 2 &&
        this._allSteps[this._winCombo[i][1]] === 2 &&
        this._allSteps[this._winCombo[i][2]] === 2
      ) {
        return true
      }
    }
  }

  // установить фигуру
  _setItem = (attr) => {
    // добавить в массив data-step и игрока
    this._allSteps[attr - 1] = this._activePlayer;

    this._activePlayer === 2
      ? this._allItems[attr - 1].classList.add(this._setting.itemCrossClass, this._setting.itemTypeIconClass)
      : this._allItems[attr - 1].classList.add(this._setting.itemZeroClass, this._setting.itemTypeIconClass)

    if (this._count >= 8) {
      if (!this._checkWinner()) {
        // если девятый последний и победителя нет, устанавливаем ничью
        this._handleSetDraw();

        this._count = 0;
        this._resetRound();
      } else {
        this._lastWinner = this._activePlayer;
        this._handleSetNextRound(this._activePlayer);

        this._count = 0;

        this._resetRound();
      }
    } else {
      if (!this._checkWinner()) {
        this._count++
        // переключаем активного игрока
        this._toggleActivePlayer();
      } else {
        console.log(11111)
        this._lastWinner = this._activePlayer;
        this._handleSetNextRound(this._activePlayer);

        this._count = 0;

        this._resetRound();
      }
    }
  }

  _setEventListeners = () => {
    this._allItems.forEach(step => step.addEventListener('click', () => {

      this._setItem(+step.getAttribute(this._setting.itemAttr));
    }))
  }

  startGameWithPlayer = () => {
    this._setEventListeners();

    this._resetRound;
  }

  startGameWithRobot = () => {

  }
}

export default Gameplay;

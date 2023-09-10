class Gameplay {
  constructor(setting, handleSetNextRound, handleSetDraw) {
    this._setting = setting;
    this._allItems = document.querySelectorAll(this._setting.itemSelector);
    this._iconZero = document.querySelector('.icon[data-type="zero"]');
    this._iconCross = document.querySelector('.icon[data-type="cross"]');
    this._titlePlayerZero = document.querySelector(this._setting.playerTitleZeroSelector);
    this._titlePlayerCross = document.querySelector(this._setting.playerTitleCrossSelector);
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

  _toggleActiveField = () => {
    // переключение активной иконки
    if (this._activePlayer === 1) {
      this._iconCross.classList.add('icon_type_inactive');
      this._iconZero.classList.remove('icon_type_inactive');
      this._titlePlayerCross.classList.add(this._setting.playerTitleInactiveClass);
      this._titlePlayerZero.classList.remove(this._setting.playerTitleInactiveClass);
    }

    if (this._activePlayer === 2) {
      this._iconCross.classList.remove('icon_type_inactive');
      this._iconZero.classList.add('icon_type_inactive');
      this._titlePlayerCross.classList.remove(this._setting.playerTitleInactiveClass);
      this._titlePlayerZero.classList.add(this._setting.playerTitleInactiveClass);
    }
  }

  // переключить активного игрока
  _toggleActivePlayer = (winner) => {
    // если аргумента нет, просто изменяем значение
    if (!winner) {
      this._activePlayer = this._activePlayer === 1 ? 2 : 1;
    } else {
      // если аргумент есть, обращаемся к последнему победителю
      // и устанавливаем противоположное значение
      this._activePlayer = this._lastWinner === 1 ? 2 : 1;
    }
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

  _setNextRound = () => {
    // записываем победителя
    this._lastWinner = this._activePlayer;
    // передаем его в метод компонента Score и переключаем активного игрока
    this._toggleActivePlayer(this._activePlayer);
    this._handleSetNextRound(this._lastWinner);

    this._count = 0;
    this._resetRound();
  }

  // установить фигуру
  _setItem = (attr) => {
    // добавить в массив data-step и игрока
    this._allSteps[attr - 1] = this._activePlayer;

    this._activePlayer === 2
      ? this._allItems[attr - 1].classList.add(this._setting.itemCrossClass, this._setting.itemTypeIconClass)
      : this._allItems[attr - 1].classList.add(this._setting.itemZeroClass, this._setting.itemTypeIconClass)

    // проверка на последний ход
    if (this._count >= 8) {
      if (!this._checkWinner()) {
        // если ход последний и победителя нет, устанавливаем ничью
        this._handleSetDraw();

        this._count = 0;
        this._resetRound();
      } else {
        this._setNextRound();
      }
    } else {
      if (!this._checkWinner()) {
        // если ход не последний, увеличиваем счётчик
        this._count++
        // переключаем активного игрока
        this._toggleActivePlayer();
        this._toggleActiveField();
      } else {
        this._setNextRound();
      }
    }
  }

  _setEventListeners = () => {
    this._allItems.forEach(step => step.addEventListener('click', () => {
      this._setItem(+step.getAttribute(this._setting.itemAttr));
    }))
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

    this._toggleActiveField();
  }

  restartRound = () => {
    this._activePlayer = 1;

    this._resetRound();
  }

  startGameWithPlayer = () => {
    this._activePlayer = 1;

    this._setEventListeners();

    this._resetRound();
  }

  startGameWithRobot = () => {

  }
}

export default Gameplay;

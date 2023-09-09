class Gameplay {
  constructor(setting, handleSetNextRound) {
    this._setting = setting;
    this._allSteps = document.querySelectorAll(this._setting.gameStepSelector);
    this._zeroSteps = document.querySelectorAll('game__step[data-player="1"]');
    this._allItems = document.querySelectorAll(this._setting.gameItemSelector);
    this._activePlayer = 1;
    this._playerTitleZero = document.querySelector('#player-zero');
    this._playerMobileTitleZero = document.querySelector('#mobile-player-zero');
    this._playerTitleCross = document.querySelector('#player-cross');
    this._playerMobileTitleCross = document.querySelector('#mobile-player-cross');
    this._count = 0;
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
    this._lastWinner = 0;
  }

  _resetAllFields = () => {
    this._allSteps.forEach(step => {
      if (+step.getAttribute('data-player') === 1) {
        step.classList.remove('game__step_type_inactive');
        step.classList.add(this._setting.stepZeroClass);
      }

      if (+step.getAttribute('data-player') === 2) {
        step.classList.remove('game__step_type_inactive');
        step.classList.add(this._setting.stepCrossClass);
      }
    });

    this._allItems.forEach(item => {
      item.classList.remove('icon_type_zero', 'icon_type_cross', 'icon_size_m')
    });

    this._activePlayer = this._lastWinner === 2 ? 1 : 2;

    this.startGameWithPlayer();
  }

  _toggleMobilePlayer = (step) => {
    if (step.classList.contains('game__step_type_cross')) {
      step.classList.remove('game__step_type_cross');
      step.classList.add('game__step_type_zero');
    } else if (step.classList.contains('game__step_type_zero')) {
      step.classList.remove('game__step_type_zero');
      step.classList.add('game__step_type_cross');
    }
  }

  // переключить активного игрока
  _toggleActivePlayer = () => {
    this._activePlayer = this._activePlayer === 1 ? 2 : 1;

    if (this._activePlayer === 1) {
      // если активный игрок 1, перебираем все шаги
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 2) {
          step.classList.add('game__step_type_inactive');

          // переключить лейбл активного игрока
          this._playerTitleZero.classList.add('game__field-title_type_active');
          this._playerMobileTitleZero.classList.add('game__mobile-title_type_active');
        } else {
          step.classList.remove('game__step_type_inactive');

          this._playerTitleCross.classList.remove('game__field-title_type_active');
          this._playerMobileTitleCross.classList.remove('game__mobile-title_type_active');
        }

        if (step.hasAttribute('data-mobile')) {
          this._toggleMobilePlayer(step);
        }
      })
    } else {
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 1) {
          step.classList.add('game__step_type_inactive');

          this._playerTitleZero.classList.remove('game__field-title_type_active');
          this._playerMobileTitleZero.classList.remove('game__mobile-title_type_active');
        } else {
          step.classList.remove('game__step_type_inactive');

          this._playerTitleCross.classList.add('game__field-title_type_active');
          this._playerMobileTitleCross.classList.add('game__mobile-title_type_active');
        }

        if (step.hasAttribute('data-mobile')) {
          this._toggleMobilePlayer(step);
        }
      })
    }
  }

  _checkWinner = () => {
    for (let i = 0; i < this._winCombo.length; i++) {
      if (
        this._allItems[this._winCombo[i][0]].classList.contains('icon_type_zero') &&
        this._allItems[this._winCombo[i][1]].classList.contains('icon_type_zero') &&
        this._allItems[this._winCombo[i][2]].classList.contains('icon_type_zero')
      ) {
        return true
      }

      if (
        this._allItems[this._winCombo[i][0]].classList.contains('icon_type_cross') &&
        this._allItems[this._winCombo[i][1]].classList.contains('icon_type_cross') &&
        this._allItems[this._winCombo[i][2]].classList.contains('icon_type_cross')
      ) {
        return true
      }
    }
  }

  // установить фигуру
  _setItem = (attr) => {
    this._allItems.forEach(item => {
      if (+item.getAttribute('data-item') === +attr) {
        this._activePlayer === 2
          ? item.classList.add('icon_type_cross', 'icon_size_m')
          : item.classList.add('icon_type_zero', 'icon_size_m')
      }
    });

    if (!this._checkWinner()) {
      // переключаем активного игрока
      this._toggleActivePlayer();
    } else {
      this._lastWinner = this._activePlayer;
      this._handleSetNextRound(this._activePlayer);

      // устанавливаем три, чтобы не обрабатывались слушатели
      // this._activePlayer = 3;

      this._resetAllFields();
    }
  }

  // отключить вариант у всех полей
  _disabledStep = (attr) => {
    this._allSteps.forEach(item => {
      if (+item.getAttribute(this._setting.stepData) === +attr) {
        item.classList.remove(this._setting.stepZeroClass, this._setting.stepCrossClass);
      }
    })
  }

  _setEventListeners = () => {
    this._allSteps.forEach(step => step.addEventListener('click', () => {
      // при клике, проверяем атрибут поля соответсвует номеру активного игрока или нет,
      console.log(this._activePlayer)
      if (+step.getAttribute('data-player') === this._activePlayer) {
        if (step.classList.contains(this._setting.stepZeroClass) || step.classList.contains(this._setting.stepCrossClass)) {
          const attr = step.getAttribute(this._setting.stepData);

          this._disabledStep(attr);
          this._setItem(attr);
        }
      }

      // проверка содержит ли элемент атрибут для мобильного поля и активный игрок не 3
      if (step.hasAttribute('data-mobile') && this._activePlayer !== 3) {
        const attr = step.getAttribute(this._setting.stepData);

        this._disabledStep(attr);
        this._setItem(attr);
      }
    }))
  }

  startGameWithPlayer = () => {
    this._setEventListeners();

    if (this._activePlayer === 1) {
      // отключить неактивного игрока
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 2) {
          step.classList.add('game__step_type_inactive');
        }
      })
    } else {
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 1) {
          step.classList.add('game__step_type_inactive');
        }
      })
    }
  }

  startGameWithRobot = () => {

  }
}

export default Gameplay;

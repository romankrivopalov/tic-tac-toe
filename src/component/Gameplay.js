class Gameplay {
  constructor(setting) {
    this._setting = setting;
    this._allSteps = document.querySelectorAll(this._setting.gameStepSelector);
    this._zeroSteps = document.querySelectorAll('game__step[data-player="1"]');
    this._allItems = document.querySelectorAll(this._setting.gameItemSelector);
    this._activePlayer = 1;
    this._playerMobileTitleZero = document.querySelector('#mobile-player-zero');
    this._playerMobileTitleCross = document.querySelector('#mobile-player-cross');
  }

  // установить фигуру
  _setItem = (attr) => {
    this._allItems.forEach(item => {
      if (+item.getAttribute('data-item') === +attr) {
        this._activePlayer === 1
          ? item.querySelector('.icon').classList.add('icon_type_cross', 'icon_size_m')
          : item.querySelector('.icon').classList.add('icon_type_zero', 'icon_size_m')
      }
    });
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

          // переключить лейбл активного игрока на мобильной версии
          this._playerMobileTitleZero.classList.add('game__mobile-title_type_active');
        } else {
          step.classList.remove('game__step_type_inactive');

          // переключить лейбл активного игрока на мобильной версии
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

          // переключить лейбл активного игрока на мобильной версии
          this._playerMobileTitleZero.classList.remove('game__mobile-title_type_active');
        } else {
          step.classList.remove('game__step_type_inactive');

          // переключить лейбл активного игрока на мобильной версии
          this._playerMobileTitleCross.classList.add('game__mobile-title_type_active');
        }

        if (step.hasAttribute('data-mobile')) {
          this._toggleMobilePlayer(step);
        }
      })
    }
  }

  // отключить вариант у всех полей
  _disabledStep = (attr) => {
    this._allSteps.forEach(item => {
      if (item.getAttribute(this._setting.stepData) === attr) {
        item.classList.remove(this._setting.stepZeroClass, this._setting.stepCrossClass, 'game__step_type_inactive')
        item.textContent = '';
      }

      // переключаем активного игрока
      this._toggleActivePlayer();
    })
  }

  _setEventListeners = () => {
    this._allSteps.forEach(step => step.addEventListener('click', () => {
      // при клике, проверяем атрибут поля соответсвует номеру активного игрока или нет,
      // и содержит ли элемент атрибут для мобильного поля
      if (+step.getAttribute('data-player') === this._activePlayer || step.hasAttribute('data-mobile')) {
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
    }
  }

  startGameWithRobot = () => {

  }
}

export default Gameplay;

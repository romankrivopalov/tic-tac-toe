class Gameplay {
  constructor(setting) {
    this._setting = setting;
    this._allSteps = document.querySelectorAll(this._setting.gameStepSelector);
    this._allItems = document.querySelectorAll(this._setting.gameItemSelector);
    this._activePlayer = 1;
    console.log(this._allItems)
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

  _toggleActivePlayer = () => {
    this._activePlayer = this._activePlayer === 1 ? 2 : 1;

    if (this._activePlayer === 1) {
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 2) {
          step.classList.add('game__step_type_inactive');
        } else {
          step.classList.remove('game__step_type_inactive');
        }
      })
    } else {
      this._allSteps.forEach(step => {
        if (+step.getAttribute('data-player') === 1) {
          step.classList.add('game__step_type_inactive');
        } else {
          step.classList.remove('game__step_type_inactive');
        }
      })
    }
  }

  // отключить вариант для всех полей игроков
  _disabledStep = (attr) => {
    this._allSteps.forEach(item => {
      if (item.getAttribute(this._setting.stepData) === attr) {
        item.classList.remove(this._setting.stepZeroClass, this._setting.stepCrossClass, 'game__step_type_inactive')
        item.textContent = '';
      }

      this._toggleActivePlayer();
    })
  }

  _setEventListeners = () => {
    this._allSteps.forEach(step => step.addEventListener('click', () => {
      if (+step.getAttribute('data-player') === this._activePlayer) {
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

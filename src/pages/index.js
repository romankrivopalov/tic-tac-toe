import './index.css';

import * as all from '../utils/constants.js';

import Start from '../component/Start.js';
import Gameplay from '../component/Gameplay.js';
import Score from '../component/Score';
import Sidemenu from '../component/Sidemenu';

const burger = document.querySelector(all.burgerSelector);

const score = new Score(all.scoreSetting);
const gameplay = new Gameplay(
  all.gameplaySetting,
  score.nextRound,
  score.setDraw,
  score.setInitialRounds,
);
const sidemenu = new Sidemenu(
  all.sidemenuSetting,
  gameplay.restartRound,
  score.resetGame
);
const start = new Start(
  all.startSetting,
  gameplay.startGameWithPlayer,
  gameplay.startGameWithRobot,
  gameplay.restartRound,
  score.resetGame
);

start.setEventListeners();
sidemenu.setEventListeners();

burger.addEventListener('click', () => {
  if (burger.classList.contains(all.burgerActiveClass)) {
    sidemenu.close();
  } else {
    sidemenu.open(burger);
  }
})

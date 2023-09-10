import './index.css';

import * as all from '../utils/constants.js';

import Start from '../component/Start.js';
import Gameplay from '../component/Gameplay.js';
import Score from '../component/Score';
import Sidemenu from '../component/Sidemenu';
import Pause from '../component/Pause';

const burger = document.querySelector(all.burgerSelector);

const pause = new Pause(
  all.pauseSetting,
)
const score = new Score(
  all.scoreSetting,
  pause.startPause
);
const gameplay = new Gameplay(
  all.gameplaySetting,
  score.nextRound,
  score.setDraw,
  score.setInitialRounds,
);
const start = new Start(
  all.startSetting,
  gameplay.restartRound,
  score.resetGame,
);
const sidemenu = new Sidemenu(
  all.sidemenuSetting,
  gameplay.restartRound,
  score.resetGame,
  start.closeGame,
);

start.setEventListeners();
sidemenu.setEventListeners();
gameplay.startGameWithPlayer();
pause.setEventListeners(
  gameplay.restartRound,
  score.resetGame,
  start.closeGame,
);

burger.addEventListener('click', () => {
  if (burger.classList.contains(all.burgerActiveClass)) {
    sidemenu.close();
  } else {
    sidemenu.open(burger);
  }
});

start.checkSavedGame;

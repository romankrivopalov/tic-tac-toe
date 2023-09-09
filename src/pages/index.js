import './index.css';

import { startSetting } from '../utils/constants.js';
import { gameplaySetting } from '../utils/constants.js';
import { scoreSetting } from '../utils/constants.js';

import Start from '../component/start.js';
import Gameplay from '../component/Gameplay.js';
import Score from '../component/Score';

const score = new Score(scoreSetting);
const gameplay = new Gameplay(gameplaySetting, score.nextRound);
const start = new Start(
  startSetting,
  gameplay.startGameWithPlayer,
  gameplay.startGameWithRobot,
);

start.setEventListeners();

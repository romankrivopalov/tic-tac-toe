import './index.css';

import { startSetting } from '../utils/constants.js';
import { gameplaySetting } from '../utils/constants.js';

import Start from '../component/start.js';
import Gameplay from '../component/Gameplay.js';

const gameplay = new Gameplay(gameplaySetting);
const start = new Start(
  startSetting,
  gameplay.startGameWithPlayer,
  gameplay.startGameWithRobot,
);

start.setEventListeners();

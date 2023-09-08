import './index.css';

import Start from '../component/Start.js';
import Gameplay from '../component/Gameplay.js';

const startSetting = {
  startContainerSelector: '.start',
  startContainerClassHide: 'start_hide',
  gameContainerSelector: '.game',
  gameContainerClassShow: 'game_show',
  btnTwoPlayersSelector: '.button[data-type="btn-two-players"]',
  btnVsRobotSelector: '.button[data-type="btn-vs-robot"]',
}

const start = new Start(startSetting);

start.setEventListeners();

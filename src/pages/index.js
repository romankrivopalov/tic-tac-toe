import './index.css';

import Start from '../component/start';

const startSetting = {
  btnTwoPlayersSelector: '.button[data-type="btn-two-players"]',
  btnVsRobotSelector: '.button[data-type="btn-vs-robot"]',
}

const start = new Start(startSetting);

start.setEventListeners();

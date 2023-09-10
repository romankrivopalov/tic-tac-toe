export const
  burgerSelector = '.burger',
  burgerActiveClass = 'burger_open';

export const startSetting = {
  startContainerSelector: '.start',
  startContainerClassHide: 'start_hide',
  gameContainerSelector: '.game',
  gameContainerClassShow: 'game_show',
  btnTwoPlayersSelector: '.button[data-type="btn-two-players"]',
  btnVsRobotSelector: '.button[data-type="btn-vs-robot"]',
  btnContinueSelector: '.button[data-type="btn-continue"]',
}

export const gameplaySetting = {
  itemSelector: '.icon[data-item]',
  itemAttr: 'data-item',
  iconZeroSelector: '.icon[data-type="zero"]',
  iconCrossSelector: '.icon[data-type="cross"]',
  itemZeroClass: 'icon_type_zero',
  itemCrossClass: 'icon_type_cross',
  itemInactiveClass: 'icon_type_inactive',
  itemTypeIconClass: 'icon_size_m',
  playerTitleZeroSelector: '.game__title[data-type="zero"]',
  playerTitleCrossSelector: '.game__title[data-type="cross"]',
  playerTitleInactiveClass: 'game__title_inactive',
  allSteps: [null, null, null, null, null, null, null, null, null],
  winCombo: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
}

export const scoreSetting = {
  roundSelector: '.score__round',
  roundActiveClass: 'score__round_type_active',
  roundZeroClass: 'score__round_type_zero',
  roundCrossClass: 'score__round_type_cross',
  textInfoSelector: '.game__info',
}

export const sidemenuSetting = {
  burgerActiveClass: 'burger_open',
  sidemenuSelector: '.sidemenu',
  sidemenuToggleClass: 'sidemenu_active',
  sidemenuContainerSelector: '.sidemenu__container',
  sidemenuContainerToggleClass: 'sidemenu__container_show',
  btnHometSelector: '.sidemenu__item[data-type="home"]',
  btnRestartSelector: '.sidemenu__item[data-type="restart"]',
}

export const pauseSetting = {
  pauseSelector: '.pause',
  pauseActiveClass: 'pause_active',
  pauseInfoSelector: '.pause__info',
  btnHomeSelector: '.button[data-type="home"]',
  btnResetSelector: '.button[data-type="restart"]',
}

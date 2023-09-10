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
  itemZeroClass: 'icon_type_zero',
  itemCrossClass: 'icon_type_cross',
  itemTypeIconClass: 'icon_size_m',
  playerTitleZeroSelector: '.game__title[data-type="zero"]',
  playerTitleCrossSelector: '.game__title[data-type="cross"]',
  playerTitleInactiveClass: 'game__title_inactive',
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

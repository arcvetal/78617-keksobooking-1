'use strict';

var noticeForm = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');
var addressField = noticeForm.querySelector('#address');
var MAIN_PIN_CENTER = 31;

// Положение
addressField.value = mainPin.offsetLeft + MAIN_PIN_CENTER + ', ' + Number(mainPin.offsetTop + MAIN_PIN_CENTER);


var fieldsetArr = noticeForm.querySelectorAll('fieldset');

for (var i = 0; i < fieldsetArr.length; i++) {
  fieldsetArr[i].disabled = true;
}


mainPin.addEventListener('mouseup', window.activatePage);

'use strict';
var OFFER_COUNT = 8;
var TITLES_ARR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPE_ARR = ['flat', 'house', 'bungalo'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor((Math.random() * (i + 1)));
    var currentElement = array[i];
    array[i] = array[j];
    array[j] = currentElement;
  }
  return array;
};

for (var i = 0; i < OFFER_COUNT; i++) {
  var locX = getRandomInt(300, 900);
  var locY = getRandomInt(100, 500);

  var newOffer = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': TITLES_ARR[i],
      'address': locX + ',' + locY,
      'price': getRandomInt(1000, 1000000),
      'type': HOUSE_TYPE_ARR[getRandomInt(0, HOUSE_TYPE_ARR.length - 1)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': CHECKIN_ARR[getRandomInt(0, CHECKIN_ARR.length - 1)],
      'checkout': CHECKOUT_ARR[getRandomInt(0, CHECKOUT_ARR.length - 1)],
      'features': getRandomArray(FEATURES_ARR),
      'description': '',
      'photos': shuffleArray(PHOTOS_ARR)
    },

    'location': {
      'x': locX,
      'y': locY
    }
  };
}

'use strict';
var OFFER_COUNT = 8;
var TITLES_ARR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPE_ARR = ['flat', 'house', 'bungalo'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

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

var offers = [];

for (var i = 0; i < OFFER_COUNT; i++) {
  var locX = getRandomInt(300, 900);
  var locY = getRandomInt(150, 500);

  offers[i] = {
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

// console.log(offers[0].offer.features);


//  РАБОТА С КАРТОЙ !!!!!!!

document.querySelector('.map').classList.remove('map--faded');

// СОЗДАНИЕ ПИНОВ НА КАРТЕ !!!!!!!

var pinsCollection = document.createDocumentFragment();

for (i = 0; i < OFFER_COUNT; i++) {

  var newPin = document.createElement('button');

  newPin.style.left = offers[i].location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = offers[i].location.y - PIN_HEIGHT + 'px';
  newPin.className = 'map__pin';
  newPin.insertAdjacentHTML('beforeend', '<img src=' + offers[i].author.avatar + ' width="40" height="40" draggable="false">');
  pinsCollection.appendChild(newPin);
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(pinsCollection);


// ЗАПОЛНИМ ШАБЛОН!!!!!!!!!!!

var translateTypeFlat = function () {
  if (offers[0].offer.type === 'flat') {
    return 'Квартира';
  } else if (offers[0].offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (offers[0].offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Не определено';
  }
};


var offerArticle = document.querySelector('template').content.cloneNode(true);

// Список фич
var featuresList = offerArticle.querySelector('.popup__features');

// Удалим все элементы
while (featuresList.firstChild) {
  featuresList.removeChild(featuresList.firstChild);
}

var createFeatures = function (arrayFeatures) {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < arrayFeatures.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'feature ' + 'feature--' + arrayFeatures[i];
    fragment.appendChild(newFeature);
  }
  featuresList.appendChild(fragment);
};

createFeatures(offers[0].offer.features);

offerArticle.querySelector('h3').textContent = offers[0].offer.title;

offerArticle.querySelector('p small').textContent = offers[0].offer.address;

offerArticle.querySelector('.popup__price').textContent = offers[0].offer.price + ' Руб./ночь';

offerArticle.querySelector('h4').textContent = translateTypeFlat();

offerArticle.querySelector('.rooms-guests').textContent = offers[0].offer.rooms + ' комнаты для ' + offers[0].offer.guests + ' гостей';

offerArticle.querySelector('.checkin-checkout').textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;

offerArticle.querySelector('.feature-descr').textContent = offers[0].offer.description;

var offerImages = offerArticle.querySelector('.popup__pictures');

// Удалим все элементы
while (offerImages.firstChild) {
  offerImages.removeChild(offerImages.firstChild);
}

var createGallery = function (imgArray) {
  var imageFragment = document.createDocumentFragment();

  for (i = 0; i < imgArray.length; i++) {
    var newPhoto = document.createElement('li');
    newPhoto.innerHTML = '<img src="' + imgArray[i] + '" width="100" height="100">';
    imageFragment.appendChild(newPhoto);
  }
  offerImages.appendChild(imageFragment);
};

createGallery(PHOTOS_ARR);

var popupAvatar = offerArticle.querySelector('.popup__avatar');
popupAvatar.setAttribute('src', offers[0].author.avatar);

var filterContainer = document.querySelector('.map__filters-container');
document.querySelector('.map').insertBefore(offerArticle, filterContainer);

// console.dir(popupAvatar);

'use strict';

var offers = [];
var OFFER_COUNT = 8;
var TITLES_ARR = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var HOUSE_TYPE_ARR = [
  'flat',
  'house',
  'bungalo'
];
var CHECKIN_ARR = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT_ARR = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES_ARR = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS_ARR = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
// var MAIN_PIN_CENTER = 31;
// var MAIN_PIN_BOTTOM = 84;

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

var createOffer = function () {
  for (var i = 0; i < OFFER_COUNT; i++) {
    var locX = getRandomInt(300, 900);
    var locY = getRandomInt(150, 500);

    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        'id': 'pinPicture' + [i]
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
  return offers;
};

createOffer();
//
// console.log(offers);


// РАБОТА С КАРТОЙ !!!!!!!

// СОЗДАНИЕ ПИНОВ НА КАРТЕ !!!!!!!

var createPins = function (array) {
  var pinsCollection = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var newPin = document.createElement('button');
    newPin.style.left = array[i].location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = array[i].location.y - PIN_HEIGHT + 'px';
    newPin.className = 'map__pin';
    newPin.insertAdjacentHTML('beforeend', '<img src=' + array[i].author.avatar + ' width="40" height="40" draggable="false">');
    newPin.firstChild.alt = 'pinPicture' + [i];
    pinsCollection.appendChild(newPin);
  }
  return pinsCollection;
};


var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(createPins(offers));


// ЗАПОЛНИМ ШАБЛОН!!!!!!!!!!!

var translateTypeFlat = function (obj) {
  if (obj.offer.type === 'flat') {
    return 'Квартира';
  } else if (offers[0].offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (offers[0].offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Не определено';
  }
};


var offerArticle = document.querySelector('template').content.querySelector('article').cloneNode(true);
// console.dir(offerArticle);

// Список фич

var createFeatures = function (arrayFeatures) {
  var fragment = document.createDocumentFragment();
  var featuresList = offerArticle.querySelector('.popup__features');

  // Удалим все элементы
  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }

  // Наполняем список новыми фичами
  for (var i = 0; i < arrayFeatures.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'feature ' + 'feature--' + arrayFeatures[i];
    fragment.appendChild(newFeature);
  }
  featuresList.appendChild(fragment);
};


var createGallery = function (gallery, imgArray) {
  var imageFragment = document.createDocumentFragment();

  for (var i = 0; i < imgArray.length; i++) {
    var newPhoto = document.createElement('li');
    newPhoto.innerHTML = '<img src="' + imgArray[i] + '" width="100" height="100">';
    imageFragment.appendChild(newPhoto);
  }
  gallery.appendChild(imageFragment);
};


var renderArticle = function (template, offerObj) {
  var offerImages = template.querySelector('.popup__pictures');
  var popupAvatar = template.querySelector('.popup__avatar');

  createFeatures(offerObj.offer.features);

  template.querySelector('h3').textContent = offerObj.offer.title;
  template.querySelector('p small').textContent = offerObj.offer.address;
  template.querySelector('.popup__price').textContent = offerObj.offer.price + ' Руб./ночь';
  template.querySelector('h4').textContent = translateTypeFlat(offerObj);
  template.querySelector('.rooms-guests').textContent = offerObj.offer.rooms + ' комнаты для ' + offerObj.offer.guests + ' гостей';
  template.querySelector('.checkin-checkout').textContent = 'Заезд после ' + offerObj.offer.checkin + ', выезд до ' + offerObj.offer.checkout;
  template.querySelector('.feature-descr').textContent = offerObj.offer.description;

  // Отрисовка галереи..................
  // Удалим все элементы
  while (offerImages.firstChild) {
    offerImages.removeChild(offerImages.firstChild);
  }

  createGallery(offerImages, PHOTOS_ARR);
  popupAvatar.setAttribute('src', offerObj.author.avatar);

  return template;

};

var renderAdvert = function (template, offerObj) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderArticle(template, offerObj));
  return fragment;
};

var openCard = function (template, offerObj) {
  var filterContainer = document.querySelector('.map__filters-container');
  document.querySelector('.map').insertBefore(renderAdvert(template, offerObj), filterContainer);
};

openCard(offerArticle, offers[0]);

// window.openCard = openCard(offerArticle, offers[0]);
// var onPinMainMouseup = function () {
//   var noticeForm = document.querySelector('.notice__form');
//   var fieldsetArr = noticeForm.querySelectorAll('fieldset');
//   var addressField = noticeForm.querySelector('#address');
//   var pin = document.querySelector('.map__pin--main');
//   var MAIN_PIN_CENTER = 31;
//
//   document.querySelector('.map').classList.remove('map--faded');
//
//   noticeForm.classList.remove('notice__form--disabled');
//
//   for (var i = 0; i < fieldsetArr.length; i++) {
//     fieldsetArr[i].disabled = false;
//   }
//
//   addressField.value = pin.offsetLeft + MAIN_PIN_CENTER + ', ' + Number(pin.offsetTop + MAIN_PIN_CENTER);
//
// };

window.activatePage = function () {
  var noticeForm = document.querySelector('.notice__form');
  var fieldsetArr = noticeForm.querySelectorAll('fieldset');
  var addressField = noticeForm.querySelector('#address');
  var pin = document.querySelector('.map__pin--main');
  var MAIN_PIN_CENTER = 31;
  var MAIN_PIN_BOTTOM = 84;

  document.querySelector('.map').classList.remove('map--faded');

  noticeForm.classList.remove('notice__form--disabled');

  for (var i = 0; i < fieldsetArr.length; i++) {
    fieldsetArr[i].disabled = false;
  }

  addressField.value = pin.offsetLeft + MAIN_PIN_CENTER + ', ' + Number(pin.offsetTop + MAIN_PIN_BOTTOM);

};

var onPinClick = function (evt) {
  for (var i = 0; i < offers.length; i++) {
    if (evt.target.alt === offers[i].author.id) {
      openCard(offerArticle, offers[i]);
    }
  }
};

mapPins.addEventListener('click', onPinClick);

// MODULE 4 task 2....
var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');

var validatePrice = function () {
  var typeValue = typeInput.value;
  switch (typeValue) {
    case 'flat':
      priceInput.setAttribute('min', 1000);
      break;
    case 'bungalo':
      priceInput.setAttribute('min', 0);
      break;
    case 'house':
      priceInput.setAttribute('min', 5000);
      break;
    case 'palace':
      priceInput.setAttribute('min', 10000);
      break;
  }
};

typeInput.addEventListener('change', validatePrice);


var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');

var validateTimeIn = function () {
  var timeInIndex = timeInInput.selectedIndex;
  timeOutInput.selectedIndex = timeInIndex;
};

var validateTimeOut = function () {
  var timeoutIndex = timeOutInput.selectedIndex;
  timeInInput.selectedIndex = timeoutIndex;
};

timeInInput.addEventListener('change', validateTimeIn);
timeOutInput.addEventListener('change', validateTimeOut);


var roomInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');

var makeDefault = function () {
  if (roomInput.value === '1') {
    capacityInput.children[2].selected = true;
    capacityInput.children[0].disabled = true;
    capacityInput.children[1].disabled = true;
    capacityInput.children[3].disabled = true;
  }
};

makeDefault();

var validateRoomsAndGuests = function () {
  var roomNumber = roomInput.value;
  for (var i = 0; i < capacityInput.children.length; i++) {
    capacityInput.children[i].disabled = false;
  }
  switch (roomNumber) {
    case '1':
      capacityInput.children[2].selected = true;

      capacityInput.children[0].disabled = true;
      capacityInput.children[1].disabled = true;
      capacityInput.children[3].disabled = true;
      break;
    case '2':
      capacityInput.children[1].selected = true;

      capacityInput.children[0].disabled = true;
      capacityInput.children[3].disabled = true;
      break;
    case '3':
      capacityInput.children[0].selected = true;

      capacityInput.children[3].disabled = true;
      break;
    case '100':
      capacityInput.children[3].selected = true;

      capacityInput.children[0].disabled = true;
      capacityInput.children[1].disabled = true;
      capacityInput.children[2].disabled = true;
      break;
  }
};

roomInput.addEventListener('change', validateRoomsAndGuests);

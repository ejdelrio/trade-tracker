'use strict';

//Start of the render function operations
//render gloabal variables
var $display = $('#display');
//redundant variable below
// var form = document.getElementById('form');
var $button = $('#toggler');
var $inputTwitOne = $('#twitOne');
var $inputTwitTwo = $('#twitTwo');
var $favouritesOne = $('#favourites_one');
var $reTweetsOne = $('#retweets_one');
var $warScoreOne = $('#warscore_one');
var $favouritesTwo = $('#favourites_two');
var $reTweetsTwo = $('#retweets_two');
var $warScoreTwo = $('#warscore_two');
var $favouritesImg = $('#favourites_img');
var $reTweetsImg = $('#retweets_img');
var $warScoreImg = $('#warscore_img');
var $favLegend = $('#favourites_legend');
var $reTweetsLegend = $('#retweets_legend');
var $warLegend = $('#warscore_legend');
var $displayBox = $('#display_block');
var $tweetCal = $('#tweet_cal');
var $calTitle = $('#cal_title');
var $calendar = $('#calendar');

//Encapsulating the procedural rendering functions
function renderResults() {
  setTimeout(renderFavourites, 500);
  setTimeout(renderFavouritesWinner, 1500);
  setTimeout(renderReTweets, 2000);
  setTimeout(renderReTweetsWinner, 3000);
  setTimeout(renderWarScore, 3500);
  setTimeout(renderWareScoreWinner, 4500);
  setTimeout(renderGrandWinner, 5500);
}

function expandAndCenter(){
  form.removeChild(button);
  display.setAttribute('class','expand');
  inputTwitOne.setAttribute('class', 'center');
  inputTwitTwo.setAttribute('class', 'center');
  displayBox.setAttribute('class', 'show');
  inputTwitOne.disable = true;
  inputTwitOne.disable = true;
}

//Displays the data, all functions below part of the render results func ^ above ^
function renderFavourites() {
  favouritesOne.innerHTML = twitOneObj.favourites; //replace this with favourites method
  favouritesTwo.innerHTML = twitTwoObj.favourites;
  favouritesImg.setAttribute('class', 'icon');
  favouritesImg.setAttribute('src', 'TFAssets/favourites.png');
  favLegend.setAttribute('class', 'legend');
  favLegend.innerHTML = 'favourites';
}

//Show winner
function renderFavouritesWinner() {
  if (twitOneObj.favourites > twitTwoObj.favourites) {
    favouritesOne.setAttribute('class', 'winner');
    favouritesTwo.setAttribute('class', 'loser');
  } else {
    favouritesOne.setAttribute('class', 'loser');
    favouritesTwo.setAttribute('class', 'winner');
  }
}

function renderReTweets() {
  reTweetsOne.innerHTML = twitOneObj.reTweets;
  reTweetsTwo.innerHTML = twitTwoObj.reTweets;
  reTweetsImg.setAttribute('class', 'icon');
  reTweetsImg.setAttribute('src', 'TFAssets/retweet.png');
  reTweetsLegend.setAttribute('class', 'legend');
  reTweetsLegend.innerHTML = 'retweet';
}
function renderReTweetsWinner(){
  if (twitOneObj.reTweets > twitTwoObj.reTweets) {
    reTweetsOne.setAttribute('class', 'winner');
    reTweetsTwo.setAttribute('class', 'loser');
  } else {
    reTweetsOne.setAttribute('class', 'loser');
    reTweetsTwo.setAttribute('class', 'winner');
  }
}

function renderWarScore() {
  warScoreOne.innerHTML = twitOneObj.warScore;
  warScoreTwo.innerHTML = twitTwoObj.warScore;
  warScoreImg.setAttribute('class', 'icon');
  warScoreImg.setAttribute('src', 'TFAssets/warscore.png');
  warLegend.setAttribute('class', 'legend');
  warLegend.innerHTML = 'warscore';
}

function renderWareScoreWinner(){
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    warScoreOne.setAttribute('class', 'winner');
    warScoreTwo.setAttribute('class', 'loser');
  } else {
    warScoreOne.setAttribute('class', 'loser');
    warScoreTwo.setAttribute('class', 'winner');
  }
}

function renderGrandWinner() {
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    inputTwitOne.setAttribute('class', 'grand_winner');
    inputTwitTwo.setAttribute('class', 'grand_loser');
  } else {
    inputTwitOne.setAttribute('class', 'grand_loser');
    inputTwitTwo.setAttribute('class', 'grand_winner');
  }
}

var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var evalKonami = [];

document.addEventListener('keydown', checkKonami);

function checkKonami () {
  var keyPushed = event.keyCode;
  console.log('key is pushed');
  console.log(keyPushed);
  evalKonami.push(event.keyCode);
  console.log('key was put in evalKonami array');
  var lastTen = evalKonami.length - 10;
  console.log(lastTen);
  if (lastTen > 0) {
    evalKonami = evalKonami.splice(lastTen, 10);
  }
  if (evalKonami.toString() === konamiCode.toString()) {
    var form = document.getElementById('form');
    console.log('does it match');
    var sprite = document.createElement('img');
    sprite.src = './imgs/ChunLiThrow_1.gif';
    sprite.id = 'chunli';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/knockout.gif';
    sprite.id = 'knockout';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/facekick.gif';
    sprite.id = 'facekick';
    form.appendChild(sprite);
    sprite = document.createElement('img');
    sprite.src = './imgs/carpunch.gif';
    sprite.id = 'carpunch';
    form.appendChild(sprite);
    sprite = document.getElementById('facekick');
  }
}

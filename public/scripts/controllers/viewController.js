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
var $form = $('#form');
var $button = $('#button');

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
  $button.hide();
  $display.attr('class','expand');
  $inputTwitOne.attr('class', 'center');
  $inputTwitTwo.attr('class', 'center');
  $displayBox.attr('class', 'show');
  $inputTwitOne.disable = true;
  $inputTwitOne.disable = true;
}

//Displays the data, all functions below part of the render results func ^ above ^
function renderFavourites() {
  $favouritesOne.html(twitOneObj.favourites); //replace this with favourites method
  $favouritesTwo.html(twitTwoObj.favourites);
  $favouritesImg.attr('class', 'icon');
  $favouritesImg.attr('src', 'TFAssets/favourites.png');
  $favLegend.attr('class', 'legend');
  $favLegend.html('favourites');
}

//Show winner
function renderFavouritesWinner() {
  if (twitOneObj.favourites > twitTwoObj.favourites) {
    $favouritesOne.attr('class', 'winner');
    $favouritesTwo.attr('class', 'loser');
  } else {
    $favouritesOne.attr('class', 'loser');
    $favouritesTwo.attr('class', 'winner');
  }
}

function renderReTweets() {
  $reTweetsOne.html(twitOneObj.reTweets);
  $reTweetsTwo.html(twitTwoObj.reTweets);
  $reTweetsImg.attr('class', 'icon');
  $reTweetsImg.attr('src', 'TFAssets/retweet.png');
  $reTweetsLegend.attr('class', 'legend');
  $reTweetsLegend.html('retweet');
}
function renderReTweetsWinner(){
  if (twitOneObj.reTweets > twitTwoObj.reTweets) {
    $reTweetsOne.attr('class', 'winner');
    $reTweetsTwo.attr('class', 'loser');
  } else {
    $reTweetsOne.attr('class', 'loser');
    $reTweetsTwo.attr('class', 'winner');
  }
}

function renderWarScore() {
  $warScoreOne.html(twitOneObj.warScore);
  $warScoreTwo.html(twitTwoObj.warScore);
  $warScoreImg.attr('class', 'icon');
  $warScoreImg.attr('src', 'TFAssets/warscore.png');
  $warLegend.attr('class', 'legend');
  $warLegend.html('warscore');
}

function renderWareScoreWinner(){
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    $warScoreOne.attr('class', 'winner');
    $warScoreTwo.attr('class', 'loser');
  } else {
    $warScoreOne.attr('class', 'loser');
    $warScoreTwo.attr('class', 'winner');
  }
}

function renderGrandWinner() {
  if (twitOneObj.warScore > twitTwoObj.warScore) {
    $inputTwitOne.attr('class', 'grand_winner');
    $inputTwitTwo.attr('class', 'grand_loser');
  } else {
    $inputTwitOne.attr('class', 'grand_loser');
    $inputTwitTwo.attr('class', 'grand_winner');
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

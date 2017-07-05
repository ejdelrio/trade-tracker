'use strict';

//global variables

var form = document.getElementById('form'); //changed the name of this variable to match mine
var twitOne = '';
var twitTwo = '';
var twitOneObj = twitOneObj || {};
var twitTwoObj = twitTwoObj || {};
var favouritePoints = 1;
var reTweetPoints = 1.5;
var activeTweets = [];
var Twit = Twit || {};

//user click
function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitTwo = event.target.twitTwo.value.toUpperCase();
  assignTwits(twitOne, twitTwo);
  fetchTweets();
  results();
  // form.reset();
}

form.addEventListener('submit', submitSearch);

Twit.prototype.calcTweetScores = function(){
  this.tweets.map(tweet => {
    tweet.faveScore = tweet.favorite_count * favouritePoints;
    tweet.rTScore = tweet.retweet_count * reTweetPoints;
    tweet.tweetWarScore = tweet.faveScore + tweet.rTScore;
  });

  console.log('calcTweetScores');
};

Twit.prototype.convertDates = function(){
  this.tweets.map(tweet => {
    let twitDate = tweet.created_at.split(' ');
    tweet.datetimesent = new Date(`${twitDate[0]} ${twitDate[1]} ${twitDate[2]} ${twitDate[5]} ${twitDate[3]} GMT${twitDate[4]}`)
    console.log(tweet.datetimesent);
  });
};

Twit.prototype.setTimestamp = function(){
  this.tweets.map(tweet => {
    tweet.timestamp = tweet.datetimesent.getTime();
  });
};

Twit.prototype.sortDates = function(){
  this.tweets.sort(function(a,b){
    return new Date(a.datetimesent) - new Date(b.datetimesent);
  });
};

Twit.prototype.tweetsByMonth = function(date){
  let clickedDate = date.toString().split(' ');
  for (var i=0; i<this.tweets.length; i){
    let tweetDate = this.tweets[i].datetimesent.toString().split(' ');
    if (clickedDate[1] === tweetDate[1] && clickedDate[3] === tweetDate[3]){
      console.log('Do not remove');
      i++;
    } else {
      console.log(i);
      this.tweets.splice(i, 1);
    }
  }
};

Twit.prototype.totalsForWar = function(){
  var totFavourites = 0;
  var totReTweets = 0;
  var totWarScore = 0;
  this.tweets.map(tweet => {
    totFavourites = totFavourites + tweet.favorite_count;
    totReTweets = totReTweets + tweet.retweet_count;
    totWarScore = totWarScore + tweet.tweetWarScore;
  })
  this.favourites = totFavourites;
  this.reTweets = totReTweets;
  this.warScore = totWarScore;
};

function Twit(screen_name){
  this.screen_name = screen_name.toUpperCase();
  this.tweets = [];
}

function fetchTweets() {
  $.get(`/search/tweets.json?q=from%3A%40${twitOne}%20%40${twitTwo}&src=typd`)
  .then(data => {
    twitOneObj.tweets = data.statuses;
  })
  .then($.get(`/search/tweets.json?q=from%3A%40${twitTwo}%20%40${twitOne}&src=typd`).then(data => twitTwoObj.tweets = data.statuses));
}

function assignTwits(twitOne, twitTwo){
  twitOneObj = new Twit(twitOne);
  twitTwoObj = new Twit(twitTwo);
}

function setActiveTweets(){
  activeTweets = twitOneObj.tweets.concat(twitTwoObj.tweets);
}

function sortActiveTweets(){
  activeTweets.sort(function(a,b){
    return new Date(a.datetimesent) - new Date(b.datetimesent);
  });
}

function results(){
  tweetCal.removeChild(calendar);
  tweetCal.removeChild(calTitle);
  twitOneObj.calcTweetScores();
  twitTwoObj.calcTweetScores();
  twitOneObj.totalsForWar();
  twitTwoObj.totalsForWar();
  setActiveTweets();
  sortActiveTweets();
  expandAndCenter();
  renderResults();
}

//Start of the render function operations
//render gloabal variables
var display = document.getElementById('display');
//redundant variable below
// var form = document.getElementById('form');
var button = document.getElementById('toggler');
var inputTwitOne = document.getElementById('twitOne');
var inputTwitTwo = document.getElementById('twitTwo');
var favouritesOne = document.getElementById('favourites_one');
var reTweetsOne = document.getElementById('retweets_one');
var warScoreOne = document.getElementById('warscore_one');
var favouritesTwo = document.getElementById('favourites_two');
var reTweetsTwo = document.getElementById('retweets_two');
var warScoreTwo = document.getElementById('warscore_two');
var favouritesImg = document.getElementById('favourites_img');
var reTweetsImg = document.getElementById('retweets_img');
var warScoreImg = document.getElementById('warscore_img');
var favLegend = document.getElementById('favourites_legend');
var reTweetsLegend = document.getElementById('retweets_legend');
var warLegend = document.getElementById('warscore_legend');
var displayBox = document.getElementById('display_block');
var tweetCal = document.getElementById('tweet_cal');
var calTitle = document.getElementById('cal_title');
var calendar = document.getElementById('calendar');

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

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

  twitOne = event.target.twitOne.value.toUpperCase().replace('@','');
  twitTwo = event.target.twitTwo.value.toUpperCase().replace('@','');
  assignTwits(twitOne, twitTwo);
  fetchTweets(results);
  // form.reset();
}

form.addEventListener('submit', submitSearch);

Twit.prototype.calcTweetScores = function(){
  this.tweets.map(tweet => {
    console.log('calTweetScores Inside');
    tweet.faveScore = tweet.favorite_count * favouritePoints;
    tweet.rTScore = tweet.retweet_count * reTweetPoints;
    tweet.tweetWarScore = tweet.faveScore + tweet.rTScore;
  });

  console.log('calcTweetScores Outside');
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
  });
  this.favourites = totFavourites;
  this.reTweets = totReTweets;
  this.warScore = totWarScore;
};

function Twit(screen_name){
  this.screen_name = screen_name.toUpperCase();
  this.tweets = [];
}

function fetchTweets(callback) {
  $.get(`/search/tweets.json?q=from%3A%40${twitOne}%20%40${twitTwo}&src=typd`)
  .then(data => {
    twitOneObj.tweets = data.statuses;
    app.Tweets.first = data.statuses;
  })
  .then($.get(`/search/tweets.json?q=from%3A%40${twitTwo}%20%40${twitOne}&src=typd`).then(data => {
    twitTwoObj.tweets = data.statuses;
    app.Tweets.second = data.statuses;
  }).then(callback).then(() => app.tweets.runBoth));
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
  twitOneObj.calcTweetScores();
  twitTwoObj.calcTweetScores();
  twitOneObj.totalsForWar();
  twitTwoObj.totalsForWar();
  setActiveTweets();
  sortActiveTweets();
  expandAndCenter();
  renderResults();
}

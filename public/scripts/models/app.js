'use strict';

var app = app||{};

//global variables

var form = document.getElementById('form'); //changed the name of this variable to match mine
var twitOne = '';
var twitTwo = '';
var twitOneObj;
var twitTwoObj;
var returnedTweets = JSON.parse(app.tweets);
var favouritePoints = 1;
var reTweetPoints = 1.5;
var activeTweets = [];

//user click
function submitSearch(event){
  event.preventDefault();

  twitOne = event.target.twitOne.value.toUpperCase();
  twitOne = twitOne.replace('@','');
  twitTwo = event.target.twitTwo.value.toUpperCase();
  twitTwo = twitTwo.replace('@','');
  assignTwits(twitOne, twitTwo);
  sortTweets(returnedTweets, twitOne, twitTwo);
  results();
  // form.reset();
}

form.addEventListener('submit', submitSearch);

Twit.prototype.calcTweetScores = function(){
  this.tweets.map(tweet => {
    tweet.faveScore = tweet.favourites_count * favouritePoints;
    tweet.rTScore = tweet.retweet_count * reTweetPoints;
    tweet.tweetWarScore = tweet.faveScore + tweet.rTScore;
  });
  // for (var i=0; i<this.tweets.length; i++){
  //   var totTweetFavScore = favouritePoints * this.tweets[i].favourites_count;
  //   var totTweetRTScore = reTweetPoints * this.tweets[i].retweet_count;
  //   this.tweets[i].faveScore = totTweetFavScore;
  //   this.tweets[i].rTScore = totTweetRTScore;
  //   this.tweets[i].tweetWarScore = totTweetRTScore + totTweetFavScore;
  // }
};

Twit.prototype.convertDates = function(){
  this.tweets.map(tweet => {
    let twitDate = tweet.created_at.split(' ');
    tweet.datetimesent = new Date(`${twitDate[0]} ${twitDate[1]} ${twitDate[2]} ${twitDate[5]} ${twitDate[3]} GMT${twitDate[4]}`)
    console.log(tweet.datetimesent);
  })
};

Twit.prototype.setTimestamp = function(){
  this.tweets.map(tweet => {
    tweet.timestamp = tweet.datetimesent.getTime();
  })
  // for (var i=0; i<this.tweets.length; i++){
  //   var twitDate = this.tweets[i].datetimesent;
  //   this.tweets[i].timestamp = twitDate.getTime();
  // }
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
    totFavourites += tweet.favourites_count;
    totReTweets += tweet.retweet_count;
    totWarScore += tweet.tweetWarScore;
  })
  this.favourites = totFavourites;
  this.reTweets = totReTweets;
  this.warScore = totWarScore;
};

function Twit(screen_name){
  this.screen_name = screen_name.toUpperCase();
  this.tweets = [];
}

function sortTweets(returnedTweets, twitOne, twitTwo){
  for (var i=0; i<returnedTweets.length; i++){
    if (returnedTweets[i].user.screen_name.toUpperCase() === twitOne){
      for (var j=0; j<returnedTweets[i].entities.user_mentions.length; j++){
        if (returnedTweets[i].entities.user_mentions[j].screen_name.toUpperCase() === twitTwo){
          twitOneObj.tweets.push(returnedTweets[i]);
          console.log('Assigned');
        } else {
          console.log('Not assigned');
        }
      }
    } else if (returnedTweets[i].user.screen_name.toUpperCase() === twitTwo){
      for (var k=0; k<returnedTweets[i].entities.user_mentions.length; k++){
        if (returnedTweets[i].entities.user_mentions[k].screen_name.toUpperCase() === twitOne){
          twitTwoObj.tweets.push(returnedTweets[i]);
          console.log('Assigned');
        } else {
          console.log('Not assigned');
        }
      }
    } else {
      console.log('Not assigned');
    }
  }
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

function calData(){
  var calData = {};
  activeTweets.map(tweet => {
    let calTimestamp = Math.floor(tweet.timestamp / 1000);
    calData[calTimestamp] = 1;
  })
  return calData;
}

//http://cal-heatmap.com/
function makeHeatMap(){
  var cal = new CalHeatMap();
  cal.init({
    itemSelector: '#calendar',
    domain: 'year',
    subdomain: 'month',
    subDomainTextFormat: '%m',
    cellSize: 20,
    start: activeTweets[0].datetimesent,
    range: 4,
    legend: [1, 2, 4, 8],
    colLimit: 3,
    label: {
      position: 'top'
    },
    data: calData(),
    onClick: function(date) {
      console.log(date);
      twitOneObj.tweetsByMonth(date);
      twitTwoObj.tweetsByMonth(date);
      twitOneObj.totalsForWar();
      twitTwoObj.totalsForWar();
      tweetCal.removeChild(calendar);
      tweetCal.removeChild(calTitle);
      renderResults();
      return date;
    },
  });
}

function results(){
  twitOneObj.calcTweetScores();
  twitTwoObj.calcTweetScores();
  twitOneObj.convertDates();
  twitTwoObj.convertDates();
  twitOneObj.setTimestamp();
  twitTwoObj.setTimestamp();
  setActiveTweets();
  sortActiveTweets();
  expandAndCenter();
  setTimeout(makeHeatMap, 350);
}

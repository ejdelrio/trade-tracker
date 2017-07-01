'use strict';


const navHandler = () => {
  //Function will iterate through all nav tabs and assign them to an element with an ID of the same name.
  //When a url request with the same name as the element id is made, that element is displayed while it's immediate siblings are hidden.
  let $nav = $('nav');
  $nav.find('a').each((ind, ele) => {
    page(`/${ele.html()}`, () => {
      $(`#${ele.html()}`).show().siblings().hide();
    });
  });
};

navHandler();
page();

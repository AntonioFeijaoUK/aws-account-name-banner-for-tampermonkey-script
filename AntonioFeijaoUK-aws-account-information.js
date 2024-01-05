// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      3.5
// @description  This script logs on the browser console the AWS account ID, the username (role) and the account name that you are currently logged in.
// @author       AntonioFeijaoUK (https://antonio.cloud/
// @updateURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @downloadURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @match        https://*.console.aws.amazon.com/*
// @icon         https://console.aws.amazon.com/favicon.ico?aws.amazon.com
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...
  //console.log("Something hello world from tampermonkey");

  function fullDecode(input) {
    let decoded = decodeURIComponent(input);
    return decoded == input ? decoded : fullDecode(decoded);
  }

  let userInfo = document.cookie.replace(
    /(?:(?:^|.*;\s*)aws-userInfo\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  //alert(JSON.stringify(JSON.parse(fullDecode(userInfo)), null, 4));
  //console.log(JSON.stringify(JSON.parse(fullDecode(userInfo)), null, 4));

  //let AntonioAccountInfo = JSON.stringify(
  //    JSON.parse(fullDecode(userInfo)), null, 4 );

  let AntonioAccountInfo = JSON.parse(fullDecode(userInfo));

  //let user_name = AntonioAccountInfo.username.split('/');
  //let user_name = AntonioAccountInfo.username.split("_")[1];
  //console.log("     user name : " + user_name);

    function getUsername(user_name) {
      if (AntonioAccountInfo.username.split("_")[1] == null) {
          let user_name = '[<span style="background-color:orange;color:white;"><b>' + AntonioAccountInfo.username.split("/")[0] + '</b></span>]';
          return user_name;
      } else {
          let user_name = '[' + AntonioAccountInfo.username.split("_")[1] + ']';
          return user_name;
      }
    }

  let user_name = getUsername(AntonioAccountInfo);


  let account_name = AntonioAccountInfo.issuer.split(" ")[1].split("/")[0];
  let account_number = AntonioAccountInfo.alias;

  //let region = decodeURIComponent(document.cookie).split(";")[6].split("=")[1];
  let region = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)noflush_Region\s*\=\s*([^;]*).*$)|^.*$/,"$1"));


  ///let assume_role_account_number = decodeURIComponent(document.cookie).split(";")[17].split(",")[1].split('"')[3];
  //let assume_role_account_name   = decodeURIComponent(document.cookie).split(";")[19].split(",")[3].split(":")[1];


window.addEventListener("load", function addBanner() {

    if (account_name) {
        console.log("account number : " + account_number);
        console.log("     user name : " + user_name);
        console.log("  account name : " + account_name);
        console.log("        region : " + region);

   //console.log("assume_role_account_number : " + assume_role_account_number);
   // console.log("assume_role_account_name   : " + assume_role_account_name);


    // --------------------------------------------------------------------------
    // div code's credits goes to @barney_parker (https://twitter.com/barney_parker)

        var div = document.createElement("div");
    //div.className = "antonio-banner";
    //        div.style['background-color'] = '#232f3e';
    //        div.style.color = '#f8991d';
    //        div.style['font-size'] = 'medium';
    //        div.style.hr = 'border: 2px solid green; border-radius: 5px;';
    //        div.style.padding = '0.25em';

    //div.style.position = "absolute";
        div.style.height = "40px";
        div.style["font-size"] = "16px";
        div.style["line-height"] = "40px";
        div.style["padding-left"] = "30px";
        div.style["padding-right"] = "30px";
        div.style.overflow = "hidden";
        div.style["font-weight"] = "400";
        div.style.color = "orange"; // '#f8991d'; //div.style.color = '#f6f6f6';
        div.style.background = "#232f3e";
        div.style["border-bottom"] = "1px solid orange";
        div.style.display = 'flex';
        div.style["justify-content"] = "space-between";
        div.style.width = "100%";
        div.style["z-index"] = "10000";
        div.style.top = "0";

        div.innerHTML = '<span>' + user_name + ' - ' + region + ' - ' + account_number + ' - <strong>' + account_name + '</strong></span>';

        console.log("logging the element 1 if exist: " + document.getElementById("awsc-navigation-container"));
        console.log("logging the element 2 if exist: " + document.getElementById("awsc-nav-header"));
        console.log("logging the element 3 if exist: " + document.getElementById("consoleNavHeader"));
        console.log("logging the element 4 if exist: " + document.getElementById("b"));

    //document.body.insertBefore(div,document.body.childNodes[0]);

    //parent.prepend(div);

    //const parent = document.getElementById("awsc-navigation-container");
        const parent = document.getElementById("consoleNavHeader");

    //console.log("loging parent " + parent);

        parent.prepend(div);


    }
});


})();

// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      2.1
// @description  This script logs on the browser console the AWS account name, id, numer, etc.. that you are currently logged in.
// @author       AntonioFeijaoUK
// @updateURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @match        https://*.console.aws.amazon.com/*
// @icon         https://console.aws.amazon.com/favicon.ico?aws.amazon.com
// ==/UserScript==
//--- The @grant directive is used to restore the proper sandbox.


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
  let user_name = AntonioAccountInfo.username.split("_")[1];
  let account_name = AntonioAccountInfo.issuer.split(" ")[1].split("/")[0];
  let account_number = AntonioAccountInfo.alias;

  if (account_name) {
    console.log("account number : " + account_number);
    console.log("     user name : " + user_name);
    console.log("  account name : " + account_name);

    // --------------------------------------------------------------------------
    // div code's credits goes to @barney_parker (https://twitter.com/barney_parker)

    var div = document.createElement("div");

    //        div.style['background-color'] = '#232f3e';
    //        div.style.color = '#f8991d';
    //        div.style['font-size'] = 'medium';
    //        div.style.hr = 'border: 2px solid green; border-radius: 5px;';
    //        div.style.padding = '0.25em';

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

    div.innerHTML =
      '<span>' + account_number + '  |  <b>' + user_name + '</b>  @  <b>' + account_name + '</b></span><hr>';

    const parent = document.getElementById("awsc-navigation-container");

    parent.prepend(div);

    // --------------------------------------------------------------------------
  }
})();

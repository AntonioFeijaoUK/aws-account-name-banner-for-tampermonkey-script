// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      0.1
// @description  This script logs on the browser console the AWS account name, id, numer, etc.. that you are currently logged in.
// @author       AntonioFeijaoUK
// @match        https://*.console.aws.amazon.com/*
// @icon         https://console.aws.amazon.com/favicon.ico?aws.amazon.com
// @grant        GM_addStyle
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
  //    JSON.parse(fullDecode(userInfo)),
  //   null,
  //  4
  // );

  let AntonioAccountInfo = JSON.parse(fullDecode(userInfo));

  let Username     = AntonioAccountInfo.username.split('/');
  let AccountName  = AntonioAccountInfo.issuer.split(" ")[1].split("/")[0];
  let AccountNumber = AntonioAccountInfo.alias;




  if (AccountName) {
    console.log("Username     : " + Username[1]);
    console.log("Account name : " + AccountName);
    console.log("AccoutNumber : " + AccountNumber);
  };

  /// >>> HELP!! How do I add a proper div "banner" on the AWS Webpage ?
  
    //var AntonioElement = document.createElement("AntonioElement");

    //AntonioElement.innerHTML = '<div id="AntonioElement"> <center> <pre> ' + AntonioAccountInfo + '</pre> </center> </div>';

    //AntonioElement.style = "position: -webkit-sticky;  position: sticky;  top: 0;  padding: 50px; background-color: orange; color: white;";

    //document.body.insertBefore(AntonioElement, document.body.firstChild);

    // https://stackoverflow.com/questions/6013861/how-to-insertbefore-element-in-body-tag
    //document.head.prepend(AntonioElement);
    //document.body.prepend(AntonioElement);


})();

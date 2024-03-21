// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      3.6
// @description  This script logs on the browser console the AWS account ID, the username (role) and account name that you are currently logged in.
// @author       AntonioFeijaoUK (https://antonio.cloud/
// @updateURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @downloadURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @match        https://*.console.aws.amazon.com/*
// @icon         https://console.aws.amazon.com/favicon.ico?aws.amazon.com
// ==/UserScript==

// // @grant        GM_addStyle



(window.addEventListener('load', function AddBanner() {
    "use strict";
    // Your code here...
    //console.log("Something hello world from tampermonkey");

    function fullDecode(input) {
        let decoded = decodeURIComponent(input);
        return decoded == input ? decoded : fullDecode(decoded);
    };

    let userInfo = document.cookie.replace(/(?:(?:^|.*;\s*)aws-userInfo\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    let AccountInfo = JSON.parse(fullDecode(userInfo));

    function getUsername(user_name) {
        if (AccountInfo.username.split("_")[1] == null) {
            let user_name = AccountInfo.username.split("/")[2];
            return user_name;
        } else {
            let user_name = AccountInfo.username.split("/")[2];
            return user_name;
        }
    }


    // getting the permissions
    function getPermissions(AccountInfo) {
        if (AccountInfo.username.split("_")[1] == null) {
            let permissions = AccountInfo.username;
            return permissions;
        } else {
            let permissions = AccountInfo.username.split("_")[1];
            return permissions;
        }
    }


    let region = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)noflush_Region\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    let permissions = getPermissions(AccountInfo);
    let account_number = AccountInfo.alias;
    //let account_name = AccountInfo.issuer.split(" ")[1].split("/")[0];
    let user_name = getUsername(AccountInfo);
    let account_name = AccountInfo.username;


    if (account_name) {
        console.log("        region : " + region);
        console.log("   permissions : " + permissions);
        console.log("account number : " + account_number);
        console.log("     user name : " + user_name);
        console.log("  account name : " + account_name);


        var div = document.createElement("div");
        //div.className = "additional-banner";
        //div.style['background-color'] = '#232f3e';
        //div.style.color = '#f8991d';
        //div.style['font-size'] = 'medium';
        //div.style.hr = 'border: 2px solid green; border-radius: 5px;';
        //div.style.padding = '0.25em';

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
        // ## 2024-03-21 - account_name is not working at the moment, account name is no longer part of the document.cookie....
        div.innerHTML = '<span>[' + region + ' - <strong>' + permissions + '</strong> - ' + account_number + ' - ' + user_name + ']</span>';

        let element = document.getElementById("consoleNavHeader");

        if (element) {
            console.log("logging the element 1 if exist: " + document.getElementById("awsc-navigation-container"));
            console.log("logging the element 2 if exist: " + document.getElementById("awsc-nav-header"));
            console.log("logging the element 3 if exist: " + document.getElementById("consoleNavHeader"));
            console.log("logging the element 4 if exist: " + document.getElementById("b"));

            //document.body.insertBefore(div,document.body.childNodes[0]);

            //const parent = document.getElementById("consoleNavHeader");
            const parent = element;
            parent.prepend(div);
        };

    };
}), false);

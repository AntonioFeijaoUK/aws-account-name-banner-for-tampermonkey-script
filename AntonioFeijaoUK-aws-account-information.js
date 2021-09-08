// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      1.2
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


    //let user_name = AntonioAccountInfo.username.split('/');
    let user_name = AntonioAccountInfo.username.split('_')[1];
    let account_name = AntonioAccountInfo.issuer.split(" ")[1].split("/")[0];
    let account_number = AntonioAccountInfo.alias;




    if (account_name) {
        console.log("account number : " + account_number);
        console.log("  account name : " + account_name);
        console.log("     user name : " + user_name);


        // --------------------------------------------------------------------------
        // div code credits goes to @barney_parker (https://twitter.com/barney_parker)

        const div = document.createElement('div');

        div.style['background-color'] = '#232f3e';
        div.style.color = '#f8991d';

        div.style['font-size'] = 'medium';
        div.style.hr = 'border: 2px solid green; border-radius: 5px;';

        div.style.padding = '0.25em';

        //div.innerHTML = '<span>account number : ' + account_number + '</span>' + '<br>' +
        //                '<span>account name :   ' + account_name   + '</span>' + '<br>' +
        //                '<span>user name :      ' + user_name      + '</span>' + '<br>' +
        //                '<hr>';

        div.innerHTML = '<center><span>' + account_number + '  |  ' + user_name + ' @ ' + account_name + '</span></center><hr>';

        const parent = document.getElementById('awsc-navigation-container');

        parent.prepend(div);

        // --------------------------------------------------------------------------




    };


})();

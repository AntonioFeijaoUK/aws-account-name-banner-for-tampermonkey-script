// ==UserScript==
// @name         AntonioFeijaoUK-aws-account-information
// @namespace    https://*.console.aws.amazon.com/*
// @version      4.1
// @description  This script logs on the browser console the AWS account ID, the username (role) and account name that you are currently logged in.
// @author       AntonioFeijaoUK (https://antonio.cloud/)
// @updateURL    https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @downloadURL  https://raw.githubusercontent.com/AntonioFeijaoUK/aws-tampermonkey-scripts/main/AntonioFeijaoUK-aws-account-information.js
// @match        https://*.console.aws.amazon.com/*
// @icon         https://console.aws.amazon.com/favicon.ico?aws.amazon.com
// ==/UserScript==

(function() {
    'use strict';

    // Function to decode URI component recursively
    function fullDecode(input) {
        try {
            let decoded = decodeURIComponent(input);
            return decoded == input ? decoded : fullDecode(decoded);
        } catch (error) {
            console.error('Error decoding input:', error);
            return input; // Fallback to original input on error
        }
    }

    // Retrieve AWS user information from cookies
    let userInfo = document.cookie.replace(/(?:(?:^|.*;\s*)aws-userInfo\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let AccountInfo;
    try {
        AccountInfo = JSON.parse(fullDecode(userInfo));
    } catch (error) {
        console.error('Error parsing userInfo JSON:', error);
        return; // Exit early if userInfo cannot be parsed
    }

    // Function to extract username from AccountInfo
    function getUsername() {
        try {
            if (AccountInfo.username.split("_")[1] == null) {
                return AccountInfo.username.split("/")[2];
            } else {
                return AccountInfo.username.split("_")[1];
            }
        } catch (error) {
            console.error('Error extracting username:', error);
            return ''; // Return empty string on error
        }
    }

    // Function to extract permissions from AccountInfo
    function getPermissions() {
        try {
            if (AccountInfo.username.split("_")[1] == null) {
                return AccountInfo.username;
            } else {
                return AccountInfo.username.split("_")[1];
            }
        } catch (error) {
            console.error('Error extracting permissions:', error);
            return ''; // Return empty string on error
        }
    }

    // Get the accounts list, ready for cost dictionary.
    // Read the list of account from Payer account.
    //
    //  aws organizations list-accounts > ./results/00-list-of-accounts-in-org.txt
    //  cat ./results/00-list-of-accounts-in-org.txt | jq -r '.Accounts[] | "\(.Name)\t \(.Id);" ' | tr -d '^ ' | tr ' ' '_' | sort --ignore-case | awk '{print $2 "\t" $1 }' | sed s/"^"/"'"/g | sed s/"\$"/"',"/g | sed s/';\t'/"': '"/g
    //

    // Dictionary to map account IDs to account names
    const dictionary = {
        'accountid1': 'account_name1',
        'accountid2': 'account_name2',
        'accountid3': 'account_name3',
        'accountid4': 'account_name4',
        'accountid5': 'account_name5',
    };

    // Retrieve region from cookies
    let region = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)noflush_Region\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

    // Retrieve permissions and account number from AccountInfo
    let permissions = getPermissions();
    let account_number = AccountInfo.alias;

    // Retrieve account name from dictionary based on account number
    let account_name = dictionary[account_number] || 'no-name-in-list';

    // Retrieve username
    let user_name = getUsername();

    // Logging account information to console
    console.log("        region : " + region);
    console.log("   permissions : " + permissions);
    console.log("account number : " + account_number);
    console.log("     user name : " + user_name);
    console.log("  account name : " + account_name);

    // Create the banner div element
    var div = document.createElement("div");
    div.className = "additional-banner";
    div.style.height = "40px";
    div.style.fontSize = "16px";
    div.style.lineHeight = "40px";
    div.style.paddingLeft = "30px";
    div.style.paddingRight = "30px";
    div.style.overflow = "hidden";
    div.style.fontWeight = "400";
    div.style.color = "orange"; // Adjust color as needed
    div.style.background = "#232f3e"; // Adjust background color as needed
    div.style.borderBottom = "1px solid orange"; // Adjust border as needed
    div.style.display = 'flex';
    div.style.justifyContent = "space-between";
    div.style.width = "100%";
    div.style.zIndex = "10000";
    div.style.top = "0";
    div.style.left = "0"; // Position from the left edge
    div.style.right = "0"; // Position from the right edge

    // Set banner content
    div.innerHTML = '<span>[' + region + ' - <strong>' + permissions + '</strong> - ' + account_name + ' ' + account_number + ' ' + user_name + ']</span>';

    // Insert the banner into the AWS Console header
    let headerElement = document.getElementById("consoleNavHeader");
    if (headerElement) {
        headerElement.prepend(div);
    } else {
        console.warn("AWS Console header element not found. Banner may not be positioned correctly.");
        // Fallback: Insert banner at the top of the body if header element is not found
        document.body.insertBefore(div, document.body.firstChild);
    }

})();

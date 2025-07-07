// ==UserScript==
// @name         AWS Console Banner (v6.6 – inside header)
// @namespace    https://*.console.aws.amazon.com/*
// @version      6.6
// @description  Shows region, role, account name & ID in AWS Console header (IAM + SSO).
// @match        https://*.console.aws.amazon.com/*
// @exclude      https://signin.*.amazonaws.com/*
// @grant        GM_addStyle
// ==/UserScript==

(() => {
  'use strict';

  /*──────── helpers ─────────────────────────────────────────────────*/
  const cookie = n => document.cookie.split(';').map(c => c.trim())
      .find(c => c.startsWith(n + '='))?.split('=')[1];
  const d      = s => { try { return decodeURIComponent(s); } catch { return s; } };
  const dAll   = s => { let o=s,p; try { do { p=o; o=decodeURIComponent(o); } while (o!==p); } catch {} return o; };
  const jwt    = t => JSON.parse(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));

  /*──────── session info ───────────────────────────────────────────*/
  let infoRaw = cookie('aws-userInfo');
  const info  = infoRaw ? JSON.parse(d(infoRaw))
                        : (infoRaw = cookie('aws-userInfo-signed')) ? jwt(infoRaw) : null;
  if (!info) return;                                                              // not logged in

  const region   = d(cookie('noflush_Region') || 'unknown');
  const accountId= info.alias || info.accountId || (info.sub||'').match(/\d{12}/)?.[0] || '????????????';
  const role     = (() => {
                     if (info.username){
                       const res = dAll(info.username).split(':').pop();
                       return res.split('/')[1] || res;
                     }
                     const m=/%20\([^)]+\)%29\/([^/]+)\/?/.exec(dAll(info.iss||''));
                     return m?m[1]:'unknown';
                   })();

  /*──────── static account map ────────────────────────────────────*/
  const accounts = {
        'accountid1': 'account_name1',
        'accountid2': 'account_name2',
        'accountid3': 'account_name3',
        'accountid4': 'account_name4',
        'accountid5': 'account_name5'
  };
  const accountName = accounts[accountId] || 'unlisted';

  /*──────── banner styling ─────────────────────────────────────────*/
  GM_addStyle(`
    .af-inner-banner{
      width:100%;height:38px;line-height:38px;font-size:18px;font-weight:500;
      padding:0 24px;color:orange;background:#232f3e;border-bottom:1px solid orange;
      display:flex;justify-content:space-between;
    }
    #consoleNavHeader{display:flex;flex-direction:column;}   /* accommodates extra row */
  `);

  /*──────── banner element ─────────────────────────────────────────*/
  const banner = document.createElement('div');
  banner.className = 'af-inner-banner';
  banner.role      = 'banner';
  banner.ariaLive  = 'polite';
  banner.textContent = `[${region} — ${role} — ${accountName} ${accountId}]`;

  /*──────── inject when header present ────────────────────────────*/
  const inject = () => {
    const header = document.querySelector('#consoleNavHeader');
    if (header && !document.querySelector('.af-inner-banner')){
      header.prepend(banner);
      return true;
    }
    return false;
  };
  if (!inject()){
    new MutationObserver((_,o)=>inject() && o.disconnect())
      .observe(document.documentElement,{childList:true,subtree:true});
  }
})();

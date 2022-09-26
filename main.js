// ==UserScript==
// @name				 TypingClub Hack
// @namespace		https://github.com
// @version			0.1
// @description	     HagiaHaya's typing script
// @author			 HagiaHaya
// @match				*://*.typingclub.com/sportal/*.play
// @grant				none
// ==/UserScript==
const minDelay = 60;
const maxDelay = 70;
let currentPage = location.href;
const keyOverrides = {
    [String.fromCharCode(160)]: ' '
};

function getTargetCharacters() {
    const els = core.chars;
    const chrs = els
        .map(el => {
            if (el.chr.includes('_enter')) {
                return '\n';
            }
            let text = el.chr;
            return text;
        })
        .map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c);
    return chrs;
}

function recordKey(chr) {
    window.core.record_keydown_time(chr);
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function autoPlay(finish) {
    await sleep(2000);
    const chrs = getTargetCharacters();
    for (let i = 0; i < chrs.length - (!finish); ++i) {
        const c = chrs[i];
        recordKey(c);
        await sleep(Math.random() * (maxDelay - minDelay) + minDelay);
    }
}

let pp = autoPlay(true);
setInterval(function() {
    pp;
    if (currentPage != location.href) {
        currentPage = location.href;
        pp = autoPlay(true).then(e => console.log(e));
        pp;
    }
}, 1000);

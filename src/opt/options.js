let btn = document.getElementsByName('wiktlanguage');
let wikiurl = 'https://*.wiktionary.org/wiki/%s';
let wiktlang, searchlang;

async function update() {
    wiktlang = await chrome.storage.sync.get("wiktlanguage");
    searchlang = await chrome.storage.sync.get("searchlanguage");
    wiktlang = wiktlang.wiktlanguage;
    searchlang = searchlang.searchlanguage;
    let a = document.querySelector("#url a");
    let url = wikiurl.replace('*', wiktlang) + (searchlang?'#'+searchlang:"");
    a.innerHTML = url;
    a.href = url;
}

function changeWiktionary(lang) {
    chrome.storage.sync.set({
        wiktlanguage: lang
    }).then(()=>{
        console.log(lang);
        let status = document.getElementById('status');
        status.textContent = "Wiktionary setting saved";
        setTimeout(function() {
            status.textContent = '';
        }, 3000);
        update();
    });
}

document.getElementById("search-save").addEventListener("click", ()=>{
    let searchInp = document.getElementById("search-inp");
    chrome.storage.sync.set({"searchlanguage": searchInp.value});
    update();
})
document.getElementById("wikt-save").addEventListener("click", e=>{
    let wiktInp = document.getElementById("wikt-inp");
    chrome.storage.sync.set({"wiktlanguage": wiktInp.value});
    restore_options();
})

function restore_options() {
    chrome.storage.sync.get("wiktlanguage", function(obj) {
        for (let i = 0; i < btn.length; i++) {
            if (btn[i].value == obj.wiktlanguage) {
                btn[i].checked = true;
                document.querySelector("[for='*']".replace('*', btn[i].value)).scrollIntoView();
                window.scrollBy(0, -200);
                let a = document.querySelector("#url a");
                a.innerHTML = wikiurl.replace('*', obj.wiktlanguage);
                a.href = wikiurl.replace('*', obj.wiktlanguage);
            }
        }
    });
    update();
}

document.addEventListener('DOMContentLoaded', restore_options);
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function(){
        for (let i = 0; i < btn.length; i++) {
            if (btn[i].checked) {
                changeWiktionary(btn[i].value);
                break;
            }
        }
    });
}
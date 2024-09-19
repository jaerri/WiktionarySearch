let lang, searchlang;
async function update() {
    let obj = await chrome.storage.sync.get("wiktlanguage");
    lang = obj.wiktlanguage;
    
    obj = await chrome.storage.sync.get("searchlanguage");
    searchlang = obj.searchlanguage;
}
window.addEventListener('load', async function(evt) {
    await update();
    document.getElementById('search').addEventListener('submit', openURL);
    document.getElementById("word").placeholder = `Search Wiktionary (${lang})`;
    document.getElementById('word').focus();
});

async function openURL() {
    event.preventDefault();
    let word = encodeURIComponent(document.getElementById('word').value);
    chrome.tabs.create({
        'url': "https://" + lang + ".wiktionary.org/wiki/" + word + (searchlang?"#" + searchlang:"")
    });
}
let lang, searchlang;
chrome.storage.sync.get("wiktlanguage", function(obj) {
    lang = obj.wiktlanguage;
});
chrome.storage.sync.get("searchlanguage", obj => {
    searchlang = obj.searchlanguage;
})
window.addEventListener('load', function(evt) {
    document.getElementById('search').addEventListener('submit', openURL);
    document.getElementById("word").placeholder = "Search Wiktionary";
    document.getElementById('word').focus();
});

function openURL() {
    event.preventDefault();
    let word = encodeURIComponent(document.getElementById('word').value);
    chrome.tabs.create({
        'url': "https://" + lang + ".wiktionary.org/wiki/" + word + (searchlang?"#" + searchlang:"")
    });
}
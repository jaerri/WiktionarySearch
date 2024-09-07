let lang, searchlang;
chrome.storage.sync.get("wiktlanguage", function(obj) {
    if (!obj.wiktlanguage) {
        lang = "en";
        chrome.storage.sync.set({wiktlanguage: lang});
    } else {
        lang = obj.wiktlanguage;
    }
});
chrome.storage.sync.get("searchlanguage", obj => {
    searchlang = obj.searchlanguage;
})

chrome.contextMenus.create({
    "id": "wiktionary",
    "title": 'Search Wiktionary for "%s"',
    "contexts": ["selection"],
});
chrome.contextMenus.onClicked.addListener(function(e){
    let wikURL = "https://" + lang + ".wiktionary.org/wiki/" + encodeURI(e.selectionText) + (searchlang?"#" + searchlang:"")

    if (e.selectionText) {
        chrome.tabs.create({
            "url": wikURL
        });
    }
});
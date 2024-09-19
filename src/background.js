let lang, searchlang;
async function update() {
    let obj = await chrome.storage.sync.get("wiktlanguage");
    if (!obj.wiktlanguage) {
        lang = "en";
        chrome.storage.sync.set({wiktlanguage: lang});
    } else lang = obj.wiktlanguage;
    
    obj = await chrome.storage.sync.get("searchlanguage");
    searchlang = obj.searchlanguage;
}
update();
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "wiktionary",
        "title": `Search Wiktionary (${lang}) for "%s"`,
        "contexts": ["selection"],
    });
});
chrome.contextMenus.onClicked.addListener(async function(e){
    await update();
    let wikURL = "https://" + lang + ".wiktionary.org/wiki/" + encodeURI(e.selectionText) + (searchlang?"#" + searchlang:"")

    if (e.selectionText) {
        chrome.tabs.create({
            "url": wikURL
        });
    }
});
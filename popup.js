document.getElementById("clearHistoryBtn").addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "clearHistory" });
});

document.getElementById("clearBookmarksBtn").addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "clearBookmarks" });
});
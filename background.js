// 监听标签页更新，整理标签页
chrome.tabs.onCreated.addListener(function(tab) {
  console.log("Tab created:", tab);
  // 在这里你可以根据自己的需求来整理标签页
  // 比如：根据 URL 对标签页进行分组
});

// 清理浏览器历史记录
function clearHistory() {
  chrome.history.deleteAll(function() {
    console.log("History cleared!");
  });
}

// 清理书签
function clearBookmarks() {
  chrome.bookmarks.getTree(function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      if (bookmark.children) {
        bookmark.children.forEach(function(child) {
          chrome.bookmarks.remove(child.id);
        });
      }
    });
    console.log("Bookmarks cleared!");
  });
}

// 导出这些功能
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "clearHistory") {
    clearHistory();
  } else if (request.action === "clearBookmarks") {
    clearBookmarks();
  }
});
{
  "manifest_version": 2,
  "name": "Tab Organizer",
  "description": "Organize your browser tabs and bookmarks!",
  "version": "1.0",
  "permissions": [
    "tabs",
    "history",
    "bookmarks"
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon48.png"
  },
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
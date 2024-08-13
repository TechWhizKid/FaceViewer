// script.js

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const urlInput = document.getElementById("urlInput");

    if (currentTab) {
      const url = currentTab.url;
      const facebookPattern = /^https:\/\/.*\.facebook\.com\/.*/;
      const messengerPattern = /^https:\/\/www\.messenger\.com\/t\/.*/;

      if (facebookPattern.test(url) || messengerPattern.test(url)) {
        urlInput.value = url;
      } else {
        urlInput.value = "";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("viewProfileButton");
  const urlInput = document.getElementById("urlInput");

  button.addEventListener("click", () => {
    const url = urlInput.value.trim();

    if (url.includes('facebook.com') || url.includes('messenger.com')) {
        getFacebookProfilePicture(url)
    }
  });
});

// facegrabber.js

function getFacebookProfilePicture(url) {
  getCurrentUsername(url).then(getUsernameId).then(openFullHdPhoto);
}

function getCurrentTabUrl() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        var tab = tabs[0];
        var tabUrl = tab.url;
        resolve(tabUrl);
      }
    );
  });
}

function getCurrentUsername(link) {
  return new Promise((resolve, reject) => {
    const test = new URL(link);
    if (test.pathname.includes("/friends/")) {
      resolve(test.searchParams.get("profile_id"));
    }
    else if (test.pathname.includes("/groups/")) {
      resolve(test.pathname.split("/").filter((str) => str != "")[3]);
    } else if (test.pathname.includes("/t/")) {
      resolve(test.pathname.split("/").filter((str) => str != "")[1]);
    } else if (test.pathname === "/profile.php") {
      resolve(test.searchParams.get("id"));
    } else {
      resolve(test.pathname);
    }
  });
}

function getUsernameId(username) {
  return new Promise((resolve, reject) => {
    fetch("https://mbasic.facebook.com/" + username)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        const regex = /owner_id=([a-z0-9\-]+)\&?/i;
        var regexRes = html.match(regex);
        if (regexRes) {
          resolve(regexRes[1]);
        } else {
          alert("Could not extract FB Profile Picture");
          reject(new Error(`Could not extract FB Profile Picture`));
        }
      })
      .catch((err) => {
        alert("Could not extract FB Profile Picture");
        reject(new Error(`Could not extract FB Profile Picture`));
      });
  });
}

function openFullHdPhoto(id) {
  getFbAccessToken() // Get user access token
    .then((accessToken) => {
      window.open(
        `https://graph.facebook.com/${id}/picture?width=5000&access_token=${accessToken}`
      );
    });
}

function getFbAccessToken() {
  // Using fb android client token
  return new Promise((resolve, reject) => {
    resolve("6628568379%7Cc1e620fa708a1d5696fb991c1bde5662");
  });
}

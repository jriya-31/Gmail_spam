chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

chrome.action.onClicked.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError) {
      console.error("Auth error:", chrome.runtime.lastError);
      return;
    }
    fetchEmails(token);
  });
});

function fetchEmails(token) {
  fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched emails:", data);
      classifyEmails(data.messages);
    })
    .catch((error) => console.error("Error fetching emails:", error));
}

function classifyEmails(messages) {
  chrome.storage.local.set({ rawMessages: messages }, function () {
    if (chrome.runtime.lastError) {
      console.error("Error saving to storage:", chrome.runtime.lastError);
    } else {
      console.log("Messages saved to storage");
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Extension Installed");
});

chrome.action.onClicked.addListener(() => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
        if (chrome.runtime.lastError) {
            console.error("❌ Auth error:", chrome.runtime.lastError.message);
            return;
        }
        await fetchEmails(token);
    });
});

async function fetchEmails(token) {
    try {
        const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!data.messages || data.messages.length === 0) {
            console.warn("⚠ No emails found.");
            return;
        }

        console.log("📩 Fetched emails:", data);
        classifyEmails(data.messages);
    } catch (error) {
        console.error("❌ Error fetching emails:", error.message);
    }
}

function classifyEmails(messages) {
    const classifiedEmails = messages.map((email, index) => {
        const spamScore = Math.random(); // Replace this with actual spam detection logic
        let status = "Safe";

        if (spamScore > 0.8) status = "High Spam";
        else if (spamScore > 0.5) status = "Moderate Spam";
        else if (spamScore > 0.3) status = "Low Spam";

        return {
            id: email.id || `email_${index}`,
            spamScore: spamScore.toFixed(2),
            status: status,
        };
    });

    chrome.storage.local.set({ classifiedEmails }, () => {
        if (chrome.runtime.lastError) {
            console.error("❌ Error saving emails to storage:", chrome.runtime.lastError.message);
        } else {
            console.log("✅ Classified emails saved successfully.");
        }
    });
}

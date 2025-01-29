document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("classifiedEmails", (data) => {
        const classifiedEmails = data.classifiedEmails || [];
        const spamList = document.getElementById("spamEmails");
        const safeList = document.getElementById("safeEmails");
        const spamMessage = document.getElementById("spamMessage");
        const safeMessage = document.getElementById("safeMessage");

        spamList.innerHTML = "";
        safeList.innerHTML = "";

        if (classifiedEmails.length === 0) {
            spamMessage.textContent = "No spam emails detected.";
            safeMessage.textContent = "All emails are safe.";
            return;
        }

        let spamCount = 0;
        let safeCount = 0;

        classifiedEmails.forEach((email) => {
            const li = document.createElement("li");
            li.textContent = `Email ID: ${email.id} - Score: ${email.spamScore} - Level: ${email.status}`;

            if (email.status === "High Spam") {
                li.classList.add("high-spam");
                spamCount++;
            } else if (email.status === "Moderate Spam") {
                li.classList.add("moderate-spam");
                spamCount++;
            } else if (email.status === "Low Spam") {
                li.classList.add("low-spam");
                spamCount++;
            } else {
                li.classList.add("safe");
                safeCount++;
            }

            if (email.status.includes("Spam")) {
                spamList.appendChild(li);
            } else {
                safeList.appendChild(li);
            }
        });

        if (spamCount === 0) {
            spamMessage.textContent = "No spam emails detected.";
        } else {
            spamMessage.textContent = "";
        }

        if (safeCount === 0) {
            safeMessage.textContent = "No safe emails found.";
        } else {
            safeMessage.textContent = "";
        }
    });
});

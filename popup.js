document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("classifiedEmails", (data) => {
    const classifiedEmails = data.classifiedEmails || [];

    // Display emails in popup
    const spamList = document.getElementById("spamEmails");
    const safeList = document.getElementById("safeEmails");

    classifiedEmails.forEach((email) => {
      const li = document.createElement("li");
      li.textContent = `Email ID: ${email.id} - Score: ${email.spamScore} - Level: ${email.status}`;

      if (email.status === "High Spam") {
        li.classList.add("high-spam");
      } else if (email.status === "Moderate Spam") {
        li.classList.add("moderate-spam");
      } else if (email.status === "Low Spam") {
        li.classList.add("low-spam");
      } else {
        li.classList.add("safe");
      }

      if (email.status.includes("Spam")) {
        spamList.appendChild(li);
      } else {
        safeList.appendChild(li);
      }
    });
  });
});

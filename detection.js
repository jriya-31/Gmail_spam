function classifyEmails(messages) {
    const spamFactors = [
      { regex: /\b(WIN|FREE|$$|CLICK HERE|URGENT)\b/g, points: 20 },
      { regex: /@\b(free-mail|tempmail|spamdomain)\.com\b/g, points: 30 },
      { regex: /(lottery|prize|cash reward)/gi, points: 15 },
      { regex: /\b[A-Z]{10,}\b/g, points: 10 },
      { regex: /(http:\/\/|https:\/\/)[^\s]+/gi, points: 15 },
      { regex: /\bunsubscribe\b/gi, points: 5 },
    ];
  
    messages.forEach((message) => {
      let spamScore = 0;
  
      spamFactors.forEach((factor) => {
        if (message.snippet && message.snippet.match(factor.regex)) {
          spamScore += factor.points;
        }
      });
  
      if (spamScore >= 50) {
        message.status = "High Spam";
      } else if (spamScore >= 20) {
        message.status = "Moderate Spam";
      } else if (spamScore > 0) {
        message.status = "Low Spam";
      } else {
        message.status = "Safe";
      }
      message.spamScore = spamScore;
    });
  
    chrome.storage.local.set({ classifiedEmails: messages });
  }

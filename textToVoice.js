browser.contextMenus.create({
  id: "ReadIt",
  title: "ReadIt",
  contexts: ["all"],
});
browser.contextMenus.create({
  id: "readSelectedText",
  title: "Read Selaction Text",
  contexts: ["selection"],
  parentId: "ReadIt",
});
browser.contextMenus.create({
  id: "pause",
  title: "Pause Read",
  contexts: ["all"],
  parentId: "ReadIt",
});

browser.contextMenus.create({
  id: "resume",
  title: "Resume Read",
  contexts: ["all"],
  parentId: "ReadIt",
});

browser.contextMenus.create({
  id: "stop",
  title: "Stop Read",
  contexts: ["all"],
  parentId: "ReadIt",
});

const menuActions = {
  readSelectedText: (selectedText) => {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    let reg = /[\u0600-\u06FF]/;
    if (reg.test(selectedText)) {
      utterance.lang = "ar-EG";
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    window.speechSynthesis.speak(utterance);
  },
  pause: () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  },
  resume: () => {
    window.speechSynthesis.resume();
  },
  stop: () => {
    window.speechSynthesis.cancel();
  },
};

browser.contextMenus.onClicked.addListener((info, tab) => {
  const actionFunction = menuActions[info.menuItemId];
  if (actionFunction) {
    actionFunction(info.selectionText);
  }
});

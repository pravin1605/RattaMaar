export const pwaService = {
  isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  },

  isOnline() {
    return navigator.onLine;
  },

  getInstallPrompt() {
    return window.__NOTES_WEB_INSTALL_PROMPT__ || null;
  },

  setInstallPrompt(event) {
    window.__NOTES_WEB_INSTALL_PROMPT__ = event;
  },

  async install() {
    const promptEvent = this.getInstallPrompt();

    if (!promptEvent) {
      return {
        installed: false,
        available: false,
      };
    }

    promptEvent.prompt();

    const result = await promptEvent.userChoice;

    window.__NOTES_WEB_INSTALL_PROMPT__ = null;

    return {
      installed: result.outcome === "accepted",
      available: true,
    };
  },
};

export default pwaService;
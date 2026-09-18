const PREFIX = "notes-web-";

export const storageService = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(`${PREFIX}${key}`);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
    } catch {
      // Ignore storage errors
    }
  },

  clear() {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      // Ignore storage errors
    }
  },
};

export default storageService;
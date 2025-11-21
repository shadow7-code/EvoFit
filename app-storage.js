(function (global) {
  const STORAGE_KEY = 'evoFitApp';

  const defaultState = {
    theme: 'dark',
    rememberedUser: null,
    users: {}
  };

  function readState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initialState = { ...defaultState };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
        return initialState;
      }
      const parsed = JSON.parse(raw);
      return {
        ...defaultState,
        ...parsed,
        users: parsed.users || {}
      };
    } catch (error) {
      console.warn('EvoFitStorage: resetting corrupted state', error);
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultState };
    }
  }

  function writeState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function cloneState(state) {
    if (typeof structuredClone === 'function') {
      return structuredClone(state);
    }
    return JSON.parse(JSON.stringify(state));
  }

  function updateState(updater) {
    const state = readState();
    const nextState = updater(cloneState(state)) || state;
    writeState(nextState);
    return nextState;
  }

  function ensureUser(state, username) {
    if (!username) return null;
    if (!state.users[username]) {
      state.users[username] = {
        password: null,
        profile: null,
        workoutHistory: null,
        dietPlan: null
      };
    }
    return state.users[username];
  }

  function getUser(username) {
    const state = readState();
    return username ? state.users[username] || null : null;
  }

  function setUserSection(username, section, value) {
    if (!username || !section) return;
    updateState(state => {
      const user = ensureUser(state, username);
      if (user) {
        user[section] = value;
      }
      return state;
    });
  }

  function getUserSection(username, section) {
    const user = getUser(username);
    return user ? user[section] ?? null : null;
  }

  function setUserPassword(username, password) {
    if (!username) return;
    updateState(state => {
      const user = ensureUser(state, username);
      if (user) {
        user.password = password;
      }
      return state;
    });
  }

  function getRememberedUser() {
    return readState().rememberedUser;
  }

  function setRememberedUser(username) {
    updateState(state => {
      state.rememberedUser = username || null;
      return state;
    });
  }

  function getTheme() {
    return readState().theme || 'dark';
  }

  function setTheme(theme) {
    updateState(state => {
      state.theme = theme === 'light' ? 'light' : 'dark';
      return state;
    });
  }

  global.EvoFitStorage = {
    readState,
    writeState,
    updateState,
    ensureUser,
    getUser,
    getUserSection,
    setUserSection,
    setUserPassword,
    getRememberedUser,
    setRememberedUser,
    getTheme,
    setTheme
  };
})(window);


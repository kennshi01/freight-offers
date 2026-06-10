export function loadFromStorage(key, fallbackData) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : fallbackData;
  } catch {
    return fallbackData;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // The app can continue with in-memory state if storage is unavailable.
  }
}

export function clearStorageKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors so the UI remains usable.
  }
}

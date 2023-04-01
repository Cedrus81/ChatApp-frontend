export const storageService = {
    setItem,
    getItem,
    removeItem
}

function setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
}

function removeItem(key: string): void {
    localStorage.removeItem(key);
}
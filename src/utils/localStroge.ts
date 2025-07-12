export class LocalStorage<T extends string> {
  private prefix: string;
  map = new Map<T, string>();

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  getItem(key: T) {
    if (this.map.has(key)) return this.map.get(key);
    const value = localStorage.getItem(this.prefix + key);
    if (value) this.map.set(key, value);
    return value;
  }

  setItem(key: T, value: string) {
    this.map.set(key, value);
    localStorage.setItem(this.prefix + key, value);
  }

  removeItem(key: T) {
    this.map.delete(key);
    localStorage.removeItem(this.prefix + key);
  }
}

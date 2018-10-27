import {TODO_RECORD_STORAGE} from "../constants/Constants";

export interface SessionStorageInterface {
  [key: string] : Array<any>;
}

export default class RecorderService {

  /**
   * Create session Storage if does not exist
   */
  initSessionStorage = () => {
    Promise.resolve(localStorage.getItem(TODO_RECORD_STORAGE)).then(storage => {
      if (!storage) {
        localStorage.setItem(TODO_RECORD_STORAGE, '{}');
      }
    })
  };

  /**
   * Gets sessions Storage
   * @returns {any}
   */
  getSessionStorage = () => {
    if (localStorage.getItem(TODO_RECORD_STORAGE)) {
      return JSON.parse(localStorage.getItem(TODO_RECORD_STORAGE));
    }
  };

  /**
   * Updates sessions Storage
   * @param {SessionStorageInterface} sessionStorage
   */
  updateSessionStorage = (sessionStorage: SessionStorageInterface) => {
    localStorage.setItem(TODO_RECORD_STORAGE, JSON.stringify(sessionStorage));
  };

  /**
   * Opens new session in Storage
   * @param {string} key
   * @param store
   */
  openSession = (key: string, store: any): void => {
    Promise.resolve(this.getSessionStorage())
      .then((storage: SessionStorageInterface) => {

      storage[key] = [];
      storage[key].concat(store);

      this.updateSessionStorage(storage);
    });
  };

  /**
   * Update session in Storage
   * @param {string} key
   * @param store
   */
  updateSession = (key: string, store: any) => {
    Promise.resolve(this.getSessionStorage())
      .then((storage: SessionStorageInterface) => {
        storage[key].concat(store);
        this.updateSessionStorage(storage);
    })
  };

  /**
   * Remove session from Storage
   * @param {string} key
   */
  removeSession = (key: string) => {
    Promise.resolve(this.getSessionStorage())
      .then((storage: SessionStorageInterface) => {
        delete(storage[key]);
        this.updateSessionStorage(storage);
      })
  };

  /**
   * Get session by key from Storage
   * @param {string} key
   * @param {(storage: Array<any>) => void} callback
   */
  getSession = (key: string, callback: (storage: Array<any>) => void ) => {
    Promise.resolve(this.getSessionStorage())
      .then((storage: SessionStorageInterface) => {
        callback(storage[key]);
      })
  };
}
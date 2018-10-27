import {RECORD_SESSION_NOT_SET, TODO_RECORD_STORAGE} from "../constants/Constants";

export interface SnapshotInterface {
  storeSnapshot: any;
  status: string;
}

export interface SessionStorageInterface {
  [key: string] : Array<SnapshotInterface>;
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
    return false
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
  openSession = (key: string, snapshot: SnapshotInterface): void => {
    if (key !== RECORD_SESSION_NOT_SET) {
      Promise.resolve(this.getSessionStorage())
        .then((storage: SessionStorageInterface) => {

          storage[key] = [];
          storage[key].push(snapshot);

          this.updateSessionStorage(storage);
        });
    }
  };

  /**
   * Close session
   * @param {string} key
   * @param {SnapshotInterface} snapshot
   */
  closeSession = (key: string, snapshot: SnapshotInterface): void => {
    if (key !== RECORD_SESSION_NOT_SET) {
      Promise.resolve(this.getSessionStorage())
        .then((storage: SessionStorageInterface) => {
          storage[key].push(snapshot);
          this.updateSessionStorage(storage);
        });
    }
  };

  /**
   * Update session in Storage
   * @param {string} key
   * @param {SnapshotInterface} snapshot
   */
  updateSession = (key: string, snapshot: SnapshotInterface) => {
    if (key !== RECORD_SESSION_NOT_SET) {
      Promise.resolve(this.getSessionStorage())
        .then((storage: SessionStorageInterface) => {
          storage[key].concat(snapshot);
          this.updateSessionStorage(storage);
      })
    }
  };

  /**
   * Remove session from Storage
   * @param {string} key
   */
  removeSession = (key: string) => {
    if (key !== RECORD_SESSION_NOT_SET) {
      Promise.resolve(this.getSessionStorage())
        .then((storage: SessionStorageInterface) => {
          delete(storage[key]);
          this.updateSessionStorage(storage);
        })
    }
  };

  /**
   * Get session by key from Storage
   * @param {string} key
   * @param {(storage: Array<any>) => void} callback
   */
  getSession = (key: string, callback: (storage: Array<any>) => void ) => {
    if (key !== RECORD_SESSION_NOT_SET) {
      Promise.resolve(this.getSessionStorage())
        .then((storage: SessionStorageInterface) => {
          callback(storage[key]);
        })
    }
  };
}
import {USER_PREFERENCES_KEYS, USER_PREFERNECES_STORAGE_KEY} from '../constants.js';
export class UserPreferencesManager {
  /**
   * Writes given user preferences as they are.
   * @param  {Object} preferences The Object containing the preferences.
   * @return {void}
   */
  setPreferences(preferences) {
    let mergedPreferences = Object.assign(this.getPreferences(), this._filterPreferences(preferences));
    window.localStorage.setItem(USER_PREFERNECES_STORAGE_KEY, JSON.stringify(mergedPreferences));
  }

  /**
   * Reads the user preferences.
   * @return {Object} JSON Object with user preferences.
   */
  getPreferences() {
    return JSON.parse(window.localStorage.getItem(USER_PREFERNECES_STORAGE_KEY)) || {};
  }

  /**
   * Filters the given Object for allowed user preferences keys.
   * @param  {Object} preferences The raw preferences object.
   * @return {Object} The filtered preferences object.
   */
  _filterPreferences(preferences) {
    preferences = Object.assign({}, preferences);
    Object.keys(preferences)
          .filter(key => !USER_PREFERENCES_KEYS.includes(key))
          .forEach(key => delete preferences[key]);

    return preferences;
  }
}

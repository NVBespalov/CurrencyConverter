/**
 * Created by nbespalov on 5/27/17.
 */
export const loadState = () => JSON.parse(localStorage.getItem('state'));
export const saveState = state => localStorage.setItem('state', JSON.stringify(state));

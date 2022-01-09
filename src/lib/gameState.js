import { browser } from '$app/env';
import { writable } from 'svelte/store';

let storedDate;
if (browser) {
  const storedDateString = localStorage.getItem('lastPlayedDate');
  if (storedDateString) {
    storedDate = new Date(storedDateString);

    const today = new Date();
    var todayString = '' + today.getUTCFullYear() + today.getUTCMonth() + today.getUTCDate();
		var lastPlayedString = '' + storedDate.getUTCFullYear() + storedDate.getUTCMonth() + storedDate.getUTCDate();
		if (todayString != lastPlayedString) {
      console.log('A new day!');
      storedDate = today;
      window.localStorage.setItem('lastPlayedDate', storedDate.toISOString());
			window.localStorage.setItem('inputState', null);
      window.localStorage.setItem('rowState', null);
		}
  }
}
 
export const lastPlayedDate = writable(browser ? storedDate : new Date());
lastPlayedDate.subscribe((value) => { if (browser) window.localStorage.setItem('lastPlayedDate', value == null ? null : value.toISOString())});

export const inputState = writable(browser ? JSON.parse(localStorage.getItem('inputState')) ?? Array(5).fill('') : Array(5).fill(''));
inputState.subscribe((value) => { if (browser) localStorage.setItem('inputState', JSON.stringify(value))});

export const rowState = writable(browser ? JSON.parse(localStorage.getItem('rowState')) ?? [] : []);
rowState.subscribe((value) => { if (browser) localStorage.setItem('rowState', JSON.stringify(value))});
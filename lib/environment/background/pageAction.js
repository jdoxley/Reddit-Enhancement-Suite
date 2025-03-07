/* @flow */

import cssOff from '../../../images/css-off.png';
import cssOffSmall from '../../../images/css-off-small.png';
import cssOn from '../../../images/css-on.png';
import cssOnSmall from '../../../images/css-on-small.png';
import { addListener, sendMessage } from './messaging';

chrome.action.onClicked.addListener(tab => {
	sendMessage('pageActionClick', undefined, tab.id);
});

addListener('pageAction', ({ operation, state }, { tab }) => {
	switch (operation) {
		case 'show':
			chrome.action.enable(tab.id);
			chrome.action.setIcon({
				tabId: tab.id,
				path: { /* eslint-disable quote-props */
					'19': state ? cssOnSmall : cssOffSmall,
					'38': state ? cssOn : cssOff,
				},
			});
			chrome.action.setTitle({
				tabId: tab.id,
				title: state ? 'Subreddit Style On' : 'Subreddit Style Off',
			});
			break;
		case 'hide':
			chrome.action.disable(tab.id);
			break;
		default:
			throw new Error(`Invalid pageAction operation: ${operation}`);
	}
});

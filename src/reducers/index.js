import { combineReducers } from 'redux';

import auth from './auth';
import donors from './donors';
import collections from './collections';
import wholesale from './wholesale';
import participants from './participants';
import email from './email';
import googlemaps from './googlemaps';

export default combineReducers({
    auth,
    donors,
    collections,
    wholesale,
    participants,
    email,
    googlemaps,
});
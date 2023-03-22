import { combineReducers } from 'redux';

import auth from './auth';
import donors from './donors';
import collections from './collections';
import notes from './notes';
import wholesale from './wholesale';
import participants from './participants';
import email from './email';
import googlemaps from './googlemaps';

export default combineReducers({
    auth,
    donors,
    collections,
    notes,
    wholesale,
    participants,
    email,
    googlemaps,
});
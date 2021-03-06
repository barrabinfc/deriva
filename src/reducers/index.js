import { combineReducers } from 'redux';
import uiReducer , { historyReducer} from './ui';

import user from './deriva/user.js';
import { docs , watch, insert } from './deriva/docs.js';
import { channels } from './deriva/channel.js';

const deriva = combineReducers({
  /*
   * Raw data, for example
   *
   * user -> Authenticated|Anonymous user
   * docs -> Collection of docs PouchDocuments
   * channels -> Collection of all channels PouchDocuments
   */
  data: combineReducers({
    user,
    docs,
    channels
  }),

  /*
   *  UI State and options
   */
  ui: uiReducer({
    header: {
      floated: true,
      channel_filter_enabled: false
    },
    docs: {}
  }),

  history: historyReducer()
});

export default deriva;

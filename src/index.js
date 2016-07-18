import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { Provider } from 'react-redux';
import storeMaker from './store';
import actions from './actions';

import config from 'config';
window.config = window.defaultConfig = config;




// Start Pouchdb API
import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import PouchSync from 'pouch-websocket-sync'
import PouchFind from 'pouchdb-find';
import PouchUpsert from 'pouchdb-upsert';
import PouchRelational from 'relational-pouch';

PouchDB.plugin( PouchFind );
PouchDB.plugin( PouchDBAuth );
PouchDB.plugin( PouchUpsert );
PouchDB.plugin( PouchRelational );
PouchDB.debug.enable('pouchdb:http');

// db sync
let remote_db = new PouchDB( config.POUCHDB_SERVER )
let local_db = remote_db;

// Offline first
if(config.POUCHDB_OFFLINE_FIRST){
  let local_db = new PouchDB('docs')

  /*
   * Enable sync with remote
   */
  const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
  const clientEvents = ['connect', 'disconnect', 'reconnect'];

  let sync = PouchDB.sync( remote_db, local_db, {live: true, retry: true});

  syncEvents.forEach( (ev) => {
    sync.on(ev, (info) => {
      if(ev == 'change'){
        console.log( `sync:${ev} --> ${info}`, info)
      }
      //store.dispatch({type: actions.SET_SYNC_STATE, data: ev});
    })
  });
}


window.PouchDB = PouchDB
window.remote_db = remote_db;
window.db = local_db;


// load models
import dataModels from 'models/index.js';
window.dataModels =  dataModels(window.db);


// Create session store
let store = window.store = storeMaker(window.db);





/*
 * routes
 */
import { Router, match, Route, Link, browserHistory } from 'react-router';
import routes from './routes/root';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({routes, location}, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
  )
})




// Export for debugging

//window.trrnt = webtrrnt_client;

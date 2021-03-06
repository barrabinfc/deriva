import _ from 'lodash';

/*
 * Pouchdb Online/offline
 */
export const POUCHDB_READY = 'POUCHDB_READY';
export function dbReady( db ){
  return {type: POUCHDB_READY, db };
}
export const POUCHDB_ERROR = 'POUCHDB_ERROR';
export function dbError( db ){
  return {type: POUCHDB_ERROR, db };
}

export const POUCHDB_PULL          = 'POUCHDB_PULL';
export const POUCHDB_PULL_SUCCESS  = 'POUCHDB_PULL_SUCCESS';
export const POUCHDB_PULL_ERROR    = 'POUCHDB_PULL_ERROR';

export const POUCHDB_PUSH          = 'POUCHDB_PUSH';
export const POUCHDB_PUSH_SUCCESS  = 'POUCHDB_PUSH_SUCCESS'
export const POUCHDB_PUSH_ERROR    = 'POUCHDB_PUSH_ERROR'

export const QUERY_REMOVE = 'POUCHDB_REMOVE';
export const QUERY_REMOVE_ERROR = 'POUCHDB_REMOVE_ERROR';

export const INSERT = 'POUCHDB_INSERT';
export const INSERT_ERROR = 'POUCHDB_INSERT_ERROR';

export const FIND = 'POUCHDB_FIND';
export const FIND_ERROR    = 'POUCHDB_FIND_ERROR';

export const QUERY = 'POUCHDB_QUERY';
export const QUERY_ERROR  = 'POUCHDB_QUERY_ERROR';

export const SET_SYNC_STATE = 'SET_SYNC_STATE';


/*
 * A redux action for getting all documents of type doc_type
 * from PouchDB 'db'.
 *
 * dispatch redux 'ACTION' multiple times,
 *    'ACTION' on request
 *    'ACTION_SUCCESS' on sucess
 *    'ACTION_ERROR' on error
 */
export function findAll( db, action , doc_type , args=false){
  return (dispatch) => {
    dispatch({type: action});
    return new Promise( (resolve,reject) => {
      db.rel.find( doc_type ).then( (results) => {
        let r = results[doc_type];
        dispatch( {type: `${action}_SUCCESS`, data: r});
        return resolve( r );
      }).catch( (err) => {
        dispatch( {type: `${action}_ERROR`, data: err });
        reject( err );
      });
    });
  }
}


/*
 * A redux action to get a single document by the given 'id' from 'db'
 */
export function find( db, action, doc_type, doc_id_params ) {
  return (dispatch) => {
    dispatch({type: action, data: doc_id_params})
    return new Promise( (resolve, reject) => {
      db.rel.find( doc_type, doc_id_params )
        .then( (results) => {
          let r = results[doc_type];
          if(r.length == 1) r = r[0];

          dispatch( {type: `${action}_SUCCESS`, data: r});
          resolve(r);
      }).catch( (err) => {
          dispatch( {type: `${action}_ERROR`, data: err} );
          reject(err);
      });
    });
  }
}


/*
 * Insert a document to db
 */
export const insert = ( db, action, doc_type, doc_params ) => {
  return (dispatch) => {
    dispatch({type: action, data: doc_params});
    return new Promise( (resolve,reject) => {
      db.rel.save( doc_type, doc_params ).then( (response) => {
        let r = response[doc_type];
        if(r.length == 1) r = r[0];

        dispatch( {type: `${action}_SUCCESS`, data: r});
        resolve( r )
      }).catch( (err) => {
        dispatch( {type: `${action}_ERROR`, data: err} );
        reject( err );
      });
    });
  }
}

/*
 * remove a document
 */
export const remove = (db, action, doc_type, doc_params) => {
  return (dispatch) => {

    let doc_id = ( _.isString(doc_params) ? doc_params
                    : db.rel.makeDocID( doc_params) );

    dispatch({type: action, data: doc_params});
    return new Promise( (resolve,reject) => {
      db.rel.del( doc_type, doc_params ).then( (remove_data) => {
          let doc_data = _.merge( doc_params, remove_data );
          dispatch( {type: `${action}_SUCCESS`, data: doc_data });
          resolve(doc_data);
      }).catch( (err) => {
          dispatch( {type: `${action}_ERRROR`, data: err});
          reject(err);
      });
    });
  }
}

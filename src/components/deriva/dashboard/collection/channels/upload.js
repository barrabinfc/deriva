
import React from 'react';
import _ from 'lodash';

import {  Link } from 'react-router';
import classNames from 'classnames';

import utils from 'utils/index.js';

require('styles/deriva/dashboard/collection/channels/upload.scss');

let UploadComponent = React.createClass({
  getInitialState() {
    return { success: false, failed: false, message: false};
  },

  uploadChannel(ev) {
    // cancel form submission
    ev.preventDefault();

    let channel_props = {
                     title: this.refs.title.value,
                     subtitle: this.refs.subtitle.value,
                     description: this.refs.description.value,
                     tags: this.refs.tags.value,
                     order: this.refs.order.value,
                     docs: []
                    }

    //let newChannel = new dataModels.Channel( doc_props );
    this.props.actions.insert_channel( channel_props ).then( (response) => {
      console.log('insert_doc success', response);
    }).catch( (err) => {
      console.error(err);
    });
  },


  componentWillReceiveProps( newProps ) {
    console.log('componentWillReceiveProps', newProps);
    // error/success messages
     if(_.has(newProps,'uploaded') && !newProps.uploaded.error ){
       this.setState({message: `Created ${newProps.upload._id}`});
     }
  },

  render() {
    let upload_classes = {success: this.state.success, failed: this.state.failed };
    return (<div className={classNames("upload-component box", upload_classes)}>
            <form onSubmit={this.uploadChannel}>

              <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" ref="title" id="title" placeholder="Título" />
              </div>
              <div className="form-group">
                <label for="title">subtitle</label>
                <input type="text" className="form-control" ref="subtitle" id="subtitle" placeholder="SubTítulo"/>
              </div>
              <div className="form-group">
                <label for="title">Description</label>
                <textarea rows="4" cols="4" className="form-control" ref="description" id="description" placeholder="Descrição" >
                </textarea>
              </div>

              <div className="form-group">
                <label for="tags">Tags</label>
                <input type="text" className="form-control" ref="tags" id="tags" placeholder="Tags"/>
              </div>
              <div className="form-group">
                <label for="author">order</label>
                <input type="range" min="0" max="100" step="1" defaultValue="0" className="form-control" ref="order" id="order"/>
              </div>

              <div className="terms">
                { this.state.message ? (<p>{this.state.message}</p>) :
                  (<div/>) }
              </div>
              <button className="btn btn-primary submit">
                Enviar ✨
              </button>
            </form>
            </div>
    );
  }
});

UploadComponent.displayName = 'Deriva.dashboard.collection.channels.UploadComponent';

// redux
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
UploadComponent = connect( (state) => {
  return {upload: state.upload}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(UploadComponent);

export default UploadComponent;
module.exports = UploadComponent;

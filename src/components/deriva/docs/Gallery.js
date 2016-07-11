import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

let Isotope = require('isotope-layout')

require('styles/deriva/docs/gallery.scss');

/*
 * Media gallery
 */
let GalleryComponent = React.createClass({
  getInitialState() {
    return {isotope: false}
  },

  componentDidMount( ) {
    this.props.actions.list_all_docs();
  },


  componentDidUpdate() {
    if(!this.state.isotope){

      // create isotope layot
      this.setState({isotope:  new Isotope( this.refs.gallery, {
        itemSelector: '.item',
        layoutMode: 'masonry',
        percentPosition: true
      }) });

    } else {

      // Reload items plz
      console.log("gallery: isotope.reloadItems", this.props.docs.length);
      this.state.isotope.reloadItems();
    }
  },

  itemClick(ev){
    ev.preventDefault();
    let target = ev.target;

    // Go to doc url
    let uri = target.getAttribute('href');
    browserHistory.push(uri);
  },

  render() {

    // inline style for .item element
    let idx = 0;
    let itemStyle = (doc) => {
      return {
        backgroundImage: `url(${doc.data.oembed.thumbnail_url})`
      }
    }

    return (<div className="gallery-page docs">
              <section className="header">
                <h1> All Docs </h1>
              </section>

              <section className="actions">
                <div className="info">Total: <strong>{this.props.docs.length}</strong></div>

              </section>
              <div className="gallery" ref="gallery">
                {this.props.docs.map( (doc, i) =>
                  <Link
                      ref={`item[${i}]`} doc={doc} key={doc._id}
                      to={`/docs/watch/${doc._id}`} onClick={this.itemClick}
                      className={classNames('item','clickable')} style={itemStyle(doc)}>
                    <span className="label passtrough">
                      <span className="helper"></span>
                      <span className="info">
                        <h2>{doc.data.title}</h2>
                        <hr></hr>
                        <p>{doc.data.provider_name}</p>
                      </span>
                    </span>
                  </Link>
                )}
              </div>
          </div>
    );
  }
});

GalleryComponent.displayName = 'Deriva.GalleryComponent';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

GalleryComponent = connect( (state) => {
  return {docs: state.docs}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(GalleryComponent);


export default GalleryComponent;
module.exports = GalleryComponent
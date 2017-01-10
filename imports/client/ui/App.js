import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Header from './components/Header';
import Form from './components/Form';
import Item from './components/Item';

import Items from '../../api/Items';

class App extends Component {
  render() {

    if (!this.props.ready) {
      return <div className='loading'>
        <h2>Loading...</h2>
      </div>
    }

    return (
      <div>
        <Header />
        <main>
          <Form />
          {this.props.items.map((item) => <Item item={item} key={item._id} />)}
        </main>
      </div>
    );
  }
}

export default createContainer(() => {
  let itemsSub = Meteor.subscribe('allItems');
  return {
    ready: itemsSub.ready(),
    items: Items.find({}, {
      limit: 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App);
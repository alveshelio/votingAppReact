import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Header from './components/Header';
import Form from './components/Form';
import Item from './components/Item';

import Items from '../../api/Items';

class App extends Component {
  render() {
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
  return {
    items: Items.find({}).fetch()
  }
}, App);
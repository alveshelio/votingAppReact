import React, { Component } from 'react';

import Items from '../../../api/Items';

export default class Form extends Component {
  addItems(e) {
    e.preventDefault();

    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();

    if (itemOne !== '' && itemTwo !== '') {
      Items.insert({
        itemOne: {
          text: itemOne,
          value: 0
        },
        itemTwo: {
          text: itemTwo,
          value: 0
        }
      });

      this.refs.itemOne.value = '';
      this.refs.itemTwo.value = '';

    }
  }

  render() {
    return (
      <form className='new-items' onSubmit={this.addItems.bind(this)}>
        <input type='text' ref='itemOne' />
        <input type='text' ref='itemTwo' />
        <button>Add Items</button>
      </form>
    );
  }
}

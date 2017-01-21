import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';

@autobind

export default class Form extends Component {
  addItems(e) {
    e.preventDefault();

    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();

    if (itemOne !== '' && itemTwo !== '') {
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if (!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        } else {
          console.log(err);
        }
      });
    }
  }

  render() {
    return (
      <form className='new-items' onSubmit={this.addItems}>
        <input type='text' ref='itemOne' />
        <input type='text' ref='itemTwo' />
        <button>Add Items</button>
      </form>
    );
  }
}

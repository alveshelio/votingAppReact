import React, { Component } from 'react';

export default class Item extends Component {
  voteOne() {
    Meteor.call('voteOnItem', this.props.item._id, 'itemOne', (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  voteTwo() {
    Meteor.call('voteOnItem', this.props.item._id, 'itemTwo', (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
  render() {
    return (
      <div className='item'>
        <div className='vote-one' onClick={this.voteOne.bind(this)}>
          <span>{this.props.item.itemOne.value}</span>
          <h3>{this.props.item.itemOne.text}</h3>
        </div>
        <span>vs</span>
        <div className='vote-two' onClick={this.voteTwo.bind(this)}>
          <span>{this.props.item.itemTwo.value}</span>
          <h3>{this.props.item.itemTwo.text}</h3>
        </div>
      </div>
    );
  }
}

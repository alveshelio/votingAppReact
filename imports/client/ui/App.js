import { Session } from 'meteor/session';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Items from '../../api/Items';

import Form from './components/Form';
import Item from './components/Item';
import IsRole from '../../utilities/IsRole';

import { autobind } from 'core-decorators';

@autobind


class App extends Component {
  showAllItems() {
    Session.set('showAll', !Session.get('showAll'));
  }

  render() {
    if (!this.props.ready) {
      return <div className='loading'>
        <h2>Loading...</h2>
      </div>
    }

    return (
      <div>
        <IsRole role='admin'>
          <button className='show-all' onClick={this.showAllItems}>
            Show {Session.get('showAll') ? 'One' : 'All'}
          </button>
        </IsRole>
        <main>
          <Form />
          <ReactCSSTransitionGroup
            transitionName='item'
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
          >
            {this.props.items.map((item) => <Item item={item} key={item._id} />)}
          </ReactCSSTransitionGroup>
        </main>
      </div>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems');
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get("showAll");

  let itemsArray;
  if (params.id) {
    itemsArray = Items.find({ _id: params.id }).fetch();
  } else {
    itemsArray = Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch();
  }

  return {
    showAll,
    ready: itemsSub.ready() && userSub.ready(),
    items: itemsArray
  }
}, App);
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Items = new Mongo.Collection('items');

if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find({}, {
      limit: 10,
      sort: { lastUpdated: 1 }
    });
  });

  Meteor.methods({
    insertNewItem(itemOne, itemTwo) {
      check(itemOne, String);
      check(itemTwo, String);

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
    },
    voteOnItem(itemId, position) {
      let lastUpdated = new Date();

      if (Meteor.userId()) {
        if (position === 'itemOne') {
          Items.update(itemId, {
            $inc: {
              'itemOne.value': 1
            },
            $set: {
              lastUpdated
            }
          });
        } else {
          Items.update(itemId, {
            $inc: {
              'itemTwo.value': 1
            },
            $set: {
              lastUpdated
            }
          });
        }
      }
    }
  });
}

export default Items;

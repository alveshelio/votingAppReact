import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Items = new Mongo.Collection('items');

if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find();
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
      if (Meteor.userId()) {
        if (position === 'itemOne') {
          Items.update(itemId, {
            $inc: {
              'itemOne.value': 1
            }
          });
        } else {
          Items.update(itemId, {
            $inc: {
              'itemTwo.value': 1
            }
          });
        }
      }
    }
  });
}

export default Items;

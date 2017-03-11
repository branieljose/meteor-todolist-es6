//let's me do Meteor.call... below to call methods from the imports/api/tasks.js file
import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
	//can't do this because got rid of the insecure package and I'm not exporting Tasks in the imports/api/tasks.js file like I am on line 6 of imports/api/tasks.js
	    // Set the checked property to the opposite of its current value
	    // Tasks.update(this._id, {
	    //   $set: { checked: ! this.checked },
	    // });

    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
  	//can't do this because got rid of the insecure package and I'm not exporting Tasks in the imports/api/tasks.js file like I am on line 6 of imports/api/tasks.js
    	//Tasks.remove(this._id);

    Meteor.call('tasks.remove', this._id);
  },
});
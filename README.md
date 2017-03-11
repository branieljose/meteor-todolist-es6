* files inside the import folder only load if they are imported

* meteor uses spacebars (kind of like handlebars)

in todolist app
imports/ui/task.html appears checked if this happens
  <li class="{{#if checked}}checked{{/if}}">

## Client Side Data Filtering

Client-side data filtering feature to our app, so that users can check a box to only see incomplete tasks. 

We use a ReactiveDict to store temporary reactive state on the client. 

A ReactiveDict is like a normal JS object with keys and values, but with built-in reactivity.

$ meteor add reactive-dict

and then put it in the imports/ui/body.js file:

import { ReactiveDict } from 'meteor/reactive-dict';


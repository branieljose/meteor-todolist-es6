# Why Meteor & Blaze? 

* super easy to do real time reactive apps 
	* 8x faster to build a similar app with Express, Socket.io, React, Redux

* call server side methods in the client

* access and update the session in the client

* amazing community focused on making things super easy to build and understand. Other frameworks are built by engineers that overengineer everything, and hence complicate usage of what they build.

* tie session like variables to template files on the client (Reactive Vars)

* automatically installs meteor packages when you run meteor to start the app

* go ahead use node packages

* it predicts what will happen to make it seem like it's happening faster than it really is
	* When you call a method on the client using Meteor.call, two things happen in parallel:

		* The client sends a request to the server to run the method in a secure environment, just like an AJAX request would work

		* A simulation of the method runs directly on the client to attempt to predict the outcome of the server call using the available information

			* What this means is that a newly created task actually appears on the screen before the result comes back from the server.

				* If the result from the server comes back and is consistent with the simulation on the client, everything remains as is. If the result on the server is different from the result of the simulation on the client, the UI is patched to reflect the actual state of the server.

* meteor uses spacebars 
	* kind of like handlebars but much easier because data is automatically available in views as opposed to having to send it there

* out of the box: automatic app refresh when code changes

* super easy authentication - like seriously - it's really really easy.

* easy deployment with galaxy

* front end first mentality let's you focus on making quick prototypes without worrying about the backend (lean start up mentality)
	* in Meteor you don't worry about the back end - you just write the front end and the back end kind of magically happens
	* in retrospect, the Ruby On Rails way is to worry about the back end first (good too but better for business logic and back end heavy apps)
	* it comes out of the box FOR SPEED OF DEVELOPMENT
		* it has an insecure package to let you edit the entire database from the chrome console 

# Why not Meteor & Blaze?

* it uses MongoDB, which is a pain to do reporting on

* harder to scale out of the box

* not many jobs out there for Meteor

# Don't use Meteor with React or Angular

* just don't. 

## General Info 

files inside the import folder only load if they are imported

in todolist app
imports/ui/task.html appears checked if this happens

```
<li class="{{#if checked}}checked{{/if}}">
```

## User Authentication

facebook auth:
```
$ meteor add accounts-facebook
```

```
$ meteor add accounts-ui accounts-password
```

configuration code:
imports/startup/accounts-config.js

include this in imports/ui/body.js

```
import { Meteor } from 'meteor/meteor';
```

#### in html:

this displays login buttons

```
{{> loginButtons}}
```

check if user logged in

```
{{#if currentUser}}
	... if logged in
{{/if}}
```

get the currentUser's username:

```
{{currentUser.username}}
```

Meteor.userId() and Meteor.user().username gets the user id and name that user signs up with

Inside of imports/ui/body.js:

```
Tasks.insert({
  text,
  createdAt: new Date(), // current time
  owner: Meteor.userId(),
  username: Meteor.user().username,
});
```

## Security

#### remove the insecure package to prevent people from editing the database from the console. 

```
$ meteor remove insecure
```

doing this makes you have to write more code

but if you deploy without doing this then anyone can delete your database, impersonate someone else and you end up mixing your database logic with your client side code

in imports/api/tasks.js:

we add this to the top:

```
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
```

we add methods into Meteor.methods instead of exporting the entire collection to be modified on the client side

we add checks in Meteor.methods to make sure the data is of the correct type

```
check(text, String)

check(taskId, String)

check(setChecked, Boolean)
```

## Load less onto the client

by default Meteor loads the entire database on the client to make it faster for you to prototype and get features done (made for startups and getting things done fast!)

but when the database gets larger this isn't good, so stop doing it:

#### remove the autopublish package to stop loading the entire database onto the client

```
$ meteor remove autopublish
```

and then inside imports/api/tasks.js we add a publication

and then inside imports/ui/body.js we add a subscription

## Client Side Data Filtering

Client-side data filtering feature to our app, so that users can check a box to only see incomplete tasks. 

We use a ReactiveDict to store temporary reactive state on the client. 

A ReactiveDict is like a normal JS object with keys and values, but with built-in reactivity.

All of our state is in mongo collections and the view updates automatically when we modified the data inside these mongo collections. 

This is because Mongo.Collection is recognized by Meteor as a reactive data source, meaning Meteor knows when the data inside has changed. 

ReactiveDict is the same way, but is not synced with the server like collections are. 

This makes a ReactiveDict a convenient place to store temporary UI state like the checkbox above. Just like with collections, we don't have to write any extra code for the template to update when the ReactiveDict variable changes — just calling instance.state.get(...) inside the helper is enough.

```
$ meteor add reactive-dict
```

and then put it in the imports/ui/body.js file:

```
import { ReactiveDict } from 'meteor/reactive-dict';
```

then look in imports/ui/body.js of how we configure reactive-dict and use it to maintain scope

## Testing

different types of tests:

Unit test: If you are testing one small module of your application, you are writing a unit test. You’ll need to stub and mock other modules that your module usually leverages in order to isolate each test. You’ll typically also need to spy on actions that the module takes to verify that they occur.

Integration test: If you are testing that multiple modules behave properly in concert, you are writing an integration test. Such tests are much more complex and may require running code both on the client and on the server to verify that communication across that divide is working as expected. Typically an integration test will still isolate a part of the entire application and directly verify results in code.

Acceptance test: If you want to write a test that can be run against any running version of your app and verifies at the browser level that the right things happen when you push the right buttons, then you are writing an acceptance test (sometimes called “end to end test”). Such tests typically try to hook into the application as little as possible, beyond perhaps setting up the right data to run a test against.

Load test: Finally you may wish to test that your application works under typical load or see how much load it can handle before it falls over. This is called a load test or stress test. Such tests can be challenging to set up and typically aren’t run often but are very important for confidence before a big production launch.

System test: Make sure your database backups aren't backing up an empty database or a database that has less data than it should.

we use a test driver for the Mocha JavaScript test framework:

```
$ meteor add practicalmeteor:mocha
```

we can now run our app in test mode like this (we'll have to run it on a new port)

```
$ meteor test --driver-package practicalmeteor:mocha --port 3000
```

in imports/api/tasks.tests.js we write our test to check if a user can delete their own tasks
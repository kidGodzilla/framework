# "Framework"

Some totally unrelated things that might let you get away with not using a more complicated framework.

It's an MV* framework. I wrote it in about a day.

## "MV*"
#### Model
- App.data `{}`
- Getters & Setters
- One-way data binding

#### Views
- Templating
- Routing

#### Controllers
- Obsolete much?

## Features
#### Template engine
- String Interpolation with javascript objects
- For loops
- Switch statements
- Conditionals

#### Router
- Automatically registers templates -> routes
- Loads the correct route from URL
- Handles forward / backward state changes
- Intercepts [href] click events (through delegation) & routes them
- Automatically passes URL parameters (additional, unused route segments) to routing function


## Approximate Size
**Core Object:** 160 loc
<br>**Data Binding:** 20 loc
<br>**Utils:** 32 loc
<br>**Router:** 112 loc
<br>**Template Engine:** 50 loc

## Usage

#### Importing Dependencies
Take a close look at `loader.js`. This provides you a few simple hooks to load dependencies, either locally or from a CDN.

#### Creating Templates
Templating.js includes a feature-complete template engine, & any templates in your document will automatically become routes & views. Simply use the following syntax:

```html
<template data-pathname="index">
  <h2>Your content here</h2>
</template>
```
* You should specify, at minimum, an index template.

#### More Advanced Templating
Syntax for most things (conditionals, loops) tracks very closely to underscore.js & lodash.

```html
<template data-pathname="index">
  <% if (App.data.pageTitle) { %>
    <h2><% App.data.pageTitle %></h2>
  <% } %>
  
  <ul>
  <% for (var index in items) { %>
    <% items[index] %>
  <% } %>
  </ul>
</template>
```

#### Linking to Routes
Anything with an `href` attribute will be observed using event delegation. If you link to a hash, it will be handled automatically.

```html
<template data-pathname="index">
  <a href="#foo">foo</a>
  <h3>Index</h3>
</template>

<template data-pathname="foo">
  <a href="#">Go Home</a>
  <h3>foo!</h3>
</template>
```

#### Programmatic Route Transitions
Need to hook into a route transition from within your app? No problem! Simply call:

```javascript
Router.routeTo(<route-name>);
```

#### Data Modeling
Getter and Setter methods are provided as `App.get()` and `App.set()` for very basic data management. See an example:

```javascript
var name = prompt('what is your name?');
App.set('name', name);

// Later
alert('I remember your name! It's ' + App.get('name'));
```

#### Data Binding
"Framework" implements a wrapper around `Object.observe()` to facilitate one-way data binding in modern browsers. If your browser doesn't support this, you might need a <a href="https://github.com/MaxArt2501/object-observe" target="_new">polyfill</a>.

```javascript
// Logs to the console whenever Binding.data.previousRouteUnloadFunction is changed
Binding.bind('previousRouteUnloadFunction', function (newValue) {
    console.log(newValue);
});
```

#### Event Delegation
Just use jQuery (1.6+)! It offers very nice syntax for event delegation:

```javascript
// Log to the console when #foo is clicked
$('body').on('click', '#foo', function () {
  console.log('#foo was clicked!');
});
```

Alternatively, if you are coming from AngularJS & enjoy it's declarative syntax, you could try javascript's built-in, declarative event-binding syntax:

```html
<a onclick="Router.goBack()">Go Back</a>
<a onclick="App.addNewItem()">Add New Item</a>
<input id="input2" type="text" onkeyup="App.handleBoundData('#input2')">
```
See http://www.w3schools.com/jsref/dom_obj_event.asp for a longer list of DOM events.

#### Utilities, Data Manipulation, Ajax, etc.
Between lodash & jQuery, you should be fine.

# A Framework

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
<template data-pathname="your/full/pathname">
  <h2>Your content here</h2>
</template>
```

#### Linking to Routes

#### Programmatic Route Transitions



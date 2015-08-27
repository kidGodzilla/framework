# A Framework

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
### Template engine
- String Interpolation with javascript objects
- For loops
- Switch statements
- Conditionals

### Router
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

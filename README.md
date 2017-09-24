[![Build Status](https://travis-ci.org/StanleySathler/jquery-sth-select.svg?branch=master)](https://travis-ci.org/StanleySathler/jquery-sth-select)

---
## Table of contents
* [Project demo](#project-demo)
* [Introduction](#introduction)
* [About the component](#about-the-component)
* [How to use in my project](#how-to-use-in-my-project)
* [How can I use it? Please, help me!](#how-can-i-use-it-please-help-me)
* [How to contribute](#how-to-contribute)
* [Team members](#team-members)

## Project demo
* [Simple demo](https://stanleysathler.github.io/jquery-sth-select/example/)

## Introduction
The `jquery-sth-select` select component is built on top of jQuery and offers a good interface for both Desktop and Mobile.

## About the component
The component was created from a need: people can't customize native selects using CSS without tricks, and most custom selects in jQuery don't work so well on mobile devices.

The `jquery-sth-select` is useful for you if you:
* Have an app built on top of jQuery;
* Have a web application which needs a custom select interface (the native one does not look so well);
* Have a responsive web application which needs a custom select that works both on Desktop and Mobile.

## How to use in my project?
We're not officially being installed by **npm**, **Bower** or **Yarn** **yet**. But for now, if you want to test it, you can download the files available in `/dist` directory and link them in your `.html` file(s).

```html
<head>
	<link rel="stylesheet" href="/path/to/jquery-sth-select/dist/sth-select.css" />
	<script type="text/javascript" src="/path/to/jquery-sth-select/dist/sth-select.js"></script>
</head>
```

## How can I use it? Please, help me!
Wait, little grasshopper. We are not going to leave you in the lurch after made you excited with this awesome component.

### HTML API
Creating a simple component just requires you add the `sth-select` attribute to your tag:
```html
<select sth-select></select>
```

Also, you can add a **title** which appears on your select's popup:
```html
<select
	sth-select
	sth-select-title="A title"
></select>
```

You might want to add a **placeholder** to your select when no item is selected.
```html
<select
	sth-select
	sth-select-placeholder="A placeholder"
></select>
```

Sometimes, you have a lot of items and want to be able to **search** by them. **But be aware:** we have not the best search algorithm yet.
```html
<select
	sth-select
	sth-select-filter="true"
></select>
```

Oh, and almost forgot: the filter field can also has a custom placeholder:
```html
<select
	sth-select
	sth-select-filter-placeholder="Search for an item"
></select>
```

## How to contribute?
**AWESOME!** This is exactly what we wanted to hear from you! :D

The first thing you must know: you don't need to be scared about "not being the best developer in the world". We highly encourage beginner developers to contribute with our code, because they can learn with the experienced developers and, at the same time, experienced developers can learn with them. Yes, beginner developers teach too.

If you want to contribute but you are not so sure about your code, make a Pull Request (PR) anyway. The team will not blame you; on the contrary, we can make constructive comments in your PR until you get it accepted.

Let's build a friendship. Help us. :)

To contribute, you must prepare your environment first following a few steps:

**1)** To start, the first thing is fork this repository to your GitHub profile. You can do it clicking on the "Fork" button on the top right corner. After forking, you need to clone the repository into your machine.

**2)** Being inside the project directory, install the dependencies from **npm** and **Bower**:
```
$ npm install && bower install
```

**3** Now, concat your JavaScript and CSS files using the [Gulp](https://gulpjs.com/):
```
$ gulp vendor && gulp
```

Now, everything is ready. Just open the `/example/index.html` to test any changes you make. But don't forget: each modification, you might need to use the `$ gulp` command again.

## Team members
* Stanley Sathler <<stanleysathlerpinto@gmail.com>>
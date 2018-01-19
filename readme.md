My Little Starship 5
=======

## A simple proof-of-concept for a straightforward starship maintenance game based on meaningful narrative choices.

![Image](readmeImage.png)

This game is designed to run in-browser using the [Phaser.io game library](phaser.io) for Javascript and HTML5. It also uses the simple but excellent [SlickUI](https://github.com/Flaxis/slick-ui), a lightweight UI plugin for Phaser.

You'll see the code is structured using a basic state machine, very similar to the one set out in [this tutorial](http://perplexingtech.weebly.com/game-dev-blog/using-states-in-phaserjs-javascript-game-developement). The meat of the game is split across play.js and map.js.

The art is all original pixel stuff, except for the UI graphics which are courtesy of [Kenney](http://kenney.nl/). You might notice a few template .pdn files knocking about - these are to be cleaned up prior to release, but it's handy to keep them there for now.

JSON files containing event text and map data can be found in res\data. If you're interested in contributing some encounter text, I've made a [Google Sheets document](https://docs.google.com/spreadsheets/d/1gmbn1WAOml6dYxnaygOmjvSaYXJNdVN0u6ByJNYkhsE/edit#gid=0) with instructions. Eventually it'd be nice to have an in-game editor.

Since this is a proof-of-concept I'm working with a comfortable resolution which isn't necessarily ideal for mobile devices, and which can't be mucked about with unless you want to ruin my beautiful handcrafted pixels. Take care!
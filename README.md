# OpenRailRouting Maps

A route planner user interface for the [OpenRailRouting routing engine](https://github.com/graphhopper/graphhopper) released under the Apache License 2.0.

This is a fork of [GraphHopper Maps](https://github.com/graphhopper/graphhopper-maps).

[Try it out](https://routing.openrailrouting.org/)!

**The following is the original readme of GraphHopper Maps.**

## Start development:

 * Clone this repository.

Building:

 * Make sure node and npm are installed. We recommend using the iron LTS (node v24.12.0 and npm v11.6.2).
 * `npm install`
 * `npm run serve`

As an alternative, you can run Node in a Docker container:

 * Build the Docker image: `./build_docker.sh`
 * Start the container: `./start_container.sh COMMAND` where `COMMAND` is any of: `format`, `serve`, `build`, `build-debug`, `test`

Try it out:

 * Open your browser at http://0.0.0.0:3000/.
 * Start development. The browser will update automatically when you change the code.
 * Format the code and run the tests using `npm run format` and `npm run test`.
 * Fork the repository and create a pull request. Contributions are welcome. Feel free to discuss your changes in
   the GitHub [issues](https://github.com/graphhopper/openrailrouting-maps/issues).
 * You can build the production bundle using `npm run build`.
 * If you use the Directions API edit the config to show profile icons properly (see 'Advanced configuration' section below).

## Advanced configuration

You can point the app to a different url, like a [local GraphHopper server](https://github.com/graphhopper/graphhopper), 
add different map tile providers and more in the [config.js](./config.js) file. For such changes it is
best to create a copy of this file called `config-local.js` which will be ignored by git.

## Powered By

This project uses

 * the great [OpenLayers library](https://openlayers.org/).
 * the [codemirror](https://codemirror.net/) code editor for the custom model editor.
 * many icons from Google's [open source font library](https://fonts.google.com/icons).
 * many more open source projects – see the package.json


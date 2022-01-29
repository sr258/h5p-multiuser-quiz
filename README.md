# H5P shared state sample

A simple voting content types that demonstrates how to use lumieducation's
shared state server.

## Getting started (development)

Requirements:

- NodeJS >= 16
- NPM >= 7

Clone this repository with git and check out the branch that you are interested
in (or choose the branch first and then download the archive, but learning
how to use git really makes sense).

Change to the repository directory and run

```bash
npm install
```

to install required modules. Afterwards, you can build the project using

```bash
npm run build
```

or, if you want to let everything be built continuously while you are making
changes to the code, run

```bash
npm run build:watch
```

Before putting the code in production, you should always run `npm run build`.

The build process will transpile TypeScript to JS that can be used in browser.
The build process will also move the source files into one distribution file and
minify the code.

## Adding to WordPress

- Make sure the directory of this repository is "H5P.ShareDBTest-0.1" (or the
  current version number).
- run `npm build`
- Install the H5P CLI tool from NPM (`npm install -g h5p`)
- go the parent directory of the repo
- run `h5p package H5P.ShareDBTest-0.1`
- Upload the resulting libraries.h5p file to WordPress (Make sure you've set these values in wp-config.php when you want to upload the same version again):
  - define('H5P_DEV', true);
  - define('H5P_DISABLE_AGGREGATION', true);



Flattastic Pro Color Palette by
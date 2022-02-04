# H5P Multi-user Quiz

A Kahoot-like quiz that uses Lumieducation's shared state server extension for
H5P.

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

- Make sure the directory of this repository is "H5P.MultiuserQuiz-0.1" (or the
  current version number).
- run `npm build`
- Install the H5P CLI tool from NPM (`npm install -g h5p`)
- go the parent directory of the repo
- run `h5p pack H5P.MultiuserQuiz-0.1`
- Upload the resulting libraries.h5p file to WordPress (Make sure you've set these values in wp-config.php when you want to upload the same version again):
  - define('H5P_DEV', true);
  - define('H5P_DISABLE_AGGREGATION', true);

## Attributions

This content type uses colors by the "Flattastic Pro Color Palette".
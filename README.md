<img src="https://camo.githubusercontent.com/97b4f26bedb5faf9f9eb71296095f78b557b124c/68747470733a2f2f7365616e776174746572732e696f2f696d616765732f72656163746976652d616d6265722d6c6162656c2e706e67" alt="reactive-amber" data-canonical-src="https://seanwatters.io/images/reactive-amber-label.png" height="200">

<a href="https://amberframework.org/"><img src="https://img.shields.io/badge/using-amber_framework-black.svg" ></a>
<a href="https://github.com/seanwatters/reactive-amber/"><img src="https://img.shields.io/badge/using-reactive_amber-darkgrey.svg" ></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-lightblue.svg" ></a>

# Reactive Amber CLI

This is a development tool for quickly scaffolding Amber apps using the [Reactive Amber](https://github.com/seanwatters/reactive-amber) recipe for the framework. 

## Installation

To run the **Reactive Amber CLI**, you will need to have first created and Amber project using the **Reactive Amber** recipe.

```
amber new <project-name> -r seanwatters/reactive-amber

cd <project-name>
```

From here, you will need to install the dependencies, including the **Reactive Amber CLI**:

```
npm install
```

You can now use the tool. A script has been written into your projects, `package.json` file that will run the `node frontend-react/dev/react-tools.js` command for you.

```
npm run react-tools

// alternatively
node react-frontend/dev/react-tools.js
```

## Usage

Now that the tool is installed, when you run `npm num react-tools`, you will be prompted with the following:

```
? Select Generator
> componenet
> scaffold
> api
```

Selecting `component` will prompt you to enter the component name, props and state. (state and props are not currently functional, but will be soon):

```
? Select Generator component
? Component Name: NewComponent
? Component State: <component-state>
? Component Props: <component-props>
```

This will generate a file in the `frontend-react/src/components/`:

```
|- frontent-react
    |- dev
    |- src
       |- components
           |- NewComponent   // generated component
               |- index.css
               |- index.js
    |- index.css
    |- index.js
```

_keep in mind that this is not a substitution for [React devtools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html), but is a suplimental tool for development with **Reactive Amber**._

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

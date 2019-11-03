const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const write = require('write');
const exec = require('child_process').exec;

const component = (name, state = null, props = null) => {
  let JStemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/component/index.js');
  let CSStemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/component/index.css');

  fs.readFile(JStemplatePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err && !data.replace(/\s/g, '').length == 0) {
      write.sync(`frontend-react/src/components/${name}/index.js`, data.replace(/comp_name/g, name), { overwrite: false })
      console.log('componenet created with template')
    } else {
      write.sync(`frontend-react/src/components/${name}/index.js`, '', { overwrite: false })
      console.log('created without componenet template')
    }
  })
  fs.readFile(CSStemplatePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err && !data.replace(/\s/g, '').length == 0) {
      write.sync(`frontend-react/src/components/${name}/index.css`, data.replace(/comp_name/g, name), { overwrite: false })
      console.log('componenet created with template')
    } else {
      write.sync(`frontend-react/src/components/${name}/index.css`, '', { overwrite: false })
      console.log('created without componenet template')
    }
  })
}

const scaffold = (model, attributes, file) => {
  const templatePath = (template, file) => {
    return path.join(__dirname, `../../frontend-react/dev/templates/scaffold/${template}/index.${file}`);
  }

  const readWrite = (jsPath, cssPath, template) => {
    console.log(jsPath)
    fs.readFile(jsPath, {encoding: 'utf-8'}, (err, data) => {
      if (!err && !data.replace(/\s/g, '').length == 0) {
        write.sync(`frontend-react/src/views/${model}/${template}/index.js`, data.replace(/comp_name/g, model), { overwrite: false })
        console.log('componenet created with js template')
      } else {
        write.sync(`frontend-react/src/views/${model}/${template}/index.js`, '', { overwrite: false })
        console.log('created without js template')
      }
    })
    fs.readFile(cssPath, {encoding: 'utf-8'}, (err, data) => {
      if (!err && !data.replace(/\s/g, '').length == 0) {
        write.sync(`frontend-react/src/views/${model}/${template}/index.css`, data.replace(/comp_name/g, model), { overwrite: false })
        console.log('componenet created with css template')
      } else {
        write.sync(`frontend-react/src/views/${model}/${template}/index.css`, '', { overwrite: false })
        console.log('created without css template')
      }
    })
  }
  readWrite(templatePath('edit', 'js'), templatePath('edit', 'css'), 'edit');
  readWrite(templatePath('index', 'js'), templatePath('index', 'css'), 'index');
  readWrite(templatePath('new', 'js'), templatePath('new', 'css'), 'new');
  readWrite(templatePath('show', 'js'), templatePath('show', 'css'), 'show');

  api(model, attributes)
}

const api = (model, attributes) => {
  exec(`amber g api ${model} ${attributes}`, () => {
    console.log('\nAPI Generated')
    exec(`amber db migrate`, () => {
      console.log('\nDB Migration Complete')
    });
  });
};

module.exports.react_tools = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Select Generator',
      name: 'generator',
      choices: [
        {
          name: 'component'
        },
        {
          name: 'scaffold'
        },
        {
          name: 'api'
        }
      ]
    }
  ])
  .then(answers => {
    switch(answers.generator) {
      case 'component':
        inquirer.prompt([
          {
            type: 'input',
            name: 'component_name',
            message: "Component Name: "
          },
          {
            type: 'input',
            name: 'component_state',
            message: "Component State: "
          },
          {
            type: 'input',
            name: 'component_props',
            message: "Component Props: "
          }
        ])
        .then(answers => {
          component(answers.component_name, answers.component_state, answers.component_props)
        })
        break;
      case 'scaffold':
        inquirer.prompt([
          {
            type: 'input',
            name: 'model',
            message: "model: "
          },
          {
            type: 'input',
            name: 'attributes',
            message: "attributes: "
          }
        ])
        .then(answers => {
          scaffold(answers.model, answers.attributes)
        })
        break;
      case 'api':
        inquirer.prompt([
          {
            type: 'input',
            name: 'model',
            message: "model: "
          },
          {
            type: 'input',
            name: 'attributes',
            message: "attributes: "
          }
        ])
        .then(answers => {
          api(answers.model, answers.attributes)
        })
        break;
      default:
        generator()
        break;
    }
  });
}

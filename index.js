const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const write = require('write');
const exec = require('child_process').exec;

const component = (name, state = null, props = null) => {
  let templatePath = path.join(__dirname, '../../frontend-react/dev/templates/component.js');
  fs.readFile(templatePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err && !data.replace(/\s/g, '').length == 0) {
      write.sync(`frontend-react/src/components/${name}/index.js`, data.replace(/comp_name/g, name), { overwrite: false })
      write.sync(`frontend-react/src/components/${name}/index.css`, '', { overwrite: false })
      console.log('componenet created with template')
    } else {
      write.sync(`frontend-react/src/components/${name}/index.js`, '', { overwrite: false })
      write.sync(`frontend-react/src/components/${name}/index.css`, '', { overwrite: false })
      console.log('created without componenet template')
    }
  })
}

const scaffold = (model, attributes) => {
  let newTemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/scaffold/new.js');
  let editTemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/scaffold/edit.js');
  let indexTemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/scaffold/index.js');
  let showTemplatePath = path.join(__dirname, '../../frontend-react/dev/templates/scaffold/show.js');

  const readWrite = (templatePath, type) => {
    fs.readFile(templatePath, {encoding: 'utf-8'}, (err, data) => {
      if (!err && !data.replace(/\s/g, '').length == 0) {
        write.sync(`frontend-react/src/views/${model}/${type}/index.js`, data.replace(/comp_name/g, model), { overwrite: false })
        write.sync(`frontend-react/src/views/${model}/${type}/index.css`, '', { overwrite: false })
        console.log('componenet created with template')
      } else {
        write.sync(`frontend-react/src/views/${model}/${type}/index.js`, '', { overwrite: false })
        write.sync(`frontend-react/src/views/${model}/${type}/index.css`, '', { overwrite: false })
        console.log('created without componenet template')
      }
    })
  }
  readWrite(newTemplatePath, 'new');
  readWrite(editTemplatePath, 'edit');
  readWrite(indexTemplatePath, 'index');
  readWrite(showTemplatePath, 'show');

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

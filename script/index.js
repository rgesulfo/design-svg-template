const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const data = require('./input/data');

const results = data.map(async (person, index) => {
  const {
    name,
    title,
    company,
    id,
    color,
  } = person;

  const template = await fs.readFileSync(path.resolve(__dirname, 'input/template.svg'), 'utf8');
  const image = await fs.readFileSync(path.resolve(__dirname, `input/images/${id}.jpg`), 'base64');
  const createTemplate = _.template(template);

  const output = createTemplate({
    name,
    title,
    company,
    image: `<image id="avatar" width="256" height="256" xlink:href="data:image/png;base64,${image}"></image>`,
    color,
  });

  const response = await fs.writeFileSync(`output/${name}.svg`, output, 'utf8');
});

Promise.all(results).then(() => console.log('Done!'));

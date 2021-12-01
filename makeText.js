/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const markov = require('./markov')

function generateText(text) {
  const mm = new markov.MarkovMachine(text)
  console.log(mm.makeText())
}

async function textFromURL(url) {
  let response
  try {
    response = await axios.get(url);
    generateText(response.data)
  } catch (err) {
    console.error(`Error reading URL: ${url}: ${err}`);
    process.exit(1);
  }
}

function textFromFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading file: ${path}: ${err}`)
      process.exit(1)
    } else {
      generateText(data)
    }
  })
}

const source = process.argv[2].toLowerCase()
const path = process.argv[3]

if (source === 'file') {
  textFromFile(path)
} else if (source === 'url') {
  textFromURL(path)
} else {
  console.error(`Invalid source type: ${source}`)
  process.exit(1)
}
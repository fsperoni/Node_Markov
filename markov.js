/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()
    const arrSize = this.words.length
    for (let i=0; i<arrSize; i++) {
      const word = this.words[i]
      const nextWord = this.words[i + 1] || null
      if (chains.has(word)) {
        chains.get(word).push(nextWord)
      }
      else {
        chains.set(word, [nextWord])
      }
    }
    this.chains = chains
  }

  /** Get random word from chains */
  static randomWord(words) {
    const idx = Math.floor(Math.random() * words.length)
    return words[idx]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const firstWords = Array.from(this.chains.keys())
    let word = MarkovMachine.randomWord(firstWords)
    let output = []
    while (word !== null && output.length < numWords) {
      output.push(word)
      word = MarkovMachine.randomWord(this.chains.get(word))
    }
    return output.join(' ')
  }
}

module.exports = {MarkovMachine}
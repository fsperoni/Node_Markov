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
    let chains = {}
    const arrSize = this.words.length
    for (let i=0; i<arrSize; i++) {
      const word = this.words[i]
      if (chains[word]) {
        if (i+1 < arrSize) {
          chains[word].push(this.words[i+1])
        } else {
          chains[word].push(null)
        }
      }
      else if (i+1 < arrSize) {
        chains[word] = [this.words[i+1]]
      } else {
        chains[word] = [null]
      }
    }
    this.chains = chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let mm = new MarkovMachine("the cat in the hat")
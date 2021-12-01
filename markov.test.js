const { MarkovMachine } = require('./markov')

describe('MarkovMachine', () => {
  let mm
  const text = "the cat in the hat"

  beforeEach(() => {
    mm = new MarkovMachine(text)
  })

  test('creation of chains', () => {
    const words = text.split(' ')
    expect(mm.words).toEqual(words)
    expect(mm.chains.get('cat')).toEqual(['in'])
    expect(mm.chains.get('hat')).toEqual([null])
  })

  test('text generation', () => {
    const genText = mm.makeText(5)
    const wordArr = genText.split(' ')
    expect(wordArr.length).toBeGreaterThan(0)
    expect(wordArr.length).toBeLessThanOrEqual(5)
  })
})

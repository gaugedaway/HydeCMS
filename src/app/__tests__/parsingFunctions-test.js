jest.unmock('../parsingFunctions.js')
import { parsePostFilename, parseFontMatter } from '../parsingFunctions.js'

describe('parsePostFilename', () => {
  it('should return a proper object when filename is correct', () => {
    expect(parsePostFilename('2016-01-05-some-title.html')).toEqual({
      filename: '2016-01-05-some-title.html',
      title: 'some-title',
      date: new Date(2016, 1, 5),
      format: 'html'
    })
    expect(parsePostFilename('1999-11-27-Some-title!.md')).toEqual({
      filename: '1999-11-27-Some-title!.md',
      title: 'Some-title!',
      date: new Date(1999, 11, 27),
      format: 'md'
    })
  })
  it('should return null when filename is incorrect', () => {
    expect(parsePostFilename('02-03-2016-some-title.html')).toBeNull()
    expect(parsePostFilename('02-2016-03-some-title.html')).toBeNull()
    expect(parsePostFilename('2016-03-2-some-title.html')).toBeNull()
    expect(parsePostFilename('abcd-03-02-some-title.html')).toBeNull()
    expect(parsePostFilename('2016-03-02-some.title.html')).toBeNull()
    expect(parsePostFilename('2016-03-02-some-title.txt')).toBeNull()
    expect(parsePostFilename('2016-03-02-some-title')).toBeNull()
  })
})
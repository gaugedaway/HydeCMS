jest.unmock('../ajax.js')
import { fetchJSON } from '../ajax.js'

describe('fetchJSON', () => {
  pit('should response with proper data when the url is right', async () => {
    let data = await fetchJSON('http://somedata')
    expect(data).toEqual({ someKey: 'someValue' })
  })

  pit('should throw an proper error when url is wrong', async () => {
    try {
      let data = await fetchJSON('http://badurl')
      expect(true).toBeFalsy()
    }
    catch(e) {
      expect(e.message).toBe('Not found')
    }
  })
})
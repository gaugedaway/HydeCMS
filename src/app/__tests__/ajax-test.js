jest.unmock('../ajax.js')
import { fetchJSON, fetchLogin } from '../ajax.js'

describe('fetchJSON', () => {
  pit('should response with proper corresponding data when the url is right', async () => {
    let data = await fetchJSON('http://somedata')
    expect(data).toEqual({ someKey: 'someValue' })
  })
  
  pit('should throw an proper error when url is wrong', async () => {
    try {
      await fetchJSON('http://badurl')
      expect(true).toBeFalsy()
    }
    catch(e) {
      expect(e.message).toBe('Not found')
    }
  })
})

describe('fetchLogin', () => {
  pit('should response with proper login when token is ok', async () => {
    expect(await fetchLogin('e72e16c7e42f292c6912e7710c838347ae178b4a'))
      .toBe('someLogin')
  })  
})
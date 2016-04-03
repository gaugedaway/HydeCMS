export default function fetch(url, options) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if(url === 'http://somedata') {
        resolve({
          status: 200,
          json: () => {
            return { someKey: 'someValue' }
          }
        })
      }
      else if(url === 'https://api.github.com/user') {
        if(options.method === 'GET') {
          if(/^token\s\w{40}$/.test(options.headers.Authorization)) {
            resolve({
              status: 200,
              json: () => {
                return { login: 'someLogin' }
              }
            })
          }
          else {
            resolve({
              status: 400,
              statusText: 'Requires authentication'
            })
          }
        }
      }
      else {
        resolve({
          status: 404,
          statusText: 'Not found'
        })
      }
    })
  })
}
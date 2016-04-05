export default function fetch(url, options) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      switch(url) {

        case 'http://somedata': {
          if(!options || !options.method || options.method === 'GET') {
            resolve({
              status: 200,
              json: () => {
                return { someKey: 'someValue' }
              }
            })
          }
          else resolve({
            status: '404',
            statusText: 'Wrong method'
          })
          break;
        }

        default:
          resolve({
            status: 404,
            statusText: 'Not found'
          })

      }
    })
  })
}
export class Http {
  static HEADERS = {
    'Content-Type': 'application/json',
  }
  static async get(url) {
    try {
      return await request(url)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
  static async post(url, data = {}) {
    try {
      request(url, 'POST', data)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
  static async delete(url) {
    try {
      request(url, 'DELETE')
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
  static async patch(url, data = {}) {
    try {
      return await request(url, 'PATCH', data)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }
}

async function request(url, method = 'GET', data) {
  const config = {
    method,
    headers: Http.HEADERS,
  }
  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }
  const response = await fetch(url, config)
  return response.json()
}

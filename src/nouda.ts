import Interceptor from "./Interceptor"

export interface Options {
  [key: string]: any
}

interface Request {
  interceptor: Interceptor
}

interface Response {
  interceptor: Interceptor
}

const dispatchRequest = function dispatchRequest(options: Options = {}) {
  return new Promise((resolve, reject) => {
    fetch(options.url).then(resolve, reject)
  })
}

class Nouda {
  collect: Array<any> = [dispatchRequest, undefined]
  request: Request
  response: Response
  constructor(readonly options: Readonly<Options> = {}) {
    this.request = {
      interceptor: new Interceptor
    }
    this.response = {
      interceptor: new Interceptor
    }
  }

  requestBefore() {
    const chain: Array<any> = []
    this.request.interceptor.handles.forEach(handle => {
      chain.push(handle?.bind(this.options))
    })
    this.collect.forEach(c => {
      chain.push(c?.bind(this.options))
    })
    this.response.interceptor.handles.forEach(handle => {
      chain.push(handle?.bind(this.options))
    })

    let promise: Promise<Options> = Promise.resolve(this.options)

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }
  }
}

export default Nouda;
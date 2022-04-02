import { Options } from "./nouda"

type UnSubscribe = () => void
type UseResolve = (...args: Options[]) => Options
type UseReject = (...args: Options[]) => Options

class Interceptor {
  handles: Array<UseResolve | UseReject> = []
  constructor() {
    this.handles = []
  }

  use(resolve: UseResolve, reject: UseReject): UnSubscribe {
    const handle = [resolve, reject]
    this.handles.push(...handle)

    return () => {
      this.handles = this.handles.filter(h => h !== resolve && h !== reject)
    }
  }
}

export default Interceptor;
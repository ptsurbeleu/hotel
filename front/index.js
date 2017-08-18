import { Component } from 'preact'
import Header from './Header'
import ServerList from './ServerList'
import api from './api'

function isMonitor(obj) {
  return obj.status
}

function isProxy(obj) {
  return !isMonitor(obj)
}

export default class App extends Component {
  componentDidMount() {
    api.fetchServers().then(this.updateState)
    api.watchServers(this.updateState)
  }

  updateState(data) {
    const arr = Object.keys(data).map(key => {
      data[key].id = key
      return data
    })

    this.setState({
      monitors: arr.filter(isMonitor),
      proxies: arr.filter(isProxy)
    })
  }

  isRunning(id) {
    const item = this.state.servers[id]
    return item && item.status === 'running'
  }

  toggle(id) {
    this.isRunning(id) ? api.stopMonitor(id) : api.startMonitor(id)
  }

  render() {
    return (
      <div>
        <Header />
        <ServerList servers={this.state.monitors} onToggleClick={this.toggle} />
      </div>
    )
  }
}

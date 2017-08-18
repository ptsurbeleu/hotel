import { Component } from 'preact'
import Router from 'preact-router'
import createHashHistory from 'history/createHashHistory'
import ansi2HTML from 'ansi2html'
import escapeHTML from 'escape-html'
import difference from 'lodash.difference'
import uid from 'uid'
import Header from './Header'
import ServerList from './ServerList'
import Output from './Output'
import * as api from './api'

function isMonitor(obj) {
  return obj.status
}

function isProxy(obj) {
  return !isMonitor(obj)
}

function blankLine(val) {
  return val.trim() === '' ? '&nbsp;' : val
}

function toLines(output) {
  return output.replace(/\n$/, '').split('\n').map(line => {
    // filter line
    line = escapeHTML(line)
    line = ansi2HTML(line)
    line = blankLine(line)
    return line
  })
}

export default class App extends Component {
  isRunning(id) {
    const item = this.state.monitors.find(m => m.id === id)
    return item && item.status === 'running'
  }

  toggle(id) {
    this.isRunning(id) ? api.stopMonitor(id) : api.startMonitor(id)
  }

  updateList(data) {
    const arr = Object.keys(data).map(key => {
      const item = { ...data[key] }
      item.id = key
      return item
    })

    const nextMonitors = arr.filter(isMonitor)
    const prevMonitors = this.state.monitors

    nextMonitors.forEach(nextMonitor => {
      const prevMonitor = prevMonitors.find(pm => pm.id === nextMonitor.id)

      if (prevMonitor) {
        nextMonitor.output = prevMonitor.output
      }

      nextMonitor.output = nextMonitor.output || []
    })

    this.setState({
      monitors: nextMonitors,
      proxies: arr.filter(isProxy)
    })
  }

  updateOutput(data) {
    const { id, output } = data
    const newLines = toLines(output)
    const monitor = this.state.monitors.find(m => m.id === id)

    if (monitor) {
      monitor.output = monitor.output || []
      newLines.forEach(line => {
        monitor.output.push({ text: line, uid: uid() })
        // keep 1000 lines only
        if (monitor.output.length > 1000) {
          monitor.output.shift()
        }
      })
    }
  }

  constructor() {
    super()
    this.state = {
      monitors: [],
      proxies: []
    }
  }

  componentDidMount() {
    api.fetchServers().then(data => this.updateList(data))
    api.watchServers(data => this.updateList(data))
    api.watchOutput(data => this.updateOutput(data))
  }

  render() {
    return (
      <div>
        <Header />
        <ServerList
          servers={this.state.monitors}
          onToggleClick={id => this.toggle(id)}
        />
        <Router history={createHashHistory()}>
          <Output path="/:id" monitors={this.state.monitors} />
        </Router>
      </div>
    )
  }
}

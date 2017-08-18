import { Component } from 'preact'

export default class Output extends Component {
  render({ id, monitors }) {
    const monitor = monitors.find(m => m.id === id)
    if (monitor) {
      return (
        <div>
          > {id} {monitor.output.length}
          {monitor.output.map(line =>
            <div>
              {line.text}
            </div>
          )}
        </div>
      )
    }
  }
}

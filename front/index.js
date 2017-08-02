import { Component } from 'preact'
import Server from './Server'

export default class App extends Component {
  componentDidMount() {
    window.fetch('/_/servers').then(r => r.json()).then(json => {
      this.setState({
        servers: json
      })
    })
  }

  render(props, { servers = {} }) {
    return (
      <div class="flex flex-column vh-100 bg-black-90 white">
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css"
        />
        <div class="bb pa3">hotel</div>
        <div class="flex-auto flex">
          <div class="w-third br">
            {Object.keys(servers).map(id =>
              <Server id={id} server={servers[id]} />
            )}
            {Object.keys(servers).map(id =>
              <Server id={id} server={servers[id]} />
            )}
          </div>
          <div class="w-two-thirds ">
            <div class="flex bb">
              <div class="pa3 br">Logs</div>
              <div class="pa3 br">Conf</div>
            </div>
            <div class="pa3">No Output</div>
          </div>
        </div>
      </div>
    )
  }
}

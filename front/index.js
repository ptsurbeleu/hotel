import './style'
import { Component } from 'preact'

export default class App extends Component {
  componentDidMount() {
    window.fetch('/_/servers').then(r => r.json()).then(json => {
      this.setState({
        results: (json && json.items) || []
      })
    })
  }

  render(props, { results = [] }) {
    return (
      <div>
        <h1>Example</h1>
        <div class="list">
          {results.map(result => <Result result={result} />)}
        </div>
      </div>
    )
  }
}

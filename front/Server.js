import { Component } from 'preact'
import { Link } from 'preact-router/match'

function href(id) {
  const { protocol, hostname } = window.location
  if (/hotel\./.test(hostname)) {
    const tld = hostname.split('.').slice(-1)[0]
    return `${protocol}//${id}.${tld}`
  } else {
    return `/${id}`
  }
}

export default class Server extends Component {
  render({ server, onToggleClick }) {
    const { id, status } = server
    return (
      <div>
        <a href={href(id)}>{id}</a>
        <button onClick={() => onToggleClick(id)}>{status}</button>
        <a href={`#/${id}`}>View</a>
      </div>
    )
  }
}

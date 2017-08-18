import { Component } from 'preact'

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
  render({ id, server, onToggleClick }) {
    return (
      <div>
        <a href={href(id)}>
          {id}
        </a>
        <button onClick={() => onToggleClick(id)}>
          {server.status}
        </button>
      </div>
    )
  }
}

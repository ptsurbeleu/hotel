import Server from './Server'

export default function ServerList({ servers, onToggleClick }) {
  if (servers) {
    console.log(servers)
    return (
      <ul>
        {servers.map(server =>
          <Server
            key={server.id}
            server={server}
            onToggleClick={onToggleClick}
          />
        )}
      </ul>
    )
  }

  return <div>No servers</div>
}

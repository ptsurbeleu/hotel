function href(id) {
  const { protocol, hostname } = window.location
  if (/hotel\./.test(hostname)) {
    const tld = hostname.split('.').slice(-1)[0]
    return `${protocol}//${id}.${tld}`
  } else {
    return `/${id}`
  }
}

function Server({ id, server }) {
  return (
    <div class="pa3 cf bb">
      <a class="fl white" href={href(id)}>
        {id}
      </a>
      <div class="fr">
        <button class="mr1">
          {server.status}
        </button>
      </div>
    </div>
  )
}

export default Server

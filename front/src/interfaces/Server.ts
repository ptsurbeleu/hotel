enum Status {
  running,
  stopped
}

export default interface Server {
  id: string,
  status: Status
}

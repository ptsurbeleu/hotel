import { h, app } from 'hyperapp'
import logger from "@hyperapp/logger"
import { watchServers, stopServer, startServer } from './api'
import Server from './interfaces/Server'

interface State {
  message: string,
  serverList: Array<Server>,
}

const state: State = {
  message: "Hi.",
  serverList: []
}

const selectors: any = {
  isRunning (state: State, id: string) {
    const item = state.serverList.find(server => server.id === id)
    return item && item.status === 'running'
  },
}

const actions: any = {
  updateServerList(state: State, actions: any, serverList: Array<Server>) {
    return { serverList }
  },
  stopMonitor(state: State, actions: any, id: string) {
    // change server state
    startServer(id)

    // optimistic update
    return {
      serverList: state
        .serverList
        .map(server => server.id === id
          ? { ...server, status: 'stopped'}
          : server
        )
    }
  },
  startMonitor(state: State, actions: any, id: string) {
    // change server state
    startServer(id)

    // optimistic update
    return {
      serverList: state
        .serverList
        .map(server => server.id === id
          ? { ...server, status: 'running'}
          : server
        )
    }
  },
  toggle (state: State, actions: any, id: string) {
    selectors.isRunning(state, id)
      ? actions.stopMonitor(id)
      : actions.startMonitor(id)
  }
}

const ServerItem = ({ id, status }: Server, onToggleClick: Function) => <li>{id} {status}</li>

app({
  mixins: [logger()],
  state,
  actions,
  view: (state: State) => <h1>{state.serverList.map(server => <ServerItem server={server} onToggleClick={actions.toggle} />)}</h1>,
  events: {
    load(state: State, actions: any) {
      watchServers((serverList) => actions.updateServerList(serverList))
    }
  }
})

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
  isRunning (serverList: Array<Server>, serverId: string) => boolean) {
    return serverList
      .find(({ id, status }) => id === serverId && status === 'running') !== undefined
  }
}

const actions: any = {
  updateServerList(state: State, actions: any, serverList: Array<Server>) {
    return { serverList }
  },
  stopMonitor({ serverList }: State, actions: any, id: string) {
    // change server state
    startServer(id)

    // optimistic update
    return {
      serverList: serverList
        .map(s => s.id === id
          ? { ...s, status: 'stopped'}
          : s
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
  toggle ({ serverList }: State, actions: any, id: string) {
    selectors.isRunning(serverList, id)
      ? actions.stopMonitor(id)
      : actions.startMonitor(id)
  }
}

const ServerItem = ({ id, status }: Server, onToggleClick: Function) => <li>{id} {status}</li>

app({
  mixins: [logger()],
  state,
  actions,
  view: (state: State) => <h1>{state.serverList.map(server => <ServerItem
    server={server}
    onToggleClick={actions.toggle}
  />)}</h1>,
  events: {
    load(state: State, actions: any) {
      watchServers((serverList) => actions.updateServerList(serverList))
    }
  }
})

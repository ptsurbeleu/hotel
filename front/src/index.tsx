import logger from "@hyperapp/logger";
import { app, h } from "hyperapp";
import appActions from "./actions";
import { startMonitor, stopMonitor, watchServers } from "./api";
import appState, { IState } from "./state";

const ServerItem = ({ id, status }: IServer, onToggleClick: () => void) => (
  <li>
    {id} {status}
  </li>
);

app({
  actions: appActions,
  events: {
    load(state: IState, actions: any) {
      watchServers(serverList => actions.updateServerList(serverList));
    }
  },
  mixins: [logger()],
  state: appState,
  view: (state: IState, actions: any) => (
    <h1>
      {state.serverList.map(server => (
        <ServerItem server={server} onToggleClick={actions.toggle} />
      ))}
    </h1>
  )
});

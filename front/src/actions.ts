import { startMonitor } from "./api";
import { IState } from "./state";

const selectors: any = {
  isRunning(serverList: Server[], serverId: string): boolean {
    return (
      serverList.find(
        ({ id, status }) => id === serverId && status === "running"
      ) !== undefined
    );
  }
};

export default {
  updateServerList(state: IState, actions: any, serverList: IServer[]) {
    return { serverList };
  },
  stopMonitor({ serverList }: IState, actions: any, id: string) {
    // change server state
    startMonitor(id);

    // optimistic update
    return {
      serverList: serverList.map(
        s => (s.id === id ? { ...s, status: "stopped" } : s)
      )
    };
  },
  startMonitor(state: IState, actions: any, id: string) {
    // change server state
    startMonitor(id);

    // optimistic update
    return {
      serverList: state.serverList.map(
        server => (server.id === id ? { ...server, status: "running" } : server)
      )
    };
  },
  toggle({ serverList }: IState, actions: any, id: string) {
    selectors.isRunning(serverList, id)
      ? actions.stopMonitor(id)
      : actions.startMonitor(id);
  }
};

enum Status {
  running,
  stopped
}

export interface IServer {
  id: string,
  status: Status
}

export interface IState {
  message: string;
  serverList: IServer[];
}

export default const state: IState = {
  message: "Hi.",
  serverList: []
};

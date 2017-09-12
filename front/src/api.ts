import Server from "./interfaces/Server";

function formatData(data: any): Server[] {
  return Object.keys(data).map(id => ({
    id,
    ...data[id]
  }));
}

export function fetchServers() {
  return window.fetch("/_/servers").then(response => response.json());
}

export function watchServers(cb: (data: Server[]) => void) {
  if (window.EventSource) {
    new window.EventSource("/_/events").onmessage = event => {
      const data = JSON.parse(event.data);
      cb(formatData(data));
    };
  } else {
    setInterval(() => {
      window
        .fetch("/_/servers")
        .then(response => response.json())
        .then(data => cb(data));
    }, 1000);
  }
}

export function watchOutput(cb: (data: Server[]) => void) {
  if (window.EventSource) {
    new window.EventSource("/_/events/output").onmessage = event => {
      const data = JSON.parse(event.data);
      cb(data);
    };
  } else {
    window.alert("Sorry, server logs aren't supported on this browser :(");
  }
}

export function startMonitor(id: string) {
  return window.fetch(`/_/servers/${id}/start`, { method: "POST" });
}

export function stopMonitor(id: string) {
  return window.fetch(`/_/servers/${id}/stop`, { method: "POST" });
}

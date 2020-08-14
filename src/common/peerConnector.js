import { Peer } from "peerjs";

export const peerConnector = {
  Init(localId) {
    this._localId = localId;
    this.peer = new Peer(localId);
  },

  Connect(remoteId) {
    this._remoteId = remoteId;
    this.conn = this.peer.connect(remoteId);
    this.conn.on("open", () => {
      this.conn.send("hi!");
    });
  }
};

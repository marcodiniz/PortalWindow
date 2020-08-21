<template>
  <div class="h-100">
    <div class="stgs h-100 float-left">
      <settings
        ref="stgsPanel"
        v-if="isStgsOpen"
        @canceled="isStgsOpen =! isStgsOpen"
        @saved="isStgsOpen =! isStgsOpen; 
        stgsSaved();"
      ></settings>
    </div>

    <div class>
      <b-button-toolbar>
        <b-button pill @click="isStgsOpen = !isStgsOpen">
          <b-icon icon="gear-fill"></b-icon>
        </b-button>
        <b-button pill>
          <b-icon icon="mic-fill"></b-icon>
        </b-button>
        <b-button pill @click="connectToRemotePeer" variant="success">
          <b-icon icon="telephone-fill"></b-icon>
        </b-button>
      </b-button-toolbar>

      <h2>{{statusMessage}}</h2>
      <video ref="localVideo" autoplay muted width="150px" height="150px"></video>
      <video ref="remoteVideo" autoplay width="150px" height="150px"></video>
      <h1>{{Connected}}</h1>
      <router-link to="/settings">AAAAAAAA</router-link>
    </div>
    <div>
      <div>{{stgs}}</div>
    </div>
  </div>
</template>

<script>
import Settings from "./Settings";
import Peer from "peerjs";
import { Statics } from "../common/peerConnector.js";

export default {
  name: "Home",
  components: {
    Settings
  },
  data() {
    return {
      ownId: "a",
      peerId: "b",
      statusMessage: "starting...",
      isConnected: false,
      isStgsOpen: true,
      stgs: this.$root.$data.stgs
    };
  },
  computed: {
    Connected() {
      return this.isConnected;
    }
  },
  mounted() {
    console.log(this);
    this.getUserMedias();
    this.startPeerJs();
  },
  methods: {
    stgsSaved() {
      this.startPeerJs();
    },

    async getUserMedias() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" }
      });

      this.$refs.localVideo.srcObject = this.localStream;
    },

    startPeerJs() {
      let cpt = this;

      this.$root.pc = this.$root.pc = new Peer(
        this.stgs.localId,
        Statics.webrtcConfig
      );
      this.peer = this.$root.pc;

      this.peer.on("error", function(err) {
        console.log("PEER ERROR!");
        console.log(err);
      });

      this.peer.on("open", function(id) {
        console.log("My peer ID is: " + id);
      });

      //receive data connectecion
      this.peer.on("connection", function(conn) {
        cpt.conn = conn;
        cpt.bindDataCallbacks(cpt);
      });

      //answer a call
      this.peer.on("call", function(call) {
        if (call.peer !== cpt.stgs.remoteId) {
          console.log("call from wrong peerId, ignoring!: " + call.peer);
          console.log(cpt.stgs);
          return;
        }
        console.log("answered");
        console.log(call);

        // Answer the call, providing our mediaStream
        call.answer(cpt.localStream);
        cpt.call = call;
        cpt.bindCallCallbacks(cpt);
      });
    },

    async connectToRemotePeer() {
      console.log("calling");
      //start a call
      this.call = this.peer.call(this.stgs.remoteId, this.localStream);
      this.bindCallCallbacks(this);
      console.log("called");

      //start data connection
      this.conn = await this.peer.connect(this.stgs.remoteId);
    },

    bindCallCallbacks(cpt) {
      console.log("called Call CallBack");
      cpt.call.on("stream", function(stream) {
        console.log("ON STREAM RECEIVED!");

        cpt.$refs.remoteVideo.srcObject = stream;
      });
    },

    bindDataCallbacks(cpt) {
      cpt.conn.on("data", function(data) {
        console.log("Received", data);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stgs {
  /* height: 100vh;
  min-height: 100vh; */
}
</style>

<template>
  <div class="hello">
    <Settings ref="stgs-modal"></Settings>
    <b-button v-b-modal.stgsmodal>
      <b-icon-gear-fill></b-icon-gear-fill>
    </b-button>

    <br>
    <h1>{{ownId}}</h1>
    <input v-model="ownId" type="text">
    <h1>{{Connected}}</h1>
    <router-link to="/settings">AAAAAAAA</router-link>
  </div>
</template>

<script>
import Settings from "./Settings";

console.log(this);

export default {
  name: "Home",
  components: {
    Settings
  },
  data() {
    return {
      ownId: "a",
      peerId: "b",
      isConnected: false
    };
  },
  computed: {
    Connected() {
      return this.isConnected;
    }
  },
  mounted() {
    console.log(this.$refs);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

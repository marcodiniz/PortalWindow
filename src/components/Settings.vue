<template>
  <div>
    <!-- <h3>{{local}}</h3>
    <b-button @click="onSave">save</b-button>
    <b-button v-b-modal.stgsmodal>Launch demo modal</b-button>-->
    <b-modal id="stgsmodal" title="Settings">
      <b-form @submit="onSave">
        <b-form-group label="My ID:">
          <b-form-input v-model="local.localId"></b-form-input>
        </b-form-group>
        <b-form-group label="Remote ID:">
          <b-form-input v-model="local.remoteId"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted() {
    this.local = { ...this.$root.$data.shared };
  },
  data() {
    return {
      local: {}
    };
  },

  methods: {
    onSave(evt) {
      alert("oi");
      console.log(evt);
      Object.assign(this.$root.$data.shared, this.local);
      this.$root.$data.saveToStorage();
    },
    toggle() {
      console.log("Toggle button clicked");
      this.show = !this.show;
    },
    dismissed() {
      console.log("Alert dismissed");
    }
  }
};
</script>
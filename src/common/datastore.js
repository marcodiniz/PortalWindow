export const store = {
  shared: {
    localId: "aaa",
    remoteId: "bbb"
  },

  loadFromStorage() {
    if (localStorage.shared) {
      Object.assign(
        store,
        localStorage.shared,
        JSON.parse(localStorage.getItem("shared"))
      );
    }
  },

  saveToStorage() {
    localStorage.setItem("shared", JSON.stringify(store.shared));
  }
};

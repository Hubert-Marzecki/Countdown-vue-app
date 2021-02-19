<template>
  <ul class="list__holder">
    <li class="list__item" v-for="(item, index) in items" :key="index">
      <span>{{ item.countDown }}</span>
      <button class="button" @click="removeItem(index)">
        {{ $t(`removeButton`) }}
      </button>
    </li>
  </ul>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "ItemsList",
  props: ["items"],
  methods: {
    removeItem(index) {
      eventBus.$emit("removeItem", index);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/varibles.scss";
.list__holder {
  padding: 10px;
  overflow-y: scroll;
  height: 40vh;

  .list__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: $border;
    padding: $size2 $size4;
    border-radius: $size1;
    margin-bottom: $size2;
    font-family: $font-primary;
    letter-spacing: 1px;
    box-shadow: 0px 3px 10px rgb(199, 199, 199);

    .button {
      background-color: #dbdbdb;
      font-size: $size2;
      padding: 10px 20px;
      cursor: pointer;
      font-family: $font-primary;
      letter-spacing: 1px;
    }
  }
}

.list__holder::-webkit-scrollbar {
  width: 12px;
}

.list__holder::-webkit-scrollbar-track {
  border-radius: 10px;
}

.list__holder::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
</style>
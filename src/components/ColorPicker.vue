<template>
  <div class="theme__option">
    <div
      class="theme__box theme__light"
      @click="changeTheme('theme__light')"
    ></div>
    <div
      class="theme__box theme__dark"
      @click="changeTheme('theme__dark')"
    ></div>
    <div
      class="theme__box theme__blue"
      @click="changeTheme('theme__blue')"
    ></div>
    <div
      class="theme__box theme__orange"
      @click="changeTheme('theme__orange')"
    ></div>
    <div
      class="theme__box theme__green"
      @click="changeTheme('theme__green')"
    ></div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "ColorPicker",
  methods: {
    changeTheme(theme) {
      eventBus.$emit("changeTheme", theme);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/varibles.scss";
.theme__option {
  display: flex;
  align-items: center;
  font-size: 15px;
  .theme__box {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(80, 80, 80, 0.247);
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease;
    }
  }
  .theme__light {
    background-color: $theme-white-main ;
  }
  .theme__dark {
    background-color: $theme-dark-main;
  }
  .theme__blue {
    background-color: $theme-blue-main;
  }
  .theme__orange {
    background-color: $theme-orange-main;
  }
  .theme__green {
    background-color: $theme-green-main;
  }
}
</style>
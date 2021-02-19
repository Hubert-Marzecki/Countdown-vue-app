<template>
  <div class="page__wrapper" :class="currentTheme">
    <div class="content__wrapper">
      <header class="header">
        <ColorPicker />
        <ChangeLanguage />
      </header>

      <h1 class="page__header">{{ $t(`title`) }}</h1>
      <form class="date__form" @submit.prevent="addTodo()">
        <label class="label">{{ $t(`instruction`) }} </label>
        <input
          class="input"
          v-model="futureTime"
          name="futureTime"
          autocomplete="off"
          placeholder="DD/MM/YYYY HH:mm:ss"
        />
        <button class="button add__items">{{ $t(`addButton`) }}</button>
      </form>
      <h2 class="section__title">{{ $t(`listHeader`) }}</h2>

      <span class="test__time">
        <span>10s:</span> {{ timeForTest.short }} <span>10h:</span>
        {{ timeForTest.long }}
      </span>
      <h4 v-if="items.length === 0" class="empty__list__header">
        {{ $t(`emptyMessage`) }}
      </h4>

      <ItemsList v-bind:items="this.items" />

      <Alert
        v-if="expireTimeAlert.visible === true"
        v-bind:expireTimeAlert="this.expireTimeAlert"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { eventBus } from "./main";
import Alert from "./components/Alert";
import ColorPicker from "./components/ColorPicker";
import ItemsList from "./components/ItemsList";
import ChangeLanguage from "./components/ChangeLanguage";

export default {
  name: "App",
  components: {
    Alert,
    ColorPicker,
    ItemsList,
    ChangeLanguage,
  },
  data() {
    const currentTimeUTC = moment().utc().format("DD/MM/YYYY HH:mm:ss");
    return {
      currentTime: currentTimeUTC,
      items: JSON.parse(localStorage.getItem("items")) || [],
      futureTime: moment().add(10, "hours").format("DD/MM/YYYY HH:mm:ss"),
      expireTimeAlert: {
        visible: false,
        itemIndex: "",
      },
      timeForTest: {
        short: "",
        long: "",
      },

      currentTheme: localStorage.getItem("theme-color"),
    };
  },
  methods: {
    addTodo() {
      const settedTime = moment(this.futureTime, "DD/MM/YYYY HH:mm:ss");
      const createdTime = moment().format("DD/MM/YYYY HH:mm:ss");
      if (this.futureTime && moment(settedTime).isAfter()) {
        let ms = moment(settedTime, "DD/MM/YYYY HH:mm:ss").diff(
          moment(createdTime, "DD/MM/YYYY HH:mm:ss")
        );
        let d = moment.duration(ms);
        this.items.push({
          done: false,
          futureTime: this.futureTime,
          countDown:
            d.days() + ":" + d.hours() + ":" + d.minutes() + ":" + d.seconds(),
          created: createdTime,
          duration:
            "days: " +
            d.days() +
            " hours: " +
            d.hours() +
            " minutes: " +
            d.minutes() +
            " seconds: " +
            d.seconds(),
        });
        this.futureTime = "";
        this.saveData();
      } else {
        alert("Please enter future time");
      }
    },
    addFromAlert(i) {
      const creationTime = this.$data.items[i].created;
      const setedFutureTime = this.$data.items[i].futureTime;
      let ms = moment(setedFutureTime, "DD/MM/YYYY HH:mm:ss").diff(
        moment(creationTime, "DD/MM/YYYY HH:mm:ss")
      );
      let d = moment.duration(ms);
      let newDate = moment()
        .add(d.days(), "days")
        .add(d.hours(), "hours")
        .add(d.minutes(), "minuts")
        .add(d.seconds(), "seconds")
        .format("DD/MM/YYYY HH:mm:ss");
      this.items.push({
        done: false,
        created: moment().format("DD/MM/YYYY HH:mm:ss"),
        futureTime: newDate,
        countDown:
          d.days() + ":" + d.hours() + ":" + d.minutes() + ":" + d.seconds(),
        duration:
          "days: " +
          d.days() +
          " hours: " +
          d.hours() +
          " minutes: " +
          d.minutes() +
          " seconds: " +
          d.seconds(),
      });
      this.deleteFromAlert(i);
    },
    triggerAlert(index, open) {
      this.expireTimeAlert.visible = open;
      this.expireTimeAlert.itemIndex = index;
    },
    deleteFromAlert(index) {
      this.deleteItem(index);
      this.expireTimeAlert.visible = false;
      this.expireTimeAlert.itemIndex = "";
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.saveData();
    },
    saveData() {
      const storageData = JSON.stringify(this.items);
      localStorage.setItem("items", storageData);
    },
    setCountDown() {
      this.$data.currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
      for (let i = 0; i < this.$data.items.length; i++) {
        let f = this.$data.items[i].futureTime;
        let ms = moment(f, "DD/MM/YYYY HH:mm:ss").diff(
          moment(this.$data.currentTime, "DD/MM/YYYY HH:mm:ss")
        );
        let d = moment.duration(ms);
        this.$data.items[i].countDown =
          d.days() + ":" + d.hours() + ":" + d.minutes() + ":" + d.seconds();
        if (
          d.days() <= 0 &&
          d.hours() <= 0 &&
          d.minutes() <= 0 &&
          d.seconds() <= 0
        ) {
          this.triggerAlert(i, true);
          this.$data.items[i].countDown = "ENDED";
        }
      }
    },
    setTestTime(period, value) {
      this.$data.timeForTest[period] = moment()
        .add(10, value)
        .format("DD/MM/YYYY HH:mm:ss");
    },
  },
  created() {

    this.setCountDown();
    this.setTestTime("short", "seconds");
    this.setTestTime("long", "hours");
    setInterval(() => {
      this.setTestTime("short", "seconds");
      this.setTestTime("long", "hours");
      this.setCountDown();
    }, 1000);

 
    eventBus.$on("deleteFromAlert", (data) => {
      this.deleteFromAlert(data);
    });
    eventBus.$on("addFromAlert", (data) => {
      this.addFromAlert(data);
    });
    eventBus.$on("changeTheme", (theme) => {
      localStorage.setItem("theme-color", theme);
      this.currentTheme = localStorage.getItem("theme-color");
    });
    eventBus.$on("removeItem", (index) => {
      this.deleteItem(index);
    });

    

   
  },
};
</script>

<style lang="scss">
@import "./styles/reset-css.scss";
@import "./styles/themes.scss";
@import "./styles/varibles.scss";

html,
body,
#app {
  height: 100%;
}
.page__wrapper {
  min-height: 100%;
  background-color: white;
  color: black;
  transition: all 0.3s ease;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .content__wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 50px;

    .test__time {
      font-family: $font-primary;
      margin-top: 2px;
      font-size: 12px;

      span {
        font-weight: 700;
      }
    }
    .page__header {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
      font-family: $header-font;
      margin-top: 50px;
    }
    .date__form {
      display: flex;
      flex-direction: column;
      width: 100%;

      .label {
        font-size: 14px;
        font-weight: bold;
        font-family: $font-primary;
        margin-top: 40px;
      }
      .input,
      .button {
        height: $size5;
        outline: none;
        padding-left: $size2;
        padding-right: $size2;
        border-radius: $size1;
        font-size: 18px;
        margin-top: $size1;
        margin-bottom: $size2;
        font-family: $font-primary;
      }
    }
    .button {
      cursor: pointer;
      background-color: $bg-transparency;
      color: white;
      border: none;
      font-weight: bold;
      outline: none;
      border-radius: $size1;
    }
    .section__title {
      margin-top: 30px;
      font-size: 22px;
      border-bottom: $border;
      padding-bottom: $size1;
      font-family: $header-font;
    }

    .empty__list__header {
      text-align: center;
      opacity: 0.5;
      margin-top: 10px;
      font-family: $header-font;
    }
  }
}
</style>

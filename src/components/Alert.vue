<template>
    <div class="alert__holder">
        <div class="alert__box">
          <h3 class="alert__header">
            Do you want to set countown for <br />
            {{ items[expireTimeAlert.itemIndex].duration }}
          </h3>
          <div class="buttons__wrapper">
            <button
              class="button button__delete"
              @click="deleteFromAlert(expireTimeAlert.itemIndex)"
            >
              Delete coundown
            </button>
            <button
              class="button button__onceAgain"
              @click="addFromAlert(expireTimeAlert.itemIndex)"
            >
              Run one more time
            </button>
          </div>
        </div>
      </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: "Alert",
    props: ["expireTimeAlert"],
    data() {
        return {
            items: JSON.parse(localStorage.getItem("items")),
            PropExpireTimeAlert: this.expireTimeAlert 
        }
    },
    methods: {
         deleteFromAlert() {
          eventBus.$emit('deleteFromAlert', this.expireTimeAlert.itemIndex)
      },
         addFromAlert() {
          eventBus.$emit('addFromAlert', this.expireTimeAlert.itemIndex)
      } 
    }
}
</script>

<style lang="scss">
@import "../styles/varibles.scss";

    .alert__holder {
      height: 100vh;
      width: 100vw;
      background-color: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      top: 0;
      left: 0;

      .alert__box {
        height: 300px;
        width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.664);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        font-family: $font-primary;
        line-height: 30px;

        .alert__header {
          width: 100%;
        }

        .buttons__wrapper {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;

          .button {
            padding: 10px;
            margin: 10px;
            font-family: $font-primary;
          }
        }
      }
    }
</style>
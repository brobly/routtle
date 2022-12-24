<template>
  <div id="routtle-box">
    <div v-if="isSetting" id="modal-setting" class="modal">
       <input
          v-model.lazy="top_title"
          class="input_title"
          style="margin: 0.5rem 0px;"
          placeholder="請輸入標題"
          type="text"
        />
      <div
        class="setting-list d-flex"
        v-for="award of awards"
        :key="`setting_${award.reward_title}_${award.id}`"
      >
        <input
          v-model.lazy="award.reward_title"
          class="input_title"
          placeholder="請輸入獎品名稱"
          type="text"
        />
        <input
          v-model.lazy="award.reward_description"
          class="input_description"
          placeholder="請輸入獎品詳情"
          type="text"
        />
      </div>
    </div>
    <div class="top_info">
      <!-- <h3 class="ticket">你擁有{{ ticket }}張抽獎卷</h3> -->
      <div></div>
      <h1 class="top_title">{{ top_title }}</h1>
      <div class="d-flex">
        <!-- <a
        href="javascript:void(0)"
        @click="triggerModalDrawRecord"
        class="btn_record_list"
      >
        <font-awesome-icon icon="fa-solid fa-sheet-plastic" />
        <p>中獎記錄</p>
      </a> -->
        <a
          href="javascript:void(0)"
          @click="isSetting = !isSetting"
          class="btn_setting"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          <p>抽獎設置</p>
        </a>
      </div>
    </div>
    <div class="anime_bg">
      <img v-if="isDrawEnd" src="@/assets/sunburst.0838324a.svg" alt="" />
    </div>
    <div class="slot">
      <div class="slot__outer">
        <div class="slot__inner">
          <template v-if="isDrawEnd && !isDisable">
            <h2 class="">{{ awards[prize - 1].reward_title }}</h2>
            <p v-if="awards[prize - 1].reward_description" class="mb-0">
              {{ awards[prize - 1].reward_description }}
            </p>
          </template>
        </div>
      </div>
    </div>
    <div class="routtle">
      <div
        class="routtle_outline"
        :class="{ running: loading, disable: isDisable }"
      >
        <div v-for="index of 16" :key="index" class="dot"></div>
        <div ref="ref_routtle" class="routtle_inline">
          <div
            v-for="award of awards"
            :key="'background' + award.reward_title + award.id"
            class="prize_background"
          ></div>
          <div class="prize">
            <div
              v-for="award of awards"
              :key="award.reward_title + award.id"
              class="prize-content"
            >
              {{ award.reward_title }}
            </div>
          </div>
        </div>
        <div class="button_block">
          <div class="button_wrapper">
            <div class="button_ouline">
              <div class="button_inline" @click="luckyStart">
                <span>{{ draw_text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      isDrawEnd: false,
      isSetting: false,
      ticket: 20,
      drawRecordData: {},
      draw_text: "開始抽獎",
      top_title: "今晚吃什麼?",
      awards: [
        {
          id: 1,
          reward_title: "吃PIZZA HUT",
          reward_description: "長享/翠怡 有優惠卷",
        },
        { id: 2, reward_title: "MOZ BUGAER", reward_description: "包好吃" },
        {
          id: 3,
          reward_title: "肯德基",
          reward_description: "$60 / $72   2人餐",
        },
        {
          id: 4,
          reward_title: "吉野家打邊爐",
          reward_description: "豆乳煱",
        },
        {
          id: 5,
          reward_title: "大家樂/大快活/美心",
          reward_description: "扒或邊爐",
        },
        { id: 6, reward_title: "三哥/譚仔", reward_description: "" },
      ],
      prize: 0,
      isDisable: false,
    };
  },

  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    luckyStart() {
      if (!this.isDisable) {
        // this.$swal({
        //   title: `你確定要使用1*抽獎卷嗎? \n你總共擁有${this.ticket}張`,
        //   showCancelButton: true,
        //   confirmButtonText: "提交",
        //   cancelButtonText: "取消",
        //   customClass: {
        //     confirmButton: "btn btn-primary",
        //     cancelButton: "btn btn-outline-danger ml-1",
        //     title: "swal2-title",
        //   },
        //   buttonsStyling: false,
        // })
        //   .then((result) => {
        //     if (result) {
        this.isDrawEnd = false;
        this.$refs.ref_routtle.style =
          "transition: none; transform: rotate(15deg)";
        // if (this.ticket) {
        setTimeout(() => {
          this.loading = true;
          this.isDisable = true;
          this.draw_text = "正在抽獎";
          this.prize = this.randomNumber(1, 7);
          this.$refs.ref_routtle.style =
            "transition: transform 4s ease-out; transform: rotate(" +
            (1065 + (this.prize - 1) * 60 + this.randomNumber(1, 60)) +
            "deg)";
          // this.ticket--;
          setTimeout(() => {
            this.isDrawEnd = true;
            this.isDisable = false;
            this.draw_text = "開始抽獎";
            this.fetchDrawRecord();
          }, 4000);
        });
        // } else {
        //   this.$swal({
        //     text: "你沒中有抽獎卷!",
        //     icon: "error",
        //     confirmButtonText: "確定",
        //     customClass: {
        //       confirmButton: "btn btn-primary",
        //     },
        //     showClass: {
        //       popup: "animate__animated animate__bounceIn",
        //     },
        //     buttonsStyling: false,
        //   });
        // }
        // }
        // })
        // .catch((error) => {
        //   this.loading = false;
        //   this.$swal({
        //     text: JSON.stringify(error.response.data.message),
        //     icon: "error",
        //     confirmButtonText: "確定",
        //     customClass: {
        //       confirmButton: "btn btn-primary",
        //     },
        //     showClass: {
        //       popup: "animate__animated animate__bounceIn",
        //     },
        //     buttonsStyling: false,
        //   });
        // });
      }
    },
  },
  mounted() {
    if (localStorage.awards) {
      this.awards = JSON.parse(localStorage.awards);
      console.log("awards", this.awards);
    }
  },
  watch: {
    awards: {
      handler(newValue) {
        localStorage.setItem("awards", JSON.stringify(newValue));
      },
      deep: true,
    },
  },
};
</script>


<style lang="scss">
body {
  * {
    // color: #471247;
    color:#5e335e;
    text-shadow: 0px 1px #ffffff;
  }
}
.d-flex {
  display: flex !important;
}
a {
  color: #fff;
  text-decoration: none;
  &:hover,
  &:active {
    color: #ffffff88;
  }
}
p,
h1,
h2,
h3,
h4,
h5 {
  margin: 0px;
}

#modal-setting {
  position: absolute;
  z-index: 999;
  right: 1.5rem;
  top: 7rem;
  .setting-list {
    margin: 0.5rem 0px;
    input {
      padding: 0.5rem 1rem;
    }
    .input_title {
      margin-right: 1rem;
    }
  }
}
.modal {
  padding: 1rem;
  background: #e4edd4;
  border-radius: 6px;
}
.top_info {
  position: relative;
  z-index: 10;
  display: flex;
  width: 97%;
  padding: 3rem 1.5rem 0;
  justify-content: space-between;
  align-items: center;
  .ticket {
  }
  .btn_record_list {
    font-size: 1.2rem;
    svg {
      font-size: 2.2rem;
    }
  }
  .top_title {
    font-size: 48px;
  }
  .btn_setting {
    p {
      margin-top: 5px;
    }
    svg {
      font-size: 1.5rem;
    }
  }
}
.swal2-title {
  font-size: 24px;
}
#routtle-box {
  position: relative;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  min-height: 1000px;
  background: linear-gradient(
    143deg,
    #bf953f,
    #fcf6ba,
    #b38728,
    #fbf5b7,
    #aa771c
  );
}
@keyframes fadeing1 {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeing2 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.anime_bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 150%;
  aspect-ratio: 1/1;
  overflow: hidden;
  img {
    -webkit-animation: rotating 5s linear infinite;
    -moz-animation: rotating 5s linear infinite;
    -ms-animation: rotating 5s linear infinite;
    -o-animation: rotating 5s linear infinite;
    animation: rotating 5s linear infinite;
  }
}
.slot {
  position: relative;
  width: 100%;
  .slot__inner,
  .slot__outer {
    border-radius: 1.25rem;
    position: relative;
  }
  .slot__outer {
    background: #ffbf1f;
    // url(~@/assets/images/routtle/light-blubs.svg)
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0.625rem 0.625rem 0 rgb(0 0 0 / 20%);
    margin: 0 auto;
    height: 12.375rem;
    width: 53.5rem;
    padding: 1.625rem;
    z-index: 3;
    transform: scale(0.6);
  }
  .slot__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 100%;
    width: 100%;
    overflow: hidden;
    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0px;
    }
    p {
      font-size: 2rem;
      margin: 0px;
    }
  }
}

.routtle {
  transform: scale(1.5);
  padding-top: 6rem;
  display: flex;
  justify-content: center;
  .routtle_outline {
    position: relative;
    border-radius: 100%;
    background-color: #ffbe04;
    border: 1px solid #fff;
    width: 360px;
    height: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 17px;
      height: 0px;
      width: 0px;
      border-style: solid;
      z-index: 2;
    }
    &:before {
      left: 180px;
      border-width: 0 0 30px 10px;
      border-color: transparent transparent #e62d2d transparent;
      transform: rotate(180deg);
    }
    &:after {
      right: 180px;
      border-width: 0 10px 30px 0px;
      border-color: transparent transparent #ca1518 transparent;
      transform: rotate(180deg);
    }
    &.disable {
      .button_block {
        .button_ouline {
          background: #e5e5e5;
          cursor: not-allowed;
          pointer-events: all !important;
          .button_inline {
            background: #e5e5e5;
            span {
              color: rgb(200, 200, 200);
              text-shadow: 0px 0px;
            }
          }
        }
      }
    }
    &:not(.disable) {
      .button_ouline {
        &:hover {
          background: #eb4d4d;
          .button_inline {
            span {
              color: #fede81;
              text-shadow: 0px 0px;
            }
            background: #eb4d4d;
          }
        }
      }
    }
    /* position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%); */

    &.running {
      .dot {
        &:nth-child(1),
        &:nth-child(3),
        &:nth-child(5),
        &:nth-child(7),
        &:nth-child(9),
        &:nth-child(11),
        &:nth-child(13),
        &:nth-child(15) {
          -webkit-animation: fadeing1 0.4s linear infinite;
          -moz-animation: fadeing1 0.4s linear infinite;
          -ms-animation: fadeing1 0.4s linear infinite;
          -o-animation: fadeing1 0.4s linear infinite;
          animation: fadeing1 0.4s linear infinite;
        }
        &:nth-child(2),
        &:nth-child(4),
        &:nth-child(6),
        &:nth-child(8),
        &:nth-child(10),
        &:nth-child(12),
        &:nth-child(14),
        &:nth-child(16) {
          -webkit-animation: fadeing2 0.4s linear infinite;
          -moz-animation: fadeing2 0.4s linear infinite;
          -ms-animation: fadeing2 0.4s linear infinite;
          -o-animation: fadeing2 0.4s linear infinite;
          animation: fadeing2 0.4s linear infinite;
        }
      }
    }
    .dot {
      position: absolute;
      background-color: #fff;
      border-radius: 100%;
      width: 10px;
      height: 10px;
      &:nth-child(1) {
        top: 18px;
        left: 105px;
      }
      &:nth-child(2) {
        top: 3px;
      }
      &:nth-child(3) {
        top: 20px;
        left: 247px;
      }
      &:nth-child(4) {
        top: 63px;
        right: 46px;
      }
      &:nth-child(5) {
        top: 124px;
        right: 12px;
      }
      &:nth-child(6) {
        top: 198px;
        right: 5px;
      }
      &:nth-child(7) {
        top: 258px;
        right: 25px;
      }
      &:nth-child(8) {
        bottom: 42px;
        right: 68px;
      }
      &:nth-child(9) {
        bottom: 13px;
        right: 123px;
      }

      &:nth-child(10) {
        bottom: 5px;
        right: 184px;
      }
      &:nth-child(11) {
        bottom: 19px;
        left: 105px;
      }
      &:nth-child(12) {
        bottom: 53px;
        left: 54px;
      }
      &:nth-child(13) {
        bottom: 104px;
        left: 19px;
      }
      &:nth-child(14) {
        bottom: 167px;
        left: 4px;
      }
      &:nth-child(15) {
        top: 120px;
        left: 12px;
      }
      &:nth-child(16) {
        top: 62px;
        left: 45px;
      }
    }

    .routtle_inline {
      position: relative;
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;
      border-radius: 100%;
      width: 324px;
      height: 324px;
      border: 1px solid #fede81;
      transform: rotate(15deg);
      .prize_background {
        position: absolute;
        border-left: 95px solid transparent;
        border-right: 95px solid transparent;
        border-top: 164px solid;
        &:nth-child(1) {
          transform: rotate(45deg);
          left: 124px;
          top: 22px;
        }
        &:nth-child(2) {
          transform: rotate(104deg);
          left: 145px;
          top: 101px;
        }
        &:nth-child(3) {
          transform: rotate(163deg);
          left: 87px;
          top: 161px;
        }
        &:nth-child(4) {
          transform: rotate(224deg);
          left: 9px;
          top: 135px;
        }
        &:nth-child(5) {
          transform: rotate(282deg);
          left: -9px;
          top: 55px;
        }
        &:nth-child(6) {
          transform: rotate(342deg);
          top: -1px;
          left: 47px;
        }
        &:nth-child(2n + 0) {
          border-top-color: #fede81;
        }

        &:nth-child(2n + 1) {
          // border-top-color: #ffbe04;
          border-top-color: #fbbe04;
        }
      }
      .prize {
        .prize-content {
          position: absolute;
          width: 135px;
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          padding: 0 5px;
          box-sizing: border-box;
          &:nth-child(6) {
            transform: rotate(45deg);
            left: 170px;
            top: 27px;
          }
          &:nth-child(5) {
            transform: rotate(105deg);
            left: 204px;
            top: 135px;
          }
          &:nth-child(4) {
            transform: rotate(163deg);
            left: 123px;
            top: 212px;
          }
          &:nth-child(3) {
            transform: rotate(223deg);
            left: 14px;
            top: 188px;
          }
          &:nth-child(2) {
            transform: rotate(282deg);
            left: -16px;
            top: 78px;
          }
          &:nth-child(1) {
            transform: rotate(343deg);
            left: 64px;
            top: -2px;
          }
        }
      }
    }
    .button_block {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .button_wrapper {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        background-color: #ffbe04;
        width: 120px;
        height: 120px;
        z-index: 2;
      }
      .button_ouline {
        display: flex;
        background: #e62d2d;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        position: relative;
        width: 70%;
        height: 70%;
      }
      .button_inline {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: #ffbe04 !important;
        font-size: 18px;
        background: #ca1518;
        width: 80%;
        height: 80%;
        flex-wrap: wrap;
        text-align: center;
        span {
          padding: 0 10px;
          line-height: 1.2;
          color: #fede81;
          text-shadow: 0px 0px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .slot {
    .slot__outer {
      transform: scale(1);
      margin: 3rem 3rem 0;
      height: 10rem;
      width: calc(100% - 6rem);
      .slot__inner {
        h2 {
          font-size: 2rem;
        }
        p {
          font-size: 1.6rem;
        }
      }
    }
  }
  .routtle {
    transform: scale(1.3);
  }
}

@media screen and (max-width: 575px) {
  .routtle {
    transform: scale(0.95);
  }

  .slot {
    .slot__outer {
      width: calc(100% - 4rem);
      margin: 3rem 2rem 0;

      background-size: 100vw 10rem;
      .slot__inner {
        h2 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
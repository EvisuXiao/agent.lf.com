<template>
  <layout title="手机号码">
    <div>
      <group>
        <cell title="当前手机号">{{ oldMobile }}</cell>
        <x-input title="新手机号" v-model="newMobile">
          <x-button slot="right" v-if="countStart" type="default" disabled plain mini>
            <countdown v-model="countPeriod" :start="countStart" @on-finish="countFinished" ></countdown>秒后重新发送
          </x-button>
          <x-button slot="right" v-else type="primary" :disabled="!oldMobile || !newMobile" plain mini @click.native="getCode">获取验证码</x-button>
        </x-input>
        <x-input title="验证码" v-model="code"></x-input>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!code || !newMobile" @click.native="submit">更换手机号</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Countdown,
    Group,
    XInput,
    XButton
  } from 'vux'
  import { sendCode, changePhone } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Countdown,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        newMobile: '',
        code: '',
        countStart: false,
        countPeriod: 120
      }
    },
    computed: {
      oldMobile: function () {
        return this.$store.getters.userInfo.phone
      }
    },
    methods: {
      getCode () {
        sendCode().then(() => {
          this.countStart = true
        })
      },
      countFinished () {
        this.countStart = false;
        this.countPeriod = 120
      },
      submit () {
        changePhone(this.newMobile, this.code).then(() => {
          this.newMobile = '';
          this.code = '';
          this.countFinished();
          this.showToast('更新成功')
        })
      }
    }
  }
</script>

<style>
  .button-circle {
    border-radius: 99px;
  }
</style>

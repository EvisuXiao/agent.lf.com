<template>
  <layout title="手机认证" :show-back="false">
    <div>
      <group>
        <x-input title="手机号" readonly :value="phone">
          <x-button slot="right" v-if="countStart" type="default" disabled plain mini>
            <countdown v-model="countPeriod" :start="countStart" @on-finish="countFinished" ></countdown>秒后重新发送
          </x-button>
          <x-button slot="right" v-else type="primary" :disabled="!phone" plain mini @click.native="getCode">获取验证码</x-button>
        </x-input>
        <x-input title="验证码" v-model="code"></x-input>
      </group>
      <group>
        <x-button style="border-radius:99px;" type="primary" :disabled="!code || !phone" @click.native="submit">认证手机号</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Countdown,
    Group,
    XInput,
    XButton
  } from 'vux'
  import { sendCode, verifyCode } from '../../api'

  export default {
    components: {
      Layout,
      Countdown,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        code: '',
        countStart: false,
        countPeriod: 120
      }
    },
    computed: {
      phone: function () {
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
        verifyCode(this.code).then(() => {
          this.code = '';
          this.countFinished();
          this.showToast('认证成功');
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 2000)
        })
      }
    }
  }
</script>

<style>

</style>

<template>
  <layout title="找回密码">
    <div>
      <group>
        <x-input title="手机号" v-model="phone">
          <x-button slot="right" v-if="countStart" type="default" disabled plain mini>
            <countdown v-model="countPeriod" :start="countStart" @on-finish="countFinished" ></countdown>秒后重新发送
          </x-button>
          <x-button slot="right" v-else type="primary" :disabled="!phone" plain mini @click.native="getCode">获取验证码</x-button>
        </x-input>
        <x-input title="验证码" v-model="code"></x-input>
        <x-input type="password" title="新密码" placeholder="请输入8-20位数字和字母组合" v-model="pwd"></x-input>
        <x-input type="password" title="确认密码" placeholder="再次输入密码" v-model="cfmPwd"></x-input>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!code || !pwd || !cfmPwd" @click.native="submit">重设密码</x-button>
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
  import { sendCode, forgetPwd } from '../../api'

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
        phone: '',
        code: '',
        countStart: false,
        countPeriod: 120,
        pwd: '',
        cfmPwd: ''
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
      submit: function () {
        this.showConfirm('是否重设密码', () => {
          if (this.pwd !== this.cfmPwd) {
            this.errMsg('两次输入密码不一致');
            return false;
          }
          forgetPwd(this.phone, this.code, this.pwd)
            .then(() => {
              this.showToast('重设成功');
              setTimeout(() => {
                this.$router.go(-1)
              }, 2000)
            })
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

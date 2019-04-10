<template>
  <layout title="修改密码">
    <div>
      <group>
        <x-input type="password" title="旧密码" placeholder="请输入旧密码" v-model="oldPwd"></x-input>
        <x-input type="password" title="新密码" placeholder="请输入8-20位数字和字母组合" v-model="newPwd"></x-input>
        <x-input type="password" title="确认密码" placeholder="再次输入密码" v-model="cfmPwd"></x-input>
      </group>
      <group>
        <x-button class="button-circle" :disabled="!oldPwd || !newPwd || !cfmPwd" type="primary" @click.native="submit">修改密码</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout';
  import {
    Cell,
    Group,
    XInput,
    XButton
  } from 'vux'
  import { changePwd } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        oldPwd: '',
        newPwd: '',
        cfmPwd: ''
      }
    },
    methods: {
      submit: function () {
        this.showConfirm('是否修改密码', () => {
          if (this.newPwd !== this.cfmPwd) {
            this.errMsg('两次输入密码不一致');
            return false;
          }
          changePwd(this.oldPwd, this.newPwd)
            .then(() => {
              this.showToast('修改成功');
              setTimeout(() => {
                this.$router.push({path: '/login'})
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

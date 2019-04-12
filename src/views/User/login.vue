<template>
  <div>
    <div>
      <img class="login-logo" alt="" src="../../assets/login_header.png">
    </div>

    <group>
      <x-input required v-model="name" placeholder="请输入ID或手机号">
        <span slot="label" class="icon-padding"><v-icon name="user"></v-icon></span>
      </x-input>
      <x-input required type="password" v-model="pwd" placeholder="请输入密码" @keyup.enter.native="login">
        <span slot="label" class="icon-padding"><v-icon name="lock"></v-icon></span>
      </x-input>
      <cell>
        <check-icon slot="title" :value.sync="remember" type="plain">记住我</check-icon>
        <span @click="forget">忘记密码</span>
      </cell>
    </group>
    <group>
      <x-button style="border-radius: 99px;" :show-loading="loading" :disabled="buttonDisabled" type="primary" @click.native="login">登录</x-button>
    </group>
  </div>
</template>

<script>
  import { cookie, base64, Group, Cell, CheckIcon, XInput, XButton } from 'vux'
  import Icon from 'vue-awesome/components/Icon'
  import { login } from '../../api'
  export default {
    components: {
      Group,
      Cell,
      CheckIcon,
      'v-icon': Icon,
      XInput,
      XButton
    },
    data () {
      return {
        name: '',
        pwd: '',
        nameKey: 'nameKey',
        pwdKey: 'pwdKey',
        remember: false,
        lastRemember: false,
        loading: false
      }
    },
    computed: {
      buttonDisabled: function () {
        return !this.name || !this.pwd
      }
    },
    created () {
      this.getRemember();
    },
    methods: {
      getRemember () {
        const name = cookie.get(this.nameKey, {});
        const pwd = cookie.get(this.pwdKey, {});
        if (name && pwd) {
          this.name = base64.decode(name);
          this.pwd = base64.decode(pwd);
          this.remember = true;
          this.lastRemember = true
        }
      },
      login () {
        this.loading = true;
        login(this.name, this.pwd).then(() => {
          if (this.remember) {
            cookie.set(this.nameKey, base64.encode(this.name), {
              path: '/',
              expires: 31
            });
            cookie.set(this.pwdKey, base64.encode(this.pwd), {
              path: '/',
              expires: 31
            })
          } else if (this.lastRemember) {
            cookie.remove(this.nameKey, { path: '/' });
            cookie.remove(this.pwd, { path: '/' });
          }
          this.$router.push({path: '/'});
          this.loading = false
        });
        this.loading = false
      },
      forget () {
        this.$router.push({path: '/user/forget'})
      }
    }
  }
</script>

<style>
  .login-logo {
    text-align: center;
    width: 100%;
    height: 100%
  }

  .icon-padding {
    padding-left: 10px;
    padding-right: 25px;
  }
</style>

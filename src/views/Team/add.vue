<template>
  <layout title="申请代理">
    <div>
      <group>
        <x-input title="玩家ID" text-align="right" :show-clear="false" v-model="uid">
          <div slot="right" @click="search">
            <icon type="search"></icon>
          </div>
        </x-input>
        <cell title="名字">{{ user.name }}</cell>
        <x-input title="手机号" text-align="right" v-model="user.phone"></x-input>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!user || !user.phone" @click.native="submit">申请</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Icon,
    XButton,
    XInput,
    Group
  } from 'vux'
  import { getUserInfo, applyMember } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Icon,
      XButton,
      XInput,
      Group
    },
    data () {
      return {
        uid: 0,
        user: {}
      }
    },
    methods: {
      search: function () {
        if (this.uid) {
          getUserInfo(this.uid).then(data => {
            this.user = data
          })
        }
      },
      submit: function () {
        applyMember(this.user.uid, this.user.phone).then(() => {
          this.showToast('申请成功');
          this.uid = 0;
          this.user = {}
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

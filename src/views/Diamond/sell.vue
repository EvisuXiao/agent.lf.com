<template>
  <layout title="出售">
    <div>
      <group title="信息">
        <x-input title="玩家ID" text-align="right" :show-clear="false" v-model="uid">
          <div slot="right" @click="search">
            <icon type="search"></icon>
          </div>
        </x-input>
        <!--<cell title="头像">{{ user.headimgurl }}</cell>-->
        <cell title="名字">{{ user.name }}</cell>
        <cell title="手机号">{{ user.phone }}</cell>
        <cell title="余额">{{ user.money }}</cell>
      </group>
      <group title="出售">
        <x-input title="数量" text-align="right" v-model="sell.num"></x-input>
        <x-input title="金额" text-align="right" v-model="sell.rmb"></x-input>
        <x-input title="备注" text-align="right" v-model="sell.note"></x-input>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!user || !sell.num" @click.native="submit">出售</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group,
    Icon,
    XButton,
    XInput
  } from 'vux'
  import { getUserInfo, chargeDiamond } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      Icon,
      XButton,
      XInput
    },
    data () {
      return {
        uid: 0,
        user: {},
        sell: {
          num: 0,
          rmb: 0,
          note: ''
        }
      }
    },
    methods: {
      search: function () {
        if (this.uid) {
          getUserInfo(this.uid)
            .then(data => {
              this.user = data
            })
        }
      },
      submit: function () {
        chargeDiamond(this.user.uid, this.sell.num, this.sell.rmb, this.sell.note)
          .then(data => {
            this.user.money = data;
            this.showToast('出售成功')
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

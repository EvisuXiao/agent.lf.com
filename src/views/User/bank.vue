<template>
  <layout title="我的银行卡">
    <swipeout>
      <group>
        <swipeout-item v-for="(item, key) in list" :key="key">
          <div slot="right-menu">
            <swipeout-button text="删除" :width="100" @click.native="deleteCard(key)" type="warn"></swipeout-button>
          </div>
          <group slot="content" :gutter="0">
            <cell :title="item.cardNum" :inline-desc="item.bankName"></cell>
          </group>
        </swipeout-item>
      </group>
    </swipeout>
    <group>
      <cell title="添加银行卡" is-link link="/user/bankAdd"></cell>
    </group>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XInput,
    XButton
  } from 'vux'
  import { getBankCard, optBankCard } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XInput,
      XButton
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData () {
        getBankCard().then(data => {
          this.list = data
        })
      },
      deleteCard (key) {
        this.showConfirm('是否删除银行卡', () => {
          const card = this.list[key];
          optBankCard(card.name, card.bankName, card.cardNum, 3, key).then(() => {
            this.fetchData()
          })
        })
      }
    }
  }
</script>

<style>

</style>

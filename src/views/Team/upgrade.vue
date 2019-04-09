<template>
  <layout title="代理授权">
    <div>
      <group>
        <x-input title="ID" text-align="right" :readonly="isUpgrade" :show-clear="false" v-model="uid">
          <div slot="right" v-if="!isUpgrade" @click="search">
            <icon type="search"></icon>
          </div>
        </x-input>
        <cell title="名字">{{ user.name }}</cell>
        <x-input title="手机号" text-align="right" :readonly="phoneReadonly" v-model="user.phone"></x-input>
        <popup-picker title="等级" show-name :data="levelList" v-model="level"></popup-picker>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!user || !user.phone || !level.length" @click.native="submit">授权</x-button>
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
    PopupPicker,
    XButton,
    XInput
  } from 'vux'
  import { getMemberInfo, getUserInfo, upgradeMember } from '../../api'
  import { levelTab } from '../../utils'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      Icon,
      PopupPicker,
      XButton,
      XInput
    },
    data () {
      return {
        uid: 0,
        user: {},
        isUpgrade: false,
        phoneReadonly: true,
        levelList: [],
        level: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        const tab = levelTab();
        let newTab = [];
        for (let i in tab) {
          if (i > 0 && i < this.$store.getters.userInfo.level) {
            newTab.push({
              name: tab[i],
              value: i
            })
          }
        }
        if (this.$route.query.mid) {
          getMemberInfo(this.$route.query.mid).then(data => {
            this.user = data;
            this.uid = data.mid;
            this.isUpgrade = true;
            if (!data.phone) {
              this.phoneReadonly = false
            }
            let newTab2 = [];
            for (let i in newTab) {
              if (newTab[i].value > data.level) {
                newTab2.push(newTab[i])
              }
            }
            if (newTab2.length) {
              this.levelList = [newTab2]
            }
          })
        } else {
          if (newTab.length) {
            this.levelList = [newTab]
          }
        }
      },
      search () {
        if (this.uid) {
          getUserInfo(this.uid).then(data => {
            this.user = data;
            if (!data.phone) {
              this.phoneReadonly = false
            }
          })
        }
      },
      submit () {
        this.showConfirm('确认授权', () => {
          upgradeMember(this.isUpgrade ? this.user.mid : this.user.uid, this.level[0], this.user.phone).then(() => {
            this.showToast('授权成功')
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

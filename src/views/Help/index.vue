<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="帮助中心"></x-header>
    <card :header="{ title: '返利规则计算' }">
      <div slot="content">
        <group title="联合运营获得返利比例如下">
          <x-table>
            <thead style="background-color: #F7F7F7">
              <tr>
                <th>充值人</th>
                <th>比例</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list.union">
                <td>{{ item.type }}</td>
                <td>{{ item.rate }}%</td>
              </tr>
            </tbody>
          </x-table>
        </group>
        <group title="合伙人获得返利比例如下">
          <x-table>
            <thead style="background-color: #F7F7F7">
            <tr>
              <th>充值人</th>
              <th>比例</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list.partner">
              <td>{{ item.type }}</td>
              <td>{{ item.rate }}%</td>
            </tr>
            </tbody>
          </x-table>
        </group>
        <group title="总代理获得返利比例如下">
          <x-table>
            <thead style="background-color: #F7F7F7">
            <tr>
              <th>充值人</th>
              <th>比例</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list.general">
              <td>{{ item.type }}</td>
              <td>{{ item.rate }}%</td>
            </tr>
            </tbody>
          </x-table>
        </group>
        <group title="代理返钻奖励">
          <div style="padding: 20px 20px 20px 20px;">下级代理买钻则其上级可享受买钻总数量10%的钻石奖励（四舍五入取整），若其上级已获得现金返利则不可同时享受钻石奖励</div>
        </group>
      </div>
    </card>
  </div>
</template>

<script>
  import {
    Card,
    Group,
    XHeader,
    XTable
  } from 'vux'

  export default {
    components: {
      Card,
      Group,
      XHeader,
      XTable
    },
    data () {
      return {
        list: {
          union: [
            {
              type: '联合运营（本人）',
              rate: 50
            },
            {
              type: '直属合伙人及其团队',
              rate: 10
            },
            {
              type: '直属总代理及其团队',
              rate: 30
            },
            {
              type: '直属代理及其团队',
              rate: 50
            }
          ],
          partner: [
            {
              type: '合伙人（本人）',
              rate: 40
            },
            {
              type: '直属总代理及其团队',
              rate: 20
            },
            {
              type: '直属代理及其团队',
              rate: 40
            }
          ],
          general: [
            {
              type: '总代理（本人）',
              rate: 20
            },
            {
              type: '直属代理及其团队',
              rate: 20
            }
          ]
        }
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      },
      showDetail () {
        this.$router.push({path: '/team/detail'})
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>

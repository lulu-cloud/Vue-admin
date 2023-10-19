/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 21:42:14
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-21 20:54:48
 */
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false,
      refresh: false,
    }
  },
})
// 所有数据共享仓库,方便组件之间传递参数
export default useLayOutSettingStore

<template>
  <div class="container">
    <p>我的音乐</p>
    <Menu mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1" to="/personlize">
            个性推荐
        </MenuItem>
        <MenuItem name="2" to="/list">
            歌单
        </MenuItem>
        <MenuItem name="3" to="/singer">
            歌手
        </MenuItem>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'iview';
export default {
  name: 'findMusic',
  components: {
    Menu, MenuItem
  }
}
</script>

<style scoped>
.ivu-menu-horizontal {
	height: 2.4rem;
	line-height: 2.4rem;
}
</style>

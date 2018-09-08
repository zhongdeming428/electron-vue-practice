<style scoped>
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
  height: 100%;
  -webkit-app-region: no-drag
}
.layout-header-bar {
  background: #fff;
  border-bottom: 1px solid #dcdee2;
  line-height: normal;
  -webkit-app-region: drag;
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); */
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-content {
  margin-top: -0.5px
}
.menu-icon {
  transition: all 0.3s;
  -webkit-app-region: no-drag
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.left-sider {
  background-color: #fff;
}
.left-sider li {
  padding: 14px 20px !important;
}
.user-info {
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;
}
.user-info > div {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
<template>
    <div class="layout">
        <Layout style="height:100%">
            <Sider ref="side1" class="left-sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="light" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>发现音乐</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>搜索</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="logo-youtube"></Icon>
                        <span>MV</span>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <Icon type="md-person"></Icon>
                        <span>我的</span>
                    </MenuItem>
                </Menu>
                <div class="user-info">
                  <div>
                    <span>{{this.isLogin ? "" : "未登录"}}</span>
                  </div>
                </div>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0', cursor: 'pointer'}" type="md-menu" size="24"></Icon>
                    <title-bar style="float:right"></title-bar>
                </Header>
                <Content class="layout-content" :style="{background: '#fff', minHeight: '260px'}">
                    Content
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { MenuItem, Content, Layout, Header, Sider, Icon, Menu } from "iview";
import titleBar from './TitleBar';
export default {
  components: {
    titleBar,
    MenuItem,
    Content,
    Layout,
    Header,
    Sider,
    Icon,
    Menu
  },
  data() {
    return {
      isCollapsed: true,
      isLogin: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>

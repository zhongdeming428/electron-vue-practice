<style scoped>
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
  height: 100%;
  -webkit-app-region: no-drag;
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
  margin-top: -0.5px;
}
.menu-icon {
  transition: all 0.3s;
  -webkit-app-region: no-drag;
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
  color: white;
  transform: translate(-50%, -50%);
  background-color: #515a6e;
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
                    <router-link to="/">
                      <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>发现音乐</span>
                      </MenuItem>
                    </router-link>
                    <router-link to="/search">
                      <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>搜索</span>
                      </MenuItem>
                    </router-link>
                    <router-link to="/MV">
                      <MenuItem name="1-3">
                        <Icon type="logo-youtube"></Icon>
                        <span>MV</span>
                      </MenuItem>
                    </router-link>
                    <router-link to="/mine">
                      <MenuItem name="1-4">
                        <Icon type="md-person"></Icon>
                        <span>我的</span>
                      </MenuItem>
                    </router-link>
                </Menu>
                <div class="user-info" @click="showLogin">
                  <div>
                    <Avatar v-if="user.avatarUrl !== ''" :src="user.avatarUrl"/>
                    <span v-if="user.nickname === ''">未登录</span>
                  </div>
                </div>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0', cursor: 'pointer'}" type="md-menu" size="24"></Icon>
                    <title-bar style="float:right"></title-bar>
                </Header>
                <Content class="layout-content" :style="{background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
            <Modal v-model="showLoginDialog" width="320">
              <p slot="header" style="color:#515a6e;text-align:center">
                  <Icon type="md-finger-print"></Icon>
                  <span>登录网易云音乐</span>
              </p>
              <div style="text-align:center">
                  <label>账户：</label><Input v-model="account" placeholder="邮箱/电话" clearable style="width: 200px" /><br><br>
                  <label>密码：</label><Input v-model="password" placeholder="密码" clearable type="password" style="width: 200px" />
              </div>
              <div slot="footer">
                  <Button type="primary" size="default" long :loading="modal_loading" @click="login">登 录</Button>
              </div>
            </Modal>
        </Layout>
    </div>
</template>
<script>
import {
  MenuItem,
  Content,
  Layout,
  Header,
  Modal,
  Button,
  Sider,
  Icon,
  Menu,
  Input,
  Avatar
} from "iview";
import titleBar from "./TitleBar";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    titleBar,
    MenuItem,
    Content,
    Layout,
    Header,
    Sider,
    Icon,
    Menu,
    Modal,
    Input,
    Button,
    Avatar
  },
  data() {
    return {
      isCollapsed: true,
      showLoginDialog: false,
      modal_loading: false,
      account: '',
      password: ''
    };
  },
  created() {
    if (window.localStorage['isLogin']) {
      this.USER_UPDATE({
        isLogin: true,
        nickname: window.localStorage['nickname'],
        avatarUrl: window.localStorage['avatarUrl']
      });
    }
  },
  computed: {
    ...mapGetters(["user"]),
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    ...mapMutations(['USER_UPDATE']),
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    showLogin() {
      if (!this.user.isLogin) {
        this.showLoginDialog = true;
      }
    },
    login() {
      // 要先判断登录方式是电话还是邮箱，然后根据情况选择不同的端口。
      let account = this.account,
        password = this.password;
      if (account === '' && password === '') {
        // 必须输入账户密码
        this.$Message.error('请输入账户和密码！');
        return;
      }
      if (/\d+/g.test(account) && account.length === 11) {
        // 电话登录
        let url = `http://localhost:3000/login/cellphone?phone=${account}&password=${password}`;
        this.$http.get(url).then(data => {
          if (data.body.code === 200) {
            this.$Message.success('登录成功！');
            // VUEX 记录用户数据 data.body.profile
            this.USER_UPDATE(Object.assign(data.body.profile, {
              isLogin: true
            }));
            this.showLoginDialog = false;
            // 本地存储
            window.localStorage['isLogin'] = true;
            window.localStorage['nickname'] = data.body.profile.nickname;
            window.localStorage['avatarUrl'] = data.body.profile.avatarUrl;
          } else {
            this.$Message.warning(data.body.msg);
          }
        }, err => {
          console.log(err);
        });
      }
      else if (/@/g.test(account)) {
        // 邮箱登录
        alert('邮箱登录！');
      }
      else {
        // 账号非法
        alert('账户不合法！');
      }
    }
  }
};
</script>

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';

// 用户管理
import UserList from '@/components/user/UserList';
import AuthorList from '@/components/user/AuthorList';

// 小说管理
import BookList from '@/components/book/BookList';
import TypeList from '@/components/book/TypeList';

// 订单管理
import Supervise from '@/components/office/Supervise';
import SuperviseTask from '@/components/office/SuperviseTask';
import CarList from '@/components/office/CarList';
import CarAdd from '@/components/office/CarAdd';
import MeetList from '@/components/office/MeetList';
import MeetAdd from '@/components/office/MeetAdd';

import UserChangePwd from '@/components/user/changepwd';
import UserProfile from '@/components/user/profile';

import Drage from '@/components/Drage'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve);

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/D3',
      name: 'D3',
      component: Drage
    },
    {
      path: '/',
      name: '用户管理',
      component: Home,
      redirect: '/main',
      // leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-component', // 图标样式class
      children: [
        {
          path: '/main',
          name: '首页',
          component: Main
        },
        {
          path: '/userList',
          component: UserList,
          name: '用户列表',
          menuShow: true
        },
        {
          path: '/authorList',
          component: AuthorList,
          name: '作家列表',
          menuShow: true
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '小说管理',
      menuShow: true,
      iconCls: 'iconfont icon-survey1', // 图标样式class
      children: [
        {
          path: '/book/BookList',
          component: BookList,
          name: '小说列表',
          menuShow: true
        },
        {
          path: '/book/TypeList',
          component: TypeList,
          name: '分类列表',
          menuShow: true
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '订单管理',
      menuShow: true,
      iconCls: 'iconfont icon-electronics',
      children: [
        {
          path: '/book/list',
          component: Dashboard,
          name: '部门文件',
          menuShow: true
        },
        {
          path: '/book/category',
          component: Dashboard,
          name: '领导动态',
          menuShow: true
        },
        {
          path: '/book/renshi',
          component: Dashboard,
          name: '人事管理',
          menuShow: true
        },
        {
          path: '/book/kaoqin',
          component: Dashboard,
          name: '考勤管理',
          menuShow: true
        },
        {
          path: '/office/meetlist',
          component: MeetList,
          name: '会议管理',
          menuShow: true
        },
        {
          path: '/office/meetadd',
          component: MeetAdd,
          name: '新增会议',
          menuShow: false
        },
        {
          path: '/book/wupin',
          component: Dashboard,
          name: '物品管理',
          menuShow: true
        },
        {
          path: '/office/supervise',
          component: Supervise,
          name: '督办通知',
          menuShow: true
        },
        {
          path: '/office/supervisetask',
          component: SuperviseTask,
          name: '督办通知表单',
          menuShow: false
        },
        {
          path: '/office/carlist',
          component: CarList,
          name: '车辆管理',
          menuShow: true
        },
        {
          path: '/office/caradd',
          component: CarAdd,
          name: '车辆s申请',
          menuShow: false
        },
        {
          path: '/office/ss',
          component: Dashboard,
          name: '通知公告',
          menuShow: true
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '访问统计',
      menuShow: true,
      iconCls: 'iconfont icon-earth', // 图标样式class
      children: [
        {
          path: '/user/youjian',
          component: Dashboard,
          name: '电子邮件',
          menuShow: true
        },
        {
          path: '/dunxin',
          component: Dashboard,
          name: '手机短信',
          menuShow: true
        },
        {
          path: '/liuchengku',
          component: Dashboard,
          name: '办事流程库',
          menuShow: true
        },
        {
          path: '/minglu',
          component: Dashboard,
          name: '通讯名录',
          menuShow: true
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      menuShow: true,
      iconCls: 'iconfont icon-set', // 图标样式class
      children: [
        {
          path: '/user/ry',
          component: Dashboard,
          name: '人员管理',
          menuShow: true
        },
        {
          path: '/bm',
          component: Dashboard,
          name: '部门管理',
          menuShow: true
        },
        {
          path: '/user/hj',
          component: Dashboard,
          name: '角色管理',
          menuShow: true
        },
        {
          path: '/quanxian',
          component: Dashboard,
          name: '权限管理',
          menuShow: true
        },
        {
          path: '/wh',
          component: Dashboard,
          name: '系统设置',
          menuShow: true
        },
        {
          path: 'user/profile',
          component: UserProfile,
          name: '个人信息',
          menuShow: false
        },
        {
          path: 'user/changepwd',
          component: UserChangePwd,
          name: '修改密码',
          menuShow: false
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user');
    next();
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'));
    if (!user) {
      next({path: '/login'});
    } else {
      next();
    }
  }
});

export default router;

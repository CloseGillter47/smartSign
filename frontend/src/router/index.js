import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Role from '@/pages/role'
import Index from '@/pages/Index'
import Share from '@/pages/share'

import Admin_Login from '@/pages/admin/login'
import Admin_Home from '@/pages/admin/main'
import Password from '@/pages/admin/password'
import Reset from '@/pages/admin/reset'
import Lession from '@/pages/admin/lession'
import File from '@/pages/admin/file'

import Connect from '@/pages/com/connect'
import Note from '@/pages/com/note'
import NotFount from '@/pages/com/404'


import Guest from '@/pages/guest/index'
import Check from '@/pages/guest/check'
import Base from '@/pages/guest/baseInfo'
import Company from '@/pages/guest/company'
import Roboto from '@/pages/guest/roboto'
import Finally from '@/pages/guest/finally'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'loading',
    component: Admin_Login
  },
  {
    path: '/admin/home',
    name: 'adminHomePage',
    component: Admin_Home
  },
  {
    path: '/role',
    name: 'roleSelect',
    component: Role
  },
  {
    path: '/index',
    name: 'Hello',
    component: Index
  },

  {
    path: '/admin/login',
    name: 'adminLogin',
    component: Admin_Login
  },
  {
    path: '/share',
    name: 'share',
    component: Share
  },
  {
    path: '/connect',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/note',
    name: 'Note',
    component: Note
  },
  {
    path: '/admin/set/password',
    name: 'SetPassword',
    component: Password
  },
  {
    path: '/admin/set/reset',
    name: 'resetSystem',
    component: Reset
  },
  {
    path: '/admin/main/file',
    name: 'FileDetail',
    component: File
  },
  {
    path: '/admin/main/lession/:id',
    name: 'LessionDetail',
    component: Lession
  },
  /////////////////////////////////////////////////////////
  {
    path: '/guest/:id/index',
    name: 'GuestLogo',
    component: Guest
  },
  {
    path: '/guest/:id/check',
    name: 'GuestCheck',
    component: Check
  },
  {
    path: '/guest/:id/base',
    name: 'BaseInfo',
    component: Base
  },
  {
    path: '/guest/:id/company',
    name: 'Company',
    component: Company
  },
  {
    path: '/guest/:id/roboto',
    name: 'Roboto',
    component: Roboto
  },
  {
    path: '/guest/:id/finally',
    name: 'Finally',
    component: Finally
  },
  {
    path: '/404',
    name: 'NotFount',
    component: NotFount
  }
  ]
})

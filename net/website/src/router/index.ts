/*
 * @Author: JChan
 * @Date: 2024-11-20 10:55:11
 * @LastEditTime: 2025-01-06 18:01:52
 * @LastEditors: JChan
 * @Description: 路由表
 * @FilePath: \longterm_website2\src\router\index.ts
 * 嘻嘻嘻
 */

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import conf_page from '@/config/conf_page'

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: conf_page.global.base_url,
        name: 'layout',
        component: () => import("@/layout/index.vue"),
    },
    {
        path: `${conf_page.global.base_url}download`,
        name: 'download',
        component: () => import("@/layout/index.vue"),
    },
    {
        path: `${conf_page.global.base_url}about`,
        name: 'about',
        component: () => import("@/layout/index.vue"),
    },
    // {
    //     path: `${conf_page.global.base_url}license-crefun.html`,
    //     name: 'link',
    //     component: () => import("@/layout/index.vue"),
    // },
    {
        path: "/:catchAll(.*)",
        redirect: conf_page.global.base_url,
    },
]

const router = createRouter({
    history: conf_page.global.router_mode === 1 ? createWebHashHistory() : createWebHistory(),
    routes: constantRoutes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router

import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

const Layouts = () => import("@/layouts/index.vue")
const Home = () => import("@/home/index.vue")

// 后台静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/dashboard",
    component: Layouts,
    redirect: "",
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "home",
          affix: true
        }
      }
    ]
  },
  {
    path: "/article",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/article/index.vue"),
        name: "Article",
        meta: {
          title: "文章管理",
          svgIcon: "article",
          affix: true
        }
      }
    ]
  },
  {
    path: "/category",
    component: Layouts,
    children: [
      {
        path: "",

        component: () => import("@/views/category/index.vue"),
        name: "Category",
        meta: {
          title: "分类管理",
          svgIcon: "category",
          affix: true
        }
      }
    ]
  },
  {
    path: "/tags",
    component: Layouts,
    children: [
      {
        path: "",

        component: () => import("@/views/tags/index.vue"),
        name: "Tags",
        meta: {
          title: "标签管理",
          svgIcon: "tags",
          affix: true
        }
      }
    ]
  },
  {
    path: "/picture",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/picture/index.vue"),
        name: "Picture",
        meta: {
          title: "图片管理",
          svgIcon: "picture",
          affix: true
        }
      }
    ]
  },
  {
    path: "/trends",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/trends/index.vue"),
        name: "Trends",
        meta: {
          title: "动态管理",
          svgIcon: "trends",
          affix: true
        }
      }
    ]
  },

  {
    path: "/music",
    component: Layouts,
    children: [
      {
        path: "",
        //@ts-expect-error
        component: () => import("@/views/music/index.vue"),
        name: "Music",
        meta: {
          title: "音乐管理",
          svgIcon: "music",
          affix: true
        }
      }
    ]
  },
  {
    path: "/userInfo",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/userInfo/index.vue"),
        name: "UserInfo",
        meta: {
          hidden: true
        }
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: "/article-add",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/article/addArticle.vue"),
        name: "AddArticle",
        meta: {
          hidden: true
        }
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: "/article-detail",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/article/detail.vue"),
        name: "ArticleDetail",
        meta: {
          hidden: true
        }
      }
    ],
    meta: {
      hidden: true
    }
  },
  // 前台
  {
    path: "/",
    component: Home,
    name: "Home",
    meta: {
      hidden: true
    },
    children: [
      {
        path: "",
        name: "home-index",
        component: () => import("@/pages/index/index.vue")
      },
      {
        path: "home-article",
        name: "home-article",
        component: () => import("@/pages/article/index.vue")
      },
      {
        path: "home-detail",
        name: "home-detail",
        component: () => import("@/pages/article/detail.vue")
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router

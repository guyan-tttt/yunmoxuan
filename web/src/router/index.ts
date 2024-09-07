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
  {
    path: "/guestbook",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/guestbook/index.vue"),
        name: "Guestbook",
        meta: {
          title: "留言管理",
          svgIcon: "guestbook",
          affix: true
        }
      }
    ]
  },
  {
    path: "/source",
    component: Layouts,
    children: [
      {
        path: "",
        //@ts-expect-error
        component: () => import("@/views/sources/index.vue"),
        name: "Source",
        meta: {
          title: "资源管理",
          svgIcon: "source",
          affix: true
        }
      }
    ]
  },
  {
    path: "/journal",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/journal/index.vue"),
        name: "Journal",
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
    path: "/animation",
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/views/animation/index.vue"),
        name: "Animation",
        meta: {
          title: "追番管理",
          svgIcon: "animation",
          affix: true
        }
      },
      {
        path: "add",
        component: () => import("@/views/animation/add.vue"),
        name: "AddAnimation",
        meta: {
          hidden: true
        }
      },
      {
        path: "detail",
        component: () => import("@/views/animation/detail.vue"),
        name: "AnimationDetail",
        meta: {
          hidden: true
        }
      }
    ]
  }
]

// 前台静态路由
export const constWebRoutes = [
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
        path: "/",
        name: "home-index",
        component: () => import("@/pages/index/index.vue"),
        meta: {
          title: "首页",
          index: 1,
          icon: "home-index"
        }
      },
      {
        path: "/home-article",
        name: "home-article",
        component: () => import("@/pages/article/index.vue"),
        meta: {
          title: "博文",
          index: 2,
          icon: "home-article"
        }
      },
      {
        path: "/home-detail",
        name: "home-detail",
        component: () => import("@/pages/article-detail/index.vue"),
        meta: {
          hidden: true
        }
      },
      {
        path: "/home-userinfo",
        name: "home-userinfo",
        component: () => import("@/pages/userInfo/index.vue"),
        meta: {
          hidden: true
        }
      },
      {
        path: "/home-trends",
        name: "home-trends",
        component: () => import("@/pages/trends/index.vue"),
        meta: {
          title: "动态",
          index: 3,
          icon: "home-trends"
        }
      },
      {
        path: "/home-picture",
        name: "home-picture",
        component: () => import("@/pages/picture/index.vue"),
        redirect: "/home-picture/list",
        children: [
          {
            path: "list",
            name: "pricture-list",
            component: () => import("@/pages/picture/components/list.vue"),
            meta: {
              hidden: true
            }
          },
          {
            path: "detail",
            name: "pricture-detail",
            component: () => import("@/pages/picture/components/detail.vue"),
            meta: {
              hidden: true
            }
          }
        ],
        meta: {
          title: "相册",
          index: 4,
          icon: "home-picture"
        }
      },
      {
        path: "/home-guestbook",
        name: "home-guestbook",
        component: () => import("@/pages/guestbook/index.vue"),
        meta: {
          title: "留言板",
          index: 5,
          icon: "home-guestbook"
        }
      },
      {
        path: "/home-source",
        name: "home-source",
        component: () => import("@/pages/source/index.vue"),
        meta: {
          title: "资源",
          index: 6,
          icon: "home-source"
        }
      },
      {
        path: "/home-animation",
        name: "home-animation",

        meta: {
          title: "追番",
          index: 7,
          icon: "home-animation"
        },
        children: [
          {
            path: "",
            name: "AnimationList",
            component: () => import("@/pages/animation/index.vue"),
            meta: {
              hidden: true
            }
          },
          {
            path: "detail",
            name: "AnimationHomeDetail",
            component: () => import("@/pages/animation/detail.vue"),
            meta: {
              hidden: true
            }
          }
        ]
      },
      {
        path: "/home-music",
        name: "home-music",
        redirect: "/home-music/index",
        meta: {
          title: "音乐",
          index: 8,
          icon: "home-music"
        },
        children: [
          {
            path: "index",
            component: () => import("@/pages/music/index.vue"),
            name: "Music",
            meta: {
              hidden: true
            }
          },
          {
            path: "recommend-list",
            component: () => import("@/pages/music/recommendList.vue"),
            name: "MusicRecommendList",
            meta: {
              hidden: true
            }
          },
          {
            path: "category-list",
            component: () => import("@/pages/music/categoryList.vue"),
            name: "MusicCategoryList",
            meta: {
              hidden: true
            }
          },
          {
            path: "detail",
            component: () => import("@/pages/music/detail.vue"),
            name: "MusicDetail",
            meta: {
              hidden: true
            }
          }
        ]
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
  routes: constantRoutes.concat(constWebRoutes),
  scrollBehavior: () => {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router

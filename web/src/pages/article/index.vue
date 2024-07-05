<script setup lang="ts">
import UserCard from "../index/components/userCard.vue"
</script>
<template>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->
      <div class="col-span-4 px-3 md:col-span-3 sm:col-span-4">
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="p-5 mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <time class="text-lg font-semibold text-gray-900 dark:text-white">20234</time>
          <ol class="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
            <li v-for="(item2, index2) in 2" :key="index2">
              <a class="cursor-pointer items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                <img class="w-24 h-12 mb-3 mr-3 rounded-lg sm:mb-0" src="../../assets/1.jpg" alt="Jese Leos image" />
                <div class="text-gray-600 dark:text-gray-400">
                  <div class="text-base font-normal">
                    <span class="font-medium text-gray-900 dark:text-white">极客空间</span>
                  </div>
                  <!-- <div class="text-sm font-normal">"I wanted to share a webinar zeroheight."</div> -->
                  <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                    <svg
                      class="w-2.5 h-2.5 mr-2 mb-1px"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                    2024-08-01
                  </span>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-span-4 px-3 md:col-span-1 sm:col-span-4">
        <UserCard />
      </div>
    </div>
  </div>
</template>

<template>
  <!-- 文章详情 -->
  <div class="container mx-auto max-w-screen-xl mt-5 mb-3">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->
      <div class="article col-span-4 px-3 mb-3">
        <div class="bg-white border border-gray-200 p-5 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <!-- 面包屑 -->
          <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  class="cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                    />
                  </svg>
                  首页
                </a>
              </li>
              <li aria-current="page">
                <div class="flex items-center text-gray-400">
                  /
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-4 dark:text-gray-400">正文</span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- 文章主体 -->
          <article>
            <h1 class="title mt-2">文章1</h1>
            <div class="text-gray-400 text-sm flex items-center article-mata">
              <svg
                class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white"
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
              发表于 2024 03 34

              <svg
                class="inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z"
                />
              </svg>
              分类于&nbsp;<a class="text-gray-500 hover:underline">分类一</a>

              <svg
                class="inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 14"
              >
                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                </g>
              </svg>
              阅读量 2023
            </div>

            <div class="article-content" v-viewer v-highlight />

            <!-- 标签 -->
            <div class="mt-5 mb-5">
              <div
                v-for="(item, index) in 3"
                :key="index"
                class="inline-block rounded-full bg-green-100 text-green-800 text-sm font-medium mr-3 mb-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-200 hover:text-green-900"
              >
                # 标{{ index + 1 }}
              </div>
            </div>
            <p class="content pre" v-html="content" />
          </article>
          <!-- 上下篇 -->
          <div class="article-footer flex">
            <div class="cursor-pointer">
              <a>
                <span class="desc">
                  <svg
                    class="inline w-2 h-2 mr-1 mb-3px text-gray-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                    />
                  </svg>
                  上一篇</span
                >
                <span class="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">标题</span>
              </a>
            </div>
            <div class="cursor-pointer">
              <a>
                <span class="desc">
                  下一篇
                  <svg
                    class="inline w-2 h-2 ml-1 mb-3px text-gray-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </span>
                <span class="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">下一篇</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
const content = `<h2>文章目录</h2><ul><li>promise简介</li><li>第一版</li><li>第二版</li><li>小结</li></ul><h2>promise简介</h2><p><br></p><p>Promise 是JavaScript在ES6中引入的一种用于异步计算的对象。它代表了一个可能现在还没有结果，但将来某个时刻会有结果的值。Promise 的主要目的是提供一个更合理、更强大的方式来处理异步操作。</p><p><br></p><ol><li>状态：一个 Promise 对象有三种状态：</li></ol><p><br></p><p>		Pending（等待中）：初始状态，既不是成功，也不是失败状态。</p><p>		Fulfilled（已成功）：意味着操作成功完成</p><p>		Rejected（已失败）：意味着操作失败。</p><p><br></p><p>		2.创建：使用 new Promise 构造函数来创建一个新的 Promise 对象。</p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
&nbsp; &nbsp; <span class="hljs-keyword">if</span>(<span class="hljs-comment">/*条件成立*/</span>) {
&nbsp; &nbsp; <span class="hljs-title function_">resolve</span>() <span class="hljs-comment">// 调用成功方法，状态改变为fulfilled</span>
&nbsp; &nbsp; } <span class="hljs-keyword">else</span> {
&nbsp; &nbsp; <span class="hljs-title function_">reject</span>() <span class="hljs-comment">// 调用失败方法，状态改变为rejected</span>
&nbsp; &nbsp; }


</pre><p>promise构造函数接受一个回调函数作为参数，回到函数会被注入resolve与reject两个函数作为参数，分别用于改变promise对象的两种状态。</p><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;值得注意的是，一但promise的状态由Pending切换为Fulfilled或Rejected之一后，将无法再次改变。同时promise的状态只有通过其构造函数来改变，在promise外部无法修改其状态。</p><p><strong style="color: rgb(77, 77, 77);">&nbsp;&nbsp;3. 处理结果</strong><span style="color: rgb(77, 77, 77);">：使用&nbsp;</span><code style="color: rgb(77, 77, 77);">.then()</code><span style="color: rgb(77, 77, 77);">&nbsp;方法来添加在 Promise 成功时执行的回调函数，使用&nbsp;</span><code style="color: rgb(77, 77, 77);">.catch()</code><span style="color: rgb(77, 77, 77);">&nbsp;方法来添加在 Promise 失败时执行的回调函数。</span></p><pre class="ql-syntax" spellcheck="false">promise .then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {&nbsp;
<span class="hljs-comment">// 当 promise 成功时，这里的代码会被执行&nbsp;</span>
<span class="hljs-built_in">console</span>.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Success:'</span>, value);&nbsp;
}) .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {&nbsp;
<span class="hljs-comment">// 当 promise 失败时，这里的代码会被执行&nbsp;</span>
<span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Error:'</span>, error);
});
</pre><p><strong style="color: rgb(77, 77, 77);">4.链式调用</strong><span style="color: rgb(77, 77, 77);">：</span><code style="color: rgb(77, 77, 77);">.then()</code><span style="color: rgb(77, 77, 77);">&nbsp;方法返回一个新的&nbsp;</span><code style="color: rgb(77, 77, 77);">Promise</code><span style="color: rgb(77, 77, 77);">，这允许你链式调用多个&nbsp;</span><code style="color: rgb(77, 77, 77);">.then()</code><span style="color: rgb(77, 77, 77);">&nbsp;和&nbsp;</span><code style="color: rgb(77, 77, 77);">.catch()。</code></p><pre class="ql-syntax" spellcheck="false">doSomething()&nbsp;
.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> doSomethingElse(result))&nbsp;
.then(<span class="hljs-function"><span class="hljs-params">newResult</span> =&gt;</span> doThirdThing(newResult))&nbsp;
.<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(error));
</pre><p><strong style="color: rgb(77, 77, 77);">5. Promise.all()</strong><span style="color: rgb(77, 77, 77);">：用于处理多个 Promise 对象，只有当所有 Promise 都成功时，它才会成功。如果任何一个 Promise 失败，它就会失败。</span></p><pre class="ql-syntax" spellcheck="false">Promise.<span class="hljs-built_in">all</span>([promise1, promise2, promise3])
&nbsp;.then(<span class="hljs-function">(<span class="hljs-params">[result1, result2, result3]</span>) =&gt;</span> {&nbsp;
<span class="hljs-comment">// 所有 Promise 都成功时执行&nbsp;</span>
}) .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {&nbsp;
<span class="hljs-comment">// 任何一个 Promise 失败时执行&nbsp;</span>
});
</pre><p><span style="color: rgb(77, 77, 77);">&nbsp;&nbsp;</span><strong style="color: rgb(77, 77, 77);">&nbsp;6.</strong><span style="color: rgb(77, 77, 77);">&nbsp;</span><strong style="color: rgb(77, 77, 77);">Promise.race()</strong><span style="color: rgb(77, 77, 77);">：与&nbsp;</span><code style="color: rgb(77, 77, 77);">Promise.all()</code><span style="color: rgb(77, 77, 77);">&nbsp;类似，但是只要有一个 Promise 成功或失败，它就会立即执行</span></p><h3>第一版</h3><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-title class_">Promise</span>.<span class="hljs-property">all</span> = <span class="hljs-title class_">Promise</span>.<span class="hljs-property">all</span> || <span class="hljs-keyword">function</span> (<span class="hljs-params">promises</span>) {
&nbsp; &nbsp; <span class="hljs-comment">// 判断传入参数是否是数组</span>
&nbsp; &nbsp; <span class="hljs-keyword">if</span>(!<span class="hljs-title class_">Array</span>.<span class="hljs-property">isArray</span>*(promises)) {
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Promise.all must accept an array'</span>); <span class="hljs-comment">// 如传入参数不是数组，抛出错误提示该函数必须传入一个数组作为参数</span>
&nbsp; &nbsp; }
&nbsp; &nbsp; <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 结果数组</span>
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">const</span> res = []
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 遍历参数</span>
&nbsp; &nbsp; &nbsp; &nbsp; promises.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item ,index</span>)=&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 判断每个item是否是promise对象</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">if</span>(!item <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Promise</span>) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Promise.all must accept an array of promises'</span>)) <span class="hljs-comment">// 如果不是promise对象，则抛出错误提示需要接受promise对象类型的数据</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 执行该对象</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; item.<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; res[index] = data&nbsp; <span class="hljs-comment">// 将执行结果存入结果数组中</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; index++&nbsp; <span class="hljs-comment">// 序号增加</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 若此时序号与传入参数长度一致，则说明已经遍历执行完所有的promise对象</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">if</span>(index === promises.<span class="hljs-property">length</span>) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">resolve</span>(res) <span class="hljs-comment">// 返回结果数组</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 此时说明有promise对象执行失败，直接返回失败结果</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">reject</span>(reason)
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; })
&nbsp; &nbsp; &nbsp; &nbsp; })
&nbsp; &nbsp; })
}
</pre><p><br></p><h3>第二版</h3><p>第二版中限制使用ES6相关的新特性，使用低版本实现。（面试官但还是限制使用const ,let,forEach等高级API）</p><pre class="ql-syntax" spellcheck="false"><span class="hljs-title class_">Promise</span>.<span class="hljs-property">all</span> = <span class="hljs-title class_">Promise</span>.<span class="hljs-property">all</span> || <span class="hljs-keyword">function</span> (<span class="hljs-params">promises</span>) {
&nbsp; &nbsp; <span class="hljs-comment">// 判断传入参数是否是数组</span>
&nbsp; &nbsp; <span class="hljs-keyword">if</span>(!<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(promises)) {
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Promise.all must accept an array'</span>); <span class="hljs-comment">// 如传入参数不是数组，抛出错误提示该函数必须传入一个数组作为参数</span>
&nbsp; &nbsp; }
&nbsp; &nbsp; <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 结果数组</span>
&nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-keyword">var</span> res = []
&nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; promises.<span class="hljs-property">length</span>; i++) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 由于promise是异步执行的,所有必须将每次的i通过函数参数的形式传递给then方法否则promise还未执行，i已经增加了</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">index</span>) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 判断每个元素是否是promise对象</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">if</span>(!promises[index] <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Promise</span>) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Promise.all must accept an array of promises'</span>)) <span class="hljs-comment">// 如果不是promise对象，则抛出错误提示需要接受promise对象类型的数据</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; promises[index].<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; res[index] = data&nbsp; <span class="hljs-comment">// 将执行结果存入结果数组中</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; index++&nbsp; <span class="hljs-comment">// 序号增加</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 若此时序号与传入参数长度一致，则说明已经遍历执行完所有的promise对象</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-keyword">if</span>(index === promises.<span class="hljs-property">length</span>) {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">resolve</span>(res) <span class="hljs-comment">// 返回结果数组</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment">// 此时说明有promise对象执行失败，直接返回失败结果</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">reject</span>(reason)
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; })
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-title function_">handle</span>(i)
&nbsp; &nbsp; &nbsp; &nbsp;}
&nbsp; &nbsp; })
}
</pre><p>小结</p><p>主要差异</p><p>索引处理：方法二通过使用 handle 函数和 let 声明避免了闭包问题，确保每个 Promise 都能正确地更新自己的索引位置。</p><p>错误处理：方法二在发现非 Promise 对象时立即拒绝，而方法一则可能在循环结束后才抛出错误。</p><p>结果数组初始化：方法二使用 new Array(promises.length) 来初始化结果数组，这有助于避免索引问题。</p><p>尽管两种方法都尝试实现 Promise.all 的功能，但方法二在处理异步操作和索引管理方面更为健壮和准确。然而，需要注意的是，这些自定义实现通常不应该用于生产环境，因为原生的 Promise.all 方法已经非常优化，并且经过了广泛的测试。自定义实现可能会引入难以预料的bug，特别是在处理复杂的异步逻辑时。</p><p><br></p><p><br></p><p><br></p>`

// 为所有pre标签注册点击事件
const preClick = () => {
  const pres = document.querySelectorAll(".content pre")
  const div = document.createElement("div")
  div.className = "copy-btn"
  div.innerHTML = `dfefdwfwefwf`
  pres.forEach((pre) => {
    console.log(pre, div)
    // 添加到元素的相邻后面
    pre.innerHTML += `<div class='copy-btn'><svg t="1722134794672" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4275" width="20" height="20"><path d="M753.784471 870.520471c0 34.334118-26.985412 62.162824-60.235295 62.223058h-542.117647c-33.310118 0-60.235294-27.888941-60.235294-62.223058v-559.585883c0-34.334118 26.925176-62.162824 60.235294-62.162823h542.117647c33.249882 0 60.235294 27.828706 60.235295 62.162823v559.585883z m-60.235295-683.91153h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647v559.585883c0 68.668235 53.910588 124.385882 120.470588 124.385882h542.117647c66.499765 0 120.470588-55.657412 120.470589-124.385882v-559.585883c0-68.668235-53.970824-124.325647-120.470589-124.325647" fill="#666666" p-id="4276"></path><path d="M211.365647 808.056471h240.941177v-62.223059h-240.941177v62.223059z m0-124.385883h421.647059v-62.162823h-421.647059v62.162823z m0-124.325647h421.647059V497.121882h-421.647059v62.223059z m0-124.385882h421.647059V372.856471h-421.647059V434.898824z" fill="#666666" p-id="4277"></path><path d="M875.098353 0.180706h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647h60.235294c0-34.334118 26.985412-62.162824 60.235294-62.162824h542.117647c33.249882 0 60.235294 27.828706 60.235294 62.162824v559.585882c0 34.334118-26.985412 62.162824-60.235294 62.223059v62.162824c66.56 0 120.470588-55.657412 120.470588-124.385883v-559.585882c0-68.668235-53.910588-124.325647-120.470588-124.325647" fill="#666666" p-id="4278"></path></svg></div>`
  })
}

onMounted(() => {
  preClick()
})
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.title {
  padding-bottom: 20px;
  margin-bottom: 0;
  line-height: 1.3;
  word-wrap: break-word;
  font-size: 32px;
  font-weight: 700;
  color: #292525;
}

.article-mata {
  margin-bottom: 20px;
}
.article {
  width: 80%;
  margin: 0 auto;
}

:deep(pre) {
  background: #21252b;
  color: #f8f8f2;
  border-radius: 5px;
  padding: 10px 0 0;
  font-size: 17px;
  padding-left: 15px;
  padding-top: 35px;
  position: relative;
  overflow-x: auto;
  padding-bottom: 20px;
}

::v-deep(pre .copy-btn) {
  position: absolute;
  top: 20px;
  right: 20px;
}
:deep(pre code.hljs) {
  display: block;
  overflow-x: auto;
  padding: 1em;
  padding-left: 0 !important;
  padding-top: 25px !important;
}

:deep(pre:before) {
  background: #fc625d;
  border-radius: 50%;
  box-shadow:
    20px 0 #fdbc40,
    40px 0 #35cd4b;
  content: " ";
  height: 10px;
  margin-top: 5px;
  position: absolute;
  width: 10px;
  top: 5px;
}

:deep(.article-content p) {
  letter-spacing: 0.3px;
  margin: 0 0 20px 0;
  line-height: 30px;
  color: #4c4e4d;
  font-weight: 400;
  word-break: normal;
  word-wrap: break-word;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft Yahei,
    Arial,
    sans-serif;
}

:deep(.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6) {
  margin: 30px 0 10px 0;
  color: #292525;
  line-height: 150%;
  font-family:
    PingFang SC,
    Helvetica Neue,
    Helvetica,
    Hiragino Sans GB,
    Microsoft YaHei,
    "\5FAE\8F6F\96C5\9ED1",
    Arial,
    sans-serif;
}

:deep(.article-content h3) {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: 600;
}

:deep(.image-caption) {
  min-width: 20%;
  max-width: 80%;
  min-height: 43px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  /* border-bottom: 1px solid #eee; */
  font-size: 13px;
  color: #999;
  text-align: center;
}

:deep(code:not(pre code)) {
  padding: 2px 4px;
  margin: 0 2px;
  font-size: 95% !important;
  border-radius: 4px;
  color: rgb(41, 128, 185);
  background-color: rgba(27, 31, 35, 0.05);
  font-family:
    Operator Mono,
    Consolas,
    Monaco,
    Menlo,
    monospace;
}

:deep(pre code) {
  display: block;
  font-size: 95% !important;
  background-color: rgba(27, 31, 35, 0.05);
  font-family:
    Operator Mono,
    Consolas,
    Monaco,
    Menlo,
    monospace;
  /* color: #fff; */
}

:deep(article ul) {
  padding-left: 40px;
}

:deep(article ul li) {
  list-style-type: disc;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
}

:deep(blockquote) {
  /* margin: 20px 0; */
  border-left: 2.3px solid rgb(52, 152, 219);
  quotes: none;
  background: rgb(236, 240, 241);
  color: #777;
  font-size: 16px;
  /* padding: 10px 15px 10px 15px; */
  margin: 2em 0;
  padding: 24px 24px;
  position: relative;
}

:deep(blockquote p:last-child) {
  margin-bottom: 0;
}

:deep(table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

:deep(table) {
  border-collapse: collapse;
  margin-bottom: 1rem;
}

:deep(table th) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(.article-content a) {
  color: #167bc2;
}

:deep(.article-content h2) {
  /* margin: 1em auto; */
  font-size: 22px;
  line-height: 1.5;
  font-weight: bold;
  font-synthesis: style;
  /* border-bottom: 1px solid rgba(0,0,0,.1); */
  padding-bottom: 16px;
  /* border-left: 3px solid #167bc2; */
  padding-bottom: 0;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 26px;
  line-height: 140%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
}

:deep(.article-content svg) {
  display: inline;
}

:deep(.article-content img) {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  display: block;
  margin: 0 auto;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}

:deep(strong) {
  color: rgb(52, 152, 219);
}

:deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

.el-breadcrumb__inner a {
  font-weight: 400;
  color: #606266;
}

.el-breadcrumb__inner a:hover {
  font-weight: 400;
  color: #606266;
  text-decoration: underline;
}

.article-footer {
  border-top: 1px solid #e4e7ed;
  background-color: var(--el-fill-color-blank);
  justify-content: space-between;
  padding-top: 1rem;
}

.desc {
  display: block;
  font-size: 12px;
  color: rgba(60, 60, 60, 0.7);
}

.cursor-pointer {
  cursor: pointer;
}

.category-item:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tag-item:hover {
  cursor: pointer;
}

.el-tag:hover {
  background-color: var(--el-color-info-light-8);
}
</style>

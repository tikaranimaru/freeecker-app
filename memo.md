## Nuxtプロジェクト立ち上げ
ライブラリも最初に入れちゃいます。

言語：JS
UI framework：Vuetify
主なJSライブラリ：pug, @nuxtjs/proxy, vue-tinder 

vue-tinderとは
https://shanlh.github.io/vue-tinder/guide/getting-started.html#installation

```sh
// -----  nuxt 立ち上げ
(base) ~/projects yarn create nuxt-app freeecker    
yarn create v1.22.10
✨  Generating Nuxt.js project in freeecker
? Project name: freeecker
? Programming language: JavaScript
? Package manager: Yarn
? UI framework: Vuetify.js
? Nuxt.js modules: Axios - Promise based HTTP client, Progressive Web App (PWA)
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: None
? Version control system: Git
yarn run v1.22.10
$ eslint --ext ".js,.vue" --ignore-path .gitignore . --fix
✨  Done in 2.36s.

🎉  Successfully created project freeecker

  To get started:

	cd freeecker
	yarn dev

  To build & start for production:

	cd freeecker
	yarn build
	yarn start

✨  Done in 112.45s.


(base) ~/projects cd freeecker 

// -----  必要そうなライブラリをインストール
(base) ~/projects/freeecker yarn add vue-tinder  // ★★今回の肝★★
(base) ~/projects/freeecker yarn add @nuxtjs/proxy
(base) ~/projects/freeecker yarn add pug pug-plain-loader eslint-plugin-pug 

// ------ 無事起動すればOK
(base) ~/projects/freeecker yarn dev
yarn run v1.22.10
$ nuxt

   ╭───────────────────────────────────────╮
   │                                       │
   │   Nuxt @ v2.15.8                      │
   │                                       │
   │   ▸ Environment: development          │
   │   ▸ Rendering:   server-side          │
   │   ▸ Target:      server               │
   │                                       │
   │   Listening: http://localhost:3000/   │
   │                                       │
   ╰───────────────────────────────────────╯
```
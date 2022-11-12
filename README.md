# whats next
## Minimum Viable Product
- DONE: read about serverless functions and deploy
- DONE: deploy latest changes
- DONE: work on image field upload using base64 for now
- DONE: make it work online, review env vars
- DONE: read nuxtjs and vuejs best practices (create utils, composables, etc)
- DONE: document how to use netlify functions (its already been documented)
- DONE: add notification if post is success or fail
- DONE: check why image bas64 is not going through
- DONE: add workout items
- DONE: tie up new set rep field to db and generate new dist and deploy
- DONE: be able to save routines
- DONE: implement delete routine
- DONE: fix edge cases with adding workout and switching routines and creating new routine
- if workout has been updated, update workout in routine as well
- DONE: leave add workout card out instead of toggling for simpler ui/ux
- sort workout items base on latest added
- implement able to re-order workouts
- add a sort/filter feature by equipment, muscle worked
- possibly a search feature as well
- shorten base64
- auto resize input/text area fields

## Technical Backlog
- review setting up hosting, serverless (write up steps if necessary)
- review architecting app (write up steps or resources if necessary)
- after reading nuxt and vuejs doc. try to use vue3 in nuxt by using composition api, also look into vue3 new features and best practices (familiarize yourself with new concepts in nuxt and vue)
- learn how to tie up typescript with data calls on netlify functions, clean up and organize
- implement auth with faunadb and netlify functions
- implement object storage for images/media

## Upcoming Features:
- superset (be able to link 2 workouts)
- add different view mode, Show Details, Circuit Mode, Rest Mode
- add UPDATE DELETE Image Field


# dailylift
## about
a web app to keep all my fave workouts and reminder

## learning
- deploying on netlify, netlify functions and faunadb. deploying static website with serverless backend and database.
- https://blog.bitsrc.io/bootstrapping-a-serverless-jamstack-with-nuxtjs-faunadb-graphql-and-netlify-905bdd3191f

## Docs
- Netlify CLI - https://cli.netlify.com/
- Netlify Official Doc - https://docs.netlify.com/cli/get-started/
- Vue2 - https://vuejs.org/
- Nuxt2 - https://nuxtjs.org/
- Tailwind - https://tailwindcss.com/
- FaunaDB - https://docs.fauna.com/fauna/current/


## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

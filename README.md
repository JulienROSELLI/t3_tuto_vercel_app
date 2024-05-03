# Tutuo T App Gallery

## Todo

- [x] Make it deploy (not vercel self hosting works view bellow for more)
  - well in the end for the tuto did it with vercel
- [x] Scaffold Basic UI with mock data(install postgres self hosted)
- [x] tidy up build
- [x] Actually set up a database
- [x] Attach database to ui
- [x] Add authentication (w/clerk)
  - [ ] Check-out nextAuth.js
- [x] Add image upload
  - [ ] w/uploadthing.com have to remove this dependency after
- [x] Taint (server only) ** safe request handling force server side [Taint docs ](https://nextjs.org/blog/security-nextjs-server-components-actions) **
- [x] Use Next/image component
- [x] Error Managment (w/sentry?)
- [x] Routing/image page (parralel route)
- [ ] Delete button (w/ server actions)
- [ ] Analytics (postHoh)
- [ ] Ratelimiting (upstash)

## ToDo deployment

Actually push to git manually pull on the server rebuild restart

    - [ ] install pm2 on server for auto reload app
    - [ ] view possibilities check repo for update and automate pull request

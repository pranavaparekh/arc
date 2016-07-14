
### How to setup this project in your environment

[![Join the chat at https://gitter.im/amite/arc](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/amite/arc?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

1. `git clone https://github.com/amite/arc.git`
2. npm install
3. update db.php credentials
4. run `grunt`

## How to update CMS

### Updating locally

1. Make a new `cmsupdate` branch
2. Sync live db to local db - excluding info table
3. Take full backup of live db - including info table
4. Download fresh copy of craft cms from https://craftcms.com/
5. Only the app folder is required for update
6. Rename app folder temporarily to 'app-new'
7. copy the folder to craft folder
8. rename the current app folder like this: 'app-old-2.6.2793'
9. rename 'app-new' to 'app'
10. Visit http://aranca.craft.dev/admin/ and check if update sticker is removed
11. Revisit front end templates and check if anything crashed
12. Git commit with cms version number
13. Merge branch with master
14. Push to github

### Updating on live server
1. Log into admin backend and keep logged in
2. Pull from github
3. Refresh admin and complete update


### In case of update failure

1. Delete the latest app folder
2. Rename the app-old folder to app
3. Sync DB backup

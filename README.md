# Templar
Just a Simple development test.

## Design
##### Platforms
PWA client experiences available on Web, Android, iOS and Electron
##### Frameworks
- Capacitor, Ionic4, and Angular7
##### Features
HTTP Injectors
- Auth
- Logging


## Developers
##### Requirements
- Tested with Node v11.3.0
- Advise use of NVM to isolate your dev projects @ https://github.com/creationix/nvm

##### Install
- git clone this repo
- npm install -g ionic
- npm install

##### Run Tests

##### Run browser
- ionic serve


##### Structure
A high level directory structure map for this app and repo.  A useful reference for developers, especially when they want to add newfiles.
```
- src
    - app
        - app-routing.module.ts
        - app.component.html
        - app.?.ts
        - http-interceptors
            - auth
            - logging
            - events
        - services
            - message.service
            - auth.service
            - http-error-handler.service
        - modules
           - home
           - users
               - auth
               - avatar
               - list
               - new
               - profile
               - users.service
        - shared
           - components
           - pipes
           - directives
   - assets
       - icon
   - environments
   - theme
```

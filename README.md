# Templar
Just a Simple development test.

## Notes
- Challenge 1 supported
- Challenge 2 supported
- User search only searches on name
- Sidemenu (SplitPane) disappears on smaller width screens
- Some Icons in header toolbar disappear on smaller width screens
- Additional user features are stubbed in to help illustrate naming convention and possible Cognito integration
- HTTP Interceptors are for illustrating usage patterns.  Auth will fail as api endpoint is non existent.
- CI/CD files (Circle, template and dockerfile) demonstrating containerization, build and deploy
- NGINX files demonstrate forced redirect to HTTPS when deployed
- iOS app is tested
- Android app is untested

## Design
##### Platforms
PWA client experiences available on Web, iOS and Android
##### Frameworks
- Capacitor, Ionic4, and Angular7
##### UI
- Material skin on Chrome and Android devices
- Apple skin on Safari and iOS devices

## Developers
##### Requirements
- Tested with Node v11.3.0
- Advise use of NVM to isolate your dev projects @ https://github.com/creationix/nvm
##### Install
- git clone this repo
- npm install -g ionic
- npm install
##### Run browser
- ionic serve
##### Run iOS
- ionic build
- npx cap sync
- npx cap open ios
##### Run Android
- ionic build
- npx cap sync
- npx cap open android
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
               - user-avatar
               - user-new
               - users-list
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

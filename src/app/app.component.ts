import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AuthService } from './services/auth.service'
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx'
import { AmplifyService } from 'aws-amplify-angular'
import { Router } from '@angular/router'
import {environment} from '../environments/environment'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public signedIn:boolean = false
  public userPages = [
    {
      title: 'All Users',
      url: '/users-list',
      icon: 'contact'
    },
    {
      title: 'Favorites',
      url: '/users-fav',
      icon: 'star'
    },
    {
      title: 'Administrators',
      url: '/users-admin',
      icon: 'rocket'
    },
    {
      title: 'Non Admins',
      url: '/users-general',
      icon: 'people'
    },
    {
      title: 'Archived',
      url: '/users-archived',
      icon: 'filing'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private ga: GoogleAnalytics,
    public amplifyService: AmplifyService,
    private router: Router
  ) {
    this.amplifyService = amplifyService
    this.initializeApp()


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      this.initializeGoogleAnalytics()
      this.authService.registerClient()
      this.amplifyService.authStateChange$
        .subscribe(authState => {
            if (!authState.user) {
                console.log('no amplify auth : ', authState)
                this.signedIn = false
                this.router.navigate(['/users-list'])
            }
        })
    })
  }

  private initializeGoogleAnalytics() {
  this.ga.startTrackerWithId(environment.analytics)
    .then(() => {
      console.info('GA: Google analytics is ready now');
      this.ga.trackView('test');
    })
    .then(() => {
      this.ga.debugMode();
      this.ga.enableUncaughtExceptionReporting(true);
      // Feature detects Navigation Timing API support.
      if (window.performance) {
        let timeSincePageLoad = Math.round(performance.now());
        this.ga.trackTiming('timing', timeSincePageLoad, 'load', "Page load").then(() => {
          console.info(`GA: App loaded in ${timeSincePageLoad / 1000} seconds`);
        });
      }
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

}

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx'
import { HttpClientModule } from '@angular/common/http'
import { HttpErrorHandler } from './services/http-error-handler.service'
import { MessageService } from './services/message.service'
import { httpInterceptorProviders } from './http-interceptors/index'
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import { UsersListModule } from './modules/users/users-list/users.list.module'
import { AuthService } from './services/auth.service'

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import Amplify from 'aws-amplify'
// import amplify from '../aws-exports';
// Amplify.configure(amplify)

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    UsersListModule,
    AmplifyAngularModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpErrorHandler,
    MessageService,
    GoogleAnalytics,
    httpInterceptorProviders,
    AuthService,
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

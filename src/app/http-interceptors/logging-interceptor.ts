import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {


  constructor(
    private googleAnalytics: GoogleAnalytics) {}



  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;

    return next.handle(req).pipe(
        tap(
          event => {
            status = '';
            if (event instanceof HttpResponse) {
              status = 'succeeded';
            }
          },
          error => status = 'failed'
        ),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          const message = req.method + " " + req.urlWithParams +" "+ status
          + " in " + elapsedTime + "ms";

          this.logDetails(message)
          this.trackEvent(req.urlWithParams, req.method, status)
        })
    );
  }

  private logDetails(message: string,) {
    console.log('message: ', message)
  }

  public trackEvent(url:string, method:string, status:string): void {
    this.googleAnalytics.trackEvent(url, method, status, 1, true)
      .then(() => console.info('GA: Registered TRACK_EVENT', url))
      .catch((err) => console.warn('GA: viewPage', err))
  }

}

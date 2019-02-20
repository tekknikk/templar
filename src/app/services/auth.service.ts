import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { HttpErrorHandler, HandleError } from './http-error-handler.service'
import { catchError, retry, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'

import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

const auth  = {
  name: environment.client.name,
  role: environment.client.role,
  secret: environment.client.secret
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private handleError: HandleError
  private http: HttpClient
  public clientToken:string

  constructor(
    handler: HttpBackend,
    httpErrorHandler: HttpErrorHandler) {
      this.http = new HttpClient(handler)
      this.handleError = httpErrorHandler.createHandleError('AuthService')
      console.log('Hello Auth Service')
    }

    public registerClient() {
      this.register()
        .subscribe(client => {
          console.log('client: ', client)
          if (client && client.authorization.token) {
            Storage.set({key: 'token', value: 'Jwt '+ client.authorization.token});
            this.clientToken = 'Jwt '+client.authorization.token
          }
        })
    }

    register(): Observable<any> {
      return this.http
        .post<any>(environment.usersUrl+'/clients/register', auth)
        .pipe(
          catchError(this.handleError()),
        )
      }
  }

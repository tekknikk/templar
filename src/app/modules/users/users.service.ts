import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service'
import { catchError, retry, map } from 'rxjs/operators'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpOptions:any
  private handleError: HandleError
  data:any

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.data = require('./list.json')
    this.handleError = httpErrorHandler.createHandleError('UsersService')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
      })
    }
  }

  list() {
    return this.data.users
  }

  search(value:string) {
    return this.data.users.filter((user) => {
        return user.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  update(id:any, update:any): Observable<any> {
    return this.http.put<any>(environment.usersUrl +'/users', {id, update}, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', id))
      )
  }

  create(user:any): Observable<any> {
    return this.http.post<any>(environment.usersUrl + '/users', user, this.httpOptions)
      .pipe(
        catchError(this.handleError('createUser', []))
      )
  }

}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'user': 'User123',
      'password': 'Password123'
    });
    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone);
  }

  mensajeError(error:HttpErrorResponse){
    console.log('Susedió un error')
    console.warn(error)
    //return throwError('Error personalizado')
  }
}

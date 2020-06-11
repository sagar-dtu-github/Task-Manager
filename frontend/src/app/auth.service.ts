import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { shareReplay,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router,
    private http : HttpClient,
    private webReqService : WebRequestService) { }


    login(email : string, password : string){
      return this.webReqService.login(email,password).pipe(
        shareReplay(),
        tap((res : HttpResponse<any>)=>{
          // the auth tokens will be in the headers of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
          console.log('LOGGED IN!');
        })
      )
    }

    signup(email : string, password : string){
      return this.webReqService.signup(email,password).pipe(
        shareReplay(),
        tap((res : HttpResponse<any>)=>{
          // the auth tokens will be in the headers of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
          console.log('Successfully Signed Up & now logged in!');
        })
      )
    }

    logout(){
      this.removeSession();
      this.router.navigate(['/login']);
    }

    isLoggedIn() {
      return this.getAccessToken() !== null;
    }

    setAccessToken(accessToken : string){
      localStorage.setItem('x-access-token',accessToken);
    }

    getAccessToken(){
      return localStorage.getItem('x-access-token');
    }

    getRefreshToken(){
      return localStorage.getItem('x-refresh-token');
    }

    getUserId(){
      return localStorage.getItem('user-id');
    }

    private setSession(userId : string, accessToken : string, refreshToken : string){
      localStorage.setItem('user-id',userId);
      localStorage.setItem('x-access-token', accessToken);
      localStorage.setItem('x-refresh-token', refreshToken);
    }

    private removeSession(){
      localStorage.removeItem('user-id');
      localStorage.removeItem('x-access-token');
      localStorage.removeItem('x-refresh-token');
    }

    getNewAccessToken() {
      return this.http.get(`${this.webReqService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          '_id': this.getUserId()
        },
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      )
    }
    

}

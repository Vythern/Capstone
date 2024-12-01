import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService
{

    // Setup our storage and service access
    constructor
    (
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private http: HttpClient //no more article Data Service.  
    ) { }
   // Variable to handle Authentication Responses
   authResp: AuthResponse = new AuthResponse();

    // Get our token from our Storage provider.
    // NOTE: For this application we have decided that we will name
    // the key for our token 'devBlog-token'
    public getToken(): string
    {
        let out: any;
        out = this.storage.getItem('devBlog-token');
        // Make sure we return a string even if we don't have a token
        if(!out) { return ''; }
        return out;
    }
        
    // Save our token to our Storage provider.
    // NOTE: For this application we have decided that we will name
    // the key for our token 'devBlog-token'
    public saveToken(token: string): void { this.storage.setItem('devBlog-token', token); }
    
    // Logout of our application and remove the JWT from Storage
    public logout(): void { this.storage.removeItem('devBlog-token'); }
        
    // Boolean to determine if we are logged in and the token is
    // still valid. Even if we have a token we will still have to
    // reauthenticate if the token has expired
    public isLoggedIn(): boolean //maybe simplify to just this.getToken().  Verify truthiness
    {
        const token: string = this.getToken();
        if (token) 
        {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        }
        else { return false; }
    }

    // Retrieve the current user. This function should only be called
    // after the calling method has checked to make sure that the user
    // isLoggedIn.
    public getCurrentUser(): User
    {
        const token: string = this.getToken();
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
    }
    
    // Couldn't make the articleDataService login method work, kept getting 301 errors.  
    // Instead, went with a more direct approach with the formData.  
    public login(user: User, passwd: string) : void //no articleDataService login
    { //post the formData to api/login
        let formData = 
        {
            name: user.name,
            email: user.email,
            password: passwd
        };
        this.http.post<AuthResponse>('http://localhost:3000/api/login', formData)
        .subscribe(
        {
            next: (value: any) =>
            {
                if(value)
                {
                    this.authResp = value;
                    this.saveToken(this.authResp.token);
                }
            },
            error: (error: any) =>
            {
                console.log('Error: ' + error);
            }
        })
    }

    //same deal here, no more articleDataService.      
    public register(user: User, passwd: string) : void
    {  //post formData to api/register 
        let formData = 
        {
            name: user.name,
            email: user.email,
            password: passwd
        };
        this.http.post<AuthResponse>('http://localhost:3000/api/register', formData)
        .subscribe(
        {
            next: (value: any) =>
            {
                if(value)
                {
                    console.log(value);
                    this.authResp = value;
                    this.saveToken(this.authResp.token);
                }
            },
            error: (error: any) => { console.log('Error: ' + error); }
        })
    }
}
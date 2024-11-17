import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component
({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

//had to add commonmodule to the imports.  
//wasn't present in the guide.  
//lots of things that aren't clear in module seven.  



export class NavbarComponent implements OnInit {
    constructor
    (
        private authenticationService: AuthenticationService
    ) { }
    
    ngOnInit() { }
    
    public isLoggedIn(): boolean 
    {
        return this.authenticationService.isLoggedIn();
    }
    
    public onLogout(): void 
    {
        return this.authenticationService.logout();
    }
}    
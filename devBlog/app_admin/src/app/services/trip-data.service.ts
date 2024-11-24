import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripDataService 
{
    constructor
    (    
        private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
        
    baseUrl = 'http://localhost:3000/api';
    url = 'http://localhost:3000/api/trips';
    
    getTrips() : Observable<Trip[]> 
    {
        return this.http.get<Trip[]>(this.url);
    }

    addTrip(formData: Trip) : Observable<Trip>
    {
        return this.http.post<Trip>(this.url, formData);
    }

    getTrip(tripCode: string) : Observable<Trip[]> 
    {
        return this.http.get<Trip[]>(this.url + '/' + tripCode);
    }

    updateTrip(formData: Trip) : Observable<Trip> 
    {
        return this.http.put<Trip>(this.url + '/' + formData.code, formData);
    }

    deleteTrip(tripCode: string): Observable<void> //returns nothing so void observable.  
    {
        return this.http.delete<void>(this.url + '/' + tripCode);
    }

//removed login and register methods, no longer useful.  
}
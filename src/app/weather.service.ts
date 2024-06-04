import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from './wheater-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private urls = {
    LWX: 'https://api.weather.gov/gridpoints/LWX/31,80/forecast',
    TOP: 'https://api.weather.gov/gridpoints/TOP/31,80/forecast'
  };

  constructor(private http: HttpClient) { }

  getForecast(id: string): Observable<WeatherResponse> {
    if(id === 'TOP'){
      return this.http.get<WeatherResponse>(this.urls.TOP);
    }else{
      return this.http.get<WeatherResponse>(this.urls.LWX);
    }
  }
}

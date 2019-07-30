import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl: string = 'https://myhomept-server.herokuapp.com/api/'

@Injectable({ providedIn: 'root' })
export class ApiService {


    constructor(private http: HttpClient) {
    }

    get<T>(endpoint: string, params?): Observable<T> {
        return this.http.get<T>(baseUrl + endpoint, { params })
    }

    post<T>(endpoint: string, body?, params?): Observable<T> {
        return this.http.post<T>(baseUrl + endpoint, body, { params })
    }

    put<T>(endpoint: string, body, params?): Observable<T> {
        return this.http.put<T>(baseUrl + endpoint, body, { params })
    }

    delete<T>(endpoint: string, params?): Observable<T> {
        return this.http.delete<T>(baseUrl + endpoint, { params })
    }

    patch<T>(endpoint: string, body, params?): Observable<T> {
        return this.http.patch<T>(baseUrl + endpoint, body, { params })
    }
}

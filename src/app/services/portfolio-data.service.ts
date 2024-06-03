import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PortfolioDataService {

  private API_URL = "https://portfolio-json-bucket.s3.amazonaws.com/portfolio.json";

  constructor(private http: HttpClient) { }

  getData() {
    const url = this.API_URL;

    return this.http
      .get(url)
      .toPromise()
      .then((data) => {
        return data;
      });
  }
}

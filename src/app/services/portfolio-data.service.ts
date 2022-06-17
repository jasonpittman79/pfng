import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { PortfolioData } from '../models/portfolio-data.model';
import { throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PortfolioDataService {

  private API_URL = "https://api.jasonpittman.link";

  public portfolioData: Subject<PortfolioData[]> = new Subject();

  public selectedSubject: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

  getPortfolioData(): void {

    this.http.get<any>(this.API_URL, {})
      .pipe(
        catchError((e) => this.handleError(e))
      ).subscribe((response)=> {
        this.portfolioData.next(response as (PortfolioData[]));
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error: ', error);

    return throwError(
      'Internal Error.');
  };
}

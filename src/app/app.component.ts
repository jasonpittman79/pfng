import { Component, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { PortfolioDataService } from './services/portfolio-data.service';
import { from, of, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  result: any;
  resume: any;
  employers: any = [];
  dates: any = [];
  titles: any = [];
  highlights: any = [];
  skills: any = [];
  chart: any = [];

  menuItems = {
    'Resume':'description',
    'Blog':'edit',
    'Profiles':'badge',
    'Code':'code',
    'Education':'school',
    'Skills':'grade',
    'Experience':'trending_up',
    'About':'person',
  }

  faLinkedin = faLinkedin;
  faGithub = faGithub;

  public getScreenWidth: any;
  public getScreenHeight: any;

  destroyed = new Subject<void>();
  currentScreenSize: string = '';

  constructor(
    breakpointObserver: BreakpointObserver,
    public viewportScroller: ViewportScroller,
    private portfolioDataService: PortfolioDataService,) {

    Chart.register(...registerables);

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
    });
  }

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  displayIsSmall() {
    if (['Small', 'XSmall'].includes(this.currentScreenSize)) {
      return true;
    } else {
      return false;
    }
  }

  public scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  retrieveData() {
    this.portfolioDataService.getData().then((res) => {
      this.result = res;

      const resume = this.result.resume;
      const resumeLen = Object.keys(resume).length;

      for (let i = 0; i < resumeLen; i++) {
        let id = i;

        const employer = new Map<number, string>([[id, resume[i].employer]]);
        this.employers[i] = employer;

        const dates = new Map<number, string>([[id, resume[i].dates]]);
        this.dates[i] = dates;

        const title = new Map<number, string>([[id, resume[i].title]]);
        this.titles[i] = title;

        const highlights = resume[i].highlights;
        const highlightsLen = Object.keys(highlights).length;

        for (let j = 0; j < highlightsLen; j++) {
          const highlight = new Map<number, string>([[id, highlights[j]]]);
          this.highlights[j] = highlight;
        }
      }

      this.skills = this.result.skills;

      const skillData = Object.values(this.skills) as number[];
      const labelData = Object.keys(this.skills) as string[];

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: labelData,
          datasets: [
            {
              data: skillData,
              label: 'Years of Experience',
              backgroundColor: [
                '#e06f6f55',
                '#f5ac6155',
                '#ffd45955',
                '#85b97455',
                '#8bb3ba55',
                '#75abdc55',
                '#9a87c455',
                '#c784a255',
              ],
              borderColor: [
                '#e06f6f',
                '#f5ac61',
                '#ffd459',
                '#85b974',
                '#8bb3ba',
                '#75abdc',
                '#9a87c4',
                '#c784a2',
              ],
              borderWidth: 1,
              barThickness: 20,
              barPercentage: 0.75,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          indexAxis: 'y',
          scales: {
            x: {
              min: 0,
              max: 7,
            },
            y: {
              ticks: {
                autoSkip: false,
              },

              min: 0,
              max: Object.keys(this.skills).length,
            },
          },
        }
      });
    });
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.retrieveData();
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
}

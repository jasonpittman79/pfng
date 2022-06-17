import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Chart } from 'chart.js';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PortfolioDataService } from './services/portfolio-data.service';
import { PortfolioData } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  portfolioData: Observable<PortfolioData[]> = this.portfolioDataService.portfolioData;
  single: any[];
  multi: any[];
  
  title = 'Portfolio';
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

  skills = {
    'Angular':5,
    'TypeScript':5,
    'JavaScript':7,
    'Jasmine/Karma':3,
    'Node.js':1,
    'React':0.5,
    'jQuery':5,
    'HTML':7,
    'SASS/CSS':7,
    'Building User Interfaces':7,
    'Python':5,
    'Flask':5,
    'REST APIs':5,
    'SQL':4,
    'PostgreSQL':3,
    'sqlite3':4,
    'MongoDB':0.5,
    'DigitalOcean (Cloud)':5,
    'AWS':0.5,
    'Azure':0.5,
    'CI/CD':5,
    'Docker':2,
    'RancherOS':1,
    'Linux':7,
    'Agile':6,
    'JIRA':1,
    'Confluence':1,
  }

  public barChartOptions: ChartConfiguration['options'] = {
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
  };
  public barChartType: ChartType = 'bar';

  public skillData: number[] = Object.values(this.skills);
  public labelData: string[] = Object.keys(this.skills);

  public barChartData: ChartData<'bar'> = {
    labels: this.labelData,

    datasets: [
      {
        data: Object.values(this.skills), label: 'Years of Experience',
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
    ]
  };

  faLinkedin = faLinkedin;
  faGithub = faGithub;

  public getScreenWidth: any;
  public getScreenHeight: any;

  destroyed = new Subject<void>();
  currentScreenSize: string = '';

  constructor(
    breakpointObserver: BreakpointObserver,
    public viewportScroller: ViewportScroller,
    private portfolioDataService: PortfolioDataService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.portfolioData.subscribe((resp)=> {
      this.single = resp;
      this.changeDetectorRef.detectChanges();
    });

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

    console.log(this.skillData);
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

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
}

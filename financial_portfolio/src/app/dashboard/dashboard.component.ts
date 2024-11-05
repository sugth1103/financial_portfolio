import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import Chart from 'chart.js/auto';
import { AssetAllocationService } from './service/asset-allocation/asset-allocation.service';
import { AssetAllocation } from './interface/asset-allocation';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { MarketTrendsService } from './service/market-trends/market-trends.service';
import { MarketTrends } from './interface/market-trends';
import { PortfolioPerformanceService } from './service/portfolio-performance/portfolio-performance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatCardModule,MatGridListModule,BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private assetAllocationService: AssetAllocationService,private marketTrendsService:MarketTrendsService,private portFolioPerformanceData:PortfolioPerformanceService) { }
  chart:any=[];
  chart1:any=[];
  chart2:any=[];
  chart3:any=[];
  lineChartOptions!:ChartConfiguration['options'];
  lineChartData!:ChartData<'line'>;
  portFolioLineChartData!:ChartData<'line'>;
  lineChartType:ChartType = 'line';
  title = 'financial_portfolio';
  public lineChartLabels: any = [];
  public PerformanceLineChartOptions: ChartOptions = {
    responsive: true,
  };
  
  ngOnInit():void{
    forkJoin([this.assetAllocationService.getAssetAllocation(),this.marketTrendsService.getMarketTrendsData(),this.portFolioPerformanceData.getPortFolioPerformanceData()]).subscribe(([assetAllocationData,marketTrendsData,portFolioPerformanceData]) => {
      console.log("data is",assetAllocationData);
      console.log("market trend is",marketTrendsData);
      
      this.assetManagementChart(assetAllocationData);
      this.marketTrendsChart(marketTrendsData);
    });
    // this.assetAllocationService.getAssetAllocation().subscribe((data:AssetAllocation[]) => {
    //   console.log("data is",data);
      
    //   this.assetManagementChart(data);
    //   this.marketTrendsChart();
    // });
    
  }
  assetManagementChart(data:AssetAllocation[]){
    const assetTypeList = data.map((data) => data.assetType);
    const percentage = data.map((data) => data.percentage);
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: assetTypeList,
        datasets: [
          {
            label: 'Asset Allocation',
            data: percentage,
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              
            ],
          },
        ],
        
      },
      options: {
       scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {title: {
          display: true,
          text: 'Assets' // Name of x-axis
      }},
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total' // Name of x-axis
        },
        }
      }
      },
      
    });
    this.chart1 = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Market Trends',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Performance Metrics',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.chart3 = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Benchmark",
            backgroundColor: "orange",
            borderWidth: 1,
            borderColor: "black",
            data: [6,10,9,6,14,12]
          },
          {
            label: "Asset Performance",
            backgroundColor: "yellow",
            borderWidth: 1,
            borderColor: "black",
            data: [10,8,6,5,12,8]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          x: {title: {
            display: true,
            text: 'Assets' // Name of x-axis
        }},
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total' // Name of x-axis
          },
          }
        }
      }
    });
  }
  marketTrendsChart(MarketTrendsData:MarketTrends[]){
    const date = MarketTrendsData.map((data) => data.date);
    const percentageChange = MarketTrendsData.map((data) => data.percentageChange);
     this.lineChartData= {
      datasets: [
        {
          data: percentageChange,
          label: 'Market Trends',
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
        }
      ],
      labels: date
    };
  
    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0.5
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {title: {
          display: true,
          text: 'Monthly' // Name of x-axis
      }},
        y: {
          min: -10,
          title: {
            display: true,
            text: 'Percentage' // Name of x-axis
        },
        }
      }
    };
  
    this.lineChartType = 'line';
  
  }
 
  }
  

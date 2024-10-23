import { Component, Input, SimpleChanges } from '@angular/core';
import {
  Chart,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';
import { TranactionsService } from '../../../../Services/tranactions.service';
import { UserStorageService } from '../../../../Storage/user-storage.service';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  @Input() refreshData: boolean = false;
  chart: any;
  @Input() labelArray: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartColors: string[] = [];

  constructor(
    private transactionService: TranactionsService,
    private userStorage: UserStorageService
  ) {}
  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.updateChart();
  }

  renderChart() {
    const userArray = this.userStorage.getUserDetailing();
    //const index = this.transactionService.getLoggedUserIndex();
    const expense = userArray.expense;
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    Chart.register(PieController, ArcElement, Title, Legend, Tooltip);
    console.log('Hi ' + this.labelArray);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const data = {
          labels: ['Food', 'Transport', 'Shopping', 'Entertainment'],
          datasets: [
            {
              backgroundColor: ['#b91d47', '#00aba9', '#2b5797', '#e8c3b9'],
              data: [
                (this.transactionService.calculateAnalytics().foodCost /
                  expense) *
                  100,
                (this.transactionService.calculateAnalytics().transportCost /
                  expense) *
                  100,
                (this.transactionService.calculateAnalytics().shoppingCost /
                  expense) *
                  100,
                (this.transactionService.calculateAnalytics()
                  .entertainmentCost /
                  expense) *
                  100,
              ],
            },
          ],
        };

        const config: any = {
          type: 'pie' as const,
          data: data,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Expense Statistics',
              },
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        };
        this.chart = new Chart(ctx, config);
      }
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.labelArray;
      this.chart.data.datasets[0].backgroundColor = this.chartColors;
      this.chart.data.labels = this.chartLabels;
      this.chart.update();
    }
  }
}

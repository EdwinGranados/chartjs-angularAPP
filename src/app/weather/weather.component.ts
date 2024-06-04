import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js/auto';
import { WeatherResponse } from '../wheater-response';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  chart: any;
  typeChart:string = '';

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.typeChart = (id === 'TOP')? 'Kansas': 'District of Columbia'
    this.weatherService.getForecast(id!).subscribe(({properties}:WeatherResponse) => {
      const periods = properties.periods;
      const labels = periods.map((period) => period.name);
      const temperatures = periods.map((period) => period.temperature);

      this.createChart(labels, temperatures);
    });
  }

  createChart(labels: string[], data: number[]): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: data,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature'
            }
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}°F`;
              }
            }
          }
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private productsService: ProductsService) {}

  products!: IProduct[];
  productsChart!: any;
  productsChartOptions!: any;
  data!: any;

  options!: any;

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: IProduct[]) => {
        this.products = response;
        this.setProductsInChart();
      },
    });
  }

  setProductsInChart() {
    // this.productsChart = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'My First dataset',
    //       backgroundColor: '#42A5F5',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //     },
    //     {
    //       label: 'My Second dataset',
    //       backgroundColor: '#FFA726',
    //       data: [28, 48, 40, 19, 86, 27, 90],
    //     },
    //   ],
    // };

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16,
      },
      legend: {
        position: 'bottom',
      },
    };

    // this.productsChartOptions = {
    //   plugins: {
    //     legend: {
    //       labels: {
    //         color: '#ebedef',
    //       },
    //     },
    //   },
    //   scales: {
    //     x: {
    //       ticks: {
    //         color: '#ebedef',
    //       },
    //       grid: {
    //         color: 'rgba(255,255,255,0.2)',
    //       },
    //     },
    //     y: {
    //       ticks: {
    //         color: '#ebedef',
    //       },
    //       grid: {
    //         color: 'rgba(255,255,255,0.2)',
    //       },
    //     },
    //   },
    // };
  }
}

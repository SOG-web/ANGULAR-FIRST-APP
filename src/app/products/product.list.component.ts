import { Component, OnInit } from '@angular/core';
import { IProduct } from './products.interface';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.listFilter = '';
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: ${message}`;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProductsFromServer().subscribe({
      next: (productFromServer) => {
        this.products = productFromServer;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}

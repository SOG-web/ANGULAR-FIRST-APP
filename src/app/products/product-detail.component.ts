import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './product.service';
import { IProduct } from './products.interface';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  products: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProducts(id);
      console.log(this.products);
    }
  }

  getProducts(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (productFromServer) => (this.products = productFromServer),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}

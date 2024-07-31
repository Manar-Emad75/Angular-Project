import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: any;

  constructor(private productService: ProductService, public router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((ele: any) => ele.id != id);
      },
      error: (Prod_error) => {
        console.log(id);
        console.log(Prod_error);
      },
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
}

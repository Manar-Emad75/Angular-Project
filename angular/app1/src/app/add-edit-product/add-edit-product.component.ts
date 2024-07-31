import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  productId: any = 0;
  product: any;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
  });
  constructor(
    public productService: ProductService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  get getName() {
    return this.productForm.controls['name'];
  }
  get getDescription() {
    return this.productForm.controls['description'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data: any) => {
          this.product = data;
          this.getName.setValue(this.product.name);
          this.getDescription.setValue(this.product.description);
          this.getPrice.setValue(this.product.price);
          this.getQuantity.setValue(this.product.quantity);
          // this.productForm.patchValue(data);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.productId) {
      this.productService
        .editProduct(this.productId, this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/product']);
        });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/product']);
      });
    }
  }
}

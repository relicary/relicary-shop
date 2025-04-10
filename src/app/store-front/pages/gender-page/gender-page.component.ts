import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, TitleCasePipe, PaginationComponent],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.css',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),

    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: this.gender(),
        offset: request.page * 9,
      });
    },
  });
}

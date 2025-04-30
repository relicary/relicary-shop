import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import Swiper from 'swiper';
import 'swiper/css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css',
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>();

  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  ngAfterViewInit(): void {
    this.swipperInit();
  }

  swipperInit() {
    const element = this.swiperDiv().nativeElement;

    if (!element) return;

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if (!this.swiper) return;

    this.swiper.destroy(true, true);

    const paginationElement: HTMLDivElement =
      this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');

    paginationElement.innerHTML = '';
    setTimeout(() => {
      this.swipperInit();
    }, 100);

    this.swipperInit();
  }
}

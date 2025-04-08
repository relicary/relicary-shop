import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
const noImage = './assets/images/no-image.jpg';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(images: string | string[]): string {
    if (typeof images === 'string') {
      return `${baseUrl}/files/product/${images}`;
    }

    const image = images.at(0);
    if (!image) {
      return noImage;
    }

    return `${baseUrl}/files/product/${image}`;
  }
}

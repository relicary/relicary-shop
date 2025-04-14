import {
  HttpEventType,
  HttpHandlerFn,
  type HttpEvent,
  type HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// export const logginInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, ' returned a response with status ', event.status);
      }
    })
  );
}

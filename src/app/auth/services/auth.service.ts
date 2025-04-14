import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());

  token = computed<string | null>(() => this._token());

  login(email: string, pwd: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: pwd,
      })
      .pipe(
        tap((resp) => {
          this._authStatus.set('authenticated');
          this._user.set(resp.user);
          this._token.set(resp.token);
          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false);
        })
      );
  }
}

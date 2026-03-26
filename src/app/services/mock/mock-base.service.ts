import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockBaseService {
  
  protected simulateDelay = 500;

  protected getMockData<T>(data: T): Observable<T> {
    return of(data).pipe(delay(this.simulateDelay));
  }

  protected getMockDataArray<T>(data: T[]): Observable<T[]> {
    return of(data).pipe(delay(this.simulateDelay));
  }

  protected handleError(error: any): Observable<never> {
    console.error('Mock Service Error:', error);
    return new Observable<never>(subscriber => {
      subscriber.error(error);
    });
  }
}
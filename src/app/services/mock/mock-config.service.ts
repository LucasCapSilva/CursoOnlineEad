import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MockConfigService {

  private useMockServices = true; // Change to false to use real backend

  constructor() { }

  shouldUseMockServices(): boolean {
    // You can add more complex logic here based on environment or other factors
    return this.useMockServices;
  }

  enableMockServices(): void {
    this.useMockServices = true;
    console.log('Mock services enabled');
  }

  disableMockServices(): void {
    this.useMockServices = false;
    console.log('Mock services disabled - using real backend');
  }

  getCurrentMode(): string {
    return this.useMockServices ? 'MOCK' : 'REAL';
  }
}
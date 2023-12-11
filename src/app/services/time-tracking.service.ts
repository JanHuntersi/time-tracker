import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private trackingStartTime: number = 0;
  private pageName: string = "";

  constructor() { }

  getPageName(): string {
    return this.pageName;
  }

  startTracking(pageName: string): void {
    this.pageName = pageName;
    console.log("started tracking for " + pageName);
    this.trackingStartTime = Date.now();
  }

  stopTracking(): number {
    console.log("stopped tracking for " + this.pageName);
    const trackingTime = Date.now() - this.trackingStartTime;
    this.trackingStartTime = 0;
    return trackingTime;
  }

  getCurrentTime(): number {
    if (this.trackingStartTime !== 0) {
      return Date.now() - this.trackingStartTime;
    }
    return 0;
  }
}

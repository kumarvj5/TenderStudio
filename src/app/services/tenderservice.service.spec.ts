/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenderserviceService } from './tenderservice.service';

describe('Service: Tenderservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenderserviceService]
    });
  });

  it('should ...', inject([TenderserviceService], (service: TenderserviceService) => {
    expect(service).toBeTruthy();
  }));
});

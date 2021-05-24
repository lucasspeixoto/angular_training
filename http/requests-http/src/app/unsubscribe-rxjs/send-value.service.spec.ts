/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendValueService } from './send-value.service';

describe('Service: SendValue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendValueService]
    });
  });

  it('should ...', inject([SendValueService], (service: SendValueService) => {
    expect(service).toBeTruthy();
  }));
});

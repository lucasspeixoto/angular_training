import { TestBed } from '@angular/core/testing';

import { OperacaoService } from './operacao.service';

describe('OperacaoService', () => {
  let service: OperacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

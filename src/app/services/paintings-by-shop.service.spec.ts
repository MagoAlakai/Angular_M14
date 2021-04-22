import { TestBed } from '@angular/core/testing';

import { PaintingsByShopService } from './paintings-by-shop.service';

describe('PaintingsByShopService', () => {
  let service: PaintingsByShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintingsByShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

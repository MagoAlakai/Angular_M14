import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingsByShopComponent } from './paintings-by-shop.component';

describe('PaintingsByShopComponent', () => {
  let component: PaintingsByShopComponent;
  let fixture: ComponentFixture<PaintingsByShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsByShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingsByShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

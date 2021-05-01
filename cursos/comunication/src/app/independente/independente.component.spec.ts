import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependenteComponent } from './independente.component';

describe('IndependenteComponent', () => {
  let component: IndependenteComponent;
  let fixture: ComponentFixture<IndependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndependenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

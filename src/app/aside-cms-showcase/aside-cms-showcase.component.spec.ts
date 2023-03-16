import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideCmsShowcaseComponent } from './aside-cms-showcase.component';

describe('AsideCmsShowcaseComponent', () => {
  let component: AsideCmsShowcaseComponent;
  let fixture: ComponentFixture<AsideCmsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideCmsShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideCmsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

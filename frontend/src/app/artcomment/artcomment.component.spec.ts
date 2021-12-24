import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtcommentComponent } from './artcomment.component';

describe('ArtcommentComponent', () => {
  let component: ArtcommentComponent;
  let fixture: ComponentFixture<ArtcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtcommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

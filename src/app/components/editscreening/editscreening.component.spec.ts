import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditscreeningComponent } from './editscreening.component';

describe('EditscreeningComponent', () => {
  let component: EditscreeningComponent;
  let fixture: ComponentFixture<EditscreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditscreeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditscreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

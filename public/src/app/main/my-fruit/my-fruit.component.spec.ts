import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFruitComponent } from './my-fruit.component';

describe('MyFruitComponent', () => {
  let component: MyFruitComponent;
  let fixture: ComponentFixture<MyFruitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFruitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

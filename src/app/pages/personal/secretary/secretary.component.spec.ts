import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryComponent } from './secretary.component';

describe('SecretaryComponent', () => {
  let component: SecretaryComponent;
  let fixture: ComponentFixture<SecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

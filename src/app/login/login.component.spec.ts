import { async, ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService} from '../users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import  {LoginComponent} from '../login/login.component'
import  {ProfileComponent} from '../profile/profile.component'
import { WelcomeComponent } from '../welcome/welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {routes} from "../app-routing.module";
import {users} from "../../test";
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent,LoginComponent,ProfileComponent,MainComponent],
      providers:[UsersService],
      imports:[HttpClientTestingModule,RouterTestingModule,RouterTestingModule.withRoutes(routes),FormsModule, ReactiveFormsModule,RouterTestingModule,BrowserModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should log in a previously registered user (not new users)', () => {
      component.data={'username':'Samantha','password':'Douglas Extension'}
      component.users=users
      component.logindir();
      expect(component.state).toBe("login");
      expect(component.logininfo).toBe("Login Success! Redirecting to Main Page");

    });
  it('should not log in an invalid user', () => {
        component.data={'username':'Samantha','password':'Wrongpassword'}
        component.users=users
        component.logindir();
        expect(component.state).toBe("None");
      });
  it('should update error message state for displaying login error mesage to user',()=>{
         expect(component).toBeTruthy();
         component.data={'username':'Samantha','password':'Wrongpassword'}
         component.users=users
         component.logindir();
         expect(component.logininfo).toBe("You have input an invalid username or incorrect password. Please Check again. This page will redirect back in 3 seconds");
  })

});

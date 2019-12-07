import { async, ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import  {MainComponent} from '../main/main.component'
import { WelcomeComponent } from './welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {RegiService} from '../register/regi.service';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';
import {Location} from "@angular/common";
import  {LoginComponent} from '../login/login.component'
import  {ProfileComponent} from '../profile/profile.component'
import {routes} from "../app-routing.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let component2: LoginComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let fixture2: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent,LoginComponent,ProfileComponent,MainComponent],
      providers:[AuthService,RegiService],
      imports: [ FormsModule,BrowserModule,ReactiveFormsModule,RouterTestingModule,RouterTestingModule.withRoutes(routes),HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture2 = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
    fixture2.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.info1="sss";
    component.clear(1);
    expect(component.info1).toBe("");
    component.info2="sss";
    component.clear(2);
    expect(component.info2).toBe("");
  });
  it('should validate all registration field(other than age and password)',() =>{
    /*basic test for validating registration Further test is in regi.service.spec.ts*/
    component.r_pwd="aa"
    component.r_pwdc="aa"
    component.users={}
    component.dob="10-11-1996";
    component.r_acname="a12";
    component.email="ac@a.d";
    component.phone="555-555-5555";
    component.zip="77002";
    component.register();
    expect(component.info1).toBe("");
    expect(component.info2).toBe("");
    expect(component.info5).toBe("");
    expect(component.info6).toBe("Register Success!");
    component.r_acname="12a";//invalid name
    component.register();
    expect(component.info6).toBe("");
    component.email="12a";//invalid email
    component.register();
    expect(component.info6).toBe("");
    component.zip="12a";//invalid zip
    component.register();
    expect(component.info6).toBe("");


  });
  it('should not log in a invalid user(basic test)',()=>{
  /*its a basic test for invalid login.. Further test is written in login.component.spec.ts*/
      component.acname=""
      component.pwd="aa"
      component.login();
      expect(component.info3).toBe('Name Missing');
      component.acname="aa"
      component.pwd=""
      component.login();
      expect(component.info4).toBe('Password Missing');
  });

  it('should update error message state (for displaying login error mesage to user)(basic test)',fakeAsync(() =>{
  /*its a basic test for invalid login.. Further test is written in login.component.spec.ts*/
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      router.initialNavigation();
      router.navigate(['/login'],{queryParams:{'username':'2','password':'3'}});
      tick();
      component2.ngOnInit();
      tick();
      const x =component2.logininfo;
      expect(x).toBe('You have input an invalid username or incorrect password. Please Check again. This page will redirect back in 3 seconds');
      router.initialNavigation();

        }
        ));
});

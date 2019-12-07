import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {Router} from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {users2} from "../../test";
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports:[RouterTestingModule,FormsModule, ReactiveFormsModule,RouterTestingModule,BrowserModule],
      providers:[],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch the logged in users profile information', () => {
      let name = "Antonette";
      let test=users2[name];
      component.info = test;
      component.fetchcurrentinfo();
      expect(component.acname0).toBe(test['username']);
      expect(component.userId).toBe(test['userId']);
      expect(component.username).toBe(test['username']);
      expect(component.email0).toBe(test['email']);



    });
  it('shoud update user infos and validate them',()=>{
       let newname ="a12"
       let oldname = "aa"
       component.acname="a12";
       component.acname0="aa";
       component.update();
       expect(component.info1).toBe("Account Name Update from "+oldname+" to "+newname);//validname

       let newemail ="xxx"
       let oldemail = "ac@a.d"
       component.email=newemail;
       component.email0=oldemail;
       component.update();
       expect(component.info2).toBe("Email hasn't changed due to wrong format");//wrong email format

       let newphone ="222-333-4444"
       let oldphone = "123-456-7890"
       component.phone=newphone;
       component.phone0=oldphone;
       component.update();
       expect(component.info3).toBe("Phone number Update from "+oldphone+" to "+newphone);
       let newzip ="TX77005"
       let oldzip = "77005"
       component.zip=newzip;
       component.zip0=oldzip;
       component.update();
       expect(component.info4).toBe("Zipcode hasn't changed due to wrong format");

       component.pwd="aa";
       component.update();
       expect(component.info5).toBe("Password updated!");
       expect(component.pwd0).toBe("**");
       //component.pwdc="aa";


  })
});

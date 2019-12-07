import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service'
import {RegiService} from '../register/regi.service'
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-welcome',

  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers:[AuthService,RegiService]
})
export class WelcomeComponent implements OnInit {

  constructor(private service:AuthService,private service2:RegiService, private router: Router,private http:HttpClient,) { }

  acname =""
  pwd=""
  r_acname=""
  r_dname=""
  dob=""
  email=""
  phone=""
  zip=""
  r_pwd=""
  r_pwdc=""
  info1="";
  info2="";
  info3="";
  info4="";
  info5="";
  info6="";
  users={};
  IN = 0;
  ngOnInit() {
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response=>{
                        this.users = response;
                          })
  }
  login(){
    this.info3="";
    this.info4="";
    if(this.acname==""){
      this.info3="Name Missing"!
      if(this.pwd==""){
                this.info4="Password Missing"!}
      return 0;
    }
    if(this.pwd==""){
          this.info4="Password Missing"!
          return 0;
        }
    this.router.navigate(['/login'],{queryParams:{'username':this.acname,'password':this.pwd}});
  }
  register(){
    this.info1="";
    this.info2="";
    this.info5="";
    this.info6="";
    if(this.service2.agecheck(this.dob) == false)
        {this.info1= "Only 18 yrs or older can register for this.";
        return false;}
    else
        {this.info1 = "";}
    if(this.service2.passwordcheck(this.r_pwd,this.r_pwdc)==false){
        this.info2="Password is mismatch. Please input again";
        return false;
    }
    else
        {this.info2 = "";}
    if(this.service2.namecheck(this.r_acname,this.users) == false ){
        this.info5="Account Name already been taken. Please Change to another one";
        return false;
    }
    else
        {this.info5 = "";}
    var t1=(/^[A-Za-z][0-9A-Za-z]*$/.test(this.r_acname)) && (this.r_acname!="");
    var s0=/\S+@\S+\.\S+/;
    var t3=(s0.test(this.email)) &&(this.email !="");
    var t4=(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(this.dob)) && (this.dob !="");
    var t6=(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(this.phone)) && (this.phone !="");
    var t5=(/^[0-9]{5}$/.test(this.zip)) && (this.zip != "");
    var t0 = t1&&t3&&t4&&t5&&t6;
    if(t0==true)
      //{this.router.navigate(['/login'],{queryParams:{'username':'Samantha','password':'Douglas Extension'}});}
      {this.info6 ="Register Success!";
      this.dob="";
      this.r_acname="";
      this.r_dname="";
      this.r_pwd="";
      this.r_pwdc="";
      this.email="";
      this.phone="";
      }
  }
  clear(t){
      if(t==1)
        this.info1="";
      if(t==2)
        this.info2="" ;
  }

}

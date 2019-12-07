import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService} from '../users.service';
import {Router} from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsersService]
})
export class LoginComponent implements OnInit {
  logininfo = "You have input an invalid username or incorrect password. Please Check again. This page will redirect back in 3 seconds"
  public data: any;
  state = "None";
  public users :any ;
  constructor(private http:HttpClient,private user:UsersService, private router: Router,public activeRoute:ActivatedRoute) { }
  ngOnInit() {

      var r = this.router;
      this.activeRoute.queryParams.subscribe(params => {
      this.data=params;

      });
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(response=>{
        this.users=response;
        this.logindir();
      })
  }
  logindir(){
            var r = this.router;
            var users = this.data["username"];
            var pwd = this.data["password"];
            var response = this.users;
                var id=this.user.matchpassword(users,pwd,response);
                if(id != -1){
                      var status=this.user.findstatus(id,response);
                      //console.log(status);
                      //console.log('success');
                      this.logininfo = "Login Success! Redirecting to Main Page";
                      this.state = "login";
                      setTimeout(()=>{r.navigate(['/main'],{queryParams:{'username':users,'userId':id,'status':status}})}, 1000);
                  }
                else
                  { //console.log('failure'+users+pwd);
                    this.logininfo = "You have input an invalid username or incorrect password. Please Check again. This page will redirect back in 3 seconds";
                    this.state = "None";
                    setTimeout(()=>{r.navigateByUrl("");}, 3000);
                  }
            }
  }



import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  acname=""
  email=""
  phone=""
  zip=""
  acname0=""
  info1=""
  info2=""
  info3=""
  info4=""
  info5=""
  pwd0=""
  pwd=""
  email0=""
  phone0=""
  zip0=""
  username=""
  userId=0;
  st="";
  info = {}
  constructor(private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {this.activeRoute.queryParams.subscribe(params => {
                                   this.info["username"]=params["username"];
                                   this.info["email"]=params["email"];
                                   this.info["userId"] = params["userId"];
                                   this.info["status"]=params["status"];
                                   this.info["pwd"]=params["pwd"];
                                   this.info["phone"]=params["phone"]
                                   this.info['zip'] ='77005';
                                    this.fetchcurrentinfo();
                                   });
  }
  fetchcurrentinfo(){
        this.acname0 = this.info["username"];
        this.username = this.info["username"];
        this.email0 = this.info["email"];
        this.userId = this.info["userId"];
        this.st=this.info["status"];
        this.zip0 =this.info['zip'];
        this.phone0=this.info["phone"];
        var s1='*';
        var s2=this.info["pwd"];
        var l2 =0;
        if(s2 != null )
        l2=s2.length;
        this.pwd0=s1.repeat(l2);
  }
  mainpage(){
    this.router.navigate(['/main'],{queryParams:{'username':this.username,'userId':this.userId,'status':this.st}});
  }
  update(){
    this.info1="";
    this.info2="";
    this.info3="";
    this.info4="";
    this.info5="";
    if((this.acname!="")&&(this.acname!=this.acname0))
      {var t1=/^[A-Za-z][0-9A-Za-z]*$/;
      if(t1.test(this.acname)==true)
        {
          this.info1="Account Name Update from "+this.acname0+" to "+this.acname;
          this.acname0=this.acname;
          this.acname="";
        }
       else
       {this.info1="Account name hasn't changed due to wrong format";
       }
      }
     if((this.email!="")&&(this.email!=this.email0))
           {var t1=/\S+@\S+\.\S+/;
           if(t1.test(this.email)==true)
             {
             this.info2="Email Update from "+this.email0+" to "+this.email;
             this.email0=this.email;
             this.email="";
             }
           else
                  {this.info2="Email hasn't changed due to wrong format";
                  }
           }
     if((this.zip!="")&&(this.zip!=this.zip0))
                {var t1=/^[0-9]{5}$/;
                if(t1.test(this.zip)==true)
                  {
                  this.info4="Zipcode Update from "+this.zip0+" to "+this.zip;
                    this.zip0=this.zip;
                    this.zip="";
                  }
                 else
                                   {this.info4="Zipcode hasn't changed due to wrong format";
                                   }
                }
     if((this.phone!="")&&(this.phone!=this.phone0))
                {var t1=/^\d{3}-\d{3}-\d{4}$/;
                if(t1.test(this.phone)==true)
                  {this.info3="Phone number Update from "+this.phone0+" to "+this.phone;
                    this.phone0=this.phone;
                    this.phone="";
                  }
                  else
                                                     {this.info3="Phone hasn't changed due to wrong format";
                                                     }
                }
    if((this.pwd!="")){
        this.info5="Password updated!";
        var l1=this.pwd.length;
        var s1='*';
        this.pwd0=s1.repeat(l1);
    }
    this.acname="";
    this.phone="";
    this.zip="";
    this.email="";
    this.pwd="";
  }
}

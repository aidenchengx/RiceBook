import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class RegiService {

  constructor(private http:HttpClient) { }
  agecheck(age){
      var time = new Date();
      		var yr = time.getFullYear();
      		yr -= 18
      		var m = time.getMonth()+1;
      		var d = time.getDate();
      		var now = new Date(m+'-'+d+'-'+yr);
      		var target = new Date(age);
      		if (now<target)
      			return false;
      		else
      			return true;
  }
  passwordcheck(pwd,pwdc){
       if(pwd===pwdc)
          return true;
        return false;
  }
  namecheck(name,res){
      if (this.finduser(name,res)!=-1)
        return false;
      else
        return true;
                };
  finduser(user,res){
    var x= 0
      for (x=0;x<res.length;x++){
        if (res[x]["username"] === user)
            {return res[x]["id"];}
      }
      return -1;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class UsersService {
  public posts=[];
  constructor(private http:HttpClient) { }
  matchpassword(user,pwd,res){
    var x= 0
    for (x=0;x<res.length;x++){

      if (res[x]["username"] === user){
        if (res[x]["address"]["street"]===pwd)
          {return res[x]["id"];}
        else{

        return -1;}
      }
    }
    return -1;
  }
  findstatus(id,res){
    return res[id-1]["company"]["catchPhrase"];
  }

  findposts(userId,object){
      if (object["userId"]==userId)
        return true
      return false;
  }
  filterposts(keyword:string,str2:string,str3:string,str4:string){

  if ((this.content(keyword,str2)==true)||(this.content(keyword,str3)==true)||(this.content(keyword,str4)==true))
    return true;
  return false;
  }
  content(str1:string,str2:string){
          //console.log(str1,str2);
          if ((str1==null) || (str2==null))
            return false;
          if(str2.indexOf(str1)==-1)
            return false;
           return true;
      }

}

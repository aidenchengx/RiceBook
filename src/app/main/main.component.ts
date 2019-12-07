import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { UsersService} from '../users.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[UsersService]
})
export class MainComponent implements OnInit {

  constructor(private router: Router,private activeRoute:ActivatedRoute,private user:UsersService,private http:HttpClient) { }
  public userId=0
  public posts = []
  public allusers = []
  titles = ["1","2","3"];
  postbds=[{tt:"1",b:"xdfadsacsas",a:"Samatha",time:"09-14-2019",c:"[]",d:""},{tt:"2",b:"xy totamdsa",a:"Bret",time:"09-14-2019",c:"",d:""},{tt:"3",b:"xz",a:"Samantha",time:"09-14-2019",c:"",d:""}];//Display postbds
  postbds2=[];
  followers=[];
  followed = {}
  ft=""
  newac=""
  Uname=""
  Upicture="../../assets/i12.jpg"
  Ustatus=""
  newstatus=""
  newfollow1=""
  info8=""
  info9=""
  info10=""
  users = {}
  public allposts= []
  number = 0;
  IN = 0;
  comments = [[{'user':'Samatha','content':'Good text!'},{'user':'Bret','content':'LOL!'}],[{'user':'Elwin.Skylies','content':'FUnny!'},{'user':'Samatha','content':'More'}],[{'user':'Anna','content':'Yes'},{'user':'Samatha','content':'MonkaS'},{'user':'Samatha','content':'Pepega'}]];
  public userstate="log in"
  ngOnInit() {
   this.activeRoute.queryParams.subscribe(params => {
        this.userId=params["userId"];

        //console.log(this.userId);
        this.Uname = params["username"];
        this.users[this.userId] = this.Uname;
        if (this.Uname in localStorage)
          this.Ustatus = localStorage[this.Uname];
        else
          {this.Ustatus = params["status"];
          localStorage.setItem(this.Uname,this.Ustatus);
          }
        });

    this.getposts();

    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((res: any[])=>{
            this.allposts = res;
            this.getfollowers();

    })
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any[])=>{
                this.allusers = res;
        })

  }
  addfollowedposts(ID){
      var x = 0;
      this.posts = [];
      var res = this.allposts;
      var init=this.postbds.length;
      this.IN = res.length;
                  for(x=0;x<res.length;x++){
                      if(this.user.findposts(ID,res[x])==true)
                          this.posts.push(res[x]);
                  }
                  //console.log(this.posts);
                  for (x=0;x<this.posts.length;x++)
                      {var D = new Date();
                      var s1=D.toLocaleDateString();
                          var s2=D.toLocaleTimeString('en-GB');
                          var s=s1+' '+s2;
                      //console.log(this.users);
                      var cm = this.comments[x%3];
                      //console.log(cm);
                      var cs = "";
                      for (var cc=0;cc<Object.keys(cm).length;cc++)
                          cs = cs+ cm[cc]["user"]+':'+cm[cc]["content"]+'\n';
                      //console.log(cs);
                      this.postbds.push( {tt:this.posts[x]["title"],b:this.posts[x]["body"],a:this.users[ID],time:s,c:"",d:cs});
                      }
                  var img='img';
                  for (x=init;x<init+this.posts.length;x++)
                      this.postbds2.push(this.postbds[x]);
                  //console.log(init)


  }
  getposts(){

      var x =0;
      var num = 0;
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((res: any[])=>{
            for(x=0;x<res.length;x++){
                if(this.user.findposts(this.userId,res[x])==true)
                    {this.posts.push(res[x]);}
            }

            for (x=0;x<this.posts.length;x++)
                {var D = new Date();
                var s1=D.toLocaleDateString();
                    var s2=D.toLocaleTimeString('en-GB');
                    var s=s1+' '+s2;
               // console.log(D);
               var cm = this.comments[x%3];
                                     //console.log(cm);
               var cs = "";
               for (var cc=0;cc<Object.keys(cm).length;cc++)
                    cs = cs+ cm[cc]["user"]+':'+cm[cc]["content"]+'\t';
                this.postbds[x] = {tt:this.posts[x]["title"],b:this.posts[x]["body"],a:this.Uname,time:s,c:"",d:cs};
                }
            var img='img';
            this.postbds[9][img] = "../../assets/i40.jpg"
            this.postbds[8][img]="../../assets/i41.jpg"
            this.postbds[7][img]="../../assets/i42.jpg"
            this.postbds[6][img]="../../assets/i43.jpg"
            for (x=0;x<this.posts.length;x++)
                this.postbds2.push(this.postbds[x]);
                     })

  }
  getfollowers(){
    var x = this.userId;
    var i = 1;
    var i1 = 3;
    var i2 = x;
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any[])=>{
        for(i=1;i<=3;i++){
          i2 ++;
          i1=i2 %11;
          this.users[i1] = res[i1]["username"];
          this.followers.push({p:'',n:res[i1]["username"],st:res[i1]["company"]["catchPhrase"]});
          this.followed[res[i1]["username"]]=true;
          this.addfollowedposts(i1);
        };
        this.followers[0].p = "../../assets/i10.jpg";
        this.followers[1].p = "../../assets/i11.jpg";
        this.followers[2].p = "../../assets/i13.jpg";
        })
  }

  nprofile(){
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any[])=>{
      var xr=res[this.userId-1];
      var phone=xr["phone"];
      var username=xr["username"];
      var email=xr["email"];
      var yr=xr["address"]["street"];
      this.router.navigate(['/profile'],{queryParams:{"phone":phone,"username":username,"email":email,"userId":this.userId,"status":this.Ustatus,"pwd":yr,}});})
  }
  logout(){
      this.userstate = "logout";
      this.router.navigate(['']);
  }
  comment(j){
    var l =this.postbds.length;
    j=l-j-1
    if (this.postbds[j].c == "")
      this.postbds[j].c = "Comments"+"\n"+this.postbds[j].d;
    else
      this.postbds[j].c="";
    return true;
  }
  Edit(){
    return true;
  }
  filter(){
    this.postbds=[];
    for(var x= 0;x<this.postbds2.length;x++){
        if (this.user.filterposts(this.ft,this.postbds2[x].b,this.postbds2[x].tt,this.postbds2[x].a)==true)
          {this.postbds.push(this.postbds2[x]);}
  }
  }
  clear(){
    this.newac="";
    this.info10="";
  }
  postnew(){
    this.info10="";
    if(this.newac==""){
    this.info10="Empty input";
    return false;}
    var D=new Date();
    var s1=D.toLocaleDateString();
    var s2=D.toLocaleTimeString('en-GB');
    var s=s1+' '+ s2;
    this.postbds.push({tt:'new article',b:this.newac,a:this.Uname,time:s,c:"",d:""});
    this.postbds2.push({tt:'new article',b:this.newac,a:this.Uname,time:s,c:"",d:""});
    this.newac="";
  }
  updatestatus(){
    this.info9="";
    if(this.newstatus=="")
      {
      this.info9="Empty input!";
      return false;
      }
    this.Ustatus=this.newstatus;
    localStorage[this.Uname]=this.Ustatus;
    this.newstatus="";
  }
  unfollow(i){

    var l = this.followers.length;
    var name = this.followers[l-i-1]['n'];
      for(var x=0;x<this.postbds2.length;)
        {if (this.postbds2[x]['a']==name)
            this.postbds2.splice(x,1);
          else
            x++;
        }
      for(var x=0;x<this.postbds.length;)
              {if (this.postbds[x]['a']==name)
                  this.postbds.splice(x,1);
               else
                  x++;
              }
      this.followers.splice(l-i-1,1);
      this.followed[name] =false;
  }
  newfollow(){
  this.info8="";
    if(this.newfollow1=="")
    {this.info8="Empty input!";
    return 0;}
    var nf=parseInt(this.newfollow1)-1;
    if (nf+1 == this.userId)
      {this.info8="Can't followed yourself!"
      return 0;};
    if((nf<0)||(nf>=10)){
      this.info8="User not exists";
      return 0;
    }
    if((nf>=0) &&(nf<=9)){
      var res = this.allusers;
      var nn = res[nf]["username"];
      if(this.followed[nn]==true)
            {this.info8="You already followed this user.";
                   return 0;}
      this.followers.push({p:"../../assets/i30.jpg",n:res[nf]["username"],st:res[nf]["company"]["catchPhrase"]});
      this.newfollow1="";
      this.users[nf+1] = res[nf]["username"];
      this.addfollowedposts(nf+1);
      this.followed[nn] = true;

  }
    else
    {this.newfollow1=""
    this.info8="No User found!"
    return false;}
}
}

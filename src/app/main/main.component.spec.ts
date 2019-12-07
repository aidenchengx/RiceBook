
import { async, ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ActivatedRoute,Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService} from '../users.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {Location} from "@angular/common";

import {routes} from "../app-routing.module";
import  {LoginComponent} from '../login/login.component'
import  {ProfileComponent} from '../profile/profile.component'
import { WelcomeComponent } from '../welcome/welcome.component';
import {users,posts} from "../../test";
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
   let location: Location;
    let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent,LoginComponent,ProfileComponent,MainComponent],
      imports:[RouterTestingModule,FormsModule, ReactiveFormsModule,RouterTestingModule,BrowserModule,RouterTestingModule.withRoutes(routes),HttpClientTestingModule],
      providers:[UsersService],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    /* router = TestBed.get(Router);
     location = TestBed.get(Location);
     router.initialNavigation();
     router.navigate(['/main'],{queryParams:{'username':'Samantha','userId':3,'status':'sss'}});*/
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.users= {1:'Bret',2:'Antonette',3:'Samantha',4:'Karianne',5:'Kamren',6:'Leopoldo_Corkery',7:'Elwyn.Skiles',8:'Maxime_Nienow',9:'Delphine',10:'Moriah.Stanton'}


  });

  it('should create', () => {
    component.getfollowers();
    component.getposts();
    expect(component).toBeTruthy();

  });

  it('should log out', fakeAsync(() =>{

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    component.logout();
    expect(component.userstate).toBe("logout");//test if the state indicates to be 'logout'
    tick();
    expect(location.path()).toBe('/');//test it has returned to the landing page

  }))
  it('should add articles when adding a follower', () => {
      /*test the function of addfollowedposts*/
    let ID = 5;
    let x ='';
    component.postbds=[];//the array of displayed posts for HTML
    component.postbds2=[];
    component.allposts=posts;
    component.allusers=users;
    component.newfollow1=''+ID;
    component.newfollow();
    //component.addfollowedposts(ID);
    expect(component.posts.length).toBe(10);   //test the number of new added followed user's posts
    for(var i=0;i<component.posts.length;i++){
    expect(component.postbds[i].a).toBe(component.users[ID]);} // test if the posts selected belong to this user
    component.newfollow1='5';
    component.newfollow();
    expect(component.info8).toBe("You already followed this user.");
    component.newfollow1='';
    component.newfollow();
    expect(component.info8).toBe("Empty input!");
    })


    it('should remove articles when removing a follower', () => {
    /*test the function of unfollow*/
      component.followers=[{n:"Bret",st:"",p:""},{n:"Antonette",st:"",p:""},{n:"Samantha",st:"",p:""},{n:"Karianne",st:"",p:""}];
      component.allposts=posts;
      component.postbds=[];//the array of displayed posts for HTML
      component.postbds2=[];
      component.addfollowedposts(1);
      component.addfollowedposts(2);
      component.addfollowedposts(3);
      component.addfollowedposts(4);//ADD Bret,Antonette,Samatha,Karianne post to displayed
      component.followed={"Bret":true,"Antonette":true,"Samantha":true,"Karianne":true}
      component.users={1:'Bret',2:'Antonette',3:'Samantha',4:'Karianne',5:'Kamren',6:'Leopoldo_Corkery',7:'Elwyn.Skiles',8:'Maxime_Nienow',9:'Delphine',10:'Moriah.Stanton'}
      expect(component.postbds.length).toBe(40);
      let index = 3;// We will unfollow Karianne
      let unfollowname = component.followers[index]
      component.unfollow(component.followers.length-1-index);//Because display is reversed,0 is index to "Karianne"(4-0-1==3) in unfollow . Means we will unfollow Karianne
      expect(component.postbds.length).toBe(30);//remove ten articles by Karianne, so the left is 40-10==30
      for(var i=0;i<component.postbds.length;i++){
          expect(component.postbds[i].a).not.toBe(unfollowname);}

    })

    it('should display comment',()=>{
        component.allposts=posts;
        component.postbds=[];//the array of displayed posts for HTML
        component.postbds2=[];
        component.addfollowedposts(1);
        var j=3;
        var l =component.postbds.length;
        var x=l-j-1
        component.comment(j);
        expect(component.postbds[x].c).not.toBe("");
        component.comment(j);
        expect(component.postbds[x].c).toBe("");

    })
    it('should post new article',()=>{
        component.postbds=[];//the array of displayed posts for HTML
        component.postbds2=[];
        let body=""
        component.newac=body;
        component.postnew();
        expect(component.info10).toBe("Empty input");//test empty article
        body="New Article"
        component.newac=body;
        component.postnew();
        expect(component.postbds.length).toBe(1);
        expect(component.postbds[0].b).toBe(body);//test if new article has been put
        body="New Article"
                component.newac=body;
        component.clear();
        expect(component.newac).toBe("");//test if clear() works
        component.Edit();
    })
    it('should filter displayed articles by the search keyword',()=>{
        //initialize posts
        component.followers=[{n:"Bret",st:"",p:""},{n:"Antonette",st:"",p:""},{n:"Samantha",st:"",p:""},{n:"Karianne",st:"",p:""}];
        component.allposts=posts;
        component.postbds=[];
        component.postbds2=[];
        component.addfollowedposts(1);
        component.addfollowedposts(2);
        component.addfollowedposts(3);
        component.addfollowedposts(4);
        //filter by author
        component.ft="Bret"
        component.filter();
        expect(component.postbds.length).toBe(10);
        for(var x=0;x<component.postbds.length;x++)
          expect(component.postbds[x].a).toBe(component.ft);
        //reset
        component.ft="";
        component.filter();
        //filter by body(+title)
        component.ft="odio"
        component.filter();
        for(var x=0;x<component.postbds.length;x++)
            expect(component.postbds[x].tt+component.postbds[x].b).toContain(component.ft);
    })
    it('should update status',()=>{
      component.newstatus="";
      component.updatestatus();
      expect(component.info9).toBe("Empty input!");
      let newstatus = "newstatus";
      component.newstatus=newstatus;
      component.updatestatus();
      expect(component.Ustatus).toBe(newstatus);

    })


});

import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {users,posts} from "../test";
describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  imports:[HttpClientTestingModule],
  providers: [UsersService],
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
  it('should find the id of previous registered user',() =>{
    const service: UsersService = TestBed.get(UsersService);
    let id = service.matchpassword("Samantha","Douglas Extension",users)
    expect(id).not.toBe(-1);
    expect(id).toBe(3);
  });
  it('should find wrong password of a valid user',() =>{
      const service: UsersService = TestBed.get(UsersService);
      let id = service.matchpassword("Sam","Douglous",users)
      expect(id).toBe(-1);
    });
  it('should fetch articles for current logged in user',()=>{
      const service: UsersService = TestBed.get(UsersService);
      let userId = '3';//Samantha's id
      let test = false;
      for (var x=0;x<posts.length;x++){
        test = service.findposts(userId,posts[x]);
        if(posts[x]["userId"] == parseInt(userId)){
          expect(test).toBe(true);
        }
        else
          expect(test).toBe(false);
      }
    });
    it('should find user status',()=>{
      const service: UsersService = TestBed.get(UsersService);
      let userId=2;
      let test = service.findstatus(userId,users);
      expect(test).toBe(users[userId-1]["company"]["catchPhrase"]);
    })
    it('should filter the right results',() =>{
      const service: UsersService = TestBed.get(UsersService);
      let keywordByAuthor="Bret";//
      let keywordByContent="totam";//
      let postbds=[{tt:"1",b:"xdfadsacsas",a:"Samatha",time:"09-14-2019",c:"",d:""},{tt:"2",b:"xy totamdsa",a:"Bret",time:"09-14-2019",c:"",d:""},{tt:"3",b:"xz",a:"Samantha",time:"09-14-2019",c:"",d:""}];
      let test0 = service.filterposts(keywordByAuthor,postbds[0].a,postbds[0].b,postbds[0].tt);
      let test1 = service.filterposts(keywordByAuthor,postbds[1].a,postbds[1].b,postbds[1].tt);
      let test2 = service.filterposts(keywordByContent,postbds[1].a,postbds[1].b,postbds[1].tt);
      let test3 = service.filterposts(keywordByContent,postbds[2].a,postbds[2].b,postbds[2].tt);
       expect(test0).toBe(false);
       expect(test1).toBe(true);
       expect(test2).toBe(true);
       expect(test3).toBe(false);
      });
});

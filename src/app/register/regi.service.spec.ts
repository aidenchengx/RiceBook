import { TestBed } from '@angular/core/testing';

import { RegiService } from './regi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {users,posts} from "../../test";
describe('RegiService', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [RegiService],imports: [ HttpClientTestingModule ]}));

  it('should be created', () => {
    const service: RegiService = TestBed.get(RegiService);
    expect(service).toBeTruthy();
  });
  it('should validate the registration fields',()=>{
    const service: RegiService = TestBed.get(RegiService);
    let testage1 = service.agecheck('11-12-2011');
    let testage2 = service.agecheck('11-12-1997');
    let testpwdmatch1 = service.passwordcheck('2','3');
    let testpwdmatch2 = service.passwordcheck('xxx','xxx');
    let testname1 = service.namecheck('Samantha',users);
    let testname2 = service.namecheck('Samantha2',users);
    expect(testage1).toBe(false);
    expect(testage2).toBe(true);
    expect(testpwdmatch1).toBe(false);
    expect(testpwdmatch2).toBe(true);
    expect(testname1).toBe(false);
    expect(testname2).toBe(true);

  });
});

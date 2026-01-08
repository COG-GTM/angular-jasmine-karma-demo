import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersServices } from './UsersServices';

describe('UsersServices', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UsersServices]
    });
    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getUsers method', () => {
    expect(service.getUsers).toBeDefined();
  });
});

describe('UsersServices: getUsers HTTP call', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UsersServices]
    });
    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable of users', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should make a GET request to the correct URL', () => {
    service.getUsers().subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.url).toBe(apiUrl);
    req.flush([]);
  });

  it('should handle empty response', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush([]);
  });

  it('should handle single user response', () => {
    const singleUser = [{ id: 1, name: 'Solo User', email: 'solo@example.com' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(singleUser);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(singleUser);
  });

  it('should handle multiple users response', () => {
    const multipleUsers = [
      { id: 1, name: 'User One', email: 'one@example.com' },
      { id: 2, name: 'User Two', email: 'two@example.com' },
      { id: 3, name: 'User Three', email: 'three@example.com' },
      { id: 4, name: 'User Four', email: 'four@example.com' },
      { id: 5, name: 'User Five', email: 'five@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(multipleUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(multipleUsers);
  });
});

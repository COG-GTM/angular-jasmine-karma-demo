import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersServices } from './UsersServices';

describe('UsersServices', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersServices]
    });

    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be properly injected', () => {
    expect(service).toBeInstanceOf(UsersServices);
    expect(httpClient).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should make HTTP GET request to correct URL', () => {
      // Arrange
      const expectedUrl = 'https://jsonplaceholder.typicode.com/users';

      // Act
      service.getUsers().subscribe();

      // Assert
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
    });

    it('should return users data on successful response', () => {
      // Arrange
      const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' }
      ];

      // Act
      service.getUsers().subscribe((users) => {
        // Assert
        expect(users).toEqual(mockUsers);
        expect(users.length).toBe(3);
      });

      // Mock the response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle empty response array', () => {
      // Arrange
      const mockUsers: any[] = [];

      // Act
      service.getUsers().subscribe((users) => {
        // Assert
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      // Mock the response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle response data structure correctly', () => {
      // Arrange
      const mockUsers = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874'
          }
        }
      ];

      // Act
      service.getUsers().subscribe((users) => {
        // Assert - verify the data structure
        expect(Array.isArray(users)).toBeTrue();
        expect(users[0].id).toBeDefined();
        expect(users[0].name).toBeDefined();
        expect(users[0].email).toBeDefined();
        expect(users[0].id).toBe(1);
        expect(users[0].name).toBe('Leanne Graham');
      });

      // Mock the response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle 404 Not Found error', () => {
      // Arrange
      const errorResponse = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found'
      });

      // Act
      service.getUsers().subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error: HttpErrorResponse) => {
          // Assert
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      // Mock the error response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 Internal Server Error', () => {
      // Arrange
      const errorResponse = new HttpErrorResponse({
        error: 'Internal Server Error',
        status: 500,
        statusText: 'Internal Server Error'
      });

      // Act
      service.getUsers().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error: HttpErrorResponse) => {
          // Assert
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      // Mock the error response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network error', () => {
      // Arrange
      const errorResponse = new HttpErrorResponse({
        error: new ErrorEvent('Network Error'),
        status: 0,
        statusText: 'Network Error'
      });

      // Act
      service.getUsers().subscribe({
        next: () => fail('should have failed with network error'),
        error: (error: HttpErrorResponse) => {
          // Assert
          expect(error.statusText).toBe('Network Error');
          expect(error.status).toBe(0);
        }
      });

      // Mock the network error
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.error(new ErrorEvent('Network Error'));
    });

    it('should handle 403 Forbidden error', () => {
      // Arrange
      const errorMessage = 'Access forbidden';

      // Act
      service.getUsers().subscribe({
        next: () => fail('should have failed with 403 error'),
        error: (error: HttpErrorResponse) => {
          // Assert
          expect(error.status).toBe(403);
          expect(error.statusText).toBe('Forbidden');
        }
      });

      // Mock the error response
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(errorMessage, { status: 403, statusText: 'Forbidden' });
    });

    it('should handle multiple concurrent requests', () => {
      // Arrange
      const mockUsers1 = [{ id: 1, name: 'User 1' }];
      const mockUsers2 = [{ id: 2, name: 'User 2' }];
      let responseCount = 0;

      // Act
      service.getUsers().subscribe((users) => {
        responseCount++;
        expect(users).toEqual(mockUsers1);
      });

      service.getUsers().subscribe((users) => {
        responseCount++;
        expect(users).toEqual(mockUsers2);
      });

      // Mock the responses
      const requests = httpMock.match('https://jsonplaceholder.typicode.com/users');
      expect(requests.length).toBe(2);

      requests[0].flush(mockUsers1);
      requests[1].flush(mockUsers2);

      // Assert
      expect(responseCount).toBe(2);
    });
  });
});
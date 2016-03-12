describe 'OAuth service', ->
  oauth = $rootScope = $httpBackend = null

  beforeEach ->
    angular.mock.module 'Hyde.Common.Services.OAuth'
    angular.mock.inject (_oauthProvider_, _$rootScope_, _$httpBackend_) ->
      oauth = _oauthProvider_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;


  describe 'getCode', ->
    it 'should be defined', ->
       expect(oauth.getCode).toBeDefined()

    it 'should return null if there is no code in url', ->
      expect(oauth.getCode 'http://exampleurl.com/#/path').toBeNull()

    it 'should return the code if it is before path', ->
      expect(oauth.getCode 'http://exampleurl.com/?code=123abc456def#/path').toBe '123abc456def'

    it 'should return the code if it is after path', ->
      expect(oauth.getCode 'http://exampleurl.com/#/path?code=123abc456def').toBe '123abc456def';


  describe 'getToken', ->
    beforeEach ->
      $httpBackend
        .whenGET 'http://correcturl/authenticate/123abc456def'
        .respond 'token': '123456789'
      $httpBackend
        .whenGET 'http://incorrecturl/authenticate/123abc456def'
        .respond 401, ''

    it 'should be defined', ->
      expect(oauth.getToken).toBeDefined()

    it 'should call an error when the Gatekeeper server is incorrect', (done) ->
      $httpBackend.expectGET 'http://incorrecturl/authenticate/123abc456def'
      oauth.getToken('http://incorrecturl/', '123abc456def').then (token) ->
        expect(false).toBeTruthy()
        done()
      , ->
        expect(true).toBeTruthy()
        done()
      $rootScope.$apply()
      $httpBackend.flush()

    it 'should return a token when the Gatekeeper server is correct', (done) ->
      $httpBackend.expectGET 'http://correcturl/authenticate/123abc456def'
      oauth.getToken('http://correcturl/', '123abc456def').then (token) ->
        expect(token).toBe('123456789')
        done()
      , ->
        expect(false).toBeTruthy()
        done()
      $rootScope.$apply()
      $httpBackend.flush()
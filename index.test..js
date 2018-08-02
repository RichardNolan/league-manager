const request = require('supertest');
var assert = require('assert');
// const DB_HOST = 'http://localhost:9000'
const routes = ['division', 'fixture', 'league', 'organisation', 'player', 'referee', 'team', 'user', 'venue']
// const routes = ['user']
routes.forEach(route=>{
    
describe('GET /api/'+route, function() {
    it('respond with json', function(done) {
      request(DB_HOST+'')
        .get('/api/'+route)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  // describe('POST /api/user', function() {
  //   it('user should be saved to server', function(done) {
  //     request(DB_HOST+'')
  //       .post('/api/'+route)
  //       .send('name=john&email=john@here.com&password=testpw') // x-www-form-urlencoded upload
  //       .set('Accept', 'application/json')
  //       // .expect(function(res) {
  //       //   res.body.id = 'some fixed id';
  //       //   res.body.name = res.body.name.toUpperCase();
  //       // })
  //       .expect(201, function(res) {
  //           res.body.name = 'john';
  //         }, done);
  //   });
  // });
})
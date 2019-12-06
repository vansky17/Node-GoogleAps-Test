const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
 it('should return an array of googleapps', () => {
  return supertest(app)
  .get('/apps')
  .expect(200)
  .expect('Content-Type', /json/)
  .then(res => {
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf.at.least(1);
    const singleApp = res.body[0];
    expect(singleApp).to.include.all.keys('App', 'Category', 'Rating', 'Reviews',
    'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated',
    'Current Ver', 'Android Ver');
  });
 });

});
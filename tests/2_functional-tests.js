const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let stockLikes = 0;
suite('Functional Tests', function() {

    test("Viewing one stock", function(done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG' })
        .end(function(err, res) {
          const { stockData } = res.body;
          assert.equal(res.status, 200);
          assert.property(stockData, 'stock');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          assert.equal(stockData.stock, 'GOOG');
        });
        done();
    });

    test("Viewing one stock and liking it", function(done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG', like: true })
        .end(function(err, res) {
          const { stockData } = res.body;
          stockLikes = stockData.likes
          assert.equal(res.status, 200);
          assert.property(stockData, 'stock');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          assert.equal(stockData.stock, 'GOOG');
          assert.isAbove(stockData.likes, 0);
          done();
        });
    });

    test("Viewing the same stock and liking it again", function(done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG', like: true })
        .end(function(err, res) {
          const { stockData } = res.body;
          assert.equal(res.status, 200);
          assert.property(stockData, 'stock');
          assert.property(stockData, 'price');
          assert.property(stockData, 'likes');
          assert.equal(stockData.stock, 'GOOG');
          assert.equal(stockData.likes, stockLikes);
        });
        done();
    });

    test("Viewing two stocks", function(done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['GOOG', 'MSFT'] })
        .end(function(err, res) {
          const { stockData } = res.body;
          assert.equal(res.status, 200);
          assert.isArray(stockData);
          assert.property(stockData[0], 'stock');
          assert.property(stockData[0], 'price');
          assert.property(stockData[0], 'rel_likes');
          assert.property(stockData[1], 'stock');
          assert.property(stockData[1], 'price');
          assert.property(stockData[1], 'rel_likes');
          done();
        });
    });

    test("Viewing two stocks and liking them", function(done) {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['GOOG', 'MSFT'], like: true })
        .end(function(err, res) {
          const { stockData } = res.body;
          assert.equal(res.status, 200);
          assert.isArray(stockData);
          assert.property(stockData[0], 'stock');
          assert.property(stockData[0], 'price');
          assert.property(stockData[0], 'rel_likes');
          assert.property(stockData[1], 'stock');
          assert.property(stockData[1], 'price');
          assert.property(stockData[1], 'rel_likes');
        });
        done();
    });

});

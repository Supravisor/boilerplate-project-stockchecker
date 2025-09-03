const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

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
          done();
        });
    });

    test("Viewing one stock and liking it", function(done) {
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
          assert.isAbove(stockData.likes, 0);
          done();
        });
    });

});

'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock = req.query.stock;
      let like = req.query.like ? 1 : 0;
      const getStock = async (selection) => {
        try {
          const data = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection}/quote`);
          const info = await data.json();
          const { change,changePercent,close,high,latestPrice,latestTime,latestVolume,low,open,previousClose,symbol,volume } = info;

          return res.json({ "stockData": { "stock": stock, "price": latestPrice, "likes": like } });
        } catch (err) {
            console.log(err);
        }
      };
      if (typeof(stock) === "string") {
        return getStock(stock);
      }
    });
    
};

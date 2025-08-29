'use strict';

module.exports = function (app) {
  let likes = 0;

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock = req.query.stock;
      let like = req.query.like;
console.log(stock, like, likes);
console.log(like === 1);
      if (like == 1) {
        likes++;
      }
      const getStock = async (selection) => {
        try {
          if (typeof(stock) === "string") {
            const data = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection}/quote`);
            const info = await data.json();
            const { change,changePercent,close,high,latestPrice,latestTime,latestVolume,low,open,previousClose,symbol,volume } = info;

            return res.json({ "stockData": { "stock": stock, "price": latestPrice, "likes": likes } });
          } else {
          }
        } catch (err) {
            console.log(err);
        }
      };
      if (typeof(stock) === "string") {
        return getStock(stock);
      }
    });
    
};

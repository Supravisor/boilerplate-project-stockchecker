'use strict';

module.exports = function (app) {
  let likes = {};
  let ips = [];

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock = req.query.stock;
      let like = req.query.like;
      let ip = req.ip;

      ip = ip.replace(/^::\w+:/, "").replace(/\.\d+\.\d+$:/, "");
      ip = ip.replace(/\.\d+\.\d+$/, "");

      if (like === "true") {
          if (ips.includes(ip)) {
            return;
          } else {
            likes[stock] += 1;
            ips.push(ip);
          }
        }

        const getStock = async (selection) => {
        try {
          if (typeof(stock) === "string") {
            const data = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection}/quote`);
            const info = await data.json();
            const { change,changePercent,close,high,latestPrice,latestTime,latestVolume,low,open,previousClose,symbol,volume } = info;

            return res.json({ "stockData": { "stock": stock, "price": latestPrice, "likes": likes[stock] } });
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

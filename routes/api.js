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
            likes.hasOwnProperty(stock) ? likes[stock] += 1 : likes[stock] = 1;
            ips.push(ip);
          }
        }

        const getStock = async (selection) => {
        try {
          if (typeof(stock) === "string") {

            const data = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection}/quote`);
            const info = await data.json();
            const { change,changePercent,close,high,latestPrice,latestTime,latestVolume,low,open,previousClose,symbol,volume } = info;

            return res.json({ "stockData": { "stock": stock, "price": latestPrice, "likes": likes[stock] || 0 } });

          } else {

              const data1 = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection[0]}/quote`);
              const info1 = await data1.json();

          }
        } catch (err) {
            console.log(err);
        }
      };

    getStock(stock);
    });
    
};

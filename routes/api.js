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

              if (!likes.hasOwnProperty(selection[0])) {
                likes[selection[0]] = 0;
              }

              const data1 = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection[0]}/quote`);
              const info1 = await data1.json();
              let price1;
      
              if (selection[0]) {
                const { change, changePercent, close, high, latestPrice, latestTime, latestVolume, low, open, previousClose, symbol, volume } = info1;
                price1 = latestPrice;
              }

              if (!likes.hasOwnProperty(selection[1])) {
                likes[selection[1]] = 0;
              }

              const data2 = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection[1]}/quote`);
              const info2 = await data2.json();
              let price2;
      
              if (selection[1]) {
                const { change, changePercent, close, high, latestPrice, latestTime, latestVolume, low, open, previousClose, symbol, volume } = info2;
                price2 = latestPrice;
              }

              return res.json( { "stockData": 
                [
                  { "stock": selection[0], "price": price1, "rel_likes": likes[selection[0]] || 0 },
                  { "stock": selection[1], "price": price2, "rel_likes": likes[selection[1]] || 0 }
                ]
              });

          }
        } catch (err) {
            console.log(err);
        }
      };

    getStock(stock);
    });
    
};

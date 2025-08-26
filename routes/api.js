'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stock = req.query.stock;
      let like = req.query.like;

      const getStock = async (selection) => {
        try {
          const data = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${selection}/quote`);
          const info = await data.json();
          const { change,changePercent,close,high,latestPrice,latestTime,latestVolume,low,open,previousClose,symbol,volume } = info;

        } catch (err) {

        }
      };

    });
    
};

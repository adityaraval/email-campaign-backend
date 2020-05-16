const campaignRoutes = require('./campaign.route');

module.exports = app => {

  app.use('/api/campaigns', campaignRoutes);

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send({
      error: `Not Found. Accessing route - ${req.path} For ${req.method}`,
    });
  });
}
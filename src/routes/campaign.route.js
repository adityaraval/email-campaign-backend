const express = require('express');
const router = express.Router();
const { registerCampaignJob } = require('../utils/tasks/campaignTask');
const { Campaign } = require('../models/campaign.model');


//get campaign by id
router.get('/:id', async (req, res) => {
    try{
    if (req.params.id) {
      const campaign = await Campaign.findOne({ _id: req.params.id });
      res.status(200).send(campaign);
    }
    else {
      res.status(400).send({ message: 'Missing Campaign ID as params' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

//this route will be used to unsubscribe specific customer(email),
//but it will not work as we are not storing customers in database,
//so from email I can not determine which customer is this.
router.get('/unsubscribe/:id', async (req, res) => {
  try{
    if (req.params.id) {
      //code to push customer into unsubscribers list
    } else {
      res.status(400).send({ message: 'Missing Campaign ID as params' });
      }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

//create new campaign
router.post('/', async (req, res) => {
  try {
    if (!req.body.name
      || !req.body.client
      || !req.body.startDate
      || !req.body.endDate
      || !req.body.customers
      || !req.body.customName
      || !req.body.subject
      || !req.body.body) {
        return res.status(400).send({ message: 'Bad Request' });
    } else {
      const campaignData = new Campaign(req.body);
      const savedCampaign = await campaignData.save();

      //register campaign email sending job
      await registerCampaignJob({
        campaignId: savedCampaign._id,
        emailSendingTime: savedCampaign.startDate
      });

      res.status(200).send({ message: 'Campaign created successfully' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;

const { agenda } = require('./index');
const moment = require('moment');
const _ = require('lodash');
const { Campaign } = require('../../models/campaign.model')
const { send } = require('../email/index');
const templateSource = require('../email/template');

//every time new campaign is created this function is called, and campaignJob is registered
const registerCampaignJob = async (options) => {
    //register send email campaign
    await agenda.create('send campaign email', {
        campaignId: options.campaignId,
    })
    .schedule(options.emailSendingTime)
    .unique({ 'data.campaignId': options.campaignId })
    .save();
};

//send email function
const sendCampaignEmails = async (campaign) => {
  try {
    const templateData = {
      unsubscribeUrl: `${process.env.API_URL}:${process.env.PORT}/campaigns/unsubscribe/${campaign._id}`,
      body: campaign.body,
      customName:campaign.customName,
    }
    const html = templateSource(templateData);//it puts data into compiled html

    //filtering of unsubscribers
    const customersList = _.filter(campaign.customers, c => {
      return !campaign.unsubscribers.includes(c);
    })
    if (customersList.length) {
      await send(_.join(customersList, ','), campaign.subject, html);
    } else {
      console.log("No customers");
    }
  } catch (e) {
    console.error(e);
  }
}

//this job contains the actions what needs to be done, when job runs
const campaignJob = async (agenda) => {
  agenda.define('send campaign email', { concurrency: 4, lockLifetime: 1 * 60 * 1000, priority: 1 }, async (job) => {
    try {
      const query = {_id: job.attrs.data.campaignId}
      const campaign = await Campaign.findOne(query);

      //check weather campaign exists
      if (campaign) {
        await sendCampaignEmails(campaign); //send emails

        //check if campaign end date is smaller than now, then just delete the job
        if (moment(campaign.endDate).diff(moment.now(), 'minutes') <= 0) {

          //delete the job as campaign end date is reached.
          agenda.cancel({ 'data.campaignId': job.attrs.data.campaignId });
          //mark campaign archived
          await Campaign.findByIdAndUpdate(query, { status: "ARCHIVED" });
        } else {
            //add 24 hours to the
            const time = moment().add(1, "day");
            job.schedule(time.toDate());
            await job.save()
        }
      } else {
        agenda.cancel({ 'data.campaignId': job.attrs.data.campaignId });
      }
    } catch (err) {
      console.log("Error while running CRON for Booking payment Overdue : ", err);
    }
  });
}

module.exports = {
  registerCampaignJob,
  campaignJob,
  sendCampaignEmails
};
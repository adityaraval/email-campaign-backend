const mongoose = require('mongoose');
const { CAMPAIGN_STATUS } = require('../constants');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
  client: {
    type: String,
  },
  customers: {
    type: [String],
    required:true
  },
  unsubscribers: {
    type:[String]
  },
  customName: {
    type: String,
    required:true,
  },
  startDate: {
    type: Date,
    required:true
  },
  endDate: {
    type: Date,
    required:true
  },
  status: {
    type: String,
    enum: CAMPAIGN_STATUS,
    default:CAMPAIGN_STATUS[0],
  },
  subject: {
    type: String,
    required:true,
  },
  body: {
    type: String,
    required:true,
  },
},{
    timestamps: true,
});


const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = {
  Campaign,
  CampaignSchema,
};

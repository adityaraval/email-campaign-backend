const mongoose = require('mongoose');
const { CAMPAIGN_STATUS,
  CUSTOMER_STATUS,
} = require('../constants');

//customers sub schema
const customersSchema = {
  email: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required:true,
  },
  subject: {
    type: String,
    //will be used as a personalized subject
  },
  status: {
    type: String,
    enum: CUSTOMER_STATUS,
    default: CUSTOMER_STATUS[0],
    required:true,
  }
}

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
  client: {
    type: String,
  },
  customers: {
    type: [customersSchema],
    required:true
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
  html: {
    type: String,
    required:true,
  }
},{
    timestamps: true,
});


const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = {
  Campaign,
  CampaignSchema,
};

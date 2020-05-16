const Agenda = require('agenda');

//config object for agenda
module.exports = {
  agenda: new Agenda(),
  //it will take instance of an agenda to start
  connect: async (agenda) => {
    const uri = process.env.DB_URL;
    agenda.database(uri, 'agendaTasks', {
      useNewUrlParser: true
    });
    agenda.on('ready', () => {
      console.log('Agenda started');
      require('./campaignTask').campaignJob(agenda);
      agenda.start();
    });
  },
  disconnect: async agenda => (agenda.stop())
};
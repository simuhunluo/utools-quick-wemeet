
window.exports = {

  "open_wemeet_room":{
    mode: 'none',
    args: {
      enter: (param) => {
        const regex = /#?(?:腾讯会议：)?(\d{3})[- ]?(\d{3})[- ]?(\d{3,4})/;
        const matchResult = param.payload.match(regex);

        if (matchResult) {
          const meetingCode = matchResult.slice(1).join('');
          const schemaUrl = `wemeet://page/inmeeting?meeting_code=${meetingCode}`;
          window.utools.shellOpenExternal(schemaUrl);
        }
      }
    }
  }
};


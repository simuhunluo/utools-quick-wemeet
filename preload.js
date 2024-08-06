window.exports = {
    "open_wemeet_room": {
        mode: 'none',
        args: {
            enter: (param) => {
                const regex = /#?(?:腾讯会议：)?(\d{3})[- ]?(\d{3,4})[- ]?(\d{3,4})/;
                let matchResult = param.payload.match(regex);

                console.log(param.payload)
                console.log(param.payload.length)
                console.log(param.payload.indexOf("腾讯会议"))

                if (param.payload.length > 100 && !param.payload.includes("腾讯会议")) {
                    matchResult = false
                    window.utools.showNotification('未识别到会议号');
                    // 插件被选中打开后，恢复搜索框至默认状态
                    window.utools.outPlugin(); // 退出插件，恢复默认的搜索框状态
                }
                // 超长字符串，只识别带短横线的数值
                if (param.payload.length > 100){
                    const regexLongStr = /#?(?:腾讯会议：)?(\d{3})-(\d{3,4})-(\d{3,4})/;
                    matchResult = param.payload.match(regexLongStr);
                }

                if (matchResult) {
                    const meetingCode = matchResult.slice(1).join('');
                    // window.utools.showNotification('识别到会议号: ' + meetingCode);
                    const schemaUrl = `wemeet://page/inmeeting?meeting_code=${meetingCode}`;
                    window.utools.shellOpenExternal(schemaUrl);

                    // 插件被选中打开后，恢复搜索框至默认状态
                    window.utools.hideMainWindow(); // 隐藏主窗口
                    window.utools.outPlugin(); // 退出插件，恢复默认的搜索框状态
                }
            }
        }
    }
};


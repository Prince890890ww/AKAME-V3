module.exports.config = {
	name: "بحث",
	version: "1.0.1",
	hasPermssion: 0,
  credits: "S H A D O W",
	description: "ابحث عن كل ما تريد معرفته من خلال ويكيبيديا",
    prefix: false,
      category: "الــــجـــروب", 
	usages: "ويكيبيديا",
	cooldowns: 1,
	dependencies: {
        "wikijs": ""
    }
}

module.exports.languages = {
    "vi": {
        "missingInput": "Nội dung cần tìm kiếm không được để trống!",
        "returnNotFound": "Không tìm thấy nội dung %1"
    },
    "ar": {
        "missingInput": "ادخل ما تريد البحث عنه .",
        "returnNotFound": "لا استطيع ايجاد : %1"
    }
}

module.exports.run = ({ event, args, api, getText }) => {
    const wiki = (global.nodemodule["wikijs"]).default;
    let content = args.join(" ");
    let url = 'https://ar.wikipedia.org/w/api.php';
    if (args[0] == "en") {
        url = 'https://en.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
    return wiki({ apiUrl: url }).page(content).catch(() => api.sendMessage(getText("returnNotFound", content), event.threadID, event.messageID)).then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');

}
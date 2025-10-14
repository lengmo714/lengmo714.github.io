var convMap = {
}

var defaultPlat = {
	"v6": 1539,
}

var defaultIosAppleId = {
	"v2": 1645462673,
}

var urlList = [
	"vigorpoker10001vg",
	// "rvv51_1539-5-6_v0.5101.0.58_vc1_slots--element_20231218T164624_58dad7c1d1ea98309827bb60a19bb828",
    // replace flag: hcZLJdP1lHeqrK9
]

var oneLinkList = {
    1539: {onelink:"https://vgpokergoogplay.onelink.me/phLu", scheme:"", pix: "1177213013732875"},
};

function getUrlfromList(platid) {
	// var regex = new RegExp(`rvv\\d+_(${platid})-\\d-\\d_v`);
	// var matches = urlList.filter(url => regex.test(url))
	// console.log(matches)
	var matches = urlList[0];
	// return matches[matches.length-1];
	return matches;
}

// function getQueryByKey(key){
// 	var url = location.search.toLowerCase();  
// 	var theRequest = new Object();
// 	if (url.indexOf("?") != -1) 
// 	{
// 		var str = url.substr(1);
// 		strs = str.split("&");
// 		for (var i = 0; i < strs.length; i++) 
// 		{
// 			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
// 		}
// 	}
// 	var value = theRequest[key];
// 	return value;
// }

function getDefaultResVer(){
	return "v6";
}

function getDefaultPlatid(){
	return 1539;
}

// function getVerDefaultPlatid(resVer){
// 	var defaultResVer = getDefaultResVer();
// 	var defaultPlatid = getDefaultPlatid();
// 	resVer = resVer == undefined ? defaultResVer : resVer;
// 	var platid = defaultPlat[resVer];
// 	platid = platid == undefined ? defaultPlatid : platid;
// 	return platid;
// }

// function getUrl(platid, resVer, isAgent) { // 不用管
	// console.log("platid:" + platid + "__resVer:" + resVer)
	// if (isIos()) {
	// 	resVer = "v2";
	// 	var appleId = defaultIosAppleId[resVer];
	// 	var url = "itms-apps://itunes.apple.com/app/id" + appleId
	// 	return url
	// } else {
	// 	platid = platid == undefined ? getVerDefaultPlatid(resVer) : platid;
	// 	resVer = resVer == undefined ? getDefaultResVer() : resVer;
	// 	resVer = resVer.toLowerCase()
	// 	console.log("convMap[platid]:" + convMap[platid]);
	// 	var targetPlatid = platid== undefined ? convMap[platid] : platid;
	// 	if (isAgent) {
	// 		targetPlatid  = convMap[platid] == undefined ? platid : convMap[platid]
	// 	}
	// 	var targetApk = getUrlfromList(targetPlatid);
	// 	var skinDefaultApk = getUrlfromList(getVerDefaultPlatid(resVer));
	// 	skinDefaultApk = skinDefaultApk != undefined ? skinDefaultApk : getUrlfromList(getDefaultPlatid());
	// 	console.log("targetApk:" + targetApk);
	// 	console.log("skinDefaultApk:" + skinDefaultApk);

	// 	var name = targetApk != undefined ? targetApk : skinDefaultApk;
	// 	var url = "https://domainninjanetstto.com/" + name + ".apk";
	// 	console.log("--- getUrl: " + url);
	// 	return url;
	// }
// }

// function getConfByPlatId(platid, resVer, isAgent) {
// 	platid = platid == undefined ? getVerDefaultPlatid(resVer) : platid;
// 	resVer = resVer == undefined ? getDefaultResVer() : resVer;
// 	resVer = resVer.toLowerCase()
// 	console.log("--- convMap[platid]:" + convMap[platid]);
// 	var targetPlatid = platid == undefined ?  convMap[platid]: platid ;
// 	if (isAgent) {
// 		targetPlatid  = convMap[platid] == undefined ? platid : convMap[platid]
// 	}
// 	var targetConf = oneLinkList[targetPlatid];
// 	var skinDefaultConf = oneLinkList[getVerDefaultPlatid(resVer)];
// 	skinDefaultConf = skinDefaultConf != undefined ? skinDefaultConf : oneLinkList[getDefaultPlatid()];
// 	console.log("--- targetConf:", targetConf);
// 	console.log("--- skinDefaultConf:", skinDefaultConf);
// 	var result = targetConf || skinDefaultConf
// 	console.log("--- getConfByPlatId:", result);
// 	return result
// }

// function getOneLink(platid, resVer, isAgent) {
// 	var conf = getConfByPlatId(platid, resVer, isAgent)
// 	var onelink = conf ? conf.onelink : ""
// 	console.log("--- getOneLink: " + onelink);
// 	return onelink;
// }

// function getScheme(platid, resVer, isAgent) {
// 	if (!isAndroid) return
// 	var conf = getConfByPlatId(platid, resVer, isAgent)
// 	var targetScheme = conf ? conf.scheme : ""
// 	console.log("getScheme: ", targetScheme)
// 	return targetScheme
// }

// function getPixCode(platid, resVer, isAgent) {
// 	var conf = getConfByPlatId(platid, resVer, isAgent)
// 	var pix = conf ? conf.pix : ""
// 	console.log("getPixCode: ", pix)
// 	return pix
// }

// function isAndroid() {
// 	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
// 		return false
// 	} else if (/(Android)/i.test(navigator.userAgent)) {
// 		return true
// 	} else {
// 		return false
// 	}
// }

// function isIos() {
// 	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
// 		return true
// 	} else if (/(Android)/i.test(navigator.userAgent)) {
// 		return false
// 	} else {
// 		return false
// 	}
// }

// function downloadApk(platid) {
// 	console.log("--- download" + platid);
// 	var url = getUrl(platid);
// 	window.location.href = url;
// }

function beginDownLoadApk(uerCode,url, taEvent) {
	taEvent = (taEvent != undefined) ? taEvent : "downLoad"
	var hiddenIframe = document.getElementById('hiddenIframe');
	if (!hiddenIframe) {
		hiddenIframe = document.createElement("iframe");
		hiddenIframe.style.display = "none";
		hiddenIframe.id = "hiddenIframe"
		document.body.appendChild(hiddenIframe);
		sendbegainTime(uerCode);
	}
	if (hiddenIframe) {
		hiddenIframe.src = url;
	} else {
		window.location.href = url;
	}
	// window.ta && ta.track(taEvent)
	window.fbq && window.fbq('trackCustom', 'download', {promotion:'share_discount_100%'});
}

// function gotoGG(url) {
// 	window.ta && ta.track("downLoad")
// 	window.fbq && window.fbq('trackCustom', 'download', {promotion:'share_discount_100%'});
// 	window.location.href = url;
// }

function getUrlArg(key) {
	if (!window.rmg_url) {
		window.rmg_url = window.location.href
		// console.log("--- rmg_url:", window.rmg_url);
	}

	if (!window.rmg_args) {
		window.rmg_args = {}
		const reg = /(?<=[\? | \&])([^=]+)=([^\&]+)/g
		window.rmg_url.replace(reg, ($1, $2, $3) => {
			window.rmg_args[$2] = $3
		})
		console.log("--- window.rmg_args:", window.rmg_args);
	}

	return window.rmg_args[key]
}

function sendbegainTime(uerCode){
	var url = "https://www.domaindotprojectbrl.com/domain/clientevent";
			var data = JSON.stringify({
				eventname:"webpageeventflow",
				eventBody:JSON.stringify({
					"fbuuid": uerCode,
					"eventtime": new Date(),
					"timestamp": Date.now(),
					"eventname": `begin download / ${userAgent}`,
				})
			});
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			console.log("xhr = ", xhr);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log("发送成功2");
				}
			};
			xhr.send(data);
}
let userAgent = null;
document.addEventListener("DOMContentLoaded", function() {
	userAgent = navigator.userAgent;
	// console.log("用户代理字符串:", userAgent);
	// if (userAgent.indexOf("Edg") > -1) {
	// 	browserName = "Microsoft Edge";
	// } else if (userAgent.indexOf("OPR") > -1) {
	// 	browserName = "Opera";
	// } else if (userAgent.indexOf("Chrome") > -1) {
	// 	browserName = "Google Chrome";
	// } else if (userAgent.indexOf("Safari") > -1) {
	// 	browserName = "Safari";
	// } else if (userAgent.indexOf("Firefox") > -1) {
	// 	browserName = "Mozilla Firefox";
	// } else {
	// 	browserName = "Unknown";
	// }
});

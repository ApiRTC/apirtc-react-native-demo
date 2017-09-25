//This file manage needed requirement on apiRTC for compatibility with react-native-webrtc project

var apiRTC_React = true; //This is use to set specific behavior of apiRTC when runing with react-native

import React, { Component } from 'react';
import io from 'socket.io-client';

//import { Platform } from 'react-native';

import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    getUserMedia,
  } from 'react-native-webrtc';

var DeviceInfo = require('react-native-device-info');
var UAParser={};!function(i, s) {
    "use strict";
    var e = "0.7.12",
        r = "",
        o = "?",
        n = "function",
        a = "undefined",
        t = "object",
        w = "string",
        l = "major",
        d = "model",
        p = "name",
        u = "type",
        c = "vendor",
        m = "version",
        b = "architecture",
        g = "console",
        f = "mobile",
        h = "tablet",
        v = "smarttv",
        x = "wearable",
        k = "embedded",
        y = {
            extend: function(i, s) {
                var e = {};
                for (var r in i) e[r] = s[r] && s[r].length % 2 === 0 ? s[r].concat(i[r]) : i[r];
                return e
            },
            has: function(i, s) {
                return "string" == typeof i ? -1 !== s.toLowerCase().indexOf(i.toLowerCase()) : !1
            },
            lowerize: function(i) {
                return i.toLowerCase()
            },
            major: function(i) {
                return typeof i === w ? i.replace(/[^\d\.]/g, "").split(".")[0] : s
            },
            trim: function(i) {
                return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
        },
        A = {
            rgx: function() {
                var i, e, r, o, a, w, l = {},
                    d = 0,
                    p = arguments;
                for (r = 0; r < p[1].length; r++) o = p[1][r], l[typeof o === t ? o[0] : o] = s;
                for (; d < p.length && !a;) {
                    var u = p[d],
                        c = p[d + 1];
                    for (i = e = 0; i < u.length && !a;)
                        if (a = u[i++].exec(this.getUA()))
                            for (r = 0; r < c.length; r++) w = a[++e], o = c[r], typeof o === t && o.length > 0 ? 2 == o.length ? l[o[0]] = typeof o[1] == n ? o[1].call(this, w) : o[1] : 3 == o.length ? l[o[0]] = typeof o[1] !== n || o[1].exec && o[1].test ? w ? w.replace(o[1], o[2]) : s : w ? o[1].call(this, w, o[2]) : s : 4 == o.length && (l[o[0]] = w ? o[3].call(this, w.replace(o[1], o[2])) : s) : l[o] = w ? w : s;
                    d += 2
                }
                return l
            },
            str: function(i, e) {
                for (var r in e)
                    if (typeof e[r] === t && e[r].length > 0) {
                        for (var n = 0; n < e[r].length; n++)
                            if (y.has(e[r][n], i)) return r === o ? s : r
                    } else if (y.has(e[r], i)) return r === o ? s : r;
                return i
            }
        },
        E = {
            browser: {
                oldsafari: {
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {
                amazon: {
                    model: {
                        "Fire Phone": ["SD", "KF"]
                    }
                },
                sprint: {
                    model: {
                        "Evo Shift 4G": "7373KT"
                    },
                    vendor: {
                        HTC: "APA",
                        Sprint: "Sprint"
                    }
                }
            },
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2000: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    }
                }
            }
        },
        S = {
            browser: [
                [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                [p, m],
                [/(opios)[\/\s]+([\w\.]+)/i],
                [
                    [p, "Opera Mini"], m
                ],
                [/\s(opr)\/([\w\.]+)/i],
                [
                    [p, "Opera"], m
                ],
                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],
                [p, m],
                [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                [
                    [p, "IE"], m
                ],
                [/(edge)\/((\d+)?[\w\.]+)/i],
                [p, m],
                [/(yabrowser)\/([\w\.]+)/i],
                [
                    [p, "Yandex"], m
                ],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [
                    [p, /_/g, " "], m
                ],
                [/(micromessenger)\/([\w\.]+)/i],
                [
                    [p, "WeChat"], m
                ],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                [m, [p, "MIUI Browser"]],
                [/\swv\).+(chrome)\/([\w\.]+)/i],
                [
                    [p, /(.+)/, "$1 WebView"], m
                ],
                [/android.+samsungbrowser\/([\w\.]+)/i, /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                [m, [p, "Android Browser"]],
                [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i],
                [p, m],
                [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /juc.+(ucweb)[\/\s]?([\w\.]+)/i],
                [
                    [p, "UCBrowser"], m
                ],
                [/(dolfin)\/([\w\.]+)/i],
                [
                    [p, "Dolphin"], m
                ],
                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                [
                    [p, "Chrome"], m
                ],
                [/;fbav\/([\w\.]+);/i],
                [m, [p, "Facebook"]],
                [/fxios\/([\w\.-]+)/i],
                [m, [p, "Firefox"]],
                [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                [m, [p, "Mobile Safari"]],
                [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                [m, p],
                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [p, [m, A.str, E.browser.oldsafari.version]],
                [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                [p, m],
                [/(navigator|netscape)\/([\w\.-]+)/i],
                [
                    [p, "Netscape"], m
                ],
                [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                [p, m]
            ],
            cpu: [
                [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                [
                    [b, "amd64"]
                ],
                [/(ia32(?=;))/i],
                [
                    [b, y.lowerize]
                ],
                [/((?:i[346]|x)86)[;\)]/i],
                [
                    [b, "ia32"]
                ],
                [/windows\s(ce|mobile);\sppc;/i],
                [
                    [b, "arm"]
                ],
                [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                [
                    [b, /ower/, "", y.lowerize]
                ],
                [/(sun4\w)[;\)]/i],
                [
                    [b, "sparc"]
                ],
                [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                [
                    [b, y.lowerize]
                ]
            ],
            device: [
                [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                [d, c, [u, h]],
                [/applecoremedia\/[\w\.]+ \((ipad)/],
                [d, [c, "Apple"],
                    [u, h]
                ],
                [/(apple\s{0,1}tv)/i],
                [
                    [d, "Apple TV"],
                    [c, "Apple"]
                ],
                [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                [c, d, [u, h]],
                [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
                [d, [c, "Amazon"],
                    [u, h]
                ],
                [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
                [
                    [d, A.str, E.device.amazon.model],
                    [c, "Amazon"],
                    [u, f]
                ],
                [/\((ip[honed|\s\w*]+);.+(apple)/i],
                [d, c, [u, f]],
                [/\((ip[honed|\s\w*]+);/i],
                [d, [c, "Apple"],
                    [u, f]
                ],
                [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                [c, d, [u, f]],
                [/\(bb10;\s(\w+)/i],
                [d, [c, "BlackBerry"],
                    [u, f]
                ],
                [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                [d, [c, "Asus"],
                    [u, h]
                ],
                [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                [
                    [c, "Sony"],
                    [d, "Xperia Tablet"],
                    [u, h]
                ],
                [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                [
                    [c, "Sony"],
                    [d, "Xperia Phone"],
                    [u, f]
                ],
                [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                [c, d, [u, g]],
                [/android.+;\s(shield)\sbuild/i],
                [d, [c, "Nvidia"],
                    [u, g]
                ],
                [/(playstation\s[34portablevi]+)/i],
                [d, [c, "Sony"],
                    [u, g]
                ],
                [/(sprint\s(\w+))/i],
                [
                    [c, A.str, E.device.sprint.vendor],
                    [d, A.str, E.device.sprint.model],
                    [u, f]
                ],
                [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                [c, d, [u, h]],
                [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],
                [c, [d, /_/g, " "],
                    [u, f]
                ],
                [/(nexus\s9)/i],
                [d, [c, "HTC"],
                    [u, h]
                ],
                [/(nexus\s6p)/i],
                [d, [c, "Huawei"],
                    [u, f]
                ],
                [/(microsoft);\s(lumia[\s\w]+)/i],
                [c, d, [u, f]],
                [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                [d, [c, "Microsoft"],
                    [u, g]
                ],
                [/(kin\.[onetw]{3})/i],
                [
                    [d, /\./g, " "],
                    [c, "Microsoft"],
                    [u, f]
                ],
                [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                [d, [c, "Motorola"],
                    [u, f]
                ],
                [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                [d, [c, "Motorola"],
                    [u, h]
                ],
                [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                [
                    [c, y.trim],
                    [d, y.trim],
                    [u, v]
                ],
                [/hbbtv.+maple;(\d+)/i],
                [
                    [d, /^/, "SmartTV"],
                    [c, "Samsung"],
                    [u, v]
                ],
                [/\(dtv[\);].+(aquos)/i],
                [d, [c, "Sharp"],
                    [u, v]
                ],
                [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                [
                    [c, "Samsung"], d, [u, h]
                ],
                [/smart-tv.+(samsung)/i],
                [c, [u, v], d],
                [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i],
                [
                    [c, "Samsung"], d, [u, f]
                ],
                [/sie-(\w+)*/i],
                [d, [c, "Siemens"],
                    [u, f]
                ],
                [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
                [
                    [c, "Nokia"], d, [u, f]
                ],
                [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                [d, [c, "Acer"],
                    [u, h]
                ],
                [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                [
                    [c, "LG"], d, [u, h]
                ],
                [/(lg) netcast\.tv/i],
                [c, d, [u, v]],
                [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
                [d, [c, "LG"],
                    [u, f]
                ],
                [/android.+(ideatab[a-z0-9\-\s]+)/i],
                [d, [c, "Lenovo"],
                    [u, h]
                ],
                [/linux;.+((jolla));/i],
                [c, d, [u, f]],
                [/((pebble))app\/[\d\.]+\s/i],
                [c, d, [u, x]],
                [/android.+;\s(glass)\s\d/i],
                [d, [c, "Google"],
                    [u, x]
                ],
                [/android.+;\s(pixel c)\s/i],
                [d, [c, "Google"],
                    [u, h]
                ],
                [/android.+;\s(pixel xl|pixel)\s/i],
                [d, [c, "Google"],
                    [u, f]
                ],
                [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i],
                [
                    [d, /_/g, " "],
                    [c, "Xiaomi"],
                    [u, f]
                ],
                [/android.+a000(1)\s+build/i],
                [d, [c, "OnePlus"],
                    [u, f]
                ],
                [/\s(tablet)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                [
                    [u, y.lowerize], c, d
                ]
            ],
            engine: [
                [/windows.+\sedge\/([\w\.]+)/i],
                [m, [p, "EdgeHTML"]],
                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                [p, m],
                [/rv\:([\w\.]+).*(gecko)/i],
                [m, p]
            ],
            os: [
                [/microsoft\s(windows)\s(vista|xp)/i],
                [p, m],
                [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                [p, [m, A.str, E.os.windows.version]],
                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                [
                    [p, "Windows"],
                    [m, A.str, E.os.windows.version]
                ],
                [/\((bb)(10);/i],
                [
                    [p, "BlackBerry"], m
                ],
                [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
                [p, m],
                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                [
                    [p, "Symbian"], m
                ],
                [/\((series40);/i],
                [p],
                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                [
                    [p, "Firefox OS"], m
                ],
                [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
                [p, m],
                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                [
                    [p, "Chromium OS"], m
                ],
                [/(sunos)\s?([\w\.]+\d)*/i],
                [
                    [p, "Solaris"], m
                ],
                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                [p, m],
                [/(haiku)\s(\w+)/i],
                [p, m],
                [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],
                [
                    [p, "iOS"],
                    [m, /_/g, "."]
                ],
                [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
                [
                    [p, "Mac OS"],
                    [m, /_/g, "."]
                ],
                [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
                [p, m]
            ]
        };
    UAParser = function(s, e) {
        if (!(this instanceof UAParser)) return new UAParser(s, e).getResult();
        var o = s || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : r),
            n = e ? y.extend(S, e) : S;
        return this.getBrowser = function() {
            var i = A.rgx.apply(this, n.browser);
            return i.major = y.major(i.version), i
        }, this.getCPU = function() {
            return A.rgx.apply(this, n.cpu)
        }, this.getDevice = function() {
            return A.rgx.apply(this, n.device)
        }, this.getEngine = function() {
            return A.rgx.apply(this, n.engine)
        }, this.getOS = function() {
            return A.rgx.apply(this, n.os)
        }, this.getResult = function() {
            return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
            }
        }, this.getUA = function() {
            return o
        }, this.setUA = function(i) {
            return o = i, this
        }, this
    }, UAParser.VERSION = e, UAParser.BROWSER = {
        NAME: p,
        MAJOR: l,
        VERSION: m
    }, UAParser.CPU = {
        ARCHITECTURE: b
    }, UAParser.DEVICE = {
        MODEL: d,
        VENDOR: c,
        TYPE: u,
        CONSOLE: g,
        MOBILE: f,
        SMARTTV: v,
        TABLET: h,
        WEARABLE: x,
        EMBEDDED: k
    }, UAParser.ENGINE = {
        NAME: p,
        VERSION: m
    }, UAParser.OS = {
        NAME: p,
        VERSION: m
    }, typeof exports !== a ? (typeof module !== a && module.exports && (exports = module.exports = UAParser), exports.UAParser = UAParser) : typeof define === n && define.amd ? define("UAParser", function() {
        return UAParser
    }) : i.UAParser = UAParser;
    var T = i.jQuery || i.Zepto;
    if (typeof T !== a) {
        var U = new UAParser;
        T.ua = U.getResult(), T.ua.get = function() {
            return U.getUA()
        }, T.ua.set = function(i) {
            U.setUA(i);
            var s = U.getResult();
            for (var e in s) T.ua[e] = s[e]
        }
    }
}("object" == typeof window ? window : this);

function qosMonitor(t, e, i, s, o, a, d, r) {
    "use strict";
    console.log("qosMonitor constructor"), this.rawStats = new Object, this.rawStats.ConnectedPair = new Array, this.rawStats["Audio send"] = new Array, this.rawStats["Audio recv"] = new Array, this.rawStats["Video send"] = new Array, this.rawStats["Video recv"] = new Array, this.moyRttCP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.moyRttAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.moyRttVS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.tauxPacketLossAS = [0], this.oldLostAS = this.oldSentAS = 0, this.oldLostVS = this.oldLostVS = 0, this.cptTaux = 0, this.tauxPacketLossVS = [0], this.oldBandwidthAS = 0, this.oldBandwidthVS = 0, this.oldBandwidthAR = 0, this.oldBandwidthVR = 0, this.bandwidthAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.bandwidthAR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.bandwidthVS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.bandwidthVR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.qosIn = 0, this.qosInAverage = 0, this.qosInAverageCount = 0, this.qosAudioIn = 0, this.qosAudioInAverage = 0, this.qosAudioInAverageCount = 0, this.qosVideoIn = 0, this.qosVideoInAverage = 0, this.qosVideoInAverageCount = 0, this.qosOut = 0, this.qosOutAverage = 0, this.qosOutAverageCount = 0, this.qosAudioOut = 0, this.qosAudioOutAverage = 0, this.qosAudioOutAverageCount = 0, this.qosVideoOut = 0, this.qosVideoOutAverage = 0, this.qosVideoOutAverageCount = 0, this.onQosChange = e, this.onQosAudioChange = i, this.onQosVideoChange = s, this.cpt = 0, this.cptRes = 5, this.cptDb = 60, this.saveStatsFlag = !0, this.tabQosIn = new Array, this.tabQosAudioIn = new Array, this.tabQosVideoIn = new Array, this.tabQosOut = new Array, this.tabQosAudioOut = new Array, this.tabQosVideoOut = new Array, this.tabTimestamp = new Array, this.tabDelay = new Array, this.tabJitterBufferAudio = new Array, this.tabJitterBufferVideo = new Array, this.tabAudioRtt = new Array, this.tabVideoRtt = new Array, this.tabAudioBW = new Array, this.tabVideoBW = new Array, this.clientId = d, this.callId = o, this.apiKey = a, this.socket = r, this.interval = t
}

function CallStatMonitor(t, e, i, s, o, a) {
    "use strict";
    this.interval = t, this.clientId = e, this.callId = i, this.apiKey = s, this.socket = o, this.browserType = a
}
qosMonitor.prototype.insertStats = function(t, e, i, s) {
    var o = 0,
        a = 0,
        d = 0;
    for (this.cpt = this.cpt + this.interval, o = 0; o < t.length; ++o) {
        var r = t[o];
        switch (r.type) {
            case "googCandidatePair":
                h = r.names();
                for (d = 0; d < h.length; ++d)
                    if ("googActiveConnection" == h[d] && "true" == r.stat(h[d]))
                        for (a = 0; a < h.length; ++a) "bytesSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats.ConnectedPair.bytesSent = r.stat(h[a])), "bytesReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats.ConnectedPair.bytesReceived = r.stat(h[a])), "googRtt" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats.ConnectedPair.googRtt = r.stat(h[a]));
                break;
            case "ssrc":
                var h = r.names();
                for (d = 0; d < h.length; ++d) {
                    if ("audioOutputLevel" == h[d])
                        for (a = 0; a < h.length; ++a) "packetsLost" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].packetsLost = r.stat(h[a])), "googDecodingPLC" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].googDecodingPLC = r.stat(h[a])), "googJitterReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].googJitterReceived = r.stat(h[a])), "googJitterBufferMs" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].googJitterBufferMs = r.stat(h[a])), "googCurrentDelayMs" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].googCurrentDelayMs = r.stat(h[a])), "bytesReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio recv"].bytesReceived = r.stat(h[a]));
                    if ("audioInputLevel" == h[d])
                        for (a = 0; a < h.length; ++a) "googRtt" == h[a] && void 0 !== r.stat(h[a]) && -1 != r.stat(h[a]) && (this.rawStats["Audio send"].googRtt = r.stat(h[a])), "packetsLost" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio send"].packetsLost = r.stat(h[a])), "packetsSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio send"].packetsSent = r.stat(h[a])), "bytesSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio send"].bytesSent = r.stat(h[a])), "googJitterReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Audio send"].googJitterReceived = r.stat(h[a]));
                    if ("googFrameHeightReceived" == h[d])
                        for (a = 0; a < h.length; ++a) "packetsLost" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video recv"].packetsLost = r.stat(h[a])), "googNacksSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video recv"].googNacksSent = r.stat(h[a])), "googJitterBufferMs" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video recv"].googJitterBufferMs = r.stat(h[a])), "bytesReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video recv"].bytesReceived = r.stat(h[a])), "googFrameRateReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video recv"].googFrameRateReceived = r.stat(h[a]));
                    if ("googFrameHeightInput" == h[d])
                        for (a = 0; a < h.length; ++a) "packetsLost" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video send"].packetsLost = r.stat(h[a])), "googNacksReceived" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video send"].googNacksReceived = r.stat(h[a])), "googRtt" == h[a] && void 0 !== r.stat(h[a]) && -1 != r.stat(h[a]) && (this.rawStats["Video send"].googRtt = r.stat(h[a])), "packetsSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video send"].packetsSent = r.stat(h[a])), "bytesSent" == h[a] && void 0 !== r.stat(h[a]) && (this.rawStats["Video send"].bytesSent = r.stat(h[a]))
                }
        }
    }
    this.computeStats(e, i, s), this.cpt % this.cptRes == 0 && this.saveStatsLocal(), this.cpt % this.cptDb == 0 && this.saveStatsToDb(!1)
}, qosMonitor.prototype.saveStatsLocal = function() {
    if (console.log("saveStatsLocal"), this.saveStatsFlag) {
        var t = Date.now();
        this.tabTimestamp.push(t), this.tabQosIn.push(this.qosIn), this.tabQosAudioIn.push(this.qosAudioIn), 0 != this.qosVideoIn && this.tabQosVideoIn.push(this.qosVideoIn), this.tabQosOut.push(this.qosOut), this.tabQosAudioOut.push(this.qosAudioOut), 0 != this.qosVideoOut && this.tabQosVideoOut.push(this.qosVideoOut), this.tabJitterBufferAudio.push(this.rawStats["Audio recv"].googJitterBufferMs), void 0 !== this.rawStats["Video recv"].googJitterBufferMs && this.tabJitterBufferVideo.push(this.rawStats["Video recv"].googJitterBufferMs), void 0 !== this.rawStats["Video send"].googRtt && this.tabVideoRtt.push(this.rawStats["Video send"].googRtt), this.tabAudioRtt.push(this.rawStats["Audio send"].googRtt), void 0 !== this.bandwidthAS && this.tabVideoBW.push(8 * this.Average(this.bandwidthAS) / 1024), void 0 !== this.bandwidthVS && this.tabVideoBW.push(8 * this.Average(this.bandwidthVS) / 1024), void 0 !== this.bandwidthAR && this.tabVideoBW.push(8 * this.Average(this.bandwidthAR) / 1024), void 0 !== this.bandwidthVR && this.tabVideoBW.push(8 * this.Average(this.bandwidthVR) / 1024)
    }
}, qosMonitor.prototype.saveStatsToDb = function(t) {
    return
}, qosMonitor.prototype.setSaveStats = function(t) {
    this.saveStatsFlag = t
}, qosMonitor.prototype.computeStats = function(t, e, i) {
    if (-1 != this.rawStats.ConnectedPair.googRtt && 0 != this.rawStats.ConnectedPair.googRtt && void 0 !== this.rawStats.ConnectedPair.googRtt && this.add(this.rawStats.ConnectedPair.googRtt, this.moyRttCP), -1 != this.rawStats["Video send"].googRtt && 0 != this.rawStats["Video send"].googRtt && void 0 !== this.rawStats["Video send"].googRtt && this.add(this.rawStats["Video send"].googRtt, this.moyRttVS), -1 != this.rawStats["Audio send"].googRtt && 0 != this.rawStats["Audio send"].googRtt && void 0 !== this.rawStats["Audio send"].googRtt && this.add(this.rawStats["Audio send"].googRtt, this.moyRttAS), -1 != this.rawStats["Audio send"].packetsLost && void 0 !== this.rawStats["Audio send"].packetsLost && -1 != this.rawStats["Audio send"].packetsSent && 0 != this.rawStats["Audio send"].packetsSent && void 0 !== this.rawStats["Audio send"].packetsSent) {
        s = 100 * (this.rawStats["Audio send"].packetsLost - this.oldLostAS) / (this.rawStats["Audio send"].packetsSent - this.oldSentAS);
        this.oldLostAS = this.rawStats["Audio send"].packetsLost, this.oldSentAS = this.rawStats["Audio send"].packetsSent, this.add(s, this.tauxPacketLossAS)
    }
    if (-1 != this.rawStats["Video send"].packetsLost && void 0 !== this.rawStats["Video send"].packetsLost && -1 != this.rawStats["Video send"].packetsSent && 0 != this.rawStats["Video send"].packetsSent && void 0 !== this.rawStats["Video send"].packetsSent) {
        var s = 100 * (this.rawStats["Video send"].packetsLost - this.oldLostVS) / (this.rawStats["Video send"].packetsSent - this.oldSentVS);
        this.oldLostVS = this.rawStats["Video send"].packetsLost, this.oldSentVS = this.rawStats["Video send"].packetsSent, this.add(s, this.tauxPacketLossVS)
    } - 1 != this.rawStats["Audio recv"].bytesReceived && void 0 !== this.rawStats["Audio recv"].bytesReceived && (void 0 === this.oldBandwidthAR && (this.oldBandwidthAR = 0), this.add((this.rawStats["Audio recv"].bytesReceived - this.oldBandwidthAR) / this.interval, this.bandwidthAR), this.oldBandwidthAR = this.rawStats["Audio recv"].bytesReceived), -1 != this.rawStats["Video recv"].bytesReceived && void 0 !== this.rawStats["Video recv"].bytesReceived && (void 0 === this.oldBandwidthVR && (this.oldBandwidthVR = 0), this.add((this.rawStats["Video recv"].bytesReceived - this.oldBandwidthVR) / this.interval, this.bandwidthVR), this.oldBandwidthVR = this.rawStats["Video recv"].bytesReceived), -1 != this.rawStats["Audio send"].bytesSent && void 0 !== this.rawStats["Audio send"].bytesSent && (void 0 === this.oldBandwidthAS && (this.oldBandwidthAS = 0), this.add((this.rawStats["Audio send"].bytesSent - this.oldBandwidthAS) / this.interval, this.bandwidthAS), this.oldBandwidthAS = this.rawStats["Audio send"].bytesSent), -1 != this.rawStats["Video send"].bytesSent && void 0 !== this.rawStats["Video send"].bytesSent && (void 0 === this.oldBandwidthVS && (this.oldBandwidthVS = 0), this.add((this.rawStats["Video send"].bytesSent - this.oldBandwidthVS) / this.interval, this.bandwidthVS), this.oldBandwidthVS = this.rawStats["Video send"].bytesSent);
    var o = 0,
        a = 0,
        d = 0,
        r = 0,
        h = 0,
        n = 0,
        u = 0,
        v = 0,
        A = 0,
        g = 0,
        c = this.getCodecs(e),
        S = 8 * this.Average(this.bandwidthAS) / 1024;
    if (S < 5 ? o = 1 : S >= 5 && S < 10 ? o = 2 : S >= 10 && (o = 3), null !== c && null != c[1]) {
        var w = 8 * this.Average(this.bandwidthVS) / 1024;
        expectedVideoBandwidth = 300, w < .8 * expectedVideoBandwidth ? r = 1 : w >= .8 * expectedVideoBandwidth && w < 1.1 * expectedVideoBandwidth ? r = 2 : w >= 1.1 * expectedVideoBandwidth && (r = 3)
    }
    this.rawStats["Audio recv"].googJitterBufferMs < 60 ? a = 3 : this.rawStats["Audio recv"].googJitterBufferMs >= 60 && this.rawStats["Audio recv"].googJitterBufferMs < 100 ? a = 2 : this.rawStats["Audio recv"].googJitterBufferMs >= 100 && (a = 1), this.rawStats["Audio recv"].googCurrentDelayMs < 100 ? d = 3 : this.rawStats["Audio recv"].googCurrentDelayMs >= 100 && this.rawStats["Audio recv"].googCurrentDelayMs < 200 ? d = 2 : this.rawStats["Audio recv"].googCurrentDelayMs >= 200 && (d = 1), null !== c && null != c[1] && (this.rawStats["Video recv"].googJitterBufferMs < 100 ? h = 3 : this.rawStats["Video recv"].googJitterBufferMs >= 100 && this.rawStats["Video recv"].googJitterBufferMs < 200 ? h = 2 : this.rawStats["Video recv"].googJitterBufferMs >= 200 && (h = 1));
    var l = !1,
        p = !1,
        V = !1;
    null !== c && null != c[1] ? (Math.ceil((o + 2 * r + h + a + d) / 6) != this.qosIn && (l = !0), this.qosIn = Math.ceil((o + 2 * r + h + a + d) / 6), this.qosInAverage = (this.qosInAverage * this.qosInAverageCount + this.qosIn) / (this.qosInAverageCount + 1), this.qosInAverageCount++, Math.ceil((o + a + d) / 3) != this.qosAudioIn && (p = !0), this.qosAudioIn = Math.ceil((o + a + d) / 3), this.qosAudioInAverage = (this.qosAudioInAverage * this.qosAudioInAverageCount + this.qosAudioIn) / (this.qosAudioInAverageCount + 1), this.qosAudioInAverageCount++, Math.ceil((2 * r + h) / 3) != this.qosVideoIn && (V = !0), this.qosVideoIn = Math.ceil((2 * r + h) / 3), this.qosVideoInAverage = (this.qosVideoInAverage * this.qosVideoInAverageCount + this.qosVideoIn) / (this.qosVideoInAverageCount + 1), this.qosVideoInAverageCount++) : (Math.ceil((o + a + d) / 3) != this.qosOut && (l = !0), this.qosIn = Math.ceil((o + a + d) / 3), this.qosInAverage = (this.qosInAverage * this.qosInAverageCount + this.qosIn) / (this.qosInAverageCount + 1), this.qosInAverageCount++, Math.ceil((o + a + d) / 3) != this.qosAudioIn && (p = !0), this.qosAudioIn = Math.ceil((o + a + d) / 3), this.qosAudioInAverage = (this.qosAudioInAverage * this.qosAudioInAverageCount + this.qosAudioIn) / (this.qosAudioInAverageCount + 1), this.qosAudioInAverageCount++), this.RttAverage(this.moyRttAS) < 80 ? u = 3 : this.RttAverage(this.moyRttAS) >= 80 && this.RttAverage(this.moyRttAS) < 150 ? u = 2 : this.RttAverage(this.moyRttAS) >= 150 && (u = 1), this.tauxPacketLossAS <= 5 ? n = 3 : this.tauxPacketLossAS > 5 && this.tauxPacketLossAS < 10 ? n = 2 : this.tauxPacketLossAS >= 10 && (n = 1), this.rawStats["Audio recv"].googJitterReceived < 80 ? v = 3 : this.rawStats["Audio recv"].googJitterReceived >= 80 && this.rawStats["Audio recv"].googJitterReceived < 150 ? v = 2 : this.rawStats["Audio recv"].googJitterReceived >= 150 && (v = 1), null !== c && null != c[1] && (this.tauxPacketLossVS <= 5 ? A = 3 : this.tauxPacketLossVS > 5 && this.tauxPacketLossVS < 10 ? A = 2 : this.tauxPacketLossVS >= 10 && (A = 1), this.RttAverage(this.moyRttVS) < 80 ? g = 3 : this.RttAverage(this.moyRttVS) >= 80 && this.RttAverage(this.moyRttVS) < 150 ? g = 2 : this.RttAverage(this.moyRttVS) >= 150 && (g = 1)), null !== c && null != c[1] ? (Math.ceil((u + 2 * n + v + 2 * A + g) / 7) != this.qosOut && (l = !0), this.qosOut = Math.ceil((u + 2 * n + v + 2 * A + g) / 7), this.qosOutAverage = (this.qosOutAverage * this.qosOutAverageCount + this.qosOut) / (this.qosOutAverageCount + 1), this.qosOutAverageCount++, Math.ceil((u + 2 * n + v) / 4) != this.qosAudioOut && (p = !0), this.qosAudioOut = Math.ceil((u + 2 * n + v) / 4), this.qosAudioOutAverage = (this.qosAudioOutAverage * this.qosAudioOutAverageCount + this.qosAudioOut) / (this.qosAudioOutAverageCount + 1), this.qosAudioOutAverageCount++, Math.ceil((2 * A + g) / 3) != this.qosVideoOut && (V = !0), this.qosVideoOut = Math.ceil((2 * A + g) / 3), this.qosVideoOutAverage = (this.qosVideoOutAverage * this.qosVideoOutAverageCount + this.qosVideoOut) / (this.qosVideoOutAverageCount + 1), this.qosVideoOutAverageCount++) : (Math.ceil((u + 2 * n + v) / 4) != this.qosOut && (l = !0), this.qosOut = Math.ceil((u + 2 * n + v) / 4), this.qosOutAverage = (this.qosOutAverage * this.qosOutAverageCount + this.qosOut) / (this.qosOutAverageCount + 1), this.qosOutAverageCount++, Math.ceil((u + 2 * n + v) / 4) != this.qosAudioOut && (p = !0), this.qosAudioOut = Math.ceil((u + 2 * n + v) / 4), this.qosAudioOutAverage = (this.qosAudioOutAverage * this.qosAudioOutAverageCount + this.qosAudioOut) / (this.qosAudioOutAverageCount + 1), this.qosAudioOutAverageCount++), l && (this.onQosChange(this.qosIn, this.qosOut), l = !1), p && (this.onQosAudioChange(this.qosAudioIn, this.qosAudioOut), p = !1), V && (this.onQosVideoChange(this.qosVideoIn, this.qosVideoOut), V = !1)
}, qosMonitor.prototype.getCodecs = function(t) {
    var e = !1,
        i = !1,
        s = null,
        o = null;
    if (null !== t && void 0 !== t && void 0 !== t.sdp) {
        for (var a = t.sdp.split("\n"), d = 0; d < a.length; d++) - 1 != a[d].indexOf("a=mid:audio") && (e = !0), -1 != a[d].indexOf("a=mid:video") && (i = !0), e && -1 != a[d].indexOf("a=rtpmap:") && (s = a[d], e = !1), i && -1 != a[d].indexOf("a=rtpmap:") && (o = a[d], i = !1);
        return [s, o]
    }
    return null
}, qosMonitor.prototype.getQosScore = function() {
    return [this.qosIn, this.qosOut, this.qosAudioIn, this.qosAudioOut, this.qosVideoIn, this.qosVideoOut]
}, qosMonitor.prototype.getStat = function(t) {
    switch (t) {
        case "AudioOutBandwidth":
            return 8 * this.Average(this.bandwidthAS) / 1024;
        case "VideoOutBandwidth":
            return 8 * this.Average(this.bandwidthVS) / 1024;
        case "AudioInBandwidth":
            return 8 * this.Average(this.bandwidthAR) / 1024;
        case "VideoInBandwidth":
            return 8 * this.Average(this.bandwidthVR) / 1024;
        case "AudioInJitterReceived":
            return this.rawStats["Audio recv"].googJitterReceived;
        case "AudioInJitterBufferMs":
            return this.rawStats["Audio recv"].googJitterBufferMs;
        case "AudioInDelay":
            return this.rawStats["Audio recv"].googCurrentDelayMs;
        case "AudioOutLossRate":
            return this.tauxPacketLossAS;
        case "AudioOutRtt":
            return this.RttAverage(this.moyRttAS);
        case "AudioOutJitterReceived":
            return this.rawStats["Audio send"].googJitterReceived;
        case "VideoInJitterBufferMs":
            return this.rawStats["Video recv"].googJitterBufferMs;
        case "VideoOutLossRate":
            return this.tauxPacketLossVS;
        case "VideoOutRtt":
            return this.RttAverage(this.moyRttVS)
    }
}, qosMonitor.prototype.getAllStats = function() {
    for (var t = {
            AudioRecv: {},
            AudioSend: {},
            VideoRecv: {},
            VideoSend: {}
        }, e = {
            AudioRecv: "Audio recv",
            VideoRecv: "Video recv",
            AudioSend: "Audio send",
            VideoSend: "Video send"
        }, i = Object.keys(e), s = 0; s < i.length; s++)
        for (var o = Object.keys(this.rawStats[e[i[s]]]), a = 0; a < o.length; a++) t[i[s]][o[a]] = this.rawStats[e[i[s]]][o[a]];
    return t.AudioRecv.bandwidth = 8 * this.Average(this.bandwidthAR) / 1024, t.VideoRecv.bandwidth = 8 * this.Average(this.bandwidthVR) / 1024, t.AudioSend.bandwidth = 8 * this.Average(this.bandwidthAS) / 1024, t.VideoSend.bandwidth = 8 * this.Average(this.bandwidthVS) / 1024, t.AudioRecv.jitterReceived = this.rawStats["Audio recv"].googJitterReceived, t.AudioRecv.jitterBufferMs = this.rawStats["Audio recv"].googJitterBufferMs, t.VideoRecv.jitterBufferMs = this.rawStats["Video recv"].googJitterBufferMs, t.AudioRecv.delay = this.rawStats["Audio recv"].googCurrentDelayMs, t.AudioSend.rtt = this.RttAverage(this.moyRttAS), t.VideoSend.rtt = this.RttAverage(this.moyRttVS), delete t.AudioRecv.googCurrentDelayMs, delete t.AudioRecv.googJitterReceived, delete t.AudioRecv.googJitterBufferMs, delete t.VideoRecv.googJitterBufferMs, delete t.AudioSend.googRtt, delete t.VideoSend.googRtt, t
}, qosMonitor.prototype.displayComputedStats = function() {
    console.log("Audio IN JitterReceived:" + this.rawStats["Audio recv"].googJitterReceived + " jitterbufferMs:" + this.rawStats["Audio recv"].googJitterBufferMs + " delay:" + this.rawStats["Audio recv"].googCurrentDelayMs + " bandwidth :" + 8 * this.Average(this.bandwidthAS) / 1024 + " kBits/s"), console.log("Audio OUT  lossRate:" + this.tauxPacketLossAS + " rtt:" + this.RttAverage(this.moyRttAS) + " googJitterReceived:" + this.rawStats["Audio recv"].googJitterReceived), console.log("Video IN jitter buffer ms:" + this.rawStats["Video recv"].googJitterBufferMs + " bandwidth:" + 8 * this.Average(this.bandwidthVS) / 1024 + " kBits/s"), console.log("Video OUT loss rate:" + this.tauxPacketLossVS + " rtt:" + this.RttAverage(this.moyRttVS))
}, qosMonitor.prototype.RttAverage = function(t) {
    for (var e = 0, i = 0, s = 0; s < t.length; ++s) 0 != t[s] && -1 != t[s] && void 0 !== t[s] && (e += parseInt(t[s], 10), i++);
    return parseInt(e / i, 10)
}, qosMonitor.prototype.Average = function(t) {
    for (var e = 0, i = 0, s = 0; s < t.length; ++s) - 1 != t[s] && void 0 !== t[s] && (e += parseInt(t[s], 10), i++);
    return parseInt(e / i, 10)
}, qosMonitor.prototype.add = function(t, e) {
    e.pop(), e.unshift(t)
}, qosMonitor.prototype.displayTab = function(t) {
    for (var e in t) console.log(e + " = " + t[e])
}, CallStatMonitor.prototype.addCallStats = function(t) {
    "use strict";
    var e = !1,
        i = {};
    if ("firefox" === this.browserType) {
        for (var s in t)
            if ("inboundrtp" === t[s].type && s.indexOf("rtp") >= 0) {
                if ("audio" === t[s].mediaType) {
                    i.audioReceived = {};
                    a = Math.floor(t[s].timestamp / 1e3);
                    for (var o in t[s]) "timestamp" === o ? i.audioReceived.timestamp = a : i.audioReceived[o] = t[s][o];
                    e = !0
                } else if ("video" === t[s].mediaType) {
                    i.videoReceived = {};
                    a = Math.floor(t[s].timestamp / 1e3);
                    for (var o in t[s]) "timestamp" === o ? i.videoReceived.timestamp = a : i.videoReceived[o] = t[s][o];
                    e = !0
                }
            } else if ("outboundrtp" === t[s].type && s.indexOf("rtp") >= 0)
            if ("audio" === t[s].mediaType) {
                i.audioSent = {};
                a = Math.floor(t[s].timestamp / 1e3);
                for (var o in t[s]) "timestamp" === o ? i.audioSent.timestamp = a : i.audioSent[o] = t[s][o];
                e = !0
            } else if ("video" === t[s].mediaType) {
            i.videoSent = {};
            a = Math.floor(t[s].timestamp / 1e3);
            for (var o in t[s]) "timestamp" === o ? i.videoSent.timestamp = a : i.videoSent[o] = t[s][o];
            e = !0
        }
    } else
        for (var s in t)
            if ("ssrc" === t[s].type && s.indexOf("recv") >= 0) {
                if ("audio" === t[s].mediaType) {
                    i.audioReceived = {};
                    a = Math.floor(t[s].timestamp / 1e3);
                    for (var o in t[s]) "timestamp" === o ? i.audioReceived.timestamp = a : i.audioReceived[o] = t[s][o];
                    e = !0
                } else if ("video" === t[s].mediaType) {
                    i.videoReceived = {};
                    a = Math.floor(t[s].timestamp / 1e3);
                    for (var o in t[s]) "timestamp" === o ? i.videoReceived.timestamp = a : i.videoReceived[o] = t[s][o];
                    e = !0
                }
            } else if ("ssrc" === t[s].type && s.indexOf("send") >= 0)
        if ("audio" === t[s].mediaType) {
            i.audioSent = {};
            a = Math.floor(Date.parse(t[s].timestamp) / 1e3);
            for (var o in t[s]) "timestamp" === o ? i.audioSent.timestamp = a : i.audioSent[o] = t[s][o];
            e = !0
        } else if ("video" === t[s].mediaType) {
        i.videoSent = {};
        var a = Math.floor(Date.parse(t[s].timestamp) / 1e3);
        for (var o in t[s]) "timestamp" === o ? i.videoSent.timestamp = a : i.videoSent[o] = t[s][o];
        e = !0
    }
    if (e) {
        var d = {
                clientId: this.clientId,
                callId: this.callId,
                apiKey: this.apiKey,
                browserType: this.browserType,
                data: i
            },
            r = JSON.stringify(d);
        this.socket.emit("stats", r)
    }
    return i
};
! function(e, t) {
    "use strict";

    function i(e) {
        return new RegExp("^[0-9-.]*$", "g").test(e)
    }

    function n() {
        return "undefined" != typeof apiRTC_React || "https:" == e.location.protocol
    }

    function a() {
        return "undefined" == typeof apiRTC_React && "http:" == e.location.protocol
    }

    function s(e, t) {
        k.info("mergeJSON");
        var i = {},
            n = null;
        for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
        for (n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
        return k.log(i), i
    }

    function o(e) {
        var t, i, n, a, s = {};
        for (n = 0, a = (t = e.split("&")).length; n < a; n++) s[(i = t[n].split("="))[0]] = i[1];
        return s
    }

    function l(e) {
        return Object.keys(e).map(function(t) {
            return t + "=" + e[t]
        }).join("&")
    }
    e.Prototype && delete Array.prototype.toJSON, console.info("Loading APIRTC_MODULE");
    var r = null,
        c = null,
        d = null,
        h = null,
        u = null,
        C = null,
        p = null,
        g = null,
        m = null,
        f = null,
        v = null,
        T = null,
        I = null,
        b = null,
        S = null,
        R = null,
        y = "notTested",
        w = null,
        D = null,
        M = null,
        O = null,
        E = null,
        A = null,
        U = null,
        k = null,
        L = {};
    L[1] = "ERROR", L[2] = "WARN", L[3] = "INFO", L[4] = "DEBUG", L[5] = "TRACE", A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/=", U = {
        decode: function(e) {
            var t = A.indexOf(e.charAt(e.length - 1)),
                i = A.indexOf(e.charAt(e.length - 2)),
                n = e.length / 4 * 3,
                a = null,
                s = null,
                o = null,
                l = null,
                r = null,
                c = null,
                d = 0,
                h = 0,
                u = null;
            for (64 == t && n--, 64 == i && n--, u = new Uint8Array(n), d = 0; d < n; d += 3) a = A.indexOf(e.charAt(h++)) << 2 | (l = A.indexOf(e.charAt(h++))) >> 4, s = (15 & l) << 4 | (r = A.indexOf(e.charAt(h++))) >> 2, o = (3 & r) << 6 | (c = A.indexOf(e.charAt(h++))), u[d] = a, 64 != r && (u[d + 1] = s), 64 != c && (u[d + 2] = o);
            return u
        },
        encode: function(e) {
            var t = "",
                i = new Uint8Array(e),
                n = i.byteLength,
                a = n % 3,
                s = n - a,
                o = null,
                l = null,
                r = null,
                c = null,
                d = 0;
            for (d = 0; d < s; d += 3) o = (258048 & (c = i[d] << 16 | i[d + 1] << 8 | i[d + 2])) >> 12, l = (4032 & c) >> 6, r = 63 & c, t += A[(16515072 & c) >> 18] + A[o] + A[l] + A[r];
            return 1 == a ? (o = (3 & (c = i[s])) << 4, t += A[(252 & c) >> 2] + A[o] + "==") : 2 == a && (o = (1008 & (c = i[s] << 8 | i[s + 1])) >> 4, l = (15 & c) << 2, t += A[(64512 & c) >> 10] + A[o] + A[l] + "="), t
        }
    }, M = new UAParser, O = M.getBrowser(), I = M.getOS(), "undefined" != typeof apiRTC_React ? (v = DeviceInfo.getSystemVersion(), b = DeviceInfo.getSystemName(), f = DeviceInfo.getUserAgent(), S = DeviceInfo.getModel()) : (v = O.version, b = M.getOS().name, f = O.name, S = M.getDevice().type), T = v !== t ? v.split(".")[0] : 99, (k = new function() {
        this.logLevel = 4, "undefined" != typeof apiRTC_React ? this.logHandler = console : e.console && e.console.log ? this.logHandler = e.console : this.logHandler = function() {
            this.log = function() {}
        }, this.setLogLevel = function(e) {
            if (!Number.isInteger(e) || e < 0) throw "Log level invalid";
            this.logLevel = e
        }, this.setLogHandler = function(e) {
            this.logHandler = e
        }, this.trace = function(e, t) {
            this.logMessage(e, t, 5)
        }, this.log = function(e, t) {
            this.logMessage(e, t, 4)
        }, this.debug = function(e, t) {
            this.logMessage(e, t, 4)
        }, this.info = function(e, t) {
            this.logMessage(e, t, 3)
        }, this.warn = function(e, t) {
            this.logMessage(e, t, 2)
        }, this.error = function(e, t) {
            this.logMessage(e, t, 1)
        }, this.logMessage = function(t, i, n) {
            if (n <= this.logLevel && null !== this.logHandler) {
                var a = "apiRTC",
                    s = this.logHandler.log;
                switch (Object(t) !== t && (a += " : " + t), this.logHandler === e.console && (L.hasOwnProperty(n) && (a = "[" + L[n] + "] " + a), a = "[" + (new Date).toISOString() + "] " + a), n) {
                    case 1:
                        void 0 !== this.logHandler.error && (s = this.logHandler.error);
                        break;
                    case 2:
                        void 0 !== this.logHandler.warn && (s = this.logHandler.warn);
                        break;
                    case 3:
                        void 0 !== this.logHandler.info && (s = this.logHandler.info);
                        break;
                    case 4:
                        void 0 !== this.logHandler.log ? s = this.logHandler.log : void 0 !== this.logHandler.debug && (s = this.logHandler.debug);
                        break;
                    case 5:
                        void 0 !== this.logHandler.trace && this.logHandler !== e.console && (s = this.logHandler.trace);
                        break;
                    default:
                        console.log("Default case in logMessage :", n)
                }
                void 0 === i ? Object(t) !== t ? "Firefox" === f && T < 49 || "Chrome" === f && T < 50 || "IE" === f || "Edge" === f || "undefined" != typeof apiRTC_React ? console.log(a) : s(a) : "Firefox" === f && T < 49 || "Chrome" === f && T < 50 || "IE" === f || "Edge" === f || "undefined" != typeof apiRTC_React ? console.log(a, t) : s(a, t) : Object(t) !== t ? "Firefox" === f && T < 49 || "Chrome" === f && T < 50 || "IE" === f || "Edge" === f || "undefined" != typeof apiRTC_React ? console.log(a, i) : s(a, i) : "Firefox" === f && T < 49 || "Chrome" === f && T < 50 || "IE" === f || "Edge" === f || "undefined" != typeof apiRTC_React ? console.log(a, t, i) : s(a, t, i)
            }
        }
    }).log("Browser : " + f), k.log("Browser version : " + v), k.log("Browser major version : " + T), k.log("OS : " + JSON.stringify(I)), r = function() {
        if ("notTested" === y) try {
            new CustomEvent("test", {
                detail: "test",
                bubbles: !0,
                cancelable: !0
            }), y = !0
        } catch (e) {
            y = !1, k.log("customEvent error :" + e)
        }("IE" === f && v > 8 || "Netscape" === f) && (k.log("polyfill the CustomEvent()"), function() {
            function i(e, i) {
                i = i || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: t
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, i.bubbles, i.cancelable, i.detail), n
            }
            i.prototype = e.CustomEvent.prototype, e.CustomEvent = i
        }(), y = !0), this.eventDispatchMgr = function(e, t) {
            console.log('MDH: this.eventDispatchMgr - e = ', e);
            console.log('MDH: this.eventDispatchMgr - t = ', t);
            console.log('MDH: this.eventDispatchMgr - y = ', y);
            if (!1 === y) {
              console.log('MDH: this.eventDispatchMgr - !1 === y'),
              "undefined" != typeof $jqApz
                ? (k.log("CustomEvent not supported by Browser, using $jqApz "),
                  $jqApz.event.trigger({ type: e, detail: t }))
                : "undefined" != typeof jQuery
                  ? (k.log("CustomEvent not supported by Browser, using jQuery "),
                  jQuery.event.trigger({ type: e, detail: t }))
                  : k.warn("Custom Events not supported on this browser : eventDispatchMgr()");
            } else {
                console.log('MDH: this.eventDispatchMgr - else - CustomEvent');
                var i = new CustomEvent(e, {
                    detail: t,
                    bubbles: !0,
                    cancelable: !0
                });
                document.dispatchEvent(i)
            }
        }, this.createIncomingCallEvent = function(e, i, n, a, s, o, l, r, c, d, h) {
            var u = {
                eventType: "incomingCall",
                time: new Date,
                clientId: e,
                callerId: i,
                callId: a,
                autoAnswerActivated: s,
                callNumber: o,
                callerNickname: n,
                audioOnly: l,
                callType: r,
                destCallType: h,
                recordedCall: c,
                remoteType: d
            };
            "undefined" != typeof apiRTC_React ? React.onIncomingCall !== t && React.onIncomingCall("incomingCall", u) : this.eventDispatchMgr("incomingCall", u)
        }, this.createCallAttemptEvent = function(e, t, i, n) {
            var a = {
                eventType: "callAttempt",
                time: new Date,
                clientId: e,
                callerId: t,
                callId: n,
                callerNickname: i
            };
            this.eventDispatchMgr("callAttempt", a)
        }, this.createCallEstablishedEvent = function(e, t, i, n) {
            k.info("createCallEstablishedEvent with callType : " + t), k.info("destCallType : " + n);
            var a = {
                eventType: "callEstablished",
                time: new Date,
                calleeId: e,
                callType: t,
                callId: i,
                destCallType: n
            };
            this.eventDispatchMgr("callEstablished", a)
        }, this.createHangupEvent = function(e, i, n, a, s, o, l) {
            var r = {
                eventType: "hangup",
                time: new Date,
                hangupType: e,
                clientId: i,
                remoteId: n,
                lastEstablishedCall: a,
                reason: s,
                callId: o,
                callType: l
            };
            "undefined" != typeof apiRTC_React ? React.onHangup !== t && React.onHangup("hangup", r) : this.eventDispatchMgr("hangup", r)
        }, this.createRemoteHangupEvent = function(e, t, i, n) {
            var a = {
                eventType: "remoteHangup",
                time: new Date,
                clientId: e,
                remoteId: t,
                lastEstablishedCall: i,
                reason: n
            };
            this.eventDispatchMgr("remoteHangup", a)
        }, this.createUserMediaSuccessEvent = function(e, i, n, a, s, o, l, r, c, d) {
            var h = "userMediaSuccess",
                u = {
                    eventType: "userMediaSuccess",
                    time: new Date,
                    onCallEstablishment: e,
                    audioIsAvailable: i,
                    audioDeviceLabel: n,
                    videoIsAvailable: a,
                    videoDeviceLabel: s,
                    callType: o,
                    callId: l,
                    stream: r,
                    remoteId: c,
                    restarted: d
                };
            "undefined" != typeof apiRTC_React ? React.onUserMediaSuccess !== t && React.onUserMediaSuccess(h, u) : this.eventDispatchMgr(h, u)
        }, this.createUserMediaErrorEvent = function(e, t) {
            var i = {
                eventType: "userMediaError",
                time: new Date,
                onCallEstablishment: e,
                callType: t
            };
            this.eventDispatchMgr("userMediaError", i)
        }, this.createUserMediaStopEvent = function(e, t) {
            var i = {
                eventType: "userMediaStop",
                time: new Date,
                callId: e,
                mediaType: t
            };
            this.eventDispatchMgr("userMediaStop", i)
        }, this.createICECandidateTypeUpdateEvent = function(e, t, i) {
            var n = {
                eventType: "ICECandidateTypeUpdate",
                time: new Date,
                callId: e,
                localCandidate: t,
                remoteCandidate: i
            };
            this.eventDispatchMgr("ICECandidateTypeUpdate", n)
        }, this.createSelectedICECandidateEvent = function(e, t, i, n, a, s, o) {
            var l = {
                eventType: "selectedICECandidate",
                time: new Date,
                callId: e,
                localCandidateType: t,
                remoteCandidateType: i,
                localAddress: n,
                remoteAdress: a,
                transportType: s,
                localTransportType: o
            };
            this.eventDispatchMgr("selectedICECandidate", l)
        }, this.createErrorEvent = function(e, t) {
            var i = {
                eventType: "error :",
                time: new Date,
                errorInfo: e,
                errorCode: t
            };
            this.eventDispatchMgr("error", i)
        }, this.createReceiveIMMessageEvent = function(e, t, i, n, a, s) {
            var o = {
                eventType: "receiveIMMessage",
                time: new Date,
                senderId: e,
                senderNickname: t,
                senderPhotoURL: i,
                message: n,
                UUCSeq: a,
                convId: s
            };
            this.eventDispatchMgr("receiveIMMessage", o)
        }, this.createChannelEvent = function(e) {
            console.log('MDH: createChannelEvent - e = ', e);
            var t = {
                eventType: "channelEvent :",
                time: new Date,
                channelEvent: e
            };
            console.log('MDH: createChannelEvent - t = ', t);
            this.eventDispatchMgr("channelEvent", t)
            console.log('MDH: createChannelEvent - this.eventDispatchMgr called');
        }, this.createSessionReadyEvent = function(e) {
            k.info("createSessionReadyEvent");
            var i = {
                eventType: "sessionReady",
                time: new Date,
                apiCCId: e
            };
            "undefined" != typeof apiRTC_React ? React.onSessionReady !== t && React.onSessionReady("sessionReady", i) : this.eventDispatchMgr("sessionReady", i)
        }, this.createWebRTCClientCreatedEvent = function() {
            var e = {
                eventType: "webRTCClientCreated",
                time: new Date
            };
            this.eventDispatchMgr("webRTCClientCreated", e)
        }, this.createUpdatePresenceEvent = function(e, t, i) {
            var n = {
                eventType: "updatePresence",
                time: new Date,
                connectedUsersList: e,
                connectedUsersListWithStatus: i,
                state: t
            };
            this.eventDispatchMgr("updatePresence", n)
        }, this.createUpdateUserStatusEvent = function(e) {
            var t = {
                eventType: "updateUserStatus",
                time: new Date,
                message: e
            };
            this.eventDispatchMgr("updateUserStatus", t)
        }, this.createGroupChatCreationEvent = function(e, t, i, n, a, s) {
            var o = {
                eventType: "groupChatCreation",
                time: new Date,
                status: e,
                groupChatId: t,
                initialDestId: i,
                invitationSendedToInitialDestId: n,
                newContactId: a,
                invitationSendedToNewContactId: s
            };
            this.eventDispatchMgr("groupChatCreation", o)
        }, this.createGroupChatInvitationEvent = function(e, t, i, n, a) {
            var s = {
                eventType: "groupChatInvitation",
                time: new Date,
                groupChatId: e,
                contactList: a,
                senderId: t,
                senderNickname: i,
                senderPhotoURL: n
            };
            this.eventDispatchMgr("groupChatInvitation", s)
        }, this.createGroupChatMemberUpdateEvent = function(e, t, i) {
            var n = {
                eventType: "groupChatMemberUpdate",
                time: new Date,
                groupChatId: e,
                contactList: t,
                status: i
            };
            this.eventDispatchMgr("groupChatMemberUpdate", n)
        }, this.createAddUserInGroupChatEvent = function(e, t, i) {
            var n = {
                eventType: "addUserInGroupChatAnswer",
                time: new Date,
                invitationSended: e,
                groupChatId: t,
                contactId: i
            };
            this.eventDispatchMgr("addUserInGroupChatAnswer", n)
        }, this.createReceiveGroupChatMessageEvent = function(e, t, i, n) {
            var a = {
                eventType: "receiveGroupChatMessage",
                time: new Date,
                groupChatId: e,
                senderId: t,
                senderNickname: i,
                message: n
            };
            this.eventDispatchMgr("receiveGroupChatMessage", a)
        }, this.createReceiveConversationListAnswerEvent = function(e) {
            var t = {
                eventType: "receiveConversationList",
                time: new Date,
                convList: e
            };
            this.eventDispatchMgr("receiveConversationList", t)
        }, this.createReceiveContactOccurrencesFromConversationListAnswerEvent = function(e) {
            var t = {
                eventType: "receiveContactOccurrencesFromConversationList",
                time: new Date,
                occurrencesList: e
            };
            this.eventDispatchMgr("receiveContactOccurrencesFromConversationList", t)
        }, this.createReceiveConversationDetailReportAnswerEvent = function(e) {
            var t = {
                eventType: "receiveConversationDetailReport",
                time: new Date,
                CDR: e
            };
            this.eventDispatchMgr("receiveConversationDetailReport", t)
        }, this.createReceiveConversationHistoryEvent = function(e, t, i) {
            var n = {
                eventType: "receiveConversationHistory",
                time: new Date,
                convId: e,
                convHistory: t,
                status: i
            };
            this.eventDispatchMgr("receiveConversationHistory", n)
        }, this.createUserDataAnswerEvent = function(e, t, i, n) {
            var a = {
                eventType: "userDataAnswer",
                time: new Date,
                userFound: e,
                contactId: t,
                nickname: i,
                photoURL: n
            };
            this.eventDispatchMgr("userDataAnswer", a)
        }, this.createReceiveDataEvent = function(e, t, i) {
            var n = {
                eventType: "receiveData",
                time: new Date,
                senderId: e,
                dstRoomId: t,
                data: i
            };
            this.eventDispatchMgr("receiveData", n)
        }, this.createMCUSessionCreationEvent = function(e, t) {
            var i = {
                eventType: "MCUSessionCreation",
                time: new Date,
                sessionId: e,
                token: t
            };
            this.eventDispatchMgr("MCUSessionCreation", i)
        }, this.createJoinMCUSessionAnswerEvent = function(e, t, i, n, a) {
            var s = {
                eventType: "joinMCUSessionAnswer",
                time: new Date,
                sessionId: e,
                token: t,
                groupChatId: i,
                initiator: n,
                roomId: a
            };
            this.eventDispatchMgr("joinMCUSessionAnswer", s)
        }, this.createMCUAvailableStreamEvent = function(e, t) {
            var i = {
                eventType: "MCUAvailableStream",
                time: new Date,
                streams: e,
                isRemoteStream: t
            };
            this.eventDispatchMgr("MCUAvailableStream", i)
        }, this.createMCUAvailableCompositeEvent = function(e, t) {
            var i = {
                eventType: "MCUAvailableComposite",
                time: new Date,
                streams: e,
                isRemoteStream: t
            };
            this.eventDispatchMgr("MCUAvailableComposite", i)
        }, this.createMCURemovedStreamEvent = function(e) {
            var t = {
                eventType: "MCURemoveStream",
                time: new Date,
                streamId: e
            };
            this.eventDispatchMgr("MCURemoveStream", t)
        }, this.createReceiveMCUSessionInvitationEvent = function(e, i, n, a) {
            n === t && (n = 0);
            var s = {
                eventType: "receiveMCUSessionInvitation",
                time: new Date,
                sessionId: e,
                token: i,
                groupChatId: n,
                initiatorId: a
            };
            this.eventDispatchMgr("receiveMCUSessionInvitation", s)
        }, this.createRemoteStreamAddedEvent = function(e, i, n, a, s) {
            var o = "remoteStreamAdded",
                l = {
                    eventType: "remoteStreamAdded",
                    time: new Date,
                    callId: i,
                    callType: e,
                    stream: n,
                    remoteId: a,
                    destCallType: s
                };
            "undefined" != typeof apiRTC_React ? React.onRemoteStreamAdded !== t && React.onRemoteStreamAdded(o, l) : this.eventDispatchMgr(o, l)
        }, this.createRemoteStreamRemovedEvent = function(e, t, i, n, a) {
            var s = {
                eventType: "remoteStreamRemoved",
                time: new Date,
                callId: t,
                callType: e,
                stream: i,
                remoteId: n,
                destCallType: a
            };
            this.eventDispatchMgr("remoteStreamRemoved", s)
        }, this.createCanPlayRemoteVideoEvent = function(e, t, i) {
            var n = {
                eventType: "canPlayRemoteVideo",
                time: new Date,
                videoDivId: e,
                callType: t,
                remoteId: i
            };
            this.eventDispatchMgr("canPlayRemoteVideo", n)
        }, this.createRecordedFileAvailableEvent = function(e) {
            var t = {
                eventType: "recordedFileAvailable",
                time: new Date,
                fileName: e
            };
            this.eventDispatchMgr("recordedFileAvailable", t)
        }, this.createRecordedStreamsAvailableEvent = function(e, t, i, n) {
            var a = {
                eventType: "recordedStreamsAvailable",
                time: new Date,
                confId: e,
                userId1: t,
                userId2: i,
                callId: n,
                apiKey: d.session.apiKey
            };
            this.eventDispatchMgr("recordedStreamsAvailable", a)
        }, this.createMCURecordedStreamsAvailableEvent = function(e, t, i, n) {
            var a = {
                eventType: "MCURecordedStreamsAvailable",
                time: new Date,
                roomName: e,
                callId: t,
                clientId: i,
                recordedFileName: n
            };
            this.eventDispatchMgr("MCURecordedStreamsAvailable", a)
        }, this.createMCURecordingStartedEvent = function(e, t, i, n, a) {
            var s = {
                eventType: "MCURecordingStarted",
                time: new Date,
                roomName: e,
                callId: t,
                clientId: i,
                recordType: n,
                recordStartTime: a
            };
            this.eventDispatchMgr("MCURecordingStarted", s)
        }, this.createStopRecordEvent = function() {
            var e = {
                eventType: "stopRecord",
                time: new Date
            };
            this.eventDispatchMgr("stopRecord", e)
        }, this.createMCUStreamingStartedEvent = function(e, t, i, n) {
            var a = {
                eventType: "MCUStreamingStarted",
                time: new Date,
                roomName: e,
                callId: t,
                clientId: i,
                streamingStartTime: n
            };
            this.eventDispatchMgr("MCUStreamingStarted", a)
        }, this.createMCUStreamingStoppedEvent = function(e, t, i, n) {
            var a = {
                eventType: "MCUStreamingStopped",
                time: new Date,
                roomName: e,
                callId: t,
                clientId: i,
                streamingEndTime: n
            };
            this.eventDispatchMgr("MCUStreamingStopped", a)
        }, this.createSnapShotPhotoUploaded = function(e) {
            var t = {
                eventType: "snapShotPhotoUploaded",
                time: new Date,
                fileName: e
            };
            this.eventDispatchMgr("snapShotPhotoUploaded", t)
        }, this.createRoomCreationEvent = function(e, t, i) {
            var n = {
                eventType: "roomCreation",
                time: new Date,
                status: e,
                roomId: t,
                roomType: i
            };
            this.eventDispatchMgr("roomCreation", n)
        }, this.createRoomInvitationEvent = function(e, t, i, n, a, s) {
            var o = {
                eventType: "roomInvitation",
                time: new Date,
                roomId: e,
                contactList: a,
                senderId: t,
                senderNickname: i,
                senderPhotoURL: n,
                roomType: s
            };
            this.eventDispatchMgr("roomInvitation", o)
        }, this.createRoomMemberUpdateEvent = function(e, t, i, n) {
            var a = {
                eventType: "roomMemberUpdate",
                time: new Date,
                roomId: e,
                contactList: t,
                status: i,
                roomType: n
            };
            this.eventDispatchMgr("roomMemberUpdate", a)
        }, this.createContactListInRoomEvent = function(e, t, i) {
            var n = {
                eventType: "contactListInRoom",
                time: new Date,
                roomId: e,
                contactList: t,
                roomType: i
            };
            this.eventDispatchMgr("contactListInRoom", n)
        }, this.createReceiveRoomMessageEvent = function(e, t, i, n, a) {
            var s = {
                eventType: "receiveRoomMessage",
                time: new Date,
                roomId: e,
                senderId: t,
                senderNickname: i,
                message: n,
                roomType: a
            };
            this.eventDispatchMgr("receiveRoomMessage", s)
        }, this.createDesktopCaptureEvent = function(e, t, i) {
            var n = {
                eventType: "desktopCapture",
                time: new Date,
                event: e,
                callId: t,
                remoteId: i
            };
            this.eventDispatchMgr("desktopCapture", n)
        }, this.createSwitchStreamEvent = function(e, t) {
            var i = {
                eventType: "switchStream",
                time: new Date,
                callId: e,
                stream: t
            };
            this.eventDispatchMgr("switchStream", i)
        }, this.createConnectedUsersListUpdateEvent = function(e, i, n) {
            var a = "connectedUsersListUpdate",
                s = {
                    eventType: "ConnectedUsersListUpdate",
                    time: new Date,
                    group: e,
                    usersList: i,
                    status: n
                };
            "undefined" != typeof apiRTC_React ? React.onConnectedUsersListUpdate !== t && React.onConnectedUsersListUpdate(a, s) : this.eventDispatchMgr(a, s)
        }, this.createClosingWhiteBoardEvent = function(e, t) {
            var i = {
                eventType: "closingWhiteBoard",
                time: new Date,
                roomId: e,
                reason: t
            };
            this.eventDispatchMgr("closingWhiteBoard", i)
        }, this.createEvent = function(e) {
            if (!e.eventType) throw new Error("The event json must have an eventType" + e);
            e.time = new Date, this.eventDispatchMgr(e.eventType, e)
        }
    }, c = new r, d = {
        version: "3.14.3",
        description: "Apizee Cloud Communication Library",
        session: null,
        jsLoaded: !1,
        initApiKey: null,
        initApiCCId: null,
        bandwidthTestServer: "https://cloud.apizee.com",
        bandwidthRatingThresholds: [40, 300, 500, 700, 1500],
        LOG_LEVEL_OFF: 0,
        LOG_LEVEL_ERROR: 1,
        LOG_LEVEL_WARN: 2,
        LOG_LEVEL_INFO: 3,
        LOG_LEVEL_DEBUG: 4,
        LOG_LEVEL_TRACE: 5,
        browser: f,
        browser_major_version: T,
        browser_version: v
    }, d.init = function(i) {
        k.info("apiRTC initialization, version is :" + d.version);
        var n = "";
        if (n = e !== t && e.location !== t && e.location.protocol !== t && "https:" != e.location.protocol ? "http" : "https", "iOS" !== I.name && "Android" !== I.name || (k.log(I.name + " detected forcing protocol to https"), n = "https"), i.ccsServer === t ? (k.info("Setting ccsServer"), e !== t && e.location !== t && e.location.protocol !== t ? "https:" == e.location.protocol || "iOS" === I.name || "Android" === I.name ? i.ccsServer = "ccs5.apizee.com:443" : i.ccsServer = "ccs5.apizee.com:80" : i.ccsServer = "ccs5.apizee.com:443") : k.log("ccsServer is defined on init()"), null !== i.bandwidthTestServer && i.bandwidthTestServer !== t ? (k.log("bandwidthTestServer is defined :", i.bandwidthTestServer), d.bandwidthTestServer = i.bandwidthTestServer) : k.log("bandwidthTestServer is not defined"), i.userData !== t && k.log("userData :", i.userData), !1 === this.jsLoaded)
            if (d.initApiKey = i.apiKey, d.initApiCCId = i.apiCCId, "function" == typeof define && define.amd && "undefined" != typeof requirejs) {
                var a = [],
                    s = n + "://" + i.ccsServer + "/socket.io/socket.io",
                    o = "",
                    l = {};
                a.push("sio"), l = {
                    sio: s
                }, !1 !== i.ApiDBActivated && i.ApiDBActivated !== t && null !== i.ApiDBActivated && (o = !0 === i.ApiDBActivated ? n + "://cloud.apizee.com/apiRTC-DB/v1.0/apiRTC-DB-1.0.8.min" : n + ":" + i.ApiDBActivated + "apiRTC-DB/v1.0/apiRTC-DB-1.0.8.min", a.push("apirtcdb"), l.apirtcdb = o), k.log("RequireJS is already loaded, run config : ", l), requirejs.config({
                    shim: {
                        sio: {
                            exports: "io"
                        }
                    },
                    wrap: !1,
                    paths: l
                }), requirejs(a, function(t) {
                    k.log("End of .js loading in head with requirejs"), e.rtcio = t, d.jsLoaded = !0, d.session = new d.ApiCCSession(i)
                })
            } else typeof $LAB !== t && "undefined" == typeof apiRTC_React ? $LAB.script(function() {
                return n + "://" + i.ccsServer + "/socket.io/socket.io.js"
            }).script(function() {
                return !1 === i.ApiDBActivated || i.ApiDBActivated === t || null === i.ApiDBActivated ? null : !0 === i.ApiDBActivated ? n + "://cloud.apizee.com/apiRTC-DB/v1.0/apiRTC-DB-1.0.8.min.js" : n + ":" + i.ApiDBActivated + "apiRTC-DB/v1.0/apiRTC-DB-1.0.8.min.js"
            }).wait(function() {
                k.log("End of .js loading in head"), e.rtcio = io, d.jsLoaded = !0, d.session = new d.ApiCCSession(i)
            }) : (k.log("no .js loading"), e.rtcio = io, d.jsLoaded = !0, d.session = new d.ApiCCSession(i));
        else k.log("apiRTC JS Librairies already loaded"), k.log("initParameters have changed, need to reload session connection"), k.log("initParameters.userData :", i.userData), i.apiCCId === t && (k.log("keeping apiCCId defined by apiRTC :" + i.apiCCId), i.apiCCId = d.session.apiCCId), k.log("initParameters.apiCCId :" + i.apiCCId), null !== i.userData && i.userData !== t ? (k.log("userData is defined :", i.userData), d.session.userData = i.userData) : k.log("userData is not defined"), k.log("apiCC.session.userData :", d.session.userData), d.session.reOpenChannel(i.apiCCId, i.apiKey), null !== i.nickname && i.nickname !== t ? (k.log("Nickname is defined :" + i.nickname), d.session.nickname = i.nickname) : (k.log("Nickname is not defined, setting to apiCCId value :" + d.session.apiCCId), d.session.nickname = d.session.apiCCId), null !== i.photoURL && i.photoURL !== t ? (k.log("photoURL is defined :" + i.photoURL), d.session.photoURL = i.photoURL) : (k.log("photoURL is not defined"), d.session.photoURL = null), d.initApiKey = i.apiKey, d.initApiCCId = i.apiCCId
    }, d.setLogLevel = function(e) {
        k.setLogLevel(e)
    }, d.setLogHandler = function(e) {
        k.setLogHandler(e)
    }, d.registerIOsDevice = function(e) {
        k.info("call registerIOsDevice 1");
        var t = {
                type: "registerIOsDevice",
                senderId: d.session.apiCCId,
                token: e
            },
            i = JSON.stringify(t);
        k.info("call registerIOsDevice " + i), d.session.channel.socket.emit("registerIOsDevice", i), k.info("call registerIOsDevice  done")
    }, d.registerAndroidDevice = function(e) {
        k.info("registerAndroidDevice");
        var t = {
                type: "registerAndroidDevice",
                senderId: d.session.apiCCId,
                token: e
            },
            i = JSON.stringify(t);
        d.session.channel.socket.emit("registerAndroidDevice", i)
    }, d.unRegisterIOsDevice = function(e) {
        k.info("unRegisterIOsDevice");
        var t = {
                type: "unRegisterIOsDevice",
                senderId: d.session.apiCCId,
                token: e
            },
            i = JSON.stringify(t);
        d.session.channel.socket.emit("unRegisterIOsDevice", i)
    }, d.unRegisterAndroidDevice = function(e) {
        k.info("unRegisterAndroidDevice");
        var t = {
                type: "unRegisterAndroidDevice",
                senderId: d.session.apiCCId,
                token: e
            },
            i = JSON.stringify(t);
        d.session.channel.socket.emit("unRegisterAndroidDevice", i)
    }, d.disconnect = function() {
        null !== d.session && d.session !== t && (d.setCookie("apiCCId", d.session.apiCCId, 5e3), null !== d.session.sessionId && d.setCookie("sessionId", d.session.sessionId, 5e3), null !== d.session.apiCCWhiteBoardClient && (k.log("apiCC.session.apiCCWhiteBoardClient.roomId :" + d.session.apiCCWhiteBoardClient.roomId), null !== d.session.apiCCWhiteBoardClient.roomId && d.session.closeWhiteBoardClient("USER_DISCONNECTION")), k.log("Disconnecting from Server"), d.session.channel.socket !== t && null !== d.session.channel.socket && d.session.channel.socket.disconnect(), d.session.channel.channelHasBeenDisconnected = !1, d.session.connectedUsersList.splice(0, d.session.connectedUsersList.length))
    }, d.reconnect = function() {
        k.log("Reconnect"), k.log("apiCC.session.channel.socket:", d.session.channel.socket), d.session.channel.socket.socket.connect()
    }, d.cleanApiRTCContext = function() {
        null !== d.session && d.session !== t && (null !== d.session.apiCCWebRTCClient && d.session.apiCCWebRTCClient !== t && (0 !== d.session.apiCCWebRTCClient.webRTCClient.callsTable.length && k.log("Call is still established and will be disconnected"), null !== d.session.apiCCWebRTCClient.webRTCClient.MCUClient.sessionMCU && k.log("MCU session is still established and will be disconnected"), d.session.apiCCWebRTCClient.hangUp(), null !== d.session.apiCCWebRTCClient.webRTCClient.localStream && (d.session.apiCCWebRTCClient.webRTCClient.stopStream(d.session.apiCCWebRTCClient.webRTCClient.localStream), c.createUserMediaStopEvent(null, "media")), d.session.apiCCWebRTCClient = null), null !== d.session.apiCCIMClient && d.session.apiCCIMClient !== t && (d.session.apiCCIMClient = null), null !== d.session.apiCCDataClient && d.session.apiCCDataClient !== t && (d.session.apiCCDataClient = null), null !== d.session.apiCCWhiteBoardClient && d.session.apiCCWhiteBoardClient !== t && (d.session.apiCCWhiteBoardClient = null), null !== d.session.apiCCCoBrowsingClient && d.session.apiCCCoBrowsingClient !== t && (d.session.apiCCCoBrowsingClient = null))
    }, d.myEventTable = [], d.addEventListener = function(e, t) {
        console.log('MDH:  d.addEventListener - e = ', e);
        console.log('MDH:  d.addEventListener - t = ', t);
        var i = {},
            n = null;
        ["sessionReady", "incomingCall", "callEstablished", "remoteHangup", "userMediaSuccess", "userMediaError", "userMediaStop", "error", "receiveIMMessage", "updatePresence", "webRTCClientCreated", "updateUserStatus", "channelEvent", "groupChatCreation", "groupChatInvitation", "groupChatMemberUpdate", "addUserInGroupChatAnswer", "receiveGroupChatMessage", "userDataAnswer", "receiveConversationList", "receiveConversationHistory", "receiveConversationDetailReport", "receiveContactOccurrencesFromConversationList", "receiveMCUSessionInvitation", "MCUSessionCreation", "MCUAvailableStream", "MCURemoveStream", "canPlayRemoteVideo", "recordedFileAvailable", "receiveData", "roomCreation", "roomInvitation", "roomMemberUpdate", "receiveRoomMessage", "contactListInRoom", "snapShotPhotoUploaded", "stopRecord", "callAttempt", "joinMCUSessionAnswer", "hangup", "desktopCapture", "remoteStreamAdded", "remoteStreamRemoved", "switchStream", "sendDataChannelOpen", "sendDataChannelClose", "sendDataChannelError", "receiveDataChannelOpen", "receiveDataChannelClose", "receiveDataChannelError", "connectedUsersListUpdate", "onFileSended", "onFileSending", "onFileReceiving", "onFileReceived", "onFileProgress", "recordedStreamsAvailable", "closingWhiteBoard", "webRTCPluginInstallation", "onQosStatsUpdate", "onQosChange", "onQosAudioChange", "onQosVideoChange", "MCURecordedStreamsAvailable", "MCURecordingStarted", "ICECandidateTypeUpdate", "disconnectionWarning", "MCUAvailableComposite", "callRestarting", "selectedICECandidate", "MCUStreamingStarted", "MCUStreamingStopped"].indexOf(e) > -1
          ? ("remoteHangup" == e && k.warn("DEPRECATED : ApiRTC : remoteHangup event is now deprecated, please use hangup event instead"),
          k.log("Adding listener on type :" + e),
          "undefined" != typeof apiRTC_React
            ? k.log('no listener on react, react.on"[event name]" callback will be called')
            : (document.addEventListener && !0 === y
              ? document.addEventListener(e, t, !1)
              : "undefined" != typeof $jqApz ? (k.log("using $jqApz"), $jqApz(document).on(e, t)) : "undefined" != typeof jQuery ? (k.log("using jQuery"), jQuery(document).on(e, t)) : k.warn("Custom Events not supported on this browser : addEventListener()"), i = {
            type: e,
            listener: t
        }, n = d.myEventTable.push(i), i = null, k.trace("number of myEventTable:" + n), n = 0)) : (c.createErrorEvent("ERROR: Trying to add a listener on an unknow event", "UNKNOWN_EVENT_ON_ADDLISTENER"), k.log("ERROR: Trying to add a listener on an unknow event :" + e))
    }, d.removeEventListener = function(e, t) {
        k.info("Removing listener on type :" + e), document.removeEventListener ? document.removeEventListener(e, t, !1) : "undefined" != typeof jQuery ? jQuery(document).off(e, t) : k.log("Custom Events not supported on this browser")
    }, d.setCookie = function(e, t, i) {
        k.info("setCookie"), i = i || 36e5;
        var n = new Date,
            a = new Date;
        a.setTime(n.getTime() + i), document.cookie = e + "=" + encodeURIComponent(t) + ";expires=" + a.toGMTString()
    }, d.testUserPing = function(e) {
        k.info("testUserPing()");
        var t, i, n, a, s = d.bandwidthTestServer + "/upload-test",
            o = new XMLHttpRequest,
            l = new FormData,
            r = Math.round(5 * Math.random()),
            c = !1;
        "withCredentials" in o ? o.open("POST", s, !0) : "undefined" != typeof XDomainRequest ? (o = new XDomainRequest).open("POST", s) : o = null, t = new Blob([r], {
            type: "text/xml"
        }), l.append("file", t), o ? (o.onload = function() {
            200 === o.status && (a = Date.now() - i, c || (clearTimeout(n), e(null, a)))
        }, o.onerror = function(t) {
            k.log("testUserUpload onerror status :", t.target.status), e({
                err: "An error occured during XMLHttpRequest",
                msg: t.target.status
            }, null)
        }, n = setTimeout(function() {
            c = !0, e("Ping timeout", -1)
        }, 5e3), o.send(l), i = Date.now()) : e({
            err: "XMLHttpRequest is not defined",
            msg: "XMLHttpRequest is not defined"
        }, null)
    }, d.testUserDownload = function(e) {
        k.info("testUserDownload()");
        var t, i, n, a, s, o, l = d.bandwidthTestServer + "/files/noise_768ko.jpg",
            r = new Image,
            c = 0;
        l += "?nnn=" + Date.now(), d.testUserPing(function(h, u) {
            r.onload = function() {
                for ((i = Date.now() - t) - u > 10 && (i -= u), n = 787234 / (i / 1e3), a = Math.round(n / 1e3), o = {
                        type: "download",
                        kBPerSec: a
                    }, s = 0; s < d.bandwidthRatingThresholds.length; s++) 8 * o.kBPerSec >= d.bandwidthRatingThresholds[s] && c++;
                o.rating = c + "/" + d.bandwidthRatingThresholds.length, e(null, o)
            }, r.onerror = function(t, i) {
                e({
                    label: "Error when downloading",
                    err: t,
                    msg: i
                }, null)
            }, t = (new Date).getTime(), r.src = l
        })
    }, d.testUserUpload = function(e, t) {
        k.info("testUserUpload()");
        var i, n, a, s, o, l, r, c = d.bandwidthTestServer + "/upload-test",
            h = new XMLHttpRequest,
            u = new FormData,
            C = "",
            p = 0;
        "withCredentials" in h ? h.open("POST", c, !0) : "undefined" != typeof XDomainRequest ? (h = new XDomainRequest).open("POST", c) : h = null;
        for (n = 0; n < e; n++) C += Math.round(5 * Math.random());
        i = new Blob([C], {
            type: "text/xml"
        }), u.append("file", i), h ? (h.onload = function() {
            if (200 === h.status) {
                for (o = Date.now() - s, l = e / (o / 1e3), r = Math.round(l / 1e3), a = {
                        type: "upload",
                        kBPerSec: r
                    }, n = 0; n < d.bandwidthRatingThresholds.length; n++) 8 * a.kBPerSec >= d.bandwidthRatingThresholds[n] && p++;
                a.rating = p + "/" + d.bandwidthRatingThresholds.length, t(null, a)
            } else t({
                err: "An error occured during XMLHttpRequest",
                msg: h.status
            }, null)
        }, h.onerror = function(e) {
            k.log("testUserUpload onerror status :", e.target.status), t({
                err: "An error occured during XMLHttpRequest",
                msg: e.target.status
            }, null)
        }, h.send(u), s = Date.now()) : t({
            err: "XMLHttpRequest is not defined",
            msg: "XMLHttpRequest is not defined"
        }, null)
    }, d.listenedAudioSources = {}, d.audioContext = null, d.listenToAudioSources = function(i) {
        k.info("listenToAudioSources()"), null === d.audioContext && (d.audioContext = new e.AudioContext);
        var n, a = d.audioContext;
        null !== d.session && d.session !== t && navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && void 0 !== a ? null !== d.session.apiCCWebRTCClient && d.session.apiCCWebRTCClient !== t && (Object.keys(d.listenedAudioSources).length > 0 && d.stopAudioSourceListening(), d.session.apiCCWebRTCClient.getMediaDevices(function(e) {
            for (k.log(e), n = 0; n < e.length; n++) "audioinput" === e[n].kind && (d.listenedAudioSources[e[n].deviceId] = {
                deviceId: e[n].deviceId,
                callback: i,
                label: e[n].label
            }, navigator.getUserMedia({
                audio: {
                    optional: [{
                        sourceId: e[n].deviceId
                    }]
                },
                video: !1
            }, function(e) {
                k.log("new stream processing function for : " + this.device.deviceId), this.device.audioListener = this;
                var t = this,
                    i = a.createScriptProcessor(2048, 1, 1),
                    n = a.createMediaStreamSource(e);
                i.connect(a.destination), i.onaudioprocess = function() {
                    var i, n, a, s = new Uint8Array(this.analyser.frequencyBinCount),
                        o = 0;
                    for (this.analyser.getByteFrequencyData(s), n = 0; n < s.length; n++) o += s[n];
                    i = o / s.length, a = {
                        deviceId: t.device.deviceId,
                        label: t.device.label,
                        amplitude: i,
                        active: e.active
                    }, t.device.callback(a)
                }, i.analyser = a.createAnalyser(), i.analyser.smoothingTimeConstant = .3, i.analyser.fftSize = 1024, n.connect(i.analyser), i.analyser.connect(i), this.destroy = function() {
                    k.log("destroy()");
                    var t, a = e.getTracks();
                    for (t = 0; t < a.length; t += 1) a[t].stop();
                    n.disconnect(), i.analyser.disconnect(), i.disconnect()
                }
            }.bind({
                device: d.listenedAudioSources[e[n].deviceId]
            }), function(e) {
                k.error("Error getting microphone", e)
            }))
        })) : k.error("listenToAudioSources() - Unable to create audio context")
    }, d.stopAudioSourceListening = function() {
        k.info("stopAudioSourceListening()");
        var e;
        for (e = 0; e < Object.keys(d.listenedAudioSources).length; e++) d.listenedAudioSources[Object.keys(d.listenedAudioSources)[e]].audioListener.destroy();
        d.listenedAudioSources = {}
    }, e.onbeforeunload = function() {
        k.log("User has refreshed or left the page");
        try {
            if ("undefined" != typeof mailClicked && null !== mailClicked && (k.log("mailClicked variable is defined"), !0 === mailClicked)) return k.log("mailClicked is true : leaving onbeforeunload"), void(mailClicked = !1)
        } catch (e) {
            k.log("Catch error on PATCH/WORKAROUND to avoid reload of page in chrome when mailto :" + e)
        }
        null !== d && (d.cleanApiRTCContext(), d.disconnect());
        var e = 0,
            t = 0;
        if (null !== d && (e = d.myEventTable.length), 0 !== e) {
            for (k.trace("number of myEventTable:" + e), t = 0; t < e; t += 1) d.removeEventListener(d.myEventTable[t].type, d.myEventTable[t].listener);
            this.apiCC.myEventTable.splice(0, e), e = d.myEventTable.length, k.trace("number of myEventTable after splice:" + e), d.myEventTable = null
        }
        null !== d && (d.session = null), r = null, c = null, h = null, u = null, C = null, p = null, g = null, null !== d && (d.ApiCCSession = null, d.ApiCCIMClient = null, d = null)
    }, h = function(i) {
        this.channelReady = !1, this.socket = null, this.channelId = i.apiCCId, this.callURLDestRoom = 0, this.myWebRTC_Event = new r, this.channelHasBeenDisconnected = !1, this.cSeq = 0, this.initialize = function() {
            k.info("ApiCC_Channel::initialize()"), this.openChannel()
        }, this.getNewCSeq = function() {
            return this.cSeq = this.cSeq + 1, this.cSeq
        }, this.openChannel = function() {
            console.log('MDH: openChannel');
            var n = "",
                a = null,
                s = null,
                o = null,
                l = null,
                r = null,
                c = null,
                h = null,
                u = null;
            k.log("openChannel channelId :" + this.channelId),
            k.log("session.apiKey :" + i.apiKey),
            k.log("session.sessionId :" + i.sessionId),
            i.xhrPolling = !0,
            k.log("CCSserver used : " + i.ccsServer),
            l = i.appId !== t ? "&appId=" + i.appId : "",
            r = i.siteId !== t ? "&siteId=" + i.siteId : "",
            i.userData !== t && (k.log("Defined userData : ", i.userData), a = JSON.stringify(i.userData), k.log("stringUserData.length :" + a.length), a.length <= 1e3 ? n = "&userData=" + encodeURIComponent(a) : k.warn("userData length is too long :" + a.length + " .Need to be <= 500")),
            i.presenceGroup !== t && (
              k.log("Defined presenceGroup : " + i.presenceGroup), s = JSON.stringify(i.presenceGroup), k.log("stringPresenceGroup.length :" + s.length), s.length <= 500 ? n += "&presenceGroup=" + encodeURIComponent(s) : k.warn("presenceGroup length is too long :" + s.length + " .Need to be <= 500")
            ),
            i.subscribeToPresenceGroup !== t && (
              k.log("Defined subscribeToPresenceGroup : " + i.subscribeToPresenceGroup), o = JSON.stringify(i.subscribeToPresenceGroup), k.log("stringsubscribeToPresenceGroup.length :" + o.length), o.length <= 500 ? n += "&subscribeToPresenceGroup=" + encodeURIComponent(o) : k.warn("subscribeToPresenceGroup length is too long :" + o.length + " .Need to be <= 500")
            ),
            i.token !== t && (k.log("Defined token : " + i.token), n += "&token=" + i.token),
            k.log("requestOptions on connect :" + n),
            k.log("session.ccsServer :" + i.ccsServer),
            -1 !== i.ccsServer.indexOf(":")
              ? (k.log("Port is also set in ccsServer definition"), u = i.ccsServer.split(":"), k.log("res[0] : " + u[0]), k.log("res[1] : " + u[1]), u[0])
              : (k.log("No port in ccsServer definition"), i.ccsServer),
              c = "?channelId=" + this.channelId + "&apiKey=" + i.apiKey + "&apiVersion=" + d.version + "&sessionId=" + i.sessionId + l + r + n, h = null,
              h = "undefined" != typeof apiRTC_React
                ? "https"
                : "https:" == e.location.protocol
                  ? "https"
                  : "http",
            "iOS" !== I.name && "Android" !== I.name || (k.log(I.name + " detected forcing protocol to https"), h = "https"), k.log("use new ccs, socket url is : " + h + "://" + i.ccsServer + "/" + c),
            this.socket = rtcio.connect(h + "://" + i.ccsServer + "/" + c,
            {
                forceNew: !0,
                multiplex: !1
            }),
            console.log('MDH: socket callback parameters'),
            this.socket
            .on("connect", this.callback(this, "onChannelOpened"))
            .on("message", this.callbackWithParams(this, "onChannelMessage"))
            .on("error", this.callback(this, "onChannelError"))
            .on("bye", this.callback(this, "onChannelBye"))
            .on("close", this.callback(this, "onChannelClosed"))
            .on("connecting", this.callback(this, "onChannelConnecting"))
            .on("disconnect", this.callback(this, "onChannelDisconnect"))
            .on("connect_failed", this.callback(this, "onChannelConnect_failed"))
            .on("reconnect_failed", this.callback(this, "onChannelReconnect_failed"))
            .on("reconnect", this.callback(this, "onChannelReconnect"))
            .on("reconnecting", this.callback(this, "onChannelReconnecting"))
        }, this.onChannelConnecting = function() {
            k.info("onChannelConnecting"), this.myWebRTC_Event.createChannelEvent("onChannelConnecting")
        }, this.onWhiteBoardDisconnection = function() {
            k.info("onWhiteBoardDisconnection"), d.session.closeWhiteBoardClient("NETWORK_DISCONNECTION")
        }, this.onChannelDisconnect = function() {
            k.info("onChannelDisconnect");
            var e = Date();
            k.debug("date :" + e), e = null, d.session.connectedUsersList.splice(0, d.session.connectedUsersList.length), this.myWebRTC_Event.createChannelEvent("onChannelDisconnect"), this.channelHasBeenDisconnected = !0, null !== d.session.apiCCWhiteBoardClient && (k.log("apiCC.session.apiCCWhiteBoardClient.roomId :" + d.session.apiCCWhiteBoardClient.roomId), null !== d.session.apiCCWhiteBoardClient.roomId ? (k.log("Disconnection with an ongoing whiteboard"), d.session.apiCCWhiteBoardClient.whiteBoardDisconnectionTimeoutId = setTimeout(this.callback(this, "onWhiteBoardDisconnection"), d.session.apiCCWhiteBoardClient.disconnectionTimer)) : k.log("Disconnection without an ongoing whiteboard"))
        }, this.onChannelConnect_failed = function() {
            k.info("onChannelConnect_failed"), this.myWebRTC_Event.createChannelEvent("onChannelConnect_failed")
        }, this.onChannelReconnect_failed = function() {
            k.info("onChannelReconnect_failed"), this.myWebRTC_Event.createChannelEvent("onChannelReconnect_failed")
        }, this.onChannelReconnect = function(e) {
            k.info("onChannelReconnect", e);
            var i = null,
                n = 0,
                a = 0,
                s = [],
                o = null,
                l = null,
                r = null,
                c = !1,
                h = 0,
                u = null;
            if (null !== d.session.apiCCIMClient ? !0 === d.session.apiCCIMClient.userDataSetted ? (i = {
                    photoURL: d.session.apiCCIMClient.photoURL
                }, d.session.apiCCIMClient.setUserData(i)) : k.log("apiCC.session.apiCCIMClient.userDataSetted !== true") : k.log("apiCC.session.apiCCIMClient === null"), null !== d.session.apiCCWebRTCClient)
                if (0 !== (n = d.session.apiCCWebRTCClient.webRTCClient.callsTable.length)) {
                    for (k.log("Reconnecting with calls ongoing"), a = 0; a < n; a += 1) null !== d.session.apiCCWebRTCClient.webRTCClient.callsTable[a] && d.session.apiCCWebRTCClient.webRTCClient.callsTable[a] !== t ? (d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].callId, u = d.session.apiCCWebRTCClient.webRTCClient.callsTable[a], k.debug("call.iceState =", u.iceState), null !== u.data ? "publish" !== u.data.type && "subscribe" !== u.data.type ? (k.log("Call is P2P, updating media"), u.updateMedia(!0), o = {
                        destId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].remoteId,
                        convId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].callId,
                        callType: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].callType,
                        roomId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].dest_roomId
                    }, s.push(o)) : k.log("Call is in an MCU session") : (k.log("Call is P2P, updating media"), u.updateMedia(!0), o = {
                        destId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].remoteId,
                        convId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].callId,
                        callType: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].callType,
                        roomId: d.session.apiCCWebRTCClient.webRTCClient.callsTable[a].dest_roomId
                    }, s.push(o))) : k.log("call no more exist");
                    c = !0
                } else k.log("Reconnecting without calls ongoing");
            null !== d.session.apiCCWhiteBoardClient && (0 !== d.session.apiCCWhiteBoardClient.whiteBoardDisconnectionTimeoutId && (k.debug("clearing whiteBoardDisconnectionTimeoutId"), clearTimeout(d.session.apiCCWhiteBoardClient.whiteBoardDisconnectionTimeoutId), d.session.apiCCWhiteBoardClient.whiteBoardDisconnectionTimeoutId = 0), k.log("apiCC.session.apiCCWhiteBoardClient.roomId :" + d.session.apiCCWhiteBoardClient.roomId), null !== d.session.apiCCWhiteBoardClient.roomId ? (k.log("Reconnectiong with an ongoing whiteboard"), h = d.session.apiCCWhiteBoardClient.roomId, c = !0) : k.log("Reconnecting without an ongoing whiteboard")), !0 === c && (k.log("Sending reconnectContext to CCS"), l = {
                type: "reconnectContext",
                callList: s,
                whiteBoardRoomId: h
            }, r = JSON.stringify(l), k.log("C->S: " + r), d.session.channel.socket.emit("reconnectContext", r)), s.splice(0, s.length), this.myWebRTC_Event.createChannelEvent("onChannelReconnect")
        }, this.onChannelReconnecting = function(e) {
            console.log('MDH: reconnecting');
            k.info("onChannelReconnecting", e);
            var t = Date();
            k.debug("date :" + t), t = null,
            console.log('MDH: calling this.myWebRTC_Event.createChannelEvent("onChannelReconnecting")');
            this.myWebRTC_Event.createChannelEvent("onChannelReconnecting")
        }, this.onChannelOpened = function() {
            k.info("Channel opened"), k.log("this.channelId :" + this.channelId), this.channelReady = !0, !1 === this.channelHasBeenDisconnected ? i.onChannelOpened() : (k.log("onChannelOpened after a disconnection, no change on session"), this.channelHasBeenDisconnected = !1, !1 !== i.ApiDBActivated && i.ApiDBActivated !== t && null !== i.ApiDBActivated && (k.log("apiDB initialisation"), apiDB.init(i.channel.socket)), i.updateUserDataToBeDone = !0), this.myWebRTC_Event.createChannelEvent("onChannelOpened")
        }, this.onChannelMessage = function(e, n) {
            k.log("onChannelMessage S->C: " + e);
            var a = JSON.parse(e),
                s = null;
            "IMMessage" === a.type && (k.log("IMMessage convId :" + a.IMId), s = a.IMId), n !== t && (k.trace("ack on message reception"), k.trace("convId :" + s), n({
                reason: "ack",
                convId: s
            })), i.processSignalingMessage(a)
        }, this.onChannelError = function(e) {
            k.error("Channel error :", e), this.myWebRTC_Event.createChannelEvent("onChannelError")
        }, this.onChannelClosed = function() {
            k.info("Channel closed."), this.myWebRTC_Event.createChannelEvent("onChannelClosed")
        }, this.onChannelBye = function(e) {
            var t = JSON.parse(e);
            k.log("bye message from:" + t.clientId + " for call Id" + t.callId), t = null
        }, this.callback = function(e, t) {
            return this.closureHandler = function(i) {
                return e[t](i)
            }, this.closureHandler
        }, this.callbackWithParams = function(e, t) {
            return this.closureHandler = function(i, n, a) {
                return e[t](i, n, a)
            }, this.closureHandler
        }
    }, u = function(e) {
        this.sendInvite = function(i, n, a, s, o, l, r, c, d) {
            k.info("WebRTC_Stack::sendInvite()");
            var h = null,
                u = null,
                C = null;
            r !== t && null !== r || (r = "media"), null === d && (d = t), ("IE" === f || "Safari" === f && T < 11) && (k.log("JSON.stringify(offer.sdp) :" + JSON.stringify(l.sdp)), k.log("JSON.stringify(offer.type) :" + JSON.stringify(l.type)), (C = {}).sdp = l.sdp, C.type = l.type, l = C), null !== c ? (k.log("call data is defined :" + c), h = {
                type: "invite",
                callId: i,
                callerId: n,
                callerNickname: a,
                calleeId: s,
                roomId: o,
                sdpoffer: l,
                callType: r,
                data: c,
                stream: d
            }) : (k.log("call data is undefined"), h = {
                type: "invite",
                callId: i,
                callerId: n,
                callerNickname: a,
                calleeId: s,
                roomId: o,
                sdpoffer: l,
                callType: r
            }), u = JSON.stringify(h), k.log("C->S: " + u), e.emit("invite", u)
        }, this.sendInviteBroadcast = function(t, i, n, a, s, o) {
            k.info("WebRTC_Stack::sendInviteBroadcast()");
            var l = null,
                r = null;
            l = {
                type: "invite",
                callId: t,
                callerId: i,
                callerNickname: n,
                calleeId: a,
                roomId: s,
                sdpoffer: o
            }, r = JSON.stringify(l), k.log("C->S: " + r), e.emit("invite_broadcast", r)
        }, this.send200OK = function(t, i, n, a, s, o, l) {
            k.info("WebRTC_Stack::send200OK()");
            var r = null,
                c = null,
                d = null;
            ("IE" === f || "Safari" === f && T < 11) && (k.log("JSON.stringify(offer.sdp) :" + JSON.stringify(o.sdp)), k.log("JSON.stringify(offer.type) :" + JSON.stringify(o.type)), (d = {}).sdp = o.sdp, d.type = o.type, o = d), r = {
                type: "200OK",
                callId: t,
                callerId: i,
                calleeId: n,
                calleeNickname: a,
                roomId: s,
                sdpanswer: o,
                data: l
            }, c = JSON.stringify(r), k.log("C->S: " + c), e.emit("200OK", c)
        }, this.sendCandidate = function(t, i, n, a, s, o, l, r, c, d) {
            var h = null,
                u = null;
            k.info("completeCandidate :", d), null !== c && "IE" !== f ? (k.log("call data is defined :", c), h = {
                type: "candidate",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                label: o,
                id: l,
                candidate: r,
                data: c,
                completeCandidate: d
            }) : (k.log("call data is undefined or browser is IE"), "IE" === f && k.log("Browser is IE, cannot send completeCandidate"), h = {
                type: "candidate",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                label: o,
                id: l,
                candidate: r
            }), u = JSON.stringify(h), k.log("C->S: " + u), e.emit("candidate", u)
        }, this.sendBye = function(t, i, n, a, s, o) {
            k.info("WebRTC_Stack::sendBye()");
            var l = null,
                r = null;
            null !== o ? (k.log("call data is defined :" + o), l = {
                type: "bye",
                callId: t,
                clientId: i,
                roomId: n,
                dst: a,
                reason: s,
                data: o
            }) : (k.log("call data is undefined"), l = {
                type: "bye",
                callId: t,
                clientId: i,
                roomId: n,
                dst: a,
                reason: s
            }), r = JSON.stringify(l), k.log("C->S: " + r), e.emit("bye", r)
        }, this.sendUpdate = function(t, i, n, a, s, o, l) {
            k.info("WebRTC_Stack::sendUpdate()");
            var r = null,
                c = null;
            null !== l ? (k.log("call data is defined :" + l), r = {
                type: "update",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                sdpoffer: o,
                data: l
            }) : (k.log("call data is undefined"), r = {
                type: "update",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                sdpoffer: o
            }), c = JSON.stringify(r), k.log("C->S: " + c), e.emit("update", c)
        }, this.send200Update = function(t, i, n, a, s, o, l) {
            k.info("WebRTC_Stack::send200Update()");
            var r = null,
                c = null;
            null !== l ? (k.log("call data is defined :" + l), r = {
                type: "200update",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                sdpanswer: o,
                data: l
            }) : (k.log("call data is undefined"), r = {
                type: "200update",
                callId: t,
                callerId: i,
                calleeId: n,
                roomId: a,
                dst: s,
                sdpanswer: o
            }), c = JSON.stringify(r), k.log("C->S: " + c), e.emit("200update", c)
        }, this.sendDebugCommand = function(t, i, n) {
            k.info("WebRTC_Stack::sendDebugCommand :" + t);
            var a = null,
                s = null;
            a = {
                type: "debugCommand",
                command: t,
                apiKey: i,
                clientId: n
            }, s = JSON.stringify(a), k.log("C->S: " + s), e.emit("debugCommand", s)
        }, this.sendAck = function(t, i, n) {
            k.info("WebRTC_Stack::sendAck()");
            var a = null,
                s = null;
            a = {
                type: "Ack",
                AckMessageType: t,
                cSeq: i,
                dst: n
            }, s = JSON.stringify(a), k.log("C->S: " + s), e.emit("Ack", s)
        }, this.sendInfo = function(t, i) {
            k.info("WebRTC_Stack::sendInfo()");
            var n = null,
                a = null;
            n = {
                type: "info",
                infoType: t,
                data: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.emit("info", a)
        }
    }, C = function() {
        k.info("WebRTC_Adapter"), "undefined" == typeof apiRTC_React && (k.log("adapter.browserDetails.browser :", adapter.browserDetails.browser), k.log("adapter.browserDetails.version :", adapter.browserDetails.version), this.webrtcDetectedBrowser = adapter.browserDetails.browser, this.webrtcDetectedVersion = adapter.browserDetails.version), "undefined" != typeof RTCSessionDescription ? this.RTCSessionDescription = RTCSessionDescription : k.log("RTCSessionDescription is undefined"), "undefined" != typeof RTCIceCandidate ? this.RTCIceCandidate = RTCIceCandidate : k.log("RTCIceCandidate is undefined"), "iOS" === I.name ? (k.log("WebRTC_Adapter iOS"), this.RTCPeerConnection = e.RTCPeerConnection, this.getUserMedia = navigator.getUserMedia, this.attachMediaStream = function(e, t) {
            k.info("attachMediaStream for iOS"), void 0 !== e.srcObject ? e.srcObject = t : void 0 !== e.mozSrcObject ? e.mozSrcObject = t : void 0 !== e.src ? e.src = URL.createObjectURL(t) : k.error("Error attaching stream to element.")
        }) : ("undefined" != typeof RTCPeerConnection ? this.RTCPeerConnection = RTCPeerConnection : k.log("RTCPeerConnection is undefined"), void 0 !== navigator.getUserMedia ? this.getUserMedia = navigator.getUserMedia : "undefined" != typeof getUserMedia ? this.getUserMedia = getUserMedia : k.log("getUserMedia is undefined"))
    }, R = function(e, i) {
        k.info("ApiCCMCUClient creation"), this.pubConnector = "groupKurentoConnector", this.sessionMCU = null, this.streamList = [], this.publishCallId = null, this.receiveSessionId = function(e) {
            k.info("ApiMCU::receiveSessionId()"), c.createMCUSessionCreationEvent(e.sessionId, e.token), this.publish(e.sessionId, e.token)
        }, this.sendSessionInvitation = function(e, n, a) {
            if (k.info("ApiMCU::sendSessionInvitation()"), null !== n && n !== t) {
                var s = null,
                    o = null;
                a === t && (a = 0), s = {
                    type: "MCUSessionInvitation",
                    srcId: i,
                    destId: e,
                    sessionId: n,
                    groupChatId: a
                }, o = JSON.stringify(s), k.log("C->S: " + o), d.session.channel.socket.emit("MCUSessionInvitation", o)
            } else k.log("Session is null or undefined, MCU Session invitation is not sended")
        }, this.sendSessionInvitationToGroupChat = function(e, n) {
            if (k.info("ApiMCU::sendSessionInvitationToGroupChat()"), null !== e && e !== t)
                if (null !== n && n !== t) {
                    var a = null,
                        s = null;
                    a = {
                        type: "MCUSessionInvitationToGroupChat",
                        srcId: i,
                        groupChatId: e,
                        sessionId: n
                    }, s = JSON.stringify(a), k.log("C->S: " + s), d.session.channel.socket.emit("MCUSessionInvitationToGroupChat", s)
                } else k.log("Session is null or undefined, MCU Session invitation is not sended");
            else k.log("groupChatId is null or undefined, MCU Session invitation is not sended")
        }, this.receiveSessionInvitation = function(e) {
            k.info("ApiMCU::receiveSessionInvitation()"), k.log("msg.sessionId :" + e.sessionId), k.log("msg.token :" + e.token), k.log("msg.groupChatId :" + e.groupChatId), c.createReceiveMCUSessionInvitationEvent(e.sessionId, e.token, e.groupChatId, e.srcId)
        }, this.acceptSessionInvitation = function(e, t) {
            k.info("ApiMCU::acceptSessionInvitation()"), k.log("sessionId :" + e), k.log("token :" + t), this.publish(e, t)
        }, this.leaveSession = function() {
            k.info("ApiMCU::leaveSession()"), k.log("this.sessionMCU :" + this.sessionMCU);
            var e = [],
                t = null,
                i = null;
            null !== this.sessionMCU && (d.session.apiCCWebRTCClient.webRTCClient.removeAllCallsFromRoom(this.sessionMCU.roomName, "leaveSession"), e.push(this.sessionMCU.roomName), d.session.sendPresenceGroupManagementCommand("leave", e), d.session.sendPresenceGroupManagementCommand("unsubscribe", e), t = {
                type: "leaveSession",
                roomId: this.sessionMCU.roomName,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                data: {
                    pubSub: this.pubConnector
                }
            }, i = JSON.stringify(t), k.log("C->S: " + i), d.session.channel.socket.emit("leaveSession", i), this.sessionMCU = null)
        }, this.joinSession = function(e) {
            var t = null,
                i = null;
            k.info("ApiMCU::joinSession() on Apizee MCU with roomId :", e), t = {
                type: "joinSession",
                roomId: e,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                data: {
                    pubSub: this.pubConnector
                }
            }, i = JSON.stringify(t), k.log("C->S: " + i), d.session.channel.socket.emit("joinSession", i)
        }, this.joinSessionAnswer = function(e) {
            k.log("ApiMCU::joinSessionAnswer()"), this.sessionMCU = {}, this.sessionMCU.roomID = e.sessionId, this.sessionMCU.roomName = e.roomName;
            var t = [];
            t.push(e.roomName), d.session.sendPresenceGroupManagementCommand("join", t), d.session.sendPresenceGroupManagementCommand("subscribe", t), c.createJoinMCUSessionAnswerEvent(e.sessionId, e.token, e.groupChatId, e.initiator, e.roomName)
        }, this.getStreamList = function() {
            return k.info("ApiMCU::getStreamList :", this.streamList), this.streamList
        }, this.getStreamFromList = function(e) {
            k.info("ApiMCU::getStreamFromList() with Id :", e);
            var t = 0;
            for (k.log("this.streamList :", this.streamList), t = 0; t < this.streamList.length; t += 1) {
                if (this.streamList[t].streamInfo.id === e) return k.log("stream found", this.streamList[t].streamInfo), this.streamList[t].streamInfo;
                k.log("not the same stream", e)
            }
            return null
        }, this.getStreamIdOfUser = function(e) {
            k.info("ApiMCU::getStreamIdOfUser() with Id :", e);
            var t = 0;
            for (k.log("this.streamList :", this.streamList), t = 0; t < this.streamList.length; t += 1) {
                if (this.streamList[t].userId === e) return k.log("stream found", this.streamList[t].streamInfo), this.streamList[t].streamInfo.id;
                k.log("not the same userId", e)
            }
            return null
        }, this.newAvailableStream = function(e) {
            k.info("ApiMCU::newAvailableStream() :", e);
            var t = !1,
                n = 0,
                a = null;
            for (t = e[0].attributes.callerId !== i, n = 0; n < e.length; n += 1) a = {
                userId: e[n].attributes.callerId,
                roomId: this.sessionMCU.roomID,
                isRemoteStream: t,
                streamInfo: e[n]
            }, this.streamList.push(a), k.log("this.streamList :", this.streamList);
            return t
        }, this.subscribeToStreams = function(e, i, n) {
            k.info("ApiMCU::subscribeToStreams():", e);
            var a, s = [],
                o = null,
                l = null,
                r = null,
                c = null;
            for (l in e) a = e[l], null === (o = d.session.apiCCWebRTCClient.webRTCClient.findCallWithStreamId(a.id)) ? (k.info("call does not exist"), k.info("stream: " + a), "COMPOSITE" !== a.attributes.callType && "janusConnector" === this.pubConnector ? ((o = new p(d.session.apiCCWebRTCClient.webRTCClient)).settingUpMode = "passive", o.generateCallId(), o.callerId = this.sessionMCU.roomName, o.calleeId = d.session.apiCCWebRTCClient.webRTCClient.clientId, o.callee = !0, o.mcuRemoteStream = a, o.dest_roomId = this.sessionMCU.roomName, o.callType = a.attributes.callType, o.remoteId = a.attributes.callerId, o.remoteMailAddress = a.attributes.mailAddress, o.streamId = a.id, o.mediaType = i, k.log("call.streamId: " + o.streamId), n === t && (n = {}), o.data = n, o.data.pubSub = "janusConnector", o.data.type = "subscribe", o.data.mode = "passive", d.session.apiCCWebRTCClient.webRTCClient.callsTable.push(o), s[l] = o.callId, (r = {}).type = "invite", r.mode = "passive", r.callId = o.callId, r.callerId = d.session.apiCCWebRTCClient.webRTCClient.clientId, r.callerNickname = d.session.apiCCWebRTCClient.webRTCClient.clientId, r.calleeId = this.sessionMCU.roomName, r.roomId = this.sessionMCU.roomName, r.callType = a.attributes.callType, r.data = o.data, r.stream = a, c = JSON.stringify(r), d.session.apiCCWebRTCClient.webRTCClient.socket.emit("invite", c)) : (o = new p(d.session.apiCCWebRTCClient.webRTCClient), n === t && (n = {}), o.data = n, o.data.pubSub = this.pubConnector, o.data.type = "subscribe", k.log("mediaType: ", i), k.log("stream.attributes.callType: ", a.attributes.callType), o.callType = a.attributes.callType, "audio" == a.attributes.callType || "AUDIOONLY" === i ? (k.log("Setting call as audioOnly"), o.audioOnly = !0, o.stripVideoSDPActivated = !0) : "VIDEOONLY" === i && (o.stripAudioSDPActivated = !0, o.callType = "videoOnly"), o.mcuRemoteStream = a, o.dest_roomId = this.sessionMCU.roomName, o.calleeId = this.sessionMCU.roomName, o.generateCallId(), o.callerId = d.session.apiCCWebRTCClient.webRTCClient.clientId, d.session.apiCCWebRTCClient.webRTCClient.callsTable.push(o), o.createPeerConnection(!0), o.doCall(), o.started = !0, o.callType = a.attributes.callType, o.remoteId = a.attributes.callerId, o.remoteMailAddress = a.attributes.mailAddress, !0 === a.audio ? !0 === a.video ? o.destCallType = "media" : o.destCallType = "audioOnly" : !0 === a.video && (o.destCallType = "videoOnly"), a.id === t && k.log("stream.id is undefined :", a), o.streamId = a.id, o.mediaType = i, k.log("stream.attributes.callType: ", a.attributes.callType), s[l] = o.callId)) : k.info("call already exists");
            return s
        }, this.unsubscribe = function(e) {
            k.info("ApiMCU::unsubscribe() :", e);
            var i = d.session.apiCCWebRTCClient.webRTCClient.findCallWithStreamId(e);
            null === i ? k.log("error call not found on unsubscribe") : i.callId !== t && d.session.apiCCWebRTCClient.webRTCClient.onHangup(i.callId)
        }, this.publish = function(i, n, a, s, o, l) {
            k.log("publish roomName :", i), k.log("publish roomID :", this.sessionMCU.roomID);
            var r = null,
                c = !1;
            if (o === t && (o = {}), !0 !== s && !1 !== s || (k.warn("DEPRECATED ... please use callConfiguration JSON parameter : callConfiguration.audioOnly instead of audioOnly"), c = s), s !== t && (s.audioOnly !== t && (o.callConfiguration !== t ? o.callConfiguration.audioOnly = s.audioOnly : (o.callConfiguration = {}, o.callConfiguration.audioOnly = s.audioOnly)), s.record !== t && (o.callConfiguration !== t ? o.callConfiguration.record = s.record : (o.callConfiguration = {}, o.callConfiguration.record = s.record)), s.private !== t && (o.callConfiguration !== t ? o.callConfiguration.private = s.private : (o.callConfiguration = {}, o.callConfiguration.private = s.private))), k.log("audioOnly :", c), !1 === d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent) {
                if (!1 === d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent) return k.log("publish without any device, leaving publish ..."), o.publishWithoutMediaDeviceDetected = !0, void d.session.setUserData(o);
                !1 !== c && c !== t || (k.log("publish video, but no webcam present, forcing callType to audio"), c = !0)
            }
            return d.session.apiCCWebRTCClient.webRTCClient.callsTable.length, r = new p(d.session.apiCCWebRTCClient.webRTCClient), r.data = o, "restarted" === n && (r.restarted = !0), !0 === c || "true" === c ? (k.log("Setting call as audioOnly"), r.audioOnly = !0, r.stripVideoSDPActivated = !0) : k.log("Not Setting call as audioOnly"), r.dest_roomId = this.sessionMCU.roomName, r.calleeId = this.sessionMCU.roomName, r.data.pubSub = this.pubConnector, r.data.type = "publish", r.callConfiguration = s, "firefox" === d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.webrtcDetectedBrowser ? d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.webrtcDetectedVersion > 43 ? r.mediaConstraints = {
                offerToReceiveAudio: !1,
                offerToReceiveVideo: !1
            } : r.mediaConstraints = {
                mandatory: {
                    OfferToReceiveAudio: !1,
                    OfferToReceiveVideo: !1
                }
            } : r.mediaConstraints = "Edge" === f ? {
                offerToReceiveAudio: 0,
                offerToReceiveVideo: 0
            } : {
                mandatory: {
                    OfferToReceiveAudio: !1,
                    OfferToReceiveVideo: !1
                }
            }, r.generateCallId(), r.callerId = d.session.apiCCWebRTCClient.webRTCClient.clientId, k.log("webRTCClient.accessToLocalMedia :", e.accessToLocalMedia), null !== e.selectedLocalStream && (e.localStream = e.selectedLocalStream), null !== e.localStream ? (k.log("webRTCClient.localStream exist, using it for publishing stream"), k.log("calling onUserMediaSuccessOnCall to fire userMediaSuccess event"), k.log("webRTCClient.localStream.getVideoTracks().length :", e.localStream.getVideoTracks().length), 0 === e.localStream.getVideoTracks().length && (k.log("Setting call as audioOnly"), r.audioOnly = !0), l && l.forceScreenSharingCallType && (r.callType = "screenSharing"), r.onUserMediaSuccessOnCall(e.localStream), r.establishCall()) : r.getUserMediaOnCall(), d.session.apiCCWebRTCClient.webRTCClient.callsTable.push(r), this.publishCallId = r.callId, r.callId
        }, this.publishScreen = function(e, i, n, a) {
            return k.info("ApiMCU::publishScreen()"), i === t && (i = {}), n !== t && (n.record !== t && (i.callConfiguration !== t ? i.callConfiguration.record = n.record : (i.callConfiguration = {}, i.callConfiguration.record = n.record)), n.private !== t && (i.callConfiguration !== t ? i.callConfiguration.private = n.private : (i.callConfiguration = {}, i.callConfiguration.private = n.private))), i.pubSub = this.pubConnector, i.type = "publish", d.session.apiCCWebRTCClient.webRTCClient.shareScreen(this.sessionMCU.roomID, i, a)
        }, this.unpublish = function(e) {
            k.info("ApiMCU::unpublish call with callId :", e), d.session.apiCCWebRTCClient.webRTCClient.onHangup(e), this.publishCallId = null
        }, this.removeMCUStream = function(e, i) {
            var n = 0;
            for (k.log("streamId :", i), n = 0; n < this.streamList.length; n += 1) {
                if (k.log("this.streamList[i].streamInfo.id :", this.streamList[n].streamInfo.id), this.streamList[n].streamInfo.id === i) {
                    k.log("removing stream from streamList :", i), this.streamList.splice(n, 1);
                    break
                }
                k.log("not the same stream", i)
            }
            k.log("this.streamList :", this.streamList), k.log("ApiMCU::removeMCUStream():" + e), e !== t && d.session.apiCCWebRTCClient.webRTCClient.onHangup(e), c.createMCURemovedStreamEvent(i)
        }, this.startStreaming = function(e, i, n, a) {
            k.info("ApiMCU::startStreaming");
            var s = null,
                o = null,
                l = e !== t && null !== e && e.length > 0,
                r = i !== t && null !== i && i.length > 0,
                c = {};
            if ((l || r) && n !== t && null !== n && 0 !== n.length) {
                if (a === t) {
                    if (null === this.publishCallId) return void k.log("Cannot start streaming as no stream is published");
                    a = this.publishCallId
                }
                l || (e = "custom"), c.pubSub = this.pubConnector, c.service = e, r && (c.server = i), c.streamKey = n, k.log("ApiMCU::startStreaming() on Apizee MCU with roomId :", this.sessionMCU.roomID), s = {
                    type: "startStreaming",
                    roomId: this.sessionMCU.roomID,
                    callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                    callId: a,
                    data: c
                }, o = JSON.stringify(s), k.log("C->S: " + o), d.session.channel.socket.emit("startStreaming", o)
            }
        }, this.stopStreaming = function(e) {
            k.info("ApiMCU::stopStreaming");
            var i = null,
                n = null;
            if (e === t) {
                if (null === this.publishCallId) return void k.log("Cannot stop streaming as no stream is published");
                e = this.publishCallId
            }
            k.log("ApiMCU::stopStreaming() on Apizee MCU with roomId :", this.sessionMCU.roomID), i = {
                type: "stopStreaming",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                callId: e,
                data: {
                    pubSub: this.pubConnector
                }
            }, n = JSON.stringify(i), k.log("C->S: " + n), d.session.channel.socket.emit("stopStreaming", n)
        }, this.startRecording = function(e, i, n, a) {
            k.info("ApiMCU::startRecording");
            var s = null,
                o = null;
            if (a === t) {
                if (null === this.publishCallId) return void k.log("Call recording can not start as stream is not published");
                a = this.publishCallId
            }
            "AUDIO-ONLY" !== e && "VIDEO-ONLY" !== e && (e = "AUDIO-VIDEO"), k.log("ApiMCU::startRecording() on Apizee MCU with roomId :", this.sessionMCU.roomID), s = {
                type: "startRecording",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                callId: a,
                data: {
                    pubSub: this.pubConnector
                },
                customIdInFilename: i,
                mediaType: e,
                convId: n
            }, o = JSON.stringify(s), k.log("C->S: " + o), d.session.channel.socket.emit("startRecording", o)
        }, this.stopRecording = function(e) {
            k.info("ApiMCU::stopRecording");
            var i = null,
                n = null;
            if (e === t) {
                if (null === this.publishCallId) return void k.log("Call recording can not stop as stream is not published");
                e = this.publishCallId
            }
            k.log("ApiMCU::stopRecording() on Apizee MCU with roomId :", this.sessionMCU.roomID), i = {
                type: "stopRecording",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                callId: e,
                data: {
                    pubSub: this.pubConnector
                }
            }, n = JSON.stringify(i), k.log("C->S: " + n), d.session.channel.socket.emit("stopRecording", n)
        }, this.recordingStarted = function(e) {
            k.info("ApiMCU::recordingStarted :", e), c.createMCURecordingStartedEvent(e.roomName, e.callId, e.clientId, e.recordType, e.time)
        }, this.recordingStreamAvailable = function(e) {
            k.info("ApiMCU::recordingStreamAvailable :", e), c.createMCURecordedStreamsAvailableEvent(e.roomName, e.callId, e.clientId, e.recordedFileName)
        }, this.streamingStarted = function(e) {
            k.info("ApiMCU::streamingStarted: ", e), c.createMCUStreamingStartedEvent(e.roomName, e.callId, e.clientId, e.time)
        }, this.streamingStopped = function(e) {
            k.info("ApiMCU::streamingStopped: ", e), c.createMCUStreamingStoppedEvent(e.roomName, e.callId, e.clientId, e.time)
        }, this.startComposite = function() {
            var e = null,
                t = null;
            null !== this.sessionMCU ? (k.log("ApiMCU::startComposite() on Apizee MCU with roomId :", this.sessionMCU.roomID), e = {
                type: "startComposite",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                data: {
                    pubSub: this.pubConnector
                }
            }, t = JSON.stringify(e), k.log("C->S: " + t), d.session.channel.socket.emit("startComposite", t)) : k.log("ApiMCU::startComposite() but client is not in session")
        }, this.stopComposite = function() {
            var e = null,
                t = null;
            null !== this.sessionMCU ? (k.log("ApiMCU::stopComposite() on Apizee MCU with roomId :", this.sessionMCU.roomID), e = {
                type: "stopComposite",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                data: {
                    pubSub: this.pubConnector
                }
            }, t = JSON.stringify(e), k.log("C->S: " + t), d.session.channel.socket.emit("stopComposite", t)) : k.log("ApiMCU::stopComposite() but client is not in session")
        }, this.startCompositeRecording = function(e, t, i) {
            k.info("ApiMCU::startCompositeRecording with convId :", i);
            var n = null,
                a = null;
            null !== this.sessionMCU ? ("AUDIO-ONLY" !== e && "VIDEO-ONLY" !== e && (e = "AUDIO-VIDEO"), k.log("ApiMCU::startRecording() on Apizee MCU with roomId :", this.sessionMCU.roomID), n = {
                type: "startRecording",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                callId: "COMPOSITE",
                data: {
                    pubSub: this.pubConnector
                },
                customIdInFilename: t,
                mediaType: e,
                convId: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), d.session.channel.socket.emit("startRecording", a)) : k.log("ApiMCU::startCompositeRecording() but client is not in session")
        }, this.stopCompositeRecording = function() {
            k.info("ApiMCU::stopCompositeRecording");
            var e = null,
                t = null;
            null !== this.sessionMCU ? (k.log("ApiMCU::stopRecording() on Apizee MCU with roomId :", this.sessionMCU.roomID), e = {
                type: "stopRecording",
                roomId: this.sessionMCU.roomID,
                callerId: d.session.apiCCWebRTCClient.webRTCClient.clientId,
                callId: "COMPOSITE",
                data: {
                    pubSub: this.pubConnector
                }
            }, t = JSON.stringify(e), k.log("C->S: " + t), d.session.channel.socket.emit("stopRecording", t)) : k.log("ApiMCU::stopComposite() but client is not in session")
        }, this.callback = function(e, t) {
            return this.closureHandler = function(i) {
                return e[t](i)
            }, this.closureHandler
        }
    }, m = function() {
        function i(e) {
            var t = {},
                i = e.indexOf(" "),
                n = e.substring(i + 1).split("; "),
                a = new RegExp("a=fmtp:(\\d+)"),
                s = e.match(a),
                o = 0,
                l = {},
                r = null;
            if (!s || 2 !== s.length) return null;
            for (t.pt = s[1], o = 0; o < n.length; ++o) 2 === (r = n[o].split("=")).length && (l[r[0]] = r[1]);
            return t.params = l, t
        }
        k.info("SDPManager"), this.getSDPLines = function(e) {
            k.info("SDPManager::getSDPLines");
            var t = e.split("\r\n"),
                i = 0;
            for (i = 0; i < t.length; i += 1) k.log("sdpLines[i] : " + t[i]);
            return t
        }, this.getAudioMediaDescriptionPart = function(e) {
            k.info("SDPManager::getAudioMediaDescriptionPart");
            var i = e.split("m=audio"),
                n = null;
            return i[1] !== t && null !== i[1] ? (n = i[1].split("m=video"), k.log("SDP audio part : " + n[0]), n[0]) : null
        }, this.getVideoMediaDescriptionPart = function(e) {
            k.info("SDPManager::getVideoMediaDescriptionPart");
            var t = e.split("m=video"),
                i = 0;
            for (i = 0; i < t.length; i += 1) k.log("sdpMediaPart[i] : " + t[i]);
            return t[1]
        }, this.searchMediaDescriptionForRecvOnly = function(e) {
            return k.info("searchMediaDescriptionForRecvOnly"), -1 !== e.search("a=recvonly") ? (k.log("recvonly found in media description"), !0) : (k.log("recvonly not found in media description"), !1)
        }, this.searchSDPForRecvOnly = function(e) {
            return e !== t ? (k.log("sdpPart !== undefined"), this.searchMediaDescriptionForRecvOnly(e)) : (k.log("recvonly not found in SDP"), !1)
        }, this.searchMediaDescriptionForSendOnly = function(e) {
            return k.info("searchMediaDescriptionForSendOnly"), -1 !== e.search("a=sendonly") ? (k.log("sendonly found in media description"), !0) : (k.log("sendonly not found in media description"), !1)
        }, this.searchSDPForSendOnly = function(e) {
            return e !== t ? (k.log("sdpPart !== undefined"), this.searchMediaDescriptionForSendOnly(e)) : (k.log("sendonly not found in SDP"), !1)
        }, this.searchMediaDescriptionForInactive = function(e) {
            return k.info("searchMediaDescriptionForInactive"), -1 !== e.search("a=inactive") ? (k.log("inactive found in media description"), !0) : (k.log("inactive not found in media description"), !1)
        }, this.searchSDPForInactive = function(e) {
            return e !== t ? (k.log("sdpPart !== undefined"), this.searchMediaDescriptionForInactive(e)) : (k.log("inactive not found in SDP"), !1)
        }, this.stripAudioMediaDescriptionFromSDP = function(e) {
            k.info("SDPManager::stripAudioMediaDescriptionFromSDP");
            var t = (e = e.replace("a=group:BUNDLE audio video", "a=group:BUNDLE video")).split("m=video"),
                i = 0,
                n = null,
                a = 0;
            for (i = 0; i < t.length; i += 1) k.log("sdpMediaPart[i] : " + t[i]);
            for (n = e.split("m=audio"), a = 0; a < n.length; a += 1) k.log("sdpMediaPart2[j] : " + n[a]);
            return n[0] + "m=video" + t[1]
        }, this.stripVideoMediaDescriptionFromSDP = function(e) {
            k.info("SDPManager::stripVideoMediaDescriptionFromSDP");
            var t = (e = e.replace("a=group:BUNDLE audio video", "a=group:BUNDLE audio")).split("m=video"),
                i = 0;
            for (i = 0; i < t.length; i += 1) k.log("sdpMediaPart[i] : " + t[i]);
            return t[0]
        }, this.setAudioBandwidth = function(e, t) {
            return k.info("SDPManager::setAudioBandwidth", t), t ? e = e.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + t + "\r\n") : (k.warn("No maxAudioBW !"), e)
        }, this.setVideoBandwidth = function(e, t) {
            return k.log("SDPManager::setVideoBandwidth", t), t ? e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + t + "\r\n") : (k.warn("No maxVideoBW !"), e)
        }, this.setDataBandwidth = function(e, t) {
            return k.info("SDPManager::setDataBandwidth", t), t ? e = e.replace(/a=mid:data\r\n/g, "a=mid:data\r\nb=AS:" + t + "\r\n") : (k.warn("No maxDataBW !"), e)
        }, this.setSendOnlyForAudio = function(e) {
            return k.info("SDPManager::setSendOnlyForAudio"), e = e.replace(/a=sendrecv\r\n/, "a=sendonly\r\n")
        }, this.setSendOnlyForVideo = function(e) {
            k.info("SDPManager::setSendOnlyForVideo");
            var t = 0;
            return e = e.replace(/a=sendrecv\r\n/g, function(e) {
                return 2 === ++t ? "a=sendonly\r\n" : e
            })
        }, this.setSendOnly = function(e) {
            return k.info("SDPManager::setSendOnly : global"), e = e.replace(/a=sendrecv\r\n/g, "a=sendonly\r\n")
        }, this.setRecvOnlyForAudio = function(e) {
            return k.info("SDPManager::setRecvOnlyForAudio"), e = e.replace(/a=sendrecv\r\n/, "a=recvonly\r\n"), e = e.replace(/a=sendonly\r\n/, "a=recvonly\r\n")
        }, this.setRecvOnlyForVideo = function(e) {
            k.info("SDPManager::setRecvOnlyForVideo");
            var t = 0;
            return e = e.replace(/a=sendrecv\r\n/g, function(e) {
                return 2 === ++t ? "a=recvonly\r\n" : e
            }), t = 0, e = e.replace(/a=sendonly\r\n/g, function(e) {
                return 2 === ++t ? "a=recvonly\r\n" : e
            })
        }, this.setRecvOnly = function(e) {
            return k.info("SDPManager::setRecvOnly : global"), e = e.replace(/a=sendrecv\r\n/g, "a=recvonly\r\n"), e = e.replace(/a=sendonly\r\n/g, "a=recvonly\r\n")
        }, this.updateSDPcodecs = function(t, i, n, a) {
            var s, o, l, r, c, d, h, u, C = !1,
                p = new RegExp("\r\n$"),
                g = !1,
                m = null,
                f = "",
                v = "",
                T = "",
                I = "",
                b = "",
                S = "",
                R = "",
                y = "";
            if (k.log("updateSDPcodecs():\n\tsdpType = " + i + "\n\tmediaType = " + n + "\n\tavailableCodecSet = " + a + "\n"), "" == a) return t;
            for (l = (l = RTCSessionDescription && t instanceof RTCSessionDescription ? t.sdp : e.SessionDescription && t instanceof SessionDescription ? t.toSdp() : t).split("\r\nm="), !1 === p.test(l[l.length - 2]) && (l[l.length - 2] = l[l.length - 2] + "\r\n", g = !0), s = 0; s < l.length; s++)
                if (0 === l[s].indexOf(n)) {
                    for (m = l[s].split("\r\n")[0].split(" "), o = 3; o < m.length; o++)
                        if (r = !0, !1 === isNaN(m[o])) {
                            switch (f = "", v = "a=rtpmap:" + m[o] + " ", -1 != (c = l[s].indexOf(v)) && (d = l[s].indexOf("\r\n", c)), m[o]) {
                                case 0:
                                    f = "PCMU/8000";
                                    break;
                                case 8:
                                    f = "PCMA/8000";
                                    break;
                                case 9:
                                    f = "G722/8000";
                                    break;
                                case 13:
                                    f = "CN/8000";
                                    break;
                                case 18:
                                    f = "G729/8000";
                                    break;
                                default:
                                    f = -1 != c ? l[s].substring(c + v.length, d) : ""
                            }
                            "" != f && -1 != a.indexOf(f) ? k.log("PT(" + m[o] + "): " + f + " FOUND in availableCodecSet.\n") : (r = !1, k.log("PT(" + m[o] + "): " + f + " NOT FOUND in availableCodecSet.\n")), r || (T = v + ".*\r\n", I = "a=fmtp:" + m[o] + " .*\r\n", b = " " + m[o] + " ", S = " " + m[o] + "\r", l[s] = l[s].replace(new RegExp(T, "g"), ""), l[s] = l[s].replace(new RegExp(I, "g"), ""), (u = (h = l[s].split("\n"))[0].split("RTP"))[1] = u[1].replace(b, " "), u[1] = u[1].replace(S, "\r"), h[0] = u.join("RTP"), l[s] = h.join("\n"), "video" == n && (R = "a=rtcp-fb:" + m[o] + " .*\r\n", l[s] = l[s].replace(new RegExp(R, "g"), ""), "" != f && "rtx/" == f.substr(0, 4) && (y = "a=ssrc-group:FID .*\r\n", l[s] = l[s].replace(new RegExp(y, "g"), ""), (h = l[s].split("\r\na=")).splice(h.length - 8, 4), l[s] = h.join("\r\na="))), C = !0)
                        }
                    break
                }
            return g && (l[l.length - 2] = l[l.length - 2].substr(0, l[l.length - 2].length - 2)), l = l.join("\r\nm="), !0 === C ? (k.log("updateSDPcodecs(), SDP has been updated."), RTCSessionDescription && t instanceof RTCSessionDescription ? new RTCSessionDescription({
                type: i,
                sdp: l
            }) : e.SessionDescription && t instanceof SessionDescription ? new SessionDescription(l) : l) : (k.log("updateSDPcodecs(), SDP has not been updated."), t)
        }, this.preferOpus = function(e) {
            var t = e.split("\r\n"),
                i = 0,
                n = 0,
                a = null;
            for (i = 0; i < t.length; i += 1)
                if (-1 !== t[i].search("m=audio")) {
                    n = i;
                    break
                }
            if (null === n) return e;
            for (i = 0; i < t.length; i += 1)
                if (-1 !== t[i].search("opus/48000")) {
                    (a = this.extractSdp(t[i], /:(\d+) opus\/48000/i)) && (t[n] = this.setDefaultCodec(t[n], a));
                    break
                }
            return t = this.removeCN(t, n), e = t.join("\r\n")
        }, this.removeCN = function(e, t) {
            var i = 0,
                n = e[t].split(" "),
                a = null,
                s = 0;
            for (i = e.length - 1; i >= 0; i--)(a = this.extractSdp(e[i], /a=rtpmap:(\d+) CN\/\d+/i)) && (-1 !== (s = n.indexOf(a)) && n.splice(s, 1), e.splice(i, 1));
            return e[t] = n.join(" "), e
        }, this.extractSdp = function(e, t) {
            var i = e.match(t);
            return i && 2 == i.length ? i[1] : null
        }, this.setDefaultCodec = function(e, t) {
            var i = 0,
                n = e.split(" "),
                a = n.slice(0, 3);
            for (a.push(t), i = 3; i < n.length; i++) n[i] !== t && a.push(n[i]);
            return a.join(" ")
        }, this.findLineInRange = function(e, t, i, n, a) {
            var s = -1 !== i ? i : e.length,
                o = t;
            for (o = t; o < s; ++o)
                if (0 === e[o].indexOf(n) && (!a || -1 !== e[o].toLowerCase().indexOf(a.toLowerCase()))) return o;
            return null
        }, this.findLine = function(e, t, i) {
            return this.findLineInRange(e, 0, -1, t, i)
        }, this.getCodecPayloadType = function(e, t) {
            var i = this.findLine(e, "a=rtpmap", t);
            return i ? this.getCodecPayloadTypeFromLine(e[i]) : null
        }, this.getCodecPayloadTypeFromLine = function(e) {
            var t = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"),
                i = e.match(t);
            return i && 2 === i.length ? i[1] : null
        }, this.findFmtpLine = function(e, t) {
            var i = this.getCodecPayloadType(e, t);
            return i ? this.findLine(e, "a=fmtp:" + i.toString()) : null
        }, this.writeFmtpLine = function(e) {
            if (!e.hasOwnProperty("pt") || !e.hasOwnProperty("params")) return null;
            var t = e.pt,
                i = e.params,
                n = [],
                a = 0,
                s = null;
            for (s in i) n[a] = s + "=" + i[s], ++a;
            return 0 === a ? null : "a=fmtp:" + t.toString() + " " + n.join("; ")
        }, this.setCodecParam = function(e, t, n, a) {
            var s = e.split("\r\n"),
                o = this.findFmtpLine(s, t),
                l = {},
                r = null,
                c = null;
            if (null === o) {
                if (null === (c = this.findLine(s, "a=rtpmap", t))) return e;
                r = this.getCodecPayloadTypeFromLine(s[c]), l.pt = r.toString(), l.params = {}, l.params[n] = a, s.splice(c + 1, 0, this.writeFmtpLine(l))
            } else(l = i(s[o])).params[n] = a, s[o] = this.writeFmtpLine(l);
            return e = s.join("\r\n")
        }, this.maybePreferCodec = function(e, t, i) {
            var n = t + " codec",
                a = null,
                s = null,
                o = null;
            return i ? (k.log("Prefer " + n + ": " + i), a = e.split("\r\n"), null === (s = this.findLine(a, "m=", t)) ? (k.log("mLineIndex === null"), e) : ((o = this.getCodecPayloadType(a, i)) && (a[s] = this.setDefaultCodec(a[s], o)), e = a.join("\r\n"))) : (k.log("No preference on " + n + "."), e)
        }
    }, w = function(e) {
        k.info("RecordManager creation"), this.recordOngoing = !1, this.mediaRecorder = null, this.recordedBlobs = [], this.stopcallback = null, this.record = function(e, i) {
            if (k.info("record"), k.log("stream :" + e), k.log("stream :", e), k.log("duration :" + i), null === this.mediaRecorder || (k.log("this.mediaRecorder.state :" + this.mediaRecorder.state), "recording" !== this.mediaRecorder.state && "paused" !== this.mediaRecorder.state)) {
                var n = {
                    mimeType: "video/webm;codecs=vp9"
                };
                MediaRecorder.isTypeSupported(n.mimeType) || (k.log(n.mimeType + " is not Supported"), n = {
                    mimeType: "video/webm;codecs=vp8"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (k.log(n.mimeType + " is not Supported"), n = {
                    mimeType: "video/webm"
                }, MediaRecorder.isTypeSupported(n.mimeType) || (k.log(n.mimeType + " is not Supported"), n = {
                    mimeType: ""
                })));
                try {
                    this.recordedBlobs = [], this.mediaRecorder = new MediaRecorder(e, n)
                } catch (e) {
                    return void k.error("Exception while creating MediaRecorder: " + e + ". mimeType: " + n.mimeType)
                }
                this.mediaRecorder.onstart = function(e) {
                    k.log("onstart :" + e)
                }, this.mediaRecorder.onstop = function(e) {
                    k.log("onstop :" + e), k.log("Recorded Blobs: ", d.session.apiCCWebRTCClient.webRTCClient.recordMgr.recordedBlobs), d.session.apiCCWebRTCClient.webRTCClient.recordMgr.stopcallback !== t && null !== d.session.apiCCWebRTCClient.webRTCClient.recordMgr.stopcallback && d.session.apiCCWebRTCClient.webRTCClient.recordMgr.stopcallback(d.session.apiCCWebRTCClient.webRTCClient.recordMgr.recordedBlobs), this.onstart = null, this.onstop = null, this.onerror = null, this.onpause = null, this.onresume = null, this.ondataavailable = null
                }, this.mediaRecorder.onerror = function(e) {
                    k.log("onerror :" + e)
                }, this.mediaRecorder.onpause = function(e) {
                    k.log("onpause :" + e)
                }, this.mediaRecorder.onresume = function(e) {
                    k.log("onresume :" + e)
                }, this.mediaRecorder.ondataavailable = function(e) {
                    k.log("ondataavailable :" + e), e.data && e.data.size > 0 && d.session.apiCCWebRTCClient.webRTCClient.recordMgr.recordedBlobs.push(e.data)
                }, this.mediaRecorder.start(10), k.log("MediaRecorder started", this.mediaRecorder)
            } else k.log("mediaRecorder is already ongoing, use stopRecordStream before trying another record")
        }, this.stop = function(e) {
            k.info("stop"), null !== this.mediaRecorder ? (k.log("this.mediaRecorder.state :" + this.mediaRecorder.state), "inactive" !== this.mediaRecorder.state ? (this.stopcallback = e, this.mediaRecorder.stop()) : k.log("mediaRecorder is already inactive")) : k.log("mediaRecorder is not running, use startRecordStream before trying to stop")
        }, this.pause = function(e) {
            k.info("pause"), null !== this.mediaRecorder ? (k.log("this.mediaRecorder.state :" + this.mediaRecorder.state), "paused" !== this.mediaRecorder.state ? "inactive" !== this.mediaRecorder.state ? (this.stopcallback = e, this.mediaRecorder.pause()) : k.log("mediaRecorder is inactive") : k.log("mediaRecorder is already paused")) : k.log("mediaRecorder is not running, use startRecordStream before trying to pause")
        }, this.resume = function(e) {
            k.info("resume"), null !== this.mediaRecorder ? (k.log("this.mediaRecorder.state :" + this.mediaRecorder.state), "recording" !== this.mediaRecorder.state ? "inactive" !== this.mediaRecorder.state ? (this.stopcallback = e, this.mediaRecorder.resume()) : k.log("mediaRecorder is inactive") : k.log("mediaRecorder is already recording")) : k.log("mediaRecorder is not running, use startRecordStream before trying to resume")
        }
    }, E = function(e) {
        this.sendChunkNb = 0, this.send = function(i, n, a) {
            var s = {},
                o = null,
                l = {},
                r = !1,
                d = {};
            if (k.info("DataChannelFileSender send"), k.log("data.name :" + i.name), i.file instanceof Blob ? (k.log("Blob"), this.blob = i.file, this.contentType = i.file.type, this.size = i.file.size, this.originalDataType = "Blob") : i.file instanceof ArrayBuffer ? (k.log("ArrayBuffer"), this.blob = i.file, this.contentType = "application/octet-stream", this.size = i.file.byteLength, this.originalDataType = "ArrayBuffer") : i.file instanceof String || "string" == typeof i.file ? (k.log("string"), this.blob = i.file, this.size = i.file.length, this.contentType = "application/octet-stream", this.originalDataType = "String") : (k.log("unknown type"), this.blob = i.file, this.contentType = "application/octet-stream", this.size = i.file.length || i.file.byteLength || i.file.size, this.originalDataType = "Unknown"), this.contentType || (this.contentType = "application/octet-stream"), 0 === this.size) return k.log("sending done"), a !== t && (k.log("onProgress"), this.transferDuration = new Date - this.startingDate, a({
                sendChunkNb: this.sendChunkNb,
                fileSize: this.fileSize,
                remainingSize: this.size,
                callId: e.callId,
                uuid: i.uuid,
                remoteId: e.remoteId,
                lastPacket: r,
                startingDate: this.startingDate,
                transferDuration: this.transferDuration,
                percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                transferEnded: !0
            })), c.createEvent({
                eventType: "onFileProgress",
                sendChunkNb: this.sendChunkNb,
                fileSize: this.fileSize,
                remainingSize: this.size,
                callId: e.callId,
                uuid: i.uuid,
                remoteId: e.remoteId,
                lastPacket: r,
                startingDate: this.startingDate,
                transferDuration: this.transferDuration,
                percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                transferEnded: !0
            }), void c.createEvent({
                eventType: "onFileSended",
                callId: e.callId,
                remoteId: e.remoteId,
                name: i.name,
                uuid: i.uuid
            });
            if (n)
                if ("open" === n.readyState) {
                    if (0 === this.sendChunkNb && k.log("first packet"), 0 === this.sendChunkNb) {
                        i.uuid = (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "-"), l = {
                            name: i.name,
                            type: i.type,
                            size: this.size,
                            contentType: this.contentType,
                            uuid: i.uuid
                        }, k.log("first packet", l), this.fileSize = this.size, a !== t && (k.log("onProgress"), this.startingDate = new Date, this.transferDuration = 0, a({
                            sendChunkNb: this.sendChunkNb,
                            fileSize: this.fileSize,
                            remainingSize: this.size,
                            callId: e.callId,
                            uuid: i.uuid,
                            remoteId: e.remoteId,
                            lastPacket: r,
                            startingDate: this.startingDate,
                            transferDuration: this.transferDuration,
                            percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                            transferEnded: !1
                        }), c.createEvent({
                            eventType: "onFileProgress",
                            sendChunkNb: this.sendChunkNb,
                            fileSize: this.fileSize,
                            remainingSize: this.size,
                            callId: e.callId,
                            uuid: i.uuid,
                            remoteId: e.remoteId,
                            lastPacket: r,
                            startingDate: this.startingDate,
                            transferDuration: this.transferDuration,
                            percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                            transferEnded: !1
                        }));
                        try {
                            n.send(JSON.stringify(l))
                        } catch (e) {
                            k.warn("error detected when sending on datachannel :", n), k.warn("error is :", e)
                        }
                        c.createEvent({
                            eventType: "onFileSending",
                            callId: e.callId,
                            remoteId: e.remoteId,
                            name: i.name,
                            uuid: i.uuid
                        })
                    } else {
                        12e3 < this.size ? (k.log("sending chunk"), s = this.blob.slice(0, 12e3)) : (k.log("sending last chunk"), s = this.blob.slice(0), r = !0), k.log("dataToSend.byteLength =" + s.byteLength), "ArrayBuffer" === this.originalDataType ? d.message = U.encode(s) : d.message = s, d.messageSize = s.byteLength, d.uuid = i.uuid, d.originalDataType = this.originalDataType, a !== t && (k.log("onProgress"), this.transferDuration = new Date - this.startingDate, a({
                            sendChunkNb: this.sendChunkNb,
                            fileSize: this.fileSize,
                            remainingSize: this.size,
                            callId: e.callId,
                            uuid: i.uuid,
                            remoteId: e.remoteId,
                            startingDate: this.startingDate,
                            lastPacket: r,
                            transferDuration: this.transferDuration,
                            percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                            transferEnded: !1
                        }), c.createEvent({
                            eventType: "onFileProgress",
                            sendChunkNb: this.sendChunkNb,
                            fileSize: this.fileSize,
                            remainingSize: this.size,
                            callId: e.callId,
                            uuid: i.uuid,
                            remoteId: e.remoteId,
                            startingDate: this.startingDate,
                            lastPacket: r,
                            transferDuration: this.transferDuration,
                            percentage: parseInt(100 * (this.fileSize - this.size) / this.fileSize, 10),
                            transferEnded: !1
                        }));
                        try {
                            n.send(JSON.stringify(d))
                        } catch (e) {
                            k.warn("error detected when sending on datachannel :", n), k.warn("error is :", e)
                        }
                    }
                    o = 0 === this.sendChunkNb ? this.blob : this.blob.slice(12e3), !1 === r ? this.sendChunkNb++ : this.sendChunkNb = 0, i.file = o, setTimeout(function() {
                        this.send(i, n, a)
                    }.bind(this), 0)
                } else k.log("Trying to send on a closed channel");
            else k.log("No data channel to send data")
        }
    }, p = function(i) {
        this.dest_roomId = "", this.pc = null, this.callId = 0, this.callee = !1, this.callerId = 0, this.calleeId = 0, this.started = !1, this.localDescriptionSetted = !1, this.remoteDescriptionSetted = !1, this.sendedSdpOfferMessage = null, this.receivedSdpOfferMessage = null, this.myWebRTC_Stack = new u(i.socket), this.myWebRTC_Event = new r, this.incomingcandidatesQueue = [], "firefox" === i.myWebRTC_Adapter.webrtcDetectedBrowser ? i.myWebRTC_Adapter.webrtcDetectedVersion > 43 ? (this.mediaConstraintsAudioOnly = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !1
        }, this.mediaConstraints = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }) : (this.mediaConstraintsAudioOnly = {
            mandatory: {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !1
            }
        }, this.mediaConstraints = {
            mandatory: {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !0
            }
        }) : "Edge" === f ? (this.mediaConstraintsAudioOnly = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !1
        }, this.mediaConstraints = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }) : (this.mediaConstraintsAudioOnly = {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }
        }, this.mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }
        }), "iOS" === I.name && (k.log("Defining mediaConstraints for iOS "), this.mediaConstraints = {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !0
        }), this.trickleIce = i.trickleIce, this.callLocalStream = null, this.generatedLocalStream = !1, this.audioOnly = !1, this.inviteSended = !1, this.message200OKSended = !1, this.send200OKTrickleIceFalseTimeOutId = 0, this.send200OKTrickleIceFalseTimer = 5e3, this.callCancelled = !1, this.screenSharing = !1, this.desktopId = 0, this.pc_config = i.pc_config, this.pc_constraints = i.pc_constraints, this.audioFileMediaElement = null, this.getStatsInterval = i.qosInterval, this.qm = null, this.statisticId = null, this.csmIntervalMs = i.csmIntervalMs, this.csmIntervalId = null, this.remoteId = 0, this.callType = "media", this.disconnectionTimeoutId = 0, this.disconnectionTimer = 4e4, this.disconnectionWarningDelay = 9e3, this.disconnectionWarningInterval = 0, this.disconnectionWarningTimeout = 0, this.disconnectionWarningCount = 0, this.checkCandidateTypesTimer = 1e4, this.checkCandidateTypesTimeoutId = 0, this.checkCandidateTypesTimeoutTable = [], this.data = {}, this.screenStream = null, this.screenIsDisplayed = !1, this.addingDataChannelOnCallOngoing = !1, this.sendDataChannel = null, this.receiveDataChannel = null, this.receiveChunkNb = {}, this.firstDataPacket = {}, this.receivedSize = {}, this.receiveArrayToStoreChunks = {}, this.destCallType = "media", this.mcuRemoteStream = null, this.userMediaAccessRequired = !0, this.settingUpMode = "nominal", this.remoteType = "web", this.mediaTypeForIncomingCall = i.mediaTypeForIncomingCall, this.mediaTypeForOutgoingCall = i.mediaTypeForOutgoingCall, this.mediaRoutingMode = i.mediaRoutingMode, this.stripAudioSDPActivated = !1, this.stripVideoSDPActivated = !1, this.iceState = "notdefined", this.restarted = !1, this.isAudioMuted = !1, this.isVideoMuted = !1, this.isAccepted = !1, this.accessToMedia = !1, this.callConfiguration = null, this.captureSourceType = null, this.preferH264Codec = !1, this.setCallTurnServer = function(e) {
            k.info("setCallTurnServer :", e);
            var t = JSON.stringify(this.pc_config);
            t = t.replace(/mp1.apizee.com/g, e), this.pc_config = JSON.parse(t)
        }, this.setCallMediaRoutingMode = function(e) {
            k.info("setCallMediaRoutingMode :", e), "hostOnly" === e ? this.mediaRoutingMode = i.mediaRoutingModeEnum.hostOnly : "stun" === e ? this.mediaRoutingMode = i.mediaRoutingModeEnum.stun : "stunOnly" === e ? this.mediaRoutingMode = i.mediaRoutingModeEnum.stunOnly : "turn" === e ? this.mediaRoutingMode = i.mediaRoutingModeEnum.turn : "turnOnly" === e ? this.mediaRoutingMode = i.mediaRoutingModeEnum.turnOnly : (k.log("parameter error when calling function : setCallMediaRoutingMode()"), this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setCallMediaRoutingMode()", "PARAMETER_ERROR_SETCALLMEDIAROUTINGMODE"))
        }, this.checkDTLSCompliancy = function() {
            if (k.info("checkDTLSCompliancy"), !1 === d.session.isDeviceDTLSCompliant()) k.log("Device not DTLS compliant, setting DtlsSrtpKeyAgreement: false"), this.pc_constraints = {
                optional: [{
                    DtlsSrtpKeyAgreement: !1
                }]
            };
            else {
                var e = d.session.isClientDTLSCompliant(this.remoteId);
                !1 !== e && "false" !== e || (k.log("Remote Device not DTLS compliant, setting DtlsSrtpKeyAgreement: false"), this.pc_constraints = {
                    optional: [{
                        DtlsSrtpKeyAgreement: !1
                    }]
                })
            }
        }, this.sendData = function(e, t) {
            k.info("datachannel - sendData");
            var i = null,
                n = null;
            if (e.file instanceof File) return k.log("File"), this.contentType = e.file.type, this.originalDataType = "File", i = new FileReader, n = this, i.onload = function(a) {
                var s = a.target.result || i.result;
                n.sendData({
                    file: s,
                    name: e.name,
                    type: e.type
                }, t)
            }, void i.readAsArrayBuffer(e.file);
            new E(this).send(e, this.sendDataChannel, t)
        }, k.log("New Call for client with Id :" + i.clientId), this.generateCallId = function() {
            this.callId = Math.floor(1000001 * Math.random()).toString(), k.info("new call with callId :" + this.callId)
        }, this.send200OkTrickleIceFalse = function() {
            this.myWebRTC_Stack.send200OK(this.callId, this.callerId, this.calleeId, i.nickname, this.dest_roomId, this.pc.localDescription, this.data), this.message200OKSended = !0
        }, this.onSetLocalDescriptionSuccess = function() {
            k.info("onSetLocalDescriptionSuccess"), this.localDescriptionSetted = !0, !1 === this.trickleIce && !0 === this.callee && (k.info("starting send200OKTrickleIceFalseTimeOutId"), this.send200OKTrickleIceFalseTimeOutId = setTimeout(this.callback(this, "send200OkTrickleIceFalse"), this.send200OKTrickleIceFalseTimer))
        }, this.onSetLocalDescriptionFailure = function(e) {
            k.info("onSetLocalDescriptionFailure", e), e = null
        }, this.onSetRemoteDescriptionSuccess = function() {
            k.info("onSetRemoteDescriptionSuccess");
            var e = null;
            for (this.remoteDescriptionSetted = !0; this.incomingcandidatesQueue.length;) e = this.incomingcandidatesQueue.shift(), this.processCandidateMsg(e)
        }, this.processCandidateMsg = function(e) {
            k.info("processCandidateMsg");
            var n = null;
            null !== this.pc ? (e.completeCandidate !== t ? (k.trace("new behavior of 2.13.8"), n = new i.myWebRTC_Adapter.RTCIceCandidate(e.completeCandidate)) : (k.log("old behavior < 2.13.8"), n = new i.myWebRTC_Adapter.RTCIceCandidate({
                sdpMLineIndex: e.label,
                candidate: e.candidate
            })), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("addIceCandidate"), this.pc.addIceCandidate(n, function() {
                k.trace("addIceCandidate success")
            }, function(e) {
                k.warn("addIceCandidate failure: " + e), e = null
            })) : (k.log("addIceCandidate - Promise version"), this.pc.addIceCandidate(n).then(function() {
                k.trace("addIceCandidate success")
            }).catch(function(e) {
                k.warn("addIceCandidate failure: " + e), e = null
            }))) : k.error("Error, call is not null but pc is null")
        }, this.onSetRemoteDescriptionFailure = function(e) {
            k.info("onSetRemoteDescriptionFailure :", e), e = null
        }, this.getUserMediaOnCall = function() {
            if (k.info("getUserMediaOnCall, audio Only :" + this.audioOnly), k.info("getUserMediaOnCall, screenSharing activated :" + this.screenSharing), k.log("webRTCClient.gum_config :", i.gum_config), this.callerId === i.clientId) {
                if (k.log("outgoing call"), "VIDEO" === this.mediaTypeForOutgoingCall || "VIDEOONLY" === this.mediaTypeForOutgoingCall)
                    if (k.log("mediaTypeForOutgoingCall :" + this.mediaTypeForOutgoingCall), !0 !== this.screenSharing) {
                        if (!1 === i.videoDevicePresent) {
                            if (!1 === i.audioDevicePresent) return k.log("getUserMediaOnCall without any device, calling without device"), void this.onUserMediaSuccessOnCall();
                            k.log("video is not present :" + this.callType), "media" === this.callType && (k.log("callType is media, but no webcam present, forcing callType to audio"), this.callType = "audio", this.audioOnly = !0)
                        }
                    } else k.log("screenSharing, no device checking");
                else if ("AUDIO" === this.mediaTypeForOutgoingCall) k.log("mediaTypeForOutgoingCall is AUDIO, setting call to audioOnly"), this.callType = "audio", this.audioOnly = !0;
                else if ("NONE" === this.mediaTypeForOutgoingCall) return k.log("mediaTypeForOutgoingCall is NONE, call will be recvOnly"), void this.onUserMediaSuccessOnCall()
            } else if (k.log("incoming call"), "VIDEO" === this.mediaTypeForIncomingCall || "VIDEOONLY" === this.mediaTypeForIncomingCall) {
                if (k.log("mediaTypeForIncomingCall :" + this.mediaTypeForIncomingCall), null !== i.selectedLocalStream) return k.log("getUserMediaOnCall using pre selected stream"), void this.onUserMediaSuccessOnCall(i.selectedLocalStream);
                if (!1 === i.videoDevicePresent) {
                    if (!1 === i.audioDevicePresent) return k.log("getUserMediaOnCall without any device, calling without device"), void this.onUserMediaSuccessOnCall();
                    k.log("video is not present :" + this.callType), "media" === this.callType && (k.log("callType is media, but no webcam present, forcing callType to audio"), this.callType = "audio", this.audioOnly = !0)
                }
            } else if ("AUDIO" === this.mediaTypeForIncomingCall) k.log("mediaTypeForIncomingCall is AUDIO, setting call to audioOnly"), this.callType = "audio", this.audioOnly = !0;
            else if ("NONE" === this.mediaTypeForIncomingCall) return k.log("mediaTypeForIncomingCall is NONE, call will be recvOnly"), void this.onUserMediaSuccessOnCall();
            i.getUserMediaOnGoing = !0;
            var e = null,
                n = null;
            k.log("webrtcDetectedVersion :" + i.myWebRTC_Adapter.webrtcDetectedVersion), k.log("this.screenSharing :" + this.screenSharing), k.log("this.audioOnly :" + this.audioOnly);
            try {
                if (!0 === this.screenSharing)
                    if (k.log("getScreenMedia"), "Chrome" === f) k.log("this.desktopId :" + this.desktopId), navigator.webkitGetUserMedia({
                        audio: {
                            mandatory: {
                                chromeMediaSource: "system",
                                chromeMediaSourceId: this.desktopId
                            }
                        },
                        video: {
                            mandatory: {
                                chromeMediaSource: "desktop",
                                chromeMediaSourceId: this.desktopId
                            }
                        }
                    }, this.callback(this, "onUserMediaSuccessOnCall"), this.callback(this, "onUserMediaErrorOnCall"));
                    else {
                        if (k.log("this.captureSourceType :" + this.captureSourceType), "screen" !== this.captureSourceType && "window" !== this.captureSourceType && "application" !== this.captureSourceType) return void k.error("captureSourceType value is not correct");
                        e = {
                            video: {
                                mediaSource: this.captureSourceType
                            }
                        }, navigator.mediaDevices.getUserMedia(e).then(this.callback(this, "onUserMediaSuccessOnCall")).catch(this.callback(this, "onUserMediaErrorOnCall"))
                    }
                else if (!0 === this.audioOnly) k.log("this.audioOnly = true"), null === i.audioSourceId ? k.log("getUserMediaOnCall, audioSourceId not defined") : (k.log("getUserMediaOnCall, audioSourceId is defined :", i.audioSourceId), "iOS" === I.name ? i.gum_config.audio.deviceId = i.audioSourceId : "Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion >= 50 ? i.gum_config.audio.deviceId = i.audioSourceId : i.gum_config.audio.optional = [{
                    sourceId: i.audioSourceId
                }]), n = JSON.parse(JSON.stringify(i.gum_config)), !1 === i.allowAsymetricMediaCalls ? n.video = !1 : k.log("allow AsymetricMediaCalls is activated"), e = n, k.log("getUserMedia with userMediaConstraint :" + JSON.stringify(e)), navigator.mediaDevices !== t && navigator.mediaDevices.getUserMedia !== t ? (k.log("getUserMedia with promises"), k.log("localUserMediaConstraint :", e), navigator.mediaDevices.getUserMedia(e).then(this.callback(this, "onUserMediaSuccessOnCall")).catch(this.callback(this, "onUserMediaErrorOnCall"))) : (k.log("getUserMedia without promises"), i.myWebRTC_Adapter.getUserMedia(e, this.callback(this, "onUserMediaSuccessOnCall"), this.callback(this, "onUserMediaErrorOnCall")));
                else {
                    if (k.log("else not screensharing, not audioOnly"), k.log("webRTCClient.audioSourceId :", i.audioSourceId), k.log("webRTCClient.videoSourceId :", i.videoSourceId), null === i.audioSourceId && null === i.videoSourceId ? e = i.gum_config : ("iOS" === I.name ? (i.gum_config.audio.deviceId = i.audioSourceId, i.gum_config.video.deviceId = i.videoSourceId) : "Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion >= 50 ? (i.gum_config.audio.deviceId = i.audioSourceId, i.gum_config.video.deviceId = i.videoSourceId) : (i.gum_config.audio.optional = [{
                            sourceId: i.audioSourceId
                        }], i.gum_config.video.optional = [{
                            sourceId: i.videoSourceId
                        }]), e = i.gum_config), k.log("getUserMedia with userMediaConstraint :" + JSON.stringify(e)), "undefined" != typeof apiRTC_React) {
                        e = {
                            audio: !0,
                            video: {
                                mandatory: {
                                    minWidth: 500,
                                    minHeight: 300,
                                    minFrameRate: 30
                                },
                                facingMode: "user"
                            }
                        }
                    }
                    navigator.mediaDevices !== t && navigator.mediaDevices.getUserMedia !== t ? (k.log("getUserMedia with promises"), navigator.mediaDevices.getUserMedia(e).then(this.callback(this, "onUserMediaSuccessOnCall")).catch(this.callback(this, "onUserMediaErrorOnCall"))) : (k.log("getUserMedia without promises"), i.myWebRTC_Adapter.getUserMedia(e, this.callback(this, "onUserMediaSuccessOnCall"), this.callback(this, "onUserMediaErrorOnCall")))
                }
                k.log("Requested access to local media with new syntax.")
            } catch (e) {
                alert("getUserMedia() failed. Is this a WebRTC capable browser?"), k.log("getUserMedia failed with exception: " + e.message)
            }
        }, this.addStream = function(e) {
            k.info("addStream in call");
            var t = null,
                n = 0;
            if ("Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion >= 51 || "Edge" === f) {
                for (k.info("using addTrack method"), t = e.getTracks(), n = 0; n < t.length; n += 1) this.pc.addTrack(t[n], e);
                k.info("end addTrack method")
            } else k.info("using addStream method"), this.pc.addStream(e)
        }, this.removeStream = function(e) {
            k.info("removeStream in call");
            var t = 0,
                n = null;
            if ("Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion >= 51)
                for (k.info("using removeTrack method"), n = this.pc.getSenders(), k.info("senders :", n), t = 0; t < n.length; t += 1) this.pc.removeTrack(n[t]);
            else k.info("using removeStream method"), this.pc.removeStream(e)
        }, this.stopStream = function(e) {
            k.info("stopStream in call");
            var t = 0,
                n = null;
            if ("Chrome" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 45 || "Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 44 || "Opera" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 34 || "Chromium" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 44 || "Vivaldi" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 45 || "Chrome WebView" === f && i.myWebRTC_Adapter.webrtcDetectedVersion < 45) e.stop();
            else {
                for (k.log("MediaStream.stop is now deprecated, using MediaStreamTrack.stop"), n = e.getTracks(), t = 0; t < n.length; t += 1) n[t].stop();
                k.log("... tracks stopped")
            }
            e = null
        }, this.getScreenUserMediaOnCall = function() {
            k.info("getScreenUserMediaOnCall");
            try {
                k.log("getScreenMedia"), navigator.webkitGetUserMedia({
                    audio: !1,
                    video: {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: this.desktopId,
                            maxWidth: 1920,
                            maxHeight: 1080,
                            minAspectRatio: 1.77
                        }
                    }
                }, this.callback(this, "onScreenUserMediaSuccessOnCall"), this.callback(this, "onScreenUserMediaErrorOnCall")), k.log("Requested access to local media with new syntax.")
            } catch (e) {
                alert("getUserMedia() failed. Is this a WebRTC capable browser?"), k.log("getUserMedia failed with exception: " + e.message)
            }
        }, this.onScreenUserMediaSuccessOnCall = function(e) {
            k.info("onScreenUserMediaSuccessOnCall");
            var t = "Unknown",
                i = "Unknown",
                n = null;
            e.getAudioTracks().length > 0 && (!0, e.getAudioTracks()[0].label && (t = e.getAudioTracks()[0].label), k.log("Using audio device: " + t)), e.getVideoTracks().length > 0 && (!0, e.getVideoTracks()[0].label && (i = e.getVideoTracks()[0].label), k.log("Using video device: " + i)), k.log("Changing video stream with screen"), this.screenStream = e, this.screenStream.getVideoTracks()[0].onended = this.callback(this, "stopScreenSharingOnSwitchStream"), k.log("Adding callLocalstream to screen MediaStream"), n = this.callLocalStream.getAudioTracks()[0].clone(), this.screenStream.addTrack(n), this.switchVideoToScreen()
        }, this.toggleVideoScreen = function() {
            !0 === this.screenIsDisplayed ? this.switchScreenToVideo() : this.switchVideoToScreen()
        }, this.switchVideoToScreen = function() {
            k.info("switchVideoToScreen in call"), this.removeStream(this.callLocalStream), this.addStream(this.screenStream), this.updateMedia(!1), i.myWebRTC_Event.createSwitchStreamEvent(this.callId, this.screenStream), this.screenIsDisplayed = !0
        }, this.switchScreenToVideo = function() {
            k.info("switchScreenToVideo in call"), this.removeStream(this.screenStream), this.addStream(this.callLocalStream), this.updateMedia(!1), i.myWebRTC_Event.createSwitchStreamEvent(this.callId, this.callLocalStream), this.screenIsDisplayed = !1
        }, this.onScreenUserMediaErrorOnCall = function(e) {
            k.error("Failed to get access to local media. Error code was " + e.code), k.error(e), e = null
        }, this.stopScreenSharingOnSwitchStream = function() {
            k.info("stopScreenSharingOnSwitchStream detected"), this.switchScreenToVideo(this.callId), null !== this.screenStream && (k.log("stopping screenStream"), this.stopStream(this.screenStream), c.createUserMediaStopEvent(this.callId, "screen"))
        }, this.stopScreenSharing = function() {
            k.info("stopScreenSharing detected"), i.removeCallFromTableWithCallIdAndSendBye(this.callId, "stop_ScreenSharing")
        }, this.onUserMediaSuccessOnCall = function(e) {
            k.info("onUserMediaSuccessOnCall");
            var s = !1,
                o = "Unknown",
                l = !1,
                r = "Unknown",
                c = n(),
                h = {};
            !0 === i.userMediaErrorDetected && (i.userMediaErrorDetected = !1, h.userMediaErrorDetected = i.userMediaErrorDetected, d.session.setUserData(h)), k.log("isHTTPS()" + c), c = null, i.getUserMediaOnGoing = !1, k.log("User has granted access to local media."), i.accessToLocalMedia = !0, i.displayHangUpButtonInCommand(), this.accessToMedia = !0, "LOCAL" !== this.calleeId && (!0 === this.callee ? i.setStatus("You are connected to :" + this.callerId) : i.setStatus("You are connected to :" + this.calleeId)), e !== t && (e.getAudioTracks().length > 0 && (s = !0, e.getAudioTracks()[0].label && (o = e.getAudioTracks()[0].label), k.log("Using audio device: " + o)), e.getVideoTracks().length > 0 && (l = !0, e.getVideoTracks()[0].label && (r = e.getVideoTracks()[0].label), k.log("Using video device: " + r))), !0 === this.screenSharing ? (this.callType = "screenSharing", e.onended = this.callback(this, "stopScreenSharing"), e.getVideoTracks().length > 0 && (e.getVideoTracks()[0].onended = this.callback(this, "stopScreenSharing"))) : !0 === this.audioOnly && (this.callType = "audio"), e.callId = this.callId, i.myWebRTC_Event.createUserMediaSuccessEvent(!0, s, o, l, r, this.callType, this.callId, e, this.remoteId, this.restarted), !1 === i.addingUserMedia ? (i.miniVideo && (k.log("webRTCClient.miniVideo.src :" + i.miniVideo.src), k.log("document.URL :" + document.URL), e !== t && i.attachMediaStream(i.miniVideo, e)), i.localVideo && (k.log("webRTCClient.localVideo.src :" + i.localVideo.src), k.log("document.URL :" + document.URL), e !== t && i.attachMediaStream(i.localVideo, e), i.localVideo.style.opacity = 1)) : i.miniVideo && e !== t && i.attachMediaStream(i.miniVideo, e), e !== t && (this.callLocalStream = e), a() ? (k.log("isHTTP true"), this.establishCall()) : (k.log("webRTCClient.userAcceptOnIncomingCall :" + i.userAcceptOnIncomingCall), k.log("this.callee :" + this.callee), this.data !== t && k.log("this.data.MCUType :" + this.data.MCUType), !0 !== i.userAcceptOnIncomingCall || !0 !== this.callee && "MCU-Callee" !== this.data.MCUType || !1 !== this.isAccepted ? "LOCAL" !== this.calleeId ? this.establishCall() : k.log("call is not established as this is a LOCAL stream request") : k.log("TEMP wait for establishCall"))
        }, this.establishCall = function() {
            k.info("establishCall()"), this.maybeStart();
            var e = null;
            this.callee && !1 === i.addingUserMedia ? (e = new i.myWebRTC_Adapter.RTCSessionDescription(this.receivedSdpOfferMessage), k.log("Avant setRemote pour le callee :", e), null !== this.pc ? (i.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), e.sdp = i.mySDPManager.maybePreferCodec(e.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("establishCall : before setRemoteDescription for callee"), this.pc.setRemoteDescription(e, this.callback(this, "onSetRemoteDescriptionSuccess"), this.callback(this, "onSetRemoteDescriptionFailure"))) : (k.log("establishCall : before setRemoteDescription for callee - Promise version"), this.pc.setRemoteDescription(e).then(this.callback(this, "onSetRemoteDescriptionSuccess")).catch(this.callback(this, "onSetRemoteDescriptionFailure")))) : k.log("Error : PC is null"), this.doAnswer()) : !0 === i.addingUserMedia && (k.log("Adding local stream 1."), null !== this.pc ? null !== this.callLocalStream ? (k.log("Add Stream of callLocalStream"), this.addStream(this.callLocalStream)) : null !== i.localStream ? (k.log("Add Stream of client.localStream"), this.addStream(i.localStream), this.callLocalStream = i.localStream) : k.log("No Stream to addStream") : k.error("Error : PC is null"), this.updateMedia(!1)), k.log("End of establishCall()")
        }, this.onUserMediaSuccessTestUni = function() {
            i.getUserMediaOnGoing = !1, k.info("onUserMediaSuccessTestUni : User has not granted access to local media.");
            var e = null,
                t = {};
            !0 === i.userMediaErrorDetected && (i.userMediaErrorDetected = !1, t.userMediaErrorDetected = i.userMediaErrorDetected, d.session.setUserData(t)), i.accessToLocalMedia = !0, this.maybeStart(), this.callee && (e = new i.myWebRTC_Adapter.RTCSessionDescription(this.receivedSdpOfferMessage), i.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), e.sdp = i.mySDPManager.maybePreferCodec(e.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("onUserMediaSuccessTestUni : before setRemoteDescription for callee"), this.pc.setRemoteDescription(e, this.callback(this, "onSetRemoteDescriptionSuccess"), this.callback(this, "onSetRemoteDescriptionFailure"))) : (k.log("onUserMediaSuccessTestUni : before setRemoteDescription for callee - Promise version"), this.pc.setRemoteDescription(e).then(this.callback(this, "onSetRemoteDescriptionSuccess")).catch(this.callback(this, "onSetRemoteDescriptionFailure"))), this.doAnswer())
        }, this.onUserMediaErrorOnCall = function(n) {
            k.log("onUserMediaErrorOnCall");
            var a = {};
            i.getUserMediaOnGoing = !1, k.error("Failed to get access to local media. Error code was " + n.code), k.error(n), n = null, k.log("webRTCClient.myWebRTC_Adapter.webrtcDetectedVersion :" + i.myWebRTC_Adapter.webrtcDetectedVersion), "Chrome" === f && i.myWebRTC_Adapter.webrtcDetectedVersion > 47 && (k.log("browser_version > 47"), "https:" != e.location.protocol && alert("HTTPS is now mandatory to use getUserMedia()")), i.setStatus("<div>Your phone is registered, you can be reached at this number : " + i.clientId + "</div>"), !0 === this.screenSharing && (this.callType = "screenSharing", "https:" != e.location.protocol ? (k.log("You need to be connected using HTTPS for screenSharing"), c.createDesktopCaptureEvent("UserMediaError_HTTPS_needed", this.callId, this.remoteId)) : (k.log("screenSharing UserMediaError"), c.createDesktopCaptureEvent("UserMediaError", this.callId, this.remoteId))), i.myWebRTC_Event.createUserMediaErrorEvent(!0, this.callType), !0 === this.callee ? (this.myWebRTC_Stack.sendBye(this.callId, this.calleeId, this.dest_roomId, this.callerId, "User_Media_Error", this.data), i.removeCallFromTableWithCallIdandRemoteId(this.callId, this.callerId, "User_Media_Error")) : (this.data !== t && null !== this.data && "MCU-Callee" === this.data.MCUType && this.myWebRTC_Stack.sendBye(this.callId, this.callerId, this.dest_roomId, this.calleeId, "User_Media_Error", this.data), i.removeCallFromTableWithCallIdandRemoteId(this.callId, this.calleeId, "User_Media_Error")), i.userMediaErrorDetected = !0, a.userMediaErrorDetected = i.userMediaErrorDetected, d.session.setUserData(a), !0 === d.session.tryAudioCallAfterUserMediaError ? (k.log("try AudioCall after UserMediaError is activated"), k.log("this.audioOnly :", this.audioOnly), k.log("this.data.type :", this.data.type), !1 === this.audioOnly && (k.log("UserMediaError, Trying to establih an audioOnly call"), "publish" === this.data.type ? (k.log("Calling publish()"), i.MCUClient.publish(this.dest_roomId, null, null, !0)) : i.callWithNumber(this.callee, !1, this.data, this.callConfiguration))) : k.log("try AudioCall after UserMediaError is not activated")
        }, this.maybeStart = function() {
            k.info("maybeStart"), !this.started && i.channelReady && (i.accessToLocalMedia || this.dataCall || null !== i.selectedLocalStream) && (k.log("Creating PeerConnection."), this.createPeerConnection(), null !== i.selectedLocalStream && (this.callLocalStream = i.selectedLocalStream, i.localStream = i.selectedLocalStream), i.unidirectionelCallOnly || !0 === this.screenSharing ? !1 === this.callee && (k.log("Adding local stream 2."), null !== this.callLocalStream ? (k.log("Add Stream of callLocalStream"), this.addStream(this.callLocalStream)) : null !== i.localStream ? (k.log("Add Stream of client.localStream"), this.addStream(i.localStream), this.callLocalStream = i.localStream) : k.log("No Stream to add")) : this.dataCall || (k.log("Adding local stream 3."), null !== this.callLocalStream ? (k.log("Add Stream of callLocalStream"), this.addStream(this.callLocalStream)) : null !== i.localStream ? (k.log("Add Stream of client.localStream"), this.addStream(i.localStream), this.callLocalStream = i.localStream) : k.log("No Stream to add")), this.started = !0, !1 === this.callee && (k.log("Before doCall()"), this.doCall())), k.log("End of maybeStart")
        }, this.createDataChannel = function() {
            if (k.info("createDataChannel"), null === this.sendDataChannel) {
                try {
                    this.sendDataChannel = this.pc.createDataChannel("apiRTCDataChannel", {}), this.sendDataChannel.binaryType = "arraybuffer", k.log("Created data channel")
                } catch (e) {
                    k.log("createDataChannel() failed with exception: " + e.message)
                }
                k.log("Subscribing to dc events"), this.sendDataChannel.onopen = this.callback(this, "onSendDataChannelOpen"), this.sendDataChannel.onclose = this.callback(this, "onSendDataChannelClose"), this.sendDataChannel.onmessage = this.callback(this, "onSendDataChannelMessage"), this.sendDataChannel.onerror = this.callback(this, "onSendDataChannelError")
            } else k.log("Datachannel already exist")
        }, this.createPeerConnection = function() {
            k.info("createPeerConnection");
            try {
                k.log("createPeerConnection with pc_config:", this.pc_config), k.log("and pc_constraints:", this.pc_constraints), this.pc = new i.myWebRTC_Adapter.RTCPeerConnection(this.pc_config, this.pc_constraints), this.dataCall && this.createDataChannel(), this.pc.onicecandidate = this.callback(this, "onIceCandidate")
            } catch (e) {
                return k.log("Failed to create PeerConnection, exception: " + e.message), void alert("Cannot create RTCPeerConnection object; WebRTC is not supported by this browser.")
            }
            "Firefox" === f && i.myWebRTC_Adapter.webrtcDetectedVersion >= 53 || "Edge" === f ? this.pc.ontrack = this.callback(this, "onRemoteTrackAdded") : this.pc.onaddstream = this.callback(this, "onRemoteStreamAdded"), this.pc.onremovestream = this.callback(this, "onRemoteStreamRemoved"), this.pc.onnegotiationneeded = this.callback(this, "onNegotiationNeeded"), this.pc.onsignalingstatechange = this.callback(this, "onSignalingStateChange"), this.pc.oniceconnectionstatechange = this.callback(this, "onIceConnectionStateChange"), this.pc.ondatachannel = this.callback(this, "onDataChannel"), i.qosEnable && (this.statisticId = setInterval(this.callback(this, "getStatistics"), this.getStatsInterval)), i.csmEnable && (this.csmIntervalId = setInterval(this.callback(this, "csmHandler"), this.csmIntervalMs))
        }, this.onDataChannel = function(e) {
            k.info("onDataChannel"), this.receiveDataChannel = e.channel, this.receiveDataChannel.binaryType = "arraybuffer", null === this.sendDataChannel && (k.log("Setting this.sendDataChannel with receivedDataChannel"), this.sendDataChannel = e.channel, this.sendDataChannel.onopen = this.callback(this, "onSendDataChannelOpen"), this.sendDataChannel.onclose = this.callback(this, "onSendDataChannelClose"), this.sendDataChannel.onmessage = this.callback(this, "onSendDataChannelMessage"), this.sendDataChannel.onerror = this.callback(this, "onSendDataChannelError")), k.log("got dataChannel", e.channel.label), k.log("Subscribing to dc events"), this.receiveDataChannel.onopen = this.callback(this, "onReceiveDataChannelOpen"), this.receiveDataChannel.onclose = this.callback(this, "onReceiveDataChannelClose"), this.receiveDataChannel.onmessage = this.callback(this, "onReceiveDataChannelMessage"), this.receiveDataChannel.onerror = this.callback(this, "onReceiveDataChannelError")
        }, this.onSendDataChannelOpen = function(e) {
            k.info("onSendDataChannelOpen"), c.createEvent({
                eventType: "sendDataChannelOpen",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.onSendDataChannelClose = function(e) {
            k.info("onSendDataChannelClose"), this.sendDataChannel = null, null !== c && c.createEvent({
                eventType: "sendDataChannelClose",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.processOnDataChannelMessage = function(i) {
            var n = null,
                a = null,
                s = null,
                o = "",
                l = 0,
                r = 0;
            if (k.info("processOnDataChannelMessage"), n = JSON.parse(i.data), k.log("data.uuid :" + n.uuid), k.log("data.messageSize :" + n.messageSize), k.log("data.originalDataType :" + n.originalDataType), s = n.uuid, "ArrayBuffer" === n.originalDataType && (k.log("ArrayBuffer conversion"), n.message = U.decode(n.message)), k.log("data :" + n), k.log("data.uuid :" + s), k.log("receiveChunkNb[uuid] :" + this.receiveChunkNb[s]), this.receiveChunkNb[s] === t) k.log("receiving first packet for uuid :" + s), k.log("evt.data.message :" + i.data), this.firstDataPacket[s] = n, this.receiveChunkNb[s] = 1, this.receivedSize[s] = 0, this.startingDate = new Date, this.transferDuration = 0, c.createEvent({
                eventType: "onFileReceiving",
                remoteId: this.remoteId,
                callId: this.callId,
                name: n.name,
                uuid: s
            }), c.createEvent({
                eventType: "onFileProgress",
                sendChunkNb: this.receiveChunkNb[s],
                fileSize: this.firstDataPacket[s].size,
                remainingSize: this.firstDataPacket[s].size,
                callId: this.callId,
                uuid: s,
                remoteId: this.remoteId,
                lastPacket: !1,
                startingDate: this.startingDate,
                transferDuration: this.transferDuration,
                percentage: 0,
                transferEnded: !1
            });
            else if (k.log("new packet for uuid :" + s), this.receiveChunkNb[s] += 1, k.log("data.messageSize :" + n.messageSize), k.log("data.message.length :" + n.message.length), r = n.messageSize || n.message.length, k.log("receivedSize :" + r), this.receiveArrayToStoreChunks[s] || (this.receiveArrayToStoreChunks[s] = []), this.receiveArrayToStoreChunks[s].push(n.message), this.receivedSize[s] += r, this.transferDuration = new Date - this.startingDate, this.receivedSize[s] === this.firstDataPacket[s].size) {
                if (k.log("End of data transfert"), k.log("this.firstDataPacket.type :" + this.firstDataPacket[s].type), "image/png-dataUrl" === this.firstDataPacket[s].type) {
                    for (k.log("Photo received from a takeSnapshot"), l = 0; l < this.receiveArrayToStoreChunks[s].length; l += 1) o += this.receiveArrayToStoreChunks[s][l];
                    a = o
                } else a = new e.Blob(this.receiveArrayToStoreChunks[s]);
                c.createEvent({
                    eventType: "onFileProgress",
                    sendChunkNb: this.receiveChunkNb[s],
                    fileSize: this.firstDataPacket[s].size,
                    remainingSize: 0,
                    callId: this.callId,
                    uuid: s,
                    remoteId: this.remoteId,
                    lastPacket: !1,
                    startingDate: this.startingDate,
                    transferDuration: this.transferDuration,
                    percentage: 100,
                    transferEnded: !0
                }), c.createEvent({
                    eventType: "onFileReceived",
                    callId: this.callId,
                    uuid: s,
                    remoteId: this.remoteId,
                    callerId: this.callerId,
                    calleeId: this.calleeId,
                    data: {
                        file: a,
                        name: this.firstDataPacket[s].name,
                        type: this.firstDataPacket[s].type,
                        uuid: s
                    },
                    details: i
                }), delete this.receiveArrayToStoreChunks[s], delete this.receivedSize[s], delete this.receiveChunkNb[s], delete this.firstDataPacket[s]
            } else c.createEvent({
                eventType: "onFileProgress",
                sendChunkNb: this.receiveChunkNb[s],
                fileSize: this.firstDataPacket[s].size,
                remainingSize: this.firstDataPacket[s].size - this.receivedSize[s],
                callId: this.callId,
                uuid: s,
                remoteId: this.remoteId,
                lastPacket: !1,
                startingDate: this.startingDate,
                transferDuration: this.transferDuration,
                percentage: parseInt(100 * this.receivedSize[s] / this.firstDataPacket[s].size, 10),
                transferEnded: !1
            })
        }, this.onSendDataChannelMessage = function(e) {
            k.info("onSendDataChannelMessage :", e), this.processOnDataChannelMessage(e)
        }, this.onSendDataChannelError = function(e) {
            k.info("onSendDataChannelError"), this.sendDataChannel = null, c.createEvent({
                eventType: "sendDataChannelError",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.onReceiveDataChannelOpen = function(e) {
            k.info("onReceiveChannelOpen"), c.createEvent({
                eventType: "receiveDataChannelOpen",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.onReceiveDataChannelClose = function(e) {
            k.info("onReceiveDataChannelClose"), this.receiveDataChannel = null, null !== c && c.createEvent({
                eventType: "receiveDataChannelClose",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.onReceiveDataChannelMessage = function(e) {
            k.info("onReceiveChannelMessage"), this.processOnDataChannelMessage(e)
        }, this.onReceiveDataChannelError = function(e) {
            k.info("onReceiveChannelError"), c.createEvent({
                eventType: "receiveDataChannelError",
                callId: this.callId,
                remoteId: this.remoteId,
                details: e
            })
        }, this.statisticsAnswer = function(e) {
            var t = e.result();
            this.qm || (this.qm = new qosMonitor(this.getStatsInterval / 1e3, this.callback(this, "onQosChange"), this.callback(this, "onQosAudioChange"), this.callback(this, "onQosVideoChange"), this.callId, i.apiKey, i.clientId, i.socket)), t && (this.qm.insertStats(t, this.sendedSdpOfferMessage, this.receivedSdpOfferMessage, i.remoteVideo), c.createEvent({
                eventType: "onQosStatsUpdate",
                callId: this.callId,
                remoteId: this.remoteId,
                stats: this.qm.getAllStats()
            }))
        }, this.csmGetStatsHandler = function(e) {
            this.csm || (this.csm = new CallStatMonitor(this.csmIntervalMs / 1e3, i.clientId, this.callId, i.apiKey, i.socket, i.myWebRTC_Adapter.webrtcDetectedBrowser)), this.csm.addCallStats(e)
        }, this.onQosChange = function(e, t) {
            k.info("onQosChange", e, t), c.createEvent({
                eventType: "onQosChange",
                callId: this.callId,
                remoteId: this.remoteId,
                qosIn: e,
                qosOut: t
            })
        }, this.onQosAudioChange = function(e, t) {
            k.info("onQosAudioChange", e, t), c.createEvent({
                eventType: "onQosAudioChange",
                callId: this.callId,
                remoteId: this.remoteId,
                qosAudioIn: e,
                qosAudioOut: t
            })
        }, this.onQosVideoChange = function(e, t) {
            k.info("onQosVideoChange", e, t), c.createEvent({
                eventType: "onQosVideoChange",
                callId: this.callId,
                remoteId: this.remoteId,
                qosVideoIn: e,
                qosVideoOut: t
            })
        }, this.getStatistics = function() {
            this.pc ? this.pc.getStats && "firefox" !== i.myWebRTC_Adapter.webrtcDetectedBrowser ? this.pc.getStats(this.callback(this, "statisticsAnswer")) : k.log("no stats function") : k.log("Not connected yet")
        }, this.csmHandler = function() {
            this.pc && ("firefox" === i.myWebRTC_Adapter.webrtcDetectedBrowser ? this.pc.getStats(null).then(this.callback(this, "csmGetStatsHandler")) : this.pc.getStats(null, this.callback(this, "csmGetStatsHandler")))
        }, this.doCall = function() {
            var e = null;
            k.log("Sending offer to peer"), this.audioOnly ? (k.log("audioOnly call :", this.mediaConstraintsAudioOnly), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOffer"), this.callback(this, "onCreateOfferFailure"), this.mediaConstraintsAudioOnly)) : (k.log("createOffer - Promise version"), this.pc.createOffer(this.mediaConstraintsAudioOnly).then(this.callback(this, "setLocalAndSendMessageonOffer")).catch(this.callback(this, "onCreateOfferFailure")))) : !0 === this.screenSharing ? (k.log("screenSharing call : one way media :", e), e = {
                mandatory: {
                    OfferToReceiveAudio: !1,
                    OfferToReceiveVideo: !1
                }
            }, "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOffer"), this.callback(this, "onCreateOfferFailure"), e)) : (k.log("createOffer - Promise version"), this.pc.createOffer(e).then(this.callback(this, "setLocalAndSendMessageonOffer")).catch(this.callback(this, "onCreateOfferFailure")))) : !0 === this.dataCall ? (k.log("call is data only :", e), e = "firefox" === i.myWebRTC_Adapter.webrtcDetectedBrowser && i.myWebRTC_Adapter.webrtcDetectedVersion > 43 ? {
                offerToReceiveAudio: !1,
                offerToReceiveVideo: !1
            } : {
                mandatory: {
                    OfferToReceiveAudio: !1,
                    OfferToReceiveVideo: !1
                }
            }, "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOffer"), this.callback(this, "onCreateOfferFailure"), e)) : (k.log("createOffer - Promise version"), this.pc.createOffer(e).then(this.callback(this, "setLocalAndSendMessageonOffer")).catch(this.callback(this, "onCreateOfferFailure")))) : (k.log("call is audio & video :", this.mediaConstraints), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOffer"), this.callback(this, "onCreateOfferFailure"), this.mediaConstraints)) : (k.log("createOffer - Promise version"), this.pc.createOffer(this.mediaConstraints).then(this.callback(this, "setLocalAndSendMessageonOffer")).catch(this.callback(this, "onCreateOfferFailure"))))
        }, this.doAnswer = function() {
            k.info("Sending answer to peer.");
            var e = null;
            this.audioOnly ? (k.log("audioOnly call"), e = this.mediaConstraintsAudioOnly) : e = this.mediaConstraints, "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createAnswer"), this.pc.createAnswer(this.callback(this, "setLocalAndSendMessage"), this.callback(this, "onCreateAnswerFailure"), e)) : (k.log("createAnswer - Promise version"), this.pc.createAnswer(e).then(this.callback(this, "setLocalAndSendMessage")).catch(this.callback(this, "onCreateAnswerFailure")))
        }, this.doUpdateAnswer = function() {
            k.info("Sending answer to peer.");
            var e = null;
            this.audioOnly ? (k.log("audioOnly call"), e = this.mediaConstraintsAudioOnly) : e = this.mediaConstraints, "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createAnswer"), this.pc.createAnswer(this.callback(this, "setLocalAndSendMessageUpdate"), this.callback(this, "onCreateAnswerFailure"), e)) : (k.log("createAnswer - Promise version"), this.pc.createAnswer(e).then(this.callback(this, "setLocalAndSendMessageUpdate")).catch(this.callback(this, "onCreateAnswerFailure")))
        }, this.updateMedia = function(e) {
            k.info("updateMedia"), k.log("iceRestartActivated :", e), k.log("Sending Update offer to peer."), null !== this.pc ? this.audioOnly ? (k.log("audioOnly call :", this.mediaConstraintsAudioOnly), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), !0 === e && (this.mediaConstraintsAudioOnly.mandatory.IceRestart = !0), k.log("this.mediaConstraints :", this.mediaConstraintsAudioOnly), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOfferUpdate"), this.callback(this, "onCreateOfferFailure"), this.mediaConstraintsAudioOnly)) : (k.log("createOffer - Promise version"), !0 === e && (this.mediaConstraintsAudioOnly.iceRestart = !0), k.log("this.mediaConstraints :", this.mediaConstraintsAudioOnly), this.pc.createOffer(this.mediaConstraintsAudioOnly).then(this.callback(this, "setLocalAndSendMessageonOfferUpdate")).catch(this.callback(this, "onCreateOfferFailure")))) : "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("createOffer"), !0 === e && (this.mediaConstraints.mandatory.IceRestart = !0), k.log("this.mediaConstraints :", this.mediaConstraints), this.pc.createOffer(this.callback(this, "setLocalAndSendMessageonOfferUpdate"), this.callback(this, "onCreateOfferFailure"), this.mediaConstraints)) : (k.log("createOffer - Promise version"), !0 === e && (this.mediaConstraints.iceRestart = !0), k.log("this.mediaConstraints :", this.mediaConstraints), this.pc.createOffer(this.mediaConstraints).then(this.callback(this, "setLocalAndSendMessageonOfferUpdate")).catch(this.callback(this, "onCreateOfferFailure"))) : k.log("updateMedia, pc no more exist")
        }, this.manipulateSDP = function(e) {
            return k.log("manipulateSDP"), !0 === i.RTPMedia && (e.sdp = e.sdp.replace(/RTP\/SAVPF/g, "RTP/SF")), null !== i.audioBandwidth && (k.log("setting audioBandwidth in SDP :" + i.audioBandwidth), e.sdp = i.mySDPManager.setAudioBandwidth(e.sdp, i.audioBandwidth)), null !== i.videoBandwidth && (k.log("setting videoBandwidth in SDP :" + i.videoBandwidth), e.sdp = i.mySDPManager.setVideoBandwidth(e.sdp, i.videoBandwidth)), null !== i.dataBandwidth && (k.log("setting dataBandwidth in SDP :" + i.dataBandwidth), e.sdp = i.mySDPManager.setDataBandwidth(e.sdp, i.dataBandwidth)), !0 === i.preferOpusCodec && (k.log("setting preferOpusCodec"), e.sdp = i.mySDPManager.preferOpus(e.sdp)), !0 === i.preferVP9Codec && (k.log("Call prefer VP9 Codec"), e.sdp = i.mySDPManager.maybePreferCodec(e.sdp, "video", "VP9")), !0 !== i.preferH264Codec && !0 !== this.preferH264Codec || (k.log("Call prefer H264 Codec"), e.sdp = i.mySDPManager.maybePreferCodec(e.sdp, "video", "H264")), !0 === i.setStereo && (k.log("Set Stereo"), e.sdp = i.mySDPManager.setCodecParam(e.sdp, "opus/48000", "stereo", "1")), e = i.mySDPManager.updateSDPcodecs(e, e.type, "audio", i.allowedAudioCodecs), e = i.mySDPManager.updateSDPcodecs(e, e.type, "video", i.allowedVideoCodecs), "VIDEO" === this.mediaTypeForOutgoingCall ? k.log("mediaTypeForOutgoingCall is VIDEO") : "AUDIO" === this.mediaTypeForOutgoingCall || !0 === this.audioOnly ? (k.log("mediaTypeForOutgoingCall is AUDIO"), e.sdp = i.mySDPManager.setRecvOnlyForVideo(e.sdp)) : "VIDEOONLY" === this.mediaTypeForOutgoingCall ? (k.log("mediaTypeForOutgoingCall is VIDEOONLY"), e.sdp = i.mySDPManager.setRecvOnlyForAudio(e.sdp)) : "NONE" === this.mediaTypeForOutgoingCall && (k.log("mediaTypeForOutgoingCall is NONE"), e.sdp = i.mySDPManager.setRecvOnly(e.sdp)), e
        }, this.setLocalAndSendMessageonOffer = function(e) {
            k.info("setLocalAndSendMessageonOffer"), k.log("sessionDescription = ", e), k.log("sessionDescription.sdp = ", e.sdp);
            var n = null;
            e.sdp = this.manipulateSDP(e).sdp, k.log("manipulated sessionDescription.sdp = ", e.sdp), !0 === this.stripAudioSDPActivated && (e.sdp = i.mySDPManager.stripAudioMediaDescriptionFromSDP(e.sdp)), !0 === this.stripVideoSDPActivated && (e.sdp = i.mySDPManager.stripVideoMediaDescriptionFromSDP(e.sdp)), this.sendedSdpOfferMessage = e, !0 === this.dataCall && (k.log("setLocalAndSendMessageonOffer : data Call"), this.callType = "data"), !1 === this.callCancelled ? (!1 === i.NtoNConf ? (k.log("Conf N to 1"), !0 === this.screenSharing && (n = i.mySDPManager.getAudioMediaDescriptionPart(this.sendedSdpOfferMessage.sdp), this.callType = n !== t && null !== n ? "screenSharingWithAudio" : "screenSharing"), !0 === this.trickleIce && this.myWebRTC_Stack.sendInvite(this.callId, this.callerId, i.nickname, this.dest_roomId, this.dest_roomId, e, this.callType, this.data, this.mcuRemoteStream), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessageonOffer : before setLocalDescription"), this.pc.setLocalDescription(this.sendedSdpOfferMessage, this.callback(this, "onSetLocalDescriptionSuccess"), this.callback(this, "onSetLocalDescriptionFailure"))) : (k.log("setLocalAndSendMessageonOffer : before setLocalDescription - Promise version"), this.pc.setLocalDescription(this.sendedSdpOfferMessage).then(this.callback(this, "onSetLocalDescriptionSuccess")).catch(this.callback(this, "onSetLocalDescriptionFailure")))) : (k.log("Conf N to N"), this.myWebRTC_Stack.sendInviteBroadcast(this.callId, this.callerId, i.nickname, this.dest_roomId, this.dest_roomId, e)), this.inviteSended = !0) : (k.warn("Invite is not sent has call has been canceled"), i.removeCallFromTableWithCallIdandRemoteId(this.callId, this.calleeId, "Call_Cancelled"), 0 === i.callsTable.length && (k.log("No more established calls for client"), i.initMediaElementState(), i.displayCallButtonInCommand()))
        }, this.setLocalAndSendMessageonOfferUpdate = function(e) {
            k.info("setLocalAndSendMessageonOfferUpdate, sessionDescription :" + e), this.sendedSdpOfferMessage = e, k.log("sessionDescription.sdp = ", e.sdp);
            var t = 0;
            t = this.callee ? this.callerId : this.calleeId, !0 === this.trickleIce ? (this.myWebRTC_Stack.sendUpdate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e, this.data), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessageonOfferUpdate : before setLocalDescription"), this.pc.setLocalDescription(e, this.callback(this, "onSetLocalDescriptionSuccess"), this.callback(this, "onSetLocalDescriptionFailure"))) : (k.log("setLocalAndSendMessageonOfferUpdate : before setLocalDescription - Promise version"), this.pc.setLocalDescription(e).then(this.callback(this, "onSetLocalDescriptionSuccess")).catch(this.callback(this, "onSetLocalDescriptionFailure")))) : (k.log("Updating PC offer and answer after switch Stream"), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessageonOfferUpdate : before setLocalDescription"), this.pc.setLocalDescription(e, this.callback(this, "onSetLocalDescriptionSuccess"), this.callback(this, "onSetLocalDescriptionFailure"))) : (k.log("setLocalAndSendMessageonOfferUpdate : before setLocalDescription - Promise version"), this.pc.setLocalDescription(e).then(this.callback(this, "onSetLocalDescriptionSuccess")).catch(this.callback(this, "onSetLocalDescriptionFailure"))), i.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), this.pc.remoteDescription.sdp = i.mySDPManager.maybePreferCodec(this.pc.remoteDescription.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessageonOfferUpdate : before setRemoteDescription"), this.pc.setRemoteDescription(this.pc.remoteDescription, this.callback(this, "onSetRemoteDescriptionSuccess"), this.callback(this, "onSetRemoteDescriptionFailure"))) : (k.log("setLocalAndSendMessageonOfferUpdate : before setRemoteDescription - Promise version"), this.pc.setRemoteDescription(this.pc.remoteDescription).then(this.callback(this, "onSetRemoteDescriptionSuccess")).catch(this.callback(this, "onSetRemoteDescriptionFailure"))))
        }, this.onCreateOfferFailure = function(e) {
            k.info("onCreateOfferFailure" + e), e = null
        }, this.onCreateAnswerFailure = function(e) {
            k.info("onCreateAnswerFailure" + e), e = null
        }, this.setLocalAndSendMessage = function(e) {
            k.info("setLocalAndSendMessage"), k.log("sessionDescription.sdp = ", e.sdp), null !== this.pc ? (e = this.manipulateSDP(e), k.log("manipulated sessionDescription.sdp = ", e.sdp), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessage : before setLocalDescription"), this.pc.setLocalDescription(e, this.callback(this, "onSetLocalDescriptionSuccess"), this.callback(this, "onSetLocalDescriptionFailure"))) : (k.log("setLocalAndSendMessage : before setLocalDescription - Promise version"), this.pc.setLocalDescription(e).then(this.callback(this, "onSetLocalDescriptionSuccess")).catch(this.callback(this, "onSetLocalDescriptionFailure"))), this.sendedSdpOfferMessage = e, !0 === this.trickleIce && this.myWebRTC_Stack.send200OK(this.callId, this.callerId, this.calleeId, i.nickname, this.dest_roomId, e, this.data)) : k.log("setLocalAndSendMessage, pc no more exist")
        }, this.setLocalAndSendMessageUpdate = function(e) {
            if (null !== this.pc) {
                "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("setLocalAndSendMessageUpdate : before setLocalDescription"), this.pc.setLocalDescription(e, this.callback(this, "onSetLocalDescriptionSuccess"), this.callback(this, "onSetLocalDescriptionFailure"))) : (k.log("setLocalAndSendMessageUpdate : before setLocalDescription - Promise version"), this.pc.setLocalDescription(e).then(this.callback(this, "onSetLocalDescriptionSuccess")).catch(this.callback(this, "onSetLocalDescriptionFailure")));
                var t = 0;
                t = this.callee ? this.callerId : this.calleeId, this.myWebRTC_Stack.send200Update(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e, this.data)
            } else k.log("setLocalAndSendMessageUpdate, pc no more exist")
        }, this.onIceCandidate = function(e) {
            k.info("onIceCandidate");
            var t = 0,
                n = 0,
                a = 0;
            t = this.callee ? this.callerId : this.calleeId, null !== this.pc && (k.log("Ice Connection State is now : " + this.pc.iceConnectionState), k.log("Ice Gathering State is now : " + this.pc.iceGatheringState)), e.candidate ? !0 === this.trickleIce ? this.mediaRoutingMode === i.mediaRoutingModeEnum.hostOnly ? -1 !== (n = e.candidate.candidate.search("host")) ? this.myWebRTC_Stack.sendCandidate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e.candidate.sdpMLineIndex, e.candidate.sdpMid, e.candidate.candidate, this.data, e.candidate) : k.log("Media routing mode is hostOnly and not a HOST Candidate : ignoring message") : this.mediaRoutingMode === i.mediaRoutingModeEnum.stun ? (n = e.candidate.candidate.search("host"), a = e.candidate.candidate.search("srflx"), -1 !== n || -1 !== a ? this.myWebRTC_Stack.sendCandidate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e.candidate.sdpMLineIndex, e.candidate.sdpMid, e.candidate.candidate, this.data, e.candidate) : k.log("Media routing mode is stun and not a HOST or SRFLX Candidate : ignoring message")) : this.mediaRoutingMode === i.mediaRoutingModeEnum.stunOnly ? -1 !== (n = e.candidate.candidate.search("srflx")) ? this.myWebRTC_Stack.sendCandidate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e.candidate.sdpMLineIndex, e.candidate.sdpMid, e.candidate.candidate, this.data, e.candidate) : k.log("Media routing mode is stunOnly and not a SRFLX Candidate : ignoring message") : this.mediaRoutingMode === i.mediaRoutingModeEnum.turn ? (k.log("Media routing mode is turn : all condidates are considered"), this.myWebRTC_Stack.sendCandidate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e.candidate.sdpMLineIndex, e.candidate.sdpMid, e.candidate.candidate, this.data, e.candidate)) : this.mediaRoutingMode === i.mediaRoutingModeEnum.turnOnly && (-1 !== (n = e.candidate.candidate.search("relay")) ? this.myWebRTC_Stack.sendCandidate(this.callId, this.callerId, this.calleeId, this.dest_roomId, t, e.candidate.sdpMLineIndex, e.candidate.sdpMid, e.candidate.candidate, this.data, e.candidate) : k.log("Media routing mode is TurnOnly and not a RELAY Candidate : ignoring message")) : k.log("trickleIce is deactivated : candidates are not sended") : (k.log("End of candidates."), !1 === this.trickleIce && (!0 === this.callee ? (0 !== this.send200OKTrickleIceFalseTimeOutId && (clearTimeout(this.send200OKTrickleIceFalseTimeOutId), this.send200OKTrickleIceFalseTimeOutId = 0), !1 === this.message200OKSended ? this.myWebRTC_Stack.send200OK(this.callId, this.callerId, this.calleeId, i.nickname, this.dest_roomId, this.pc.localDescription, this.data) : k.log("200OK already sended")) : null !== this.pc && (this.myWebRTC_Stack.sendInvite(this.callId, this.callerId, i.nickname, this.dest_roomId, this.dest_roomId, this.pc.localDescription, this.callType, this.data, this.mcuRemoteStream), this.inviteSended = !0)))
        }, this.onRemoteStreamAdded = function(e) {
            k.info("Remote stream added."), k.log("CallId is :" + this.callId), k.log("ClientId is :" + i.clientId);
            var t = null,
                n = 0;
            n = this.callee ? this.callerId : this.calleeId, "undefined" == typeof apiRTC_React && (!0 === i.hideLocalVideoOnCall && i.localVideo && ("firefox" === i.myWebRTC_Adapter.webrtcDetectedBrowser ? "" !== i.localVideo.mozSrcObject && (i.localVideo.style.opacity = 0) : "" !== i.localVideo.src && (i.localVideo.style.opacity = 0)), i.transitionToActive(), i.remoteVideo && (i.remoteVideo.style.opacity = 1), t = document.createElement("video"), i.remoteVideo && (i.remoteVideo.appendChild(t), i.attachMediaStream(t, e.stream), t.autoplay = !0, t.id = "callId_" + this.callId + "-" + this.calleeId), t.oncanplay = i.myWebRTC_Event.createCanPlayRemoteVideoEvent(t.id, this.callType, n), i.remoteVideoDisplayManager()), !0 === this.screenSharing ? this.callType = "screenSharing" : !0 === this.audioOnly && (this.callType = "audio"), null !== this.data && "publish" === this.data.type && "passive" !== this.data.mode ? k.warn("Filtering Remote stream added event (behavior on Chrome 44), no remote stream on publish calls") : i.myWebRTC_Event.createRemoteStreamAddedEvent(this.callType, this.callId, e.stream, this.remoteId, this.destCallType)
        }, this.onRemoteTrackAdded = function(e) {
            k.info("Remote track added."), k.log("CallId is :" + this.callId), k.log("ClientId is :" + i.clientId), k.log("this.callType :" + this.callType);
            var t = null,
                n = 0;
            n = this.callee ? this.callerId : this.calleeId, !0 === i.hideLocalVideoOnCall && i.localVideo && ("firefox" === i.myWebRTC_Adapter.webrtcDetectedBrowser ? "" !== i.localVideo.mozSrcObject && (i.localVideo.style.opacity = 0) : "" !== i.localVideo.src && (i.localVideo.style.opacity = 0)), i.transitionToActive(), i.remoteVideo && (i.remoteVideo.style.opacity = 1), t = document.createElement("video"), i.remoteVideo && (i.remoteVideo.appendChild(t), i.attachMediaStream(t, e.streams[0]), t.autoplay = !0, t.id = "callId_" + this.callId + "-" + this.calleeId), !0 === this.screenSharing ? this.callType = "screenSharing" : !0 === this.audioOnly && (this.callType = "audio"), t.oncanplay = i.myWebRTC_Event.createCanPlayRemoteVideoEvent(t.id, this.callType, n), i.remoteVideoDisplayManager(), null !== this.data && "publish" === this.data.type && "passive" !== this.data.mode ? k.warn("Filtering Remote stream added event (behavior on Chrome 44), no remote stream on publish calls") : ("audio" === this.callType && "audio" === e.track.kind || "media" === this.callType && "video" === e.track.kind || "screenSharing" === this.callType && "video" === e.track.kind || "screenSharingWithAudio" === this.callType && "video" === e.track.kind) && i.myWebRTC_Event.createRemoteStreamAddedEvent(this.callType, this.callId, e.streams[0], this.remoteId, this.destCallType)
        }, this.onRemoteStreamRemoved = function(e) {
            k.warn("Remote stream removed :" + e), i.myWebRTC_Event.createRemoteStreamRemovedEvent(this.callType, this.callId, e.stream, this.remoteId, this.destCallType), e = null
        }, this.onNegotiationNeeded = function(e) {
            k.info("onNegotiationNeeded :" + e), e = null, this.addingDataChannelOnCallOngoing && (this.updateMedia(!1), this.addingDataChannelOnCallOngoing = !1)
        }, this.onSignalingStateChange = function(e) {
            k.info("onSignalingStateChange :" + e), e = null
        }, this.onCallDisconnection = function() {
            k.info("disconnectionManagement this.callId :" + this.callId), k.info("Call Disconnection timer reached, call is removed, callId is :" + this.callId);
            var e = new Date,
                n = null,
                a = [];
            k.debug("date :" + e), e = null, i.removeCallFromTableWithCallIdAndSendBye(this.callId, "Ice_disconnected"), 0 !== this.disconnectionWarningInterval && (k.debug("date :" + e), k.debug("clearing disconnectionWarningInterval"), clearInterval(this.disconnectionWarningInterval), this.disconnectionWarningInterval = 0), 0 !== this.disconnectionWarningTimeout && (k.debug("date :" + e), k.debug("clearing disconnectionWarningTimeout"), clearTimeout(this.disconnectionWarningTimeout), this.disconnectionWarningTimeout = 0), "publish" === this.data.type && this.data.mode === t ? (k.log("call was a publish, trying call restarting ..."), k.log("this.data.type :" + this.data.type), k.log("this.dest_roomId :" + this.dest_roomId), k.log("this.callType :" + this.callType), "screenSharing" === this.callType || "screenSharingWithAudio" === this.callType ? d.session.apiCCWebRTCClient.publishScreen(this.dest_roomId, this.captureSourceType) : d.session.apiCCWebRTCClient.publish(this.dest_roomId, "restarted", null, this.audioOnly), c.createEvent({
                eventType: "callRestarting",
                dataType: this.data.type,
                "destRoom ": this.dest_roomId,
                "callType ": this.callType
            })) : ("subscribe" === this.data.type || "publish" === this.data.type && "passive" === this.data.mode) && (k.log("call was a subscribe, trying call restarting ..."), k.log("this.streamId :" + this.streamId), null !== (n = d.session.apiCCWebRTCClient.getStreamFromList(this.streamId)) ? (a.push(n), d.session.apiCCWebRTCClient.subscribe(a, this.audioOnly)) : k.log("stream not found"), c.createEvent({
                eventType: "callRestarting",
                dataType: this.data.type,
                "streamId ": this.streamId,
                "audioOnly ": this.audioOnly,
                "callType ": this.callType
            }))
        }, this.sendDisconnectionWarning = function() {
            if (k.log("sendDisconnectionWarning()"), this.disconnectionWarningCount++, c.createEvent({
                    eventType: "disconnectionWarning",
                    callId: this.callId,
                    remoteId: this.remoteId,
                    tries: this.disconnectionWarningCount
                }), (this.disconnectionWarningCount - 1) * this.disconnectionWarningDelay >= this.disconnectionTimer && 0 !== this.disconnectionWarningInterval) {
                var e = Date();
                k.debug("date :" + e), k.debug("clearing disconnectionWarningInterval : no more warnings"), clearInterval(this.disconnectionWarningInterval), this.disconnectionWarningInterval = 0
            }
        }, this.onIceConnectionStateChange = function(e) {
            k.info("onIceConnectionStateChange :" + e), e = null;
            var t = 0;
            null !== this.pc ? (k.log("Ice Connection State is now : " + this.pc.iceConnectionState), this.iceState = this.pc.iceConnectionState, "connected" === this.pc.iceConnectionState || "completed" === this.pc.iceConnectionState || "checking" === this.pc.iceConnectionState ? (k.debug("iceConnectionState === connected or completed or checking"), k.debug("this.disconnectionTimeoutId :" + this.disconnectionTimeoutId), 0 !== this.disconnectionTimeoutId && (t = Date(), k.debug("date :" + t), k.debug("clearing disconnectionTimeout"), clearTimeout(this.disconnectionTimeoutId), this.disconnectionTimeoutId = 0), 0 !== this.disconnectionWarningInterval && (t = Date(), k.debug("date :" + t), k.debug("clearing disconnectionWarningInterval"), clearInterval(this.disconnectionWarningInterval), this.disconnectionWarningInterval = 0), "checking" !== this.pc.iceConnectionState && (this.checkCandidateTypesTimeoutId = setTimeout(this.callback(this, "checkCandidateTypes"), this.checkCandidateTypesTimer), this.checkCandidateTypesTimeoutTable.push(this.checkCandidateTypesTimeoutId))) : "disconnected" === this.pc.iceConnectionState ? (k.warn("disconnection detected"), c.createErrorEvent("iceDisconnection detected", "ICE_CONNECTION_STATE_DISCONNECTED"), t = new Date, k.debug("date :" + t), this.disconnectionTimeoutId = setTimeout(this.callback(this, "onCallDisconnection"), this.disconnectionTimer), this.disconnectionWarningCount = 0, this.disconnectionWarningTimeout = setTimeout(this.callback(this, "sendDisconnectionWarning"), 2e3), this.disconnectionWarningInterval = setInterval(this.callback(this, "sendDisconnectionWarning"), this.disconnectionWarningDelay)) : "failed" === this.pc.iceConnectionState && (k.warn("iceConnection failed detected"), c.createErrorEvent("iceConnection failed detected", "ICE_CONNECTION_STATE_FAILED"), 0 !== this.disconnectionTimeoutId ? k.debug("call disconnection timer ongoing") : (k.warn("Removing call with callId :" + this.callId), i.removeCallFromTableWithCallIdAndSendBye(this.callId, "Ice_failed")))) : k.log("Ice Connection State change with pc is null")
        }, this.callback = function(e, t) {
            return this.closureHandler = function(i, n) {
                return e[t](i, n)
            }, this.closureHandler
        }, this.onSelectedCandidate = function(e) {
            k.info("WebRTC_Call::onSelectedCandidate()"), this.myWebRTC_Event.createSelectedICECandidateEvent(this.callId, e.LocalCandidateType, e.RemoteCandidateType, e.LocalAddress, e.RemoteAddress, e.TransportType, e.LocalTransportType);
            var t = e;
            t.callId = this.callId, t.clientId = i.clientId, this.myWebRTC_Stack.sendInfo("callSelectedCandidate", t)
        }, this.checkCandidateTypes = function() {
            k.info("WebRTC_Call::checkCandidatesTypes()");
            var t = this,
                i = {
                    LocalCandidateType: "unknow",
                    RemoteCandidateType: "unknow",
                    LocalAddress: "unknow",
                    RemoteAddress: "unknow",
                    TransportType: "unknow",
                    LocalTransportType: "unknow"
                },
                n = ["googLocalAddress", "googLocalCandidateType", "googRemoteAddress", "googRemoteCandidateType", "googTransportType"];
            if (null === this.pc) k.warn("Peer connection is null : no candidates"), t.myWebRTC_Event.createICECandidateTypeUpdateEvent(t.callId, i.LocalCandidateType, i.RemoteCandidateType), t.onSelectedCandidate(i);
            else if (e.chrome) this.pc.getStats(function(e) {
                var a = e.result().filter(function(e) {
                    return 0 === e.id.indexOf("Conn-audio") && "true" === e.stat("googActiveConnection") || 0 === e.id.indexOf("Conn-video") && "true" === e.stat("googActiveConnection")
                })[0];
                a ? (n.forEach(function(e) {
                    i[e.replace("goog", "")] = a.stat(e)
                }), t.myWebRTC_Event.createICECandidateTypeUpdateEvent(t.callId, i.LocalCandidateType, i.RemoteCandidateType), t.onSelectedCandidate(i)) : (t.myWebRTC_Event.createICECandidateTypeUpdateEvent(t.callId, i.LocalCandidateType, i.RemoteCandidateType), t.onSelectedCandidate(i))
            });
            else {
                if (navigator.userAgent.search("Firefox") > -1) return this.pc.getStats(null).then(function(e) {
                    var n = e[Object.keys(e).filter(function(t) {
                            return e[t].selected
                        })[0]],
                        a = e[n.localCandidateId],
                        s = e[n.remoteCandidateId];
                    i.LocalCandidateType = a.candidateType, i.RemoteCandidateType = s.candidateType, i.LocalAddress = a.ipAddress + ":" + a.portNumber, i.RemoteAddress = s.ipAddress + ":" + s.portNumber, i.TransportType = a.transport, i.LocalTransportType = a.mozLocalTransport, t.myWebRTC_Event.createICECandidateTypeUpdateEvent(t.callId, i.LocalCandidateType, i.RemoteCandidateType), t.onSelectedCandidate(i)
                });
                t.myWebRTC_Event.createICECandidateTypeUpdateEvent(t.callId, i.LocalCandidateType, i.RemoteCandidateType), t.onSelectedCandidate(i)
            }
        }
    }, g = function(i) {
        function n(e, t, i) {
            var n = e.width,
                a = n << 2,
                s = e.height,
                o = null,
                l = 0,
                r = 0,
                c = 0,
                d = 0,
                h = 0,
                u = 0,
                C = 0,
                p = 0,
                g = 0,
                m = 0,
                f = 0,
                v = 0,
                T = 0,
                I = 0,
                b = 0,
                S = 0,
                R = 0;
            if (t) {
                for (o = t.data, i < 0 && (i = 0), p = 1 - ((h = (2.44413 * (l = i >= 2.5 ? .98711 * i - .9633 : i >= .5 ? 3.97156 - 4.14554 * Math.sqrt(1 - .26891 * i) : 2 * i * (3.97156 - 4.14554 * Math.sqrt(.865545))) + 2.85619 * (r = l * l) + 1.26661 * (c = r * l)) / (d = 1.57825 + 2.44413 * l + 1.4281 * r + .422205 * c)) + (u = -(1.4281 * r + 1.26661 * c) / d) + (C = .422205 * c / d)), g = 0; g < 3; g++)
                    for (m = 0; m < s; m++) {
                        for (v = m * a + (n - 1 << 2) + g, S = b = I = T = o[f = m * a + g], f = m * a + g; f <= v; f += 4) T = p * o[f] + h * I + u * b + C * S, o[f] = T, S = b, b = I, I = T;
                        for (v = m * a + g, S = b = I = T = o[f = m * a + (n - 1 << 2) + g], f = m * a + (n - 1 << 2) + g; f >= v; f -= 4) T = p * o[f] + h * I + u * b + C * S, o[f] = T, S = b, b = I, I = T
                    }
                for (g = 0; g < 3; g++)
                    for (R = 0; R < n; R++) {
                        for (v = (s - 1) * a + (R << 2) + g, S = b = I = T = o[f = (R << 2) + g], f = (R << 2) + g; f <= v; f += a) T = p * o[f] + h * I + u * b + C * S, o[f] = T, S = b, b = I, I = T;
                        for (v = (R << 2) + g, S = b = I = T = o[f = (s - 1) * a + (R << 2) + g], f = (s - 1) * a + (R << 2) + g; f >= v; f -= a) T = p * o[f] + h * I + u * b + C * S, o[f] = T, S = b, b = I, I = T
                    }
                return t
            }
        }

        function a(e) {
            return new RegExp("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$", "i").test(e)
        }
        this.localVideo = null, this.miniVideo = null, this.remoteVideo = null, this.localStream = null, this.statusDiv = null, this.commandDiv = null, this.remoteStream = null, this.channelReady = !1, this.socket = i.channel.socket, this.clientId = i.apiCCId, this.apiKey = i.apiKey, this.isVideoMuted = !1, this.isAudioMuted = !1, this.callURLDestRoom = 0, this.addingUserMedia = !1, this.callsTable = [], this.accessToLocalMedia = !1, this.unidirectionelCallOnly = !1, this.NtoNConf = !1, this.autoAnswer = !1, this.RTPMedia = !1, this.logoAdded = !1, this.preferOpusCodec = !1, this.preferVP9Codec = !1, typeof apiRTC_React !== t && "iOS" === b ? (k.log("React and iOS : Setting H264 as preferred codec"), this.preferH264Codec = !0) : this.preferH264Codec = !1, this.preferSendingH264Codec = !1, this.setStereo = !1, this.selectedLocalStream = null, this.allowedAudioCodecs = "", this.allowedVideoCodecs = "", this.mediaRoutingModeEnum = {
            hostOnly: 1,
            stun: 2,
            stunOnly: 3,
            turn: 4,
            turnOnly: 5
        }, this.mediaRoutingMode = this.mediaRoutingModeEnum.turn, this.myWebRTC_Event = new r, this.myWebRTC_Adapter = new C, this.getUserMediaOnGoing = !1, this.userAcceptOnIncomingCall = !1, this.userAcceptOnIncomingDataCall = !1, this.maxWidthRemoteVideo = 0, this.maxHeightRemoteVideo = 0, this.nickname = i.nickname, this.hideLocalVideoOnCall = !0, this.allowMultipleCalls = !1, this.mySDPManager = new m, this.MCUClient = new R(this, this.clientId), this.audioSourceId = null, this.audioOutputId = null, this.videoSourceId = null, this.apiRTCExtensionInstalled = !1, this.trickleIce = !0, this.waitingShareScreenCallId = 0, this.waitingShareScreenDestNumber = 0, this.waitingCaptureSourceType = null, this.qosEnable = !1, this.qosInterval = 5e3, this.csmEnable = !1, this.csmIntervalMs = 5e3, this.recordedCall = !1, this.audioBandwidth = null, this.videoBandwidth = null, this.dataBandwidth = null, this.pc_config = "", "Edge" === f && this.myWebRTC_Adapter.webrtcDetectedVersion >= 15 ? this.gum_config = {
            audio: !0,
            video: !0
        } : this.gum_config = {
            audio: {
                mandatory: {},
                optional: []
            },
            video: {
                mandatory: {},
                optional: []
            }
        }, this.audioDevicePresent = !1, this.videoDevicePresent = !1, this.videoOutputPresent = !1, this.userMediaErrorDetected = !1, this.lastUsedUserMediaConstraint = null, this.mediaTypeForIncomingCall = "VIDEO", this.mediaTypeForOutgoingCall = "VIDEO", this.allowAsymetricMediaCalls = !1, k.log("this.myWebRTC_Adapter.webrtcDetectedBrowser :" + this.myWebRTC_Adapter.webrtcDetectedBrowser), "firefox" === this.myWebRTC_Adapter.webrtcDetectedBrowser ? (k.log("createPeerConnection FIREFOX"), k.log("webrtcDetectedVersion : " + this.myWebRTC_Adapter.webrtcDetectedVersion), this.myWebRTC_Adapter.webrtcDetectedVersion < 38 ? this.pc_config = {
            iceServers: [{
                url: "stun:mp1.apizee.com:443",
                credential: "password",
                username: "anonymous"
            }, {
                url: "turn:mp1.apizee.com:443",
                credential: "password",
                username: "anonymous"
            }]
        } : this.myWebRTC_Adapter.webrtcDetectedVersion >= 42 ? this.pc_config = {
            iceServers: [{
                urls: ["turn:mp1.apizee.com:443?transport=udp", "turn:mp1.apizee.com:443?transport=tcp"],
                credential: "password",
                username: "anonymous"
            }]
        } : this.pc_config = {
            iceServers: [{
                urls: "turn:mp1.apizee.com:443?transport=tcp",
                credential: "password",
                username: "anonymous"
            }, {
                url: "turn:mp1.apizee.com:443?transport=tcp",
                credential: "password",
                username: "anonymous"
            }]
        }) : "IE" === f || "Safari" === f && T < 11 ? (k.log("Browser is :" + f + " - using Plugin"), this.pc_config = {
            iceServers: [{
                url: "stun:mp1.apizee.com:443",
                credential: "password",
                username: "anonymous"
            }, {
                url: "turn:mp1.apizee.com:443",
                credential: "password",
                username: "anonymous"
            }]
        }) : "Safari" === f && T >= 11 || "Mobile Safari" === f ? (k.log("Browser is :" + f + " , version:" + T), this.pc_config = {
            iceServers: [{
                urls: ["turns:mp1.apizee.com:443?transport=udp", "turns:mp1.apizee.com:443?transport=tcp", "turn:mp1.apizee.com:443?transport=udp", "turn:mp1.apizee.com:443?transport=tcp"],
                credential: "password",
                username: "anonymous"
            }]
        }) : this.myWebRTC_Adapter.webrtcDetectedVersion < 28 ? (k.log("chrome < 28"), k.log("webrtcDetectedVersion : " + this.myWebRTC_Adapter.webrtcDetectedVersion), this.pc_config = {
            iceServers: [{
                url: "turn:anonymous@mp1.apizee.com:443",
                credential: "password"
            }]
        }) : (k.log("chrome >= 28"), this.myWebRTC_Adapter.webrtcDetectedVersion < 30 ? (k.log("webrtcDetectedVersion : " + this.myWebRTC_Adapter.webrtcDetectedVersion), this.pc_config = {
            iceServers: [{
                url: "turn:mp1.apizee.com:443?transport=tcp",
                credential: "password",
                username: "anonymous"
            }]
        }) : (k.log("webrtcDetectedVersion : " + this.myWebRTC_Adapter.webrtcDetectedVersion), this.pc_config = {
            iceServers: [{
                urls: ["turns:mp1.apizee.com:443?transport=udp", "turns:mp1.apizee.com:443?transport=tcp", "turn:mp1.apizee.com:443?transport=udp", "turn:mp1.apizee.com:443?transport=tcp"],
                credential: "password",
                username: "anonymous"
            }]
        })), this.pc_constraints = {
            optional: []
        }, this.recordMgr = null, k.log("record feature is activated"), this.recordMgr = new w(this), this.initialize = function(e, t, i, n, a) {
            this.localVideo = document.getElementById(e), null === this.localVideo && k.log("localVideo Div Name is not correct : INCORRECT_DIV_NAME_LOCALVIDEO"), this.miniVideo = document.getElementById(t), null === this.miniVideo && k.log("miniVideo Div Name is not correct : INCORRECT_DIV_NAME_MINIVIDEO"), this.remoteVideo = document.getElementById(i), null === this.remoteVideo && k.log("remoteVideo Div Name is not correct : INCORRECT_DIV_NAME_REMOTEVIDEO"), this.statusDiv = document.getElementById(n), null === this.statusDiv && k.log("status Div Name is not correct : INCORRECT_DIV_NAME_STATUS"), this.commandDiv = document.getElementById(a), null === this.commandDiv ? k.log("command Div Name is not correct : INCORRECT_DIV_NAME_COMMAND") : (k.log("Command buttons are managed by ApiRTC"), this.displayCallButtonInCommand()), this.callURLDestRoom = this.checkURLForCallDestination(), 0 !== this.callURLDestRoom && (k.log("callURLDestRoom is not null"), this.callperURL(this.callURLDestRoom), this.callURLDestRoom = 0), this.initMediaElementState(), this.setStatus("<div>Your phone is registered, you can be reached at this number : " + this.clientId + "</div>")
        }, this.getMediaDevices = function(e) {
            if (k.info("getMediaDevices"), navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) k.log("enumerateDevices() is supported."), navigator.mediaDevices.enumerateDevices().then(e).catch(function(e) {
                k.log("navigator.mediaDevices.enumerateDevices error: ", e), e = null
            });
            else if (k.log("enumerateDevices() not supported."), "undefined" == typeof MediaStreamTrack) e(null), k.warn("This browser does not support MediaStreamTrack");
            else try {
                MediaStreamTrack.getSources(e)
            } catch (t) {
                k.debug("catch MediaStreamTrack.getSources :" + t), e(null)
            }
        }, this.gotSources = function(e) {
            k.info("MediaDevices detection in webRTCClient");
            var t = 0,
                i = null,
                n = {};
            if (null !== e)
                for (t = 0; t != e.length; ++t) k.trace("i =" + t), "audio" === (i = e[t]).kind || "audioinput" === i.kind ? d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent || (k.log("Audio device present"), d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent = !0) : "video" === i.kind || "videoinput" === i.kind ? d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent || (k.log("Video device present"), d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent = !0) : "audiooutput" === i.kind ? d.session.apiCCWebRTCClient.webRTCClient.videoOutputPresent || (k.log("Audio output present"), d.session.apiCCWebRTCClient.webRTCClient.videoOutputPresent = !0) : k.log("Some other kind of source: ", i);
            else k.warn("Media detection is not supported by browser, considering micro and camera present"), d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent = !0, d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent = !0, d.session.apiCCWebRTCClient.webRTCClient.videoOutputPresent = !0;
            k.log("Audio device detected :" + d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent), k.log("Video device detected :" + d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent), !1 === d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent ? !1 === d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent ? c.createErrorEvent("Video device is not present", "NO_AUDIO_NO_VIDEO_DEVICE") : c.createErrorEvent("Audio device is not present", "NO_AUDIO_DEVICE") : !1 === d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent && c.createErrorEvent("Video device is not present", "NO_VIDEO_DEVICE"), !1 === d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent && (d.session.apiCCWebRTCClient.webRTCClient.gum_config.audio = !1), !1 === d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent && (d.session.apiCCWebRTCClient.webRTCClient.gum_config.video = !1), !1 === d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent && !1 === d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent && (d.session.apiCCWebRTCClient.webRTCClient.unidirectionelCallOnly = !0), k.log("apiCC.session.apiCCWebRTCClient.webRTCClient.gum_config:", d.session.apiCCWebRTCClient.webRTCClient.gum_config), n.audioDevicePresent = d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent, n.videoDevicePresent = d.session.apiCCWebRTCClient.webRTCClient.videoDevicePresent, d.session.setUserData(n), c.createWebRTCClientCreatedEvent()
        }, this.attachMediaStream = function(e, t) {
            k.info("attachMediaStream"), null !== e ? (void 0 !== e.srcObject ? e.srcObject = t : void 0 !== e.mozSrcObject ? e.mozSrcObject = t : void 0 !== e.src ? "Chrome" === f && T < 46 ? (k.log("Attaching media stream for Chrome < 46"), e.src = webkitURL.createObjectURL(t)) : e.src = URL.createObjectURL(t) : k.error("Error attaching stream to element."), "iOS" === I.name && (k.info("iOS detected"), e.setAttribute("playsinline", "true"))) : k.log("videoElt is null")
        }, this.activateScreenSharing = function(i) {
            k.info("activateScreenSharing");
            var n = null;
            i !== t ? k.log("extensionId is defined :" + i) : (k.log("using apizee extension's Id"), i = "mjjnofoemoepfididplbfimokpnpcoeg"), "chrome" === this.myWebRTC_Adapter.webrtcDetectedBrowser ? null !== document.getElementById(i) ? (k.log("extensionLink is present, screenSharing is already activated"), e.postMessage("apiRTC-extension", "*")) : (k.log("screenSharing is not yet activated"), (n = document.createElement("link")).href = "https://chrome.google.com/webstore/detail/" + i, n.rel = "chrome-webstore-item", n.id = i, document.getElementsByTagName("head")[0].appendChild(n), e.postMessage("apiRTC-extension", "*"), e.addEventListener("message", function(i) {
                k.log("message : event :" + JSON.stringify(i.data)), k.log("message : event :" + i.data.desktopId);
                var n = d.session.apiCCWebRTCClient.webRTCClient,
                    a = null;
                i.origin == e.location.origin && ("apiRTC-DeskstopCapture-loaded" == i.data && (n.apiRTCExtensionInstalled = !0), i.data.desktopId !== t && "mediaError" !== i.data.desktopId && "ApizeeAPI" !== i.data.callNumber && (k.log("event.data.desktopId :" + i.data.desktopId), k.log("event.data.callNumber :" + i.data.callNumber), k.log("event.data.remoteId :" + i.data.remoteId), k.log("callId is :" + i.data.callNumber), null !== (a = n.findCallWithCallId(i.data.callNumber)) && ("LOCAL" !== a.calleeId && n.setStatus("Calling Destination number :" + a.calleeId), a.desktopId = i.data.desktopId, k.log("call.callType :" + a.callType), "screenSharing" === a.callType || "screenSharingWithAudio" === a.callType ? a.getUserMediaOnCall() : (k.log("trying to add a screen stream in a media call"), a.getScreenUserMediaOnCall()))), "mediaError" == i.data.desktopId && (k.log("desktop Capture has been refused by user or you need to be connected using https"), k.log("event.data.remoteId :" + i.data.remoteId), "screenSharing" === (a = n.findCallWithCallId(i.data.callNumber)).callType || "screenSharingWithAudio" === a.callType ? n.removeCallFromTableWithCallIdandRemoteId(i.data.callNumber, i.data.remoteId, "Media_Error") : k.log("switch video / screen : call is not removed"), "https:" != e.location.protocol && k.log("Please connect to your web page using 'HTTPS'. This is mandatory for desktop capture"), c.createDesktopCaptureEvent("UserMediaError", i.data.callNumber, i.data.remoteId)), "extensionInstalledAndLoaded" == i.data && (k.log("extensionInstalledAndLoaded"), k.log("this.waitingShareScreenCallId :" + n.waitingShareScreenCallId), 0 !== n.waitingShareScreenCallId && (n.waitingCaptureSourceType !== t && null !== n.waitingCaptureSourceType || (n.waitingCaptureSourceType = ["screen", "window", "tab", "audio"]), e.postMessage({
                    command: "getDesktopId",
                    callNumber: n.waitingShareScreenCallId,
                    remoteId: n.waitingShareScreenDestNumber,
                    captureSourceType: n.waitingCaptureSourceType,
                    browser_major_version: T
                }, "*"), n.waitingShareScreenCallId = 0, n.waitingShareScreenDestNumber = 0, n.waitingCaptureSourceType = null)))
            })) : (k.log("activateScreenSharing is only available for chrome Browser"), c.createDesktopCaptureEvent("Browser_Not_Compatible", null, null))
        }, this.setGetUserMediaConfig = function(e) {
            this.gum_config = e
        }, this.getUserMedia = function() {
            var e = null;
            k.info("webrtcDetectedVersion :" + this.myWebRTC_Adapter.webrtcDetectedVersion);
            try {
                null === this.audioSourceId && null === this.videoSourceId ? e = this.gum_config : (!1 !== this.audioDevicePresent && null !== this.audioSourceId && (this.gum_config.audio.optional = [{
                    sourceId: this.audioSourceId
                }]), !1 !== this.videoDevicePresent && null !== this.videoSourceId && (this.gum_config.video.optional = [{
                    sourceId: this.videoSourceId
                }]), e = this.gum_config), k.log("getUserMedia with userMediaConstraint :" + JSON.stringify(e)), this.lastUsedUserMediaConstraint = e, navigator.mediaDevices !== t && navigator.mediaDevices.getUserMedia !== t ? (k.log("getUserMedia with promises"), k.log("userMediaConstraint :", e), navigator.mediaDevices.getUserMedia(e).then(this.callback(this, "onUserMediaSuccess")).catch(this.callback(this, "onUserMediaError"))) : (k.log("getUserMedia without promises"), this.myWebRTC_Adapter.getUserMedia(e, this.callback(this, "onUserMediaSuccess"), this.callback(this, "onUserMediaError")))
            } catch (e) {
                alert("getUserMedia() failed. Is this a WebRTC capable browser?"), k.log("getUserMedia failed with exception: " + e.message)
            }
        }, this.onUserMediaSuccess = function(e) {
            k.info("User has granted access to local media."), this.accessToLocalMedia = !0;
            var t = !1,
                i = "Unknown",
                n = !1,
                a = "Unknown";
            this.miniVideo && this.attachMediaStream(this.miniVideo, e), this.localVideo && (this.attachMediaStream(this.localVideo, e), this.localVideo.style.opacity = 1), this.localStream = e, e.getAudioTracks().length > 0 && (t = !0, e.getAudioTracks()[0].label && (i = e.getAudioTracks()[0].label), k.log("Using audio device: " + i)), e.getVideoTracks().length > 0 && (n = !0, e.getVideoTracks()[0].label && (a = e.getVideoTracks()[0].label), k.log("Using video device: " + a)), this.myWebRTC_Event.createUserMediaSuccessEvent(!1, t, i, n, a, "media", null, e, null, !1)
        }, this.onUserMediaError = function(t) {
            k.info("Failed to get access to local media. Error : ", t), k.error(t), t = null, this.accessToLocalMedia = !1, k.log("this.myWebRTC_Adapter.webrtcDetectedVersion :" + this.myWebRTC_Adapter.webrtcDetectedVersion), "Chrome" === f && this.myWebRTC_Adapter.webrtcDetectedVersion > 47 && (k.log("browser_version > 47"), "https:" != e.location.protocol && alert("HTTPS is now mandatory to use getUserMedia()")), this.myWebRTC_Event.createUserMediaErrorEvent(!1, "media"), !0 === d.session.tryAudioCallAfterUserMediaError ? (k.log("this.lastUsedUserMediaConstraint :", this.lastUsedUserMediaConstraint), k.log("this.lastUsedUserMediaConstraint.video :", this.lastUsedUserMediaConstraint.video), !1 !== this.lastUsedUserMediaConstraint.video ? (k.log("this.lastUsedUserMediaConstraint.audio :", this.lastUsedUserMediaConstraint.audio), k.log("UserMediaError, Trying to getUserMedia with audioOnly"), this.videoSourceId = null, this.gum_config.video = !1, this.getUserMedia()) : k.log("onUserMediaError without video")) : k.log("try AudioCall after UserMediaError is not activated")
        }, this.checkDestCallTypeWithSDP = function(e, i) {
            k.info("checkDestCallTypeWithSDP");
            var n = !0,
                a = !0,
                s = null,
                o = !1,
                l = !1,
                r = !1,
                c = null,
                d = !1,
                h = !1,
                u = !0,
                C = !0;
            (c = this.mySDPManager.getAudioMediaDescriptionPart(e)) !== t && null !== c ? !1 === (d = this.mySDPManager.searchSDPForRecvOnly(c)) && (h = this.mySDPManager.searchSDPForInactive(c)) : n = !1, (s = this.mySDPManager.getVideoMediaDescriptionPart(e)) !== t ? (o = this.mySDPManager.searchSDPForRecvOnly(s), l = this.mySDPManager.searchSDPForSendOnly(s), !1 === o && 0 == l && (r = this.mySDPManager.searchSDPForInactive(s))) : a = !1, k.log("videoPresent :" + a), !0 !== d && !0 !== h && !1 !== n || (k.log("Remote is not sending audio"), u = !1), !0 !== o && !0 !== r && !1 !== a || (k.log("Remote is not sending video"), C = !1), i.destCallType = !0 === u ? !0 === C ? "media" : "audioOnly" : !0 === C ? "videoOnly" : "none", k.log("call.destCallType :" + i.destCallType), !0 === i.callee && !0 === l && (i.userMediaAccessRequired = !1, i.mediaTypeForOutgoingCall = "NONE", k.log("access to user media not required"))
        }, this.processInvite = function(e) {
            k.info("processInvite() - invite received from :" + e.callerId);
            var i = 0,
                n = null,
                a = 0;
            if (e.data !== t && "publish" === e.data.type && "passive" === e.data.mode) {
                if ((n = this.findCallWithCallIdAndRemoteId(e.callId, e.callerId)) === t) return void k.error("cannot find call; callId: " + e.callId + ", callerId: " + e.callerId)
            } else(n = new p(this)).callId = e.callId, n.callerId = e.callerId, n.calleeId = this.clientId, n.callee = !0, n.remoteId = e.callerId;
            if (n.dest_roomId = e.roomId, n.data = e.data, n.receivedSdpOfferMessage = e.sdpoffer, e.data !== t && "sipConnector" === e.data.pubSub && (n.trickleIce = !1, n.remoteType = "sip"), e.data !== t && "publish" === e.data.type && "passive" === e.data.mode && e.stream !== t && e.stream.id !== t && (n.streamId = e.stream.id, k.log("call.streamId: " + n.streamId)), n.checkDTLSCompliancy(), i = this.callsTable.length, k.log("processInvite() - Actual call Number is :" + i), "screenSharing" === e.callType || "screenSharingWithAudio" === e.callType) n.screenSharing = !0, n.callType = e.callType;
            else if ("data" === e.callType);
            else if (!1 === this.allowMultipleCalls) {
                for (k.log("processInvite() - Refusing double call checking ..."), a = 0; a < i; a += 1)
                    if ("screenSharing" !== this.callsTable[a].callType && "screenSharingWithAudio" !== this.callsTable[a].callType && "data" !== this.callsTable[a].callType) return k.log("processInvite() - Refusing double call"), i = this.callsTable.push(n), this.myWebRTC_Event.createCallAttemptEvent(this.clientId, e.callerId, e.callerNickname, n.callId), void this.refuseCall(n.callId, "User_Busy");
                k.log("NOT Refusing double call")
            }
            i = this.callsTable.push(n), k.log("processInvite() - New call Number is :" + i), "audio" === e.callType && (n.audioOnly = !0, k.log("Call is audio only"), n.callType = "audio"), this.checkDestCallTypeWithSDP(e.sdpoffer.sdp, n), !0 === this.autoAnswer && this.displayHangUpButtonInCommand(), "data" === e.callType ? (k.log("Receiving DATA call"), n.callType = "data", n.dataCall = !0, this.setStatus("Incoming data Call from ongoing :" + e.callerId), this.userAcceptOnIncomingDataCall || n.onUserMediaSuccessTestUni(), this.myWebRTC_Event.createIncomingCallEvent(this.clientId, e.callerId, e.callerNickname, n.callId, !1, i, !1, e.callType, !1, n.remoteType, n.destCallType)) : !1 === n.userMediaAccessRequired || this.unidirectionelCallOnly || !0 === n.screenSharing ? (this.unidirectionelCallOnly && this.setStatus("You are connected to " + e.callerId + ', your audio and video media are not transmitted. <input type="button" id="AddMedia" value="Activate Audio & Video" onclick="apiCC.session.apiCCWebRTCClient.addMedia(' + n.callId + ')" />'), !0 === n.screenSharing ? (this.setStatus("Screensharing session activated, accepting unidirectionnel call"), n.onUserMediaSuccessTestUni()) : this.userAcceptOnIncomingCall ? k.log("processInvite() - Waiting for call accept or refuse from user") : (k.log("processInvite() - userAcceptOnIncomingCall is not activated"), n.onUserMediaSuccessTestUni()), this.myWebRTC_Event.createIncomingCallEvent(this.clientId, e.callerId, e.callerNickname, n.callId, !1, i, !1, e.callType, !1, n.remoteType, n.destCallType)) : !0 !== this.accessToLocalMedia && null === this.selectedLocalStream || !0 !== this.autoAnswer ? (this.setStatus("Incoming Call from :" + e.callerId + '. Click on "Autoriser" button to accept.'), !0 === n.audioOnly && !1 === d.session.apiCCWebRTCClient.webRTCClient.audioDevicePresent ? (k.log("processInvite() - audio and video media are not transmitted"), this.setStatus("You are connected to " + e.callerId + ', your audio and video media are not transmitted. <input type="button" id="AddMedia" value="Activate Audio & Video" onclick="apiCC.session.apiCCWebRTCClient.addMedia(' + n.callId + ')" />'), n.onUserMediaSuccessTestUni()) : (k.debug("processInvite() - call.getUserMediaOnCall()"), k.log("processInvite() - this.autoAnswer :" + this.autoAnswer), k.log("processInvite() - this.selectedLocalStream :" + this.selectedLocalStream), n.getUserMediaOnCall()), this.myWebRTC_Event.createIncomingCallEvent(this.clientId, e.callerId, e.callerNickname, n.callId, !1, i, n.audioOnly, e.callType, !1, n.remoteType, n.destCallType)) : (this.setStatus("You are connected to :" + e.callerId), k.log("processInvite() - User has already granted access to local media and AutoAnswer activated : establishing call"), this.userAcceptOnIncomingCall ? k.log("processInvite() - Waiting for call accept or refuse from user") : (k.log("processInvite() - userAcceptOnIncomingCall is not activated"), n.establishCall()), this.myWebRTC_Event.createIncomingCallEvent(this.clientId, e.callerId, e.callerNickname, n.callId, !0, i, n.audioOnly, e.callType, !1, n.remoteType, n.destCallType))
        }, this.process200OK = function(e) {
            k.info("200OK received from :" + e.calleeId);
            var i = null,
                n = null,
                a = null,
                o = 0,
                l = null;
            if (null === (i = this.findCallWithCallIdAndRemoteId(e.callId, e.calleeId))) {
                if (null === (n = this.findCallWithCallId(e.callId))) return k.log("200OK received but callId is not matching, no process"), void this.myWebRTC_Event.createErrorEvent("200OK received but callId is not matching, no process", "NOT_MATCHING_CALLID_ON_200OK");
                k.log("200OK received with an existing callID but not calleeId, creation of new conference call"), (a = new p(this)).callId = e.callId, a.callerId = e.callerId, a.calleeId = e.calleeId, a.dest_roomId = e.roomId, a.callee = !1, a.remoteId = e.calleeId, a.createPeerConnection(), a.sendedSdpOfferMessage = n.sendedSdpOfferMessage, a.audioOnly = !1, i.checkDTLSCompliancy();
                try {
                    a.callLocalStream = new webkitMediaStream(n.callLocalStream.getAudioTracks(), n.callLocalStream.getVideoTracks())
                } catch (e) {
                    k.log("callLocalStream copy for Chrome 26"), a.callLocalStream = new webkitMediaStream(n.callLocalStream), k.log("call3.callLocalStream" + a.callLocalStream)
                }
                a.generatedLocalStream = !0, a.started = !0, o = this.callsTable.push(a), k.log("Call Number is :" + o), k.log("call3.callLocalStream === null"), a.addStream(n.callLocalStream), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("conference call : before setLocalDescription"), a.pc.setLocalDescription(a.sendedSdpOfferMessage, a.callback(a, "onSetLocalDescriptionSuccess"), a.callback(a, "onSetLocalDescriptionFailure"))) : (k.log("conference call : before setLocalDescription - Promise version"), a.pc.setLocalDescription(a.sendedSdpOfferMessage).then(a.callback(a, "onSetLocalDescriptionSuccess")).catch(a.callback(a, "onSetLocalDescriptionFailure"))), l = new this.myWebRTC_Adapter.RTCSessionDescription(e.sdpanswer), this.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), l.sdp = this.mySDPManager.maybePreferCodec(l.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("conference call : before setRemoteDescription"), a.pc.setRemoteDescription(l, a.callback(a, "onSetRemoteDescriptionSuccess"), a.callback(a, "onSetRemoteDescriptionFailure"))) : (k.log("conference call : before setRemoteDescription - Promise version"), a.pc.setRemoteDescription(l).then(a.callback(a, "onSetRemoteDescriptionSuccess")).catch(a.callback(a, "onSetRemoteDescriptionFailure"))), this.setStatus("You are connected to :" + e.calleeId), this.myWebRTC_Event.createCallEstablishedEvent(e.calleeId, "media", a.callId, a.destCallType)
            } else i.calleeId = e.calleeId, "subscribe" !== i.data.type && this.checkDestCallTypeWithSDP(e.sdpanswer.sdp, i), l = new this.myWebRTC_Adapter.RTCSessionDescription(e.sdpanswer), i.receivedSdpOfferMessage = e.sdpanswer, this.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), l.sdp = this.mySDPManager.maybePreferCodec(l.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("process200OK : before setRemoteDescription"), i.pc.setRemoteDescription(l, i.callback(i, "onSetRemoteDescriptionSuccess"), i.callback(i, "onSetRemoteDescriptionFailure"))) : (k.log("process200OK : before setRemoteDescription - Promise version"), i.pc.setRemoteDescription(l).then(i.callback(i, "onSetRemoteDescriptionSuccess")).catch(i.callback(i, "onSetRemoteDescriptionFailure"))), this.setStatus("You are connected to :" + e.calleeId), null !== e.data && e.data !== t && (null !== i.data && i.data !== t ? i.data = s(i.data, e.data) : i.data = e.data), this.myWebRTC_Event.createCallEstablishedEvent(e.calleeId, i.callType, i.callId, i.destCallType)
        }, this.processCandidate = function(e) {
            var t = null;
            t = e.callerId === this.clientId ? this.findCallWithCallIdAndRemoteId(e.callId, e.calleeId) : this.findCallWithCallIdAndRemoteId(e.callId, e.callerId), k.trace("msg.label :" + e.label), k.log("msg.candidate :" + e.candidate), null !== t ? t.started && t.remoteDescriptionSetted ? t.processCandidateMsg(e) : (k.log("Call not started or remoteDescription is not yet setted"), t.incomingcandidatesQueue.push(e)) : k.log("Call not found, Candidate message is not handled")
        }, this.processUpdate = function(e) {
            k.info("Update message on:" + e.roomId);
            var t = null,
                i = null;
            null !== (t = e.callerId === this.clientId ? this.findCallWithCallIdAndRemoteId(e.callId, e.calleeId) : this.findCallWithCallIdAndRemoteId(e.callId, e.callerId)) ? (i = new this.myWebRTC_Adapter.RTCSessionDescription(e.sdpoffer), this.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), i.sdp = this.mySDPManager.maybePreferCodec(i.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("processUpdate : before setRemoteDescription"), t.pc.setRemoteDescription(i, t.callback(t, "onSetRemoteDescriptionSuccess"), t.callback(t, "onSetRemoteDescriptionFailure"))) : (k.log("processUpdate : before setRemoteDescription - Promise version"), t.pc.setRemoteDescription(i).then(t.callback(t, "onSetRemoteDescriptionSuccess")).catch(t.callback(t, "onSetRemoteDescriptionFailure"))), t.doUpdateAnswer()) : this.myWebRTC_Event.createErrorEvent("Cannot find call to process Update", "CALL_NOT_FOUND_ON_UPDATE")
        }, this.process200Update = function(e) {
            k.info("200 Update received from :" + e.calleeId), this.setStatus("You are connected to :" + e.calleeId);
            var t = null,
                i = null;
            null !== (t = this.findCallWithRoomId(e.roomId)) ? (t.calleeId = e.calleeId, i = new this.myWebRTC_Adapter.RTCSessionDescription(e.sdpanswer), this.preferSendingH264Codec && (k.log("Modification of SDP to set H264 as prefered sending codec"), i.sdp = this.mySDPManager.maybePreferCodec(i.sdp, "video", "H264")), "Chrome" === f && T < 55 || "Firefox" === f && T < 50 || "IE" === f || "undefined" != typeof apiRTC_React ? (k.log("process200Update : before setRemoteDescription"), t.pc.setRemoteDescription(i, t.callback(t, "onSetRemoteDescriptionSuccess"), t.callback(t, "onSetRemoteDescriptionFailure"))) : (k.log("process200Update : before setRemoteDescription - Promise version"), t.pc.setRemoteDescription(i).then(t.callback(t, "onSetRemoteDescriptionSuccess")).catch(t.callback(t, "onSetRemoteDescriptionFailure"))), k.log("msg.sdpanswer.sdp :", e.sdpanswer.sdp), !0 === this.addingUserMedia && (k.log("adding localvideo in mini"), this.miniVideo && (this.miniVideo.style.opacity = 1), this.addingUserMedia = !1)) : this.myWebRTC_Event.createErrorEvent("Cannot find call to process 200 Update", "CALL_NOT_FOUND_ON_200UPDATE")
        }, this.removeAllCallsFromRoom = function(e, t) {
            k.info("removeAllCallsFromRoom :" + e + " with reason :" + t);
            var i = 0,
                n = this.callsTable.length,
                a = [],
                s = 0,
                o = {};
            for (i = 0; i < n; i += 1) this.callsTable[i].dest_roomId == e && (k.log("Call is attached to the room, removing ..."), o = {
                callId: this.callsTable[i].callId
            }, a.push(o));
            for (s = 0; s < a.length; s += 1) this.removeCallFromTableWithCallIdAndSendBye(a[s].callId, t);
            a.splice(0, a.length)
        }, this.onHangup = function(e) {
            this.setStatus("<div>Your phone is registered, you can be reached at this number : " + this.clientId + "</div>"), k.info("Hanging up."), this.initMediaElementState(), e === t ? (k.log("Leaving all calls that are established"), this.removeAllCalls()) : (k.log("Leaving call with callId :" + e), this.removeCallFromTableWithCallIdAndSendBye(e, null)), this.displayCallButtonInCommand()
        }, this.stopStream = function(e) {
            k.info("stopStream in client");
            var t = 0,
                i = null;
            if ("Chrome" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 45 || "Firefox" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 44 || "Opera" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 34 || "Chromium" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 44 || "Vivaldi" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 45 || "Chrome WebView" === f && this.myWebRTC_Adapter.webrtcDetectedVersion < 45) e.onended = null, e.stop();
            else {
                for (e.onended = null, k.log("MediaStream.stop is now deprecated, using MediaStreamTrack.stop"), i = e.getTracks(), t = 0; t < i.length; t += 1) i[t].onended = null, i[t].stop();
                k.log("... tracks stopped")
            }
            e = null
        }, this.clearCallTimeouts = function(e) {
            k.info("clearCallTimeouts");
            var t = 0;
            for (0 !== e.send200OKTrickleIceFalseTimeOutId && (k.debug("clearing send200OKTrickleIceFalseTimeOutId"), clearTimeout(e.send200OKTrickleIceFalseTimeOutId), e.send200OKTrickleIceFalseTimeOutId = 0), 0 !== e.disconnectionTimeoutId && (k.debug("clearing disconnectionTimeout"), clearTimeout(e.disconnectionTimeoutId), e.disconnectionTimeoutId = 0), 0 !== e.disconnectionWarningInterval && (k.debug("clearing disconnectionWarningInterval"), clearInterval(e.disconnectionWarningInterval), e.disconnectionWarningInterval = 0), t = 0; t < e.checkCandidateTypesTimeoutTable.length; t += 1) k.debug("clearing checkCandidateTypesTimeout :", e.checkCandidateTypesTimeoutTable[t]), clearTimeout(e.checkCandidateTypesTimeoutTable[t]);
            e.checkCandidateTypesTimeoutTable.splice(0, e.checkCandidateTypesTimeoutTable.length)
        }, this.removeAllCalls = function() {
            k.info("removeAllCalls");
            var e = this.callsTable.length,
                i = 0,
                n = 0,
                a = null,
                s = null,
                o = 0;
            for (k.log("callsNumber = " + e), i = 0; i < e; i += 1) {
                if (n = 0, n = this.callsTable[i - o].callee ? this.callsTable[i - o].callerId : this.callsTable[i - o].calleeId, !0 === this.callsTable[i - o].callee) s = "Hangup_From_Callee", this.callsTable[i - o].myWebRTC_Stack.sendBye(this.callsTable[i - o].callId, this.clientId, this.callsTable[i - o].dest_roomId, n, s, this.callsTable[i - o].data);
                else {
                    if (s = "Hangup_From_Caller", !0 !== this.callsTable[i - o].inviteSended) {
                        this.callsTable[i - o].callCancelled = !0, k.warn("Leaving call iteration on removeAllCalls");
                        continue
                    }
                    this.callsTable[i - o].myWebRTC_Stack.sendBye(this.callsTable[i - o].callId, this.clientId, this.callsTable[i - o].dest_roomId, n, s, this.callsTable[i - o].data)
                }
                null !== this.callsTable[i - o].callLocalStream && (k.log("Stopping call local Stream"), !0 === this.callsTable[i - o].generatedLocalStream ? k.log("This is a created MediaStream") : !1 === this.autoAnswer && this.selectedLocalStream !== this.callsTable[i - o].callLocalStream && (k.log("Stopping call local Stream"), this.stopStream(this.callsTable[i - o].callLocalStream), c.createUserMediaStopEvent(this.callsTable[i - o].callId, "media"))), null !== this.callsTable[i - o].screenStream && (k.log("stopping screenStream"), this.stopStream(this.callsTable[i - o].screenStream), c.createUserMediaStopEvent(this.callsTable[i - o].callId, "screen")), null !== this.callsTable[i - o].pc && (k.log("Closing PC"), this.qosEnable && void 0 !== this.callsTable[i - o].qm && null !== this.callsTable[i - o].qm && "function" == typeof this.callsTable[i - o].qm.saveStatsToDb && (this.callsTable[i - o].qm.saveStatsToDb(!0), clearInterval(this.callsTable[i - o].statisticId)), this.csmEnable && this.callsTable[i - o].csm !== t && null !== this.callsTable[i - o].csm && clearInterval(this.callsTable[i - o].csmIntervalId), this.callsTable[i - o].pc.close(), this.callsTable[i - o].pc = null), a = this.callsTable[i - o].callId + "-" + this.callsTable[i - o].calleeId, this.removeRemoteVideoDisplay(a), this.myWebRTC_Event.createHangupEvent("local", this.clientId, 0, !0, s, this.callsTable[i - o].callId, this.callsTable[i - o].callType), this.callsTable[i - o].data !== t && null !== this.callsTable[i - o].data && ("MCU-Caller" !== this.callsTable[i - o].data.MCUType && "MCU-Callee" !== this.callsTable[i - o].data.MCUType || this.myWebRTC_Event.createRecordedStreamsAvailableEvent(this.callsTable[i - o].data.confId, this.callsTable[i - o].callerId, this.callsTable[i - o].calleeId, this.callsTable[i - o].callId)), this.clearCallTimeouts(this.callsTable[i - o]), 0 !== this.callsTable[i - o].incomingcandidatesQueue.length && this.callsTable[i - o].incomingcandidatesQueue.splice(0, this.callsTable[i - o].incomingcandidatesQueue.length), k.log("Removing call from table"), this.callsTable.splice(i - o, 1), o += 1
            }
        }, this.onRemoteHangup = function(e, n, a, s, o, l) {
            k.info("onRemoteHangup");
            var r = null;
            k.log("callId :" + e), k.log("confId :" + o), e !== t ? r = this.removeCallFromTableWithCallIdandRemoteId(e, n, s) : o !== t && (r = this.removeCallFromTableWithConfIdandRemoteId(o, n, s)), k.log("Reason : " + s), s === t ? this.setStatus("<div>Your partner : " + n + " have left the call. you can be reached at this number : " + this.clientId + "</div>") : (this.setStatus("<div>Call hangup with reason : " + s + ". you can be reached at this number : " + this.clientId + "</div>"), k.log("Remote Hangup for reason : " + s)), 0 === this.callsTable.length ? (k.log("No more established calls for client"), this.initMediaElementState(), this.myWebRTC_Event.createRemoteHangupEvent(this.clientId, n, !0, s), this.myWebRTC_Event.createHangupEvent("remote", this.clientId, n, !0, s, e, r), this.displayCallButtonInCommand(), !0 === this.getUserMediaOnGoing && !0 !== i.deactivateReloadOnCancel && (k.log("Cancel from Remote"), "undefined" == typeof apiRTC_React && location.reload(), this.getUserMediaOnGoing = !1)) : (k.log("Other calls are still established"), this.myWebRTC_Event.createRemoteHangupEvent(this.clientId, n, !1, s), this.myWebRTC_Event.createHangupEvent("remote", this.clientId, n, !1, s, e, r)), l !== t && null !== l && ("MCU-Caller" !== l.MCUType && "MCU-Callee" !== l.MCUType || this.myWebRTC_Event.createRecordedStreamsAvailableEvent(o, this.clientId, n, e))
        }, this.removeCallFromTableWithCallIdAndSendBye = function(e, i) {
            k.log("removeCallFromTableWithCallId() :" + e);
            var n = 0,
                a = null,
                s = 0,
                o = null; - 1 !== (n = this.findCallIndexWithCallId(e)) ? (k.log("Session terminated."), null !== this.callsTable[n].callLocalStream && this.selectedLocalStream !== this.callsTable[n].callLocalStream && (!0 === this.callsTable[n].generatedLocalStream ? k.log("This is a created MediaStream") : !1 === this.autoAnswer && (k.log("Stopping call local Stream"), this.stopStream(this.callsTable[n].callLocalStream), c.createUserMediaStopEvent(this.callsTable[n].callId, "media"))), null !== this.callsTable[n].screenStream && (k.log("stopping screenStream"), this.stopStream(this.callsTable[n].screenStream), c.createUserMediaStopEvent(this.callsTable[n].callId, "screen")), null !== this.callsTable[n].pc && (k.log("Closing PC"), this.qosEnable && void 0 !== this.callsTable[n].qm && null !== this.callsTable[n].qm && "function" == typeof this.callsTable[n].qm.saveStatsToDb && (this.callsTable[n].qm.saveStatsToDb(!0), clearInterval(this.callsTable[n].statisticId)), this.csmEnable && this.callsTable[n].csm !== t && null !== this.callsTable[n].csm && clearInterval(this.callsTable[n].csmIntervalId), this.callsTable[n].pc.close(), this.callsTable[n].pc = null), a = this.callsTable[n].callId + "-" + this.callsTable[n].calleeId, this.removeRemoteVideoDisplay(a), this.callsTable[n].callee ? (o = this.callsTable[n].callerId, null === i && (i = "Hangup_From_Callee")) : (o = this.callsTable[n].calleeId, null === i && (i = "Hangup_From_Caller")), k.log("reason is :" + i), "LOCAL" !== this.callsTable[n].calleeId && this.callsTable[n].myWebRTC_Stack.sendBye(this.callsTable[n].callId, this.clientId, this.callsTable[n].dest_roomId, o, i, this.callsTable[n].data), this.myWebRTC_Event.createHangupEvent("local", this.clientId, 0, !0, i, this.callsTable[n].callId, this.callsTable[n].callType), k.log("Removing call from table"), this.callsTable[n].data !== t && null !== this.callsTable[n].data && ("MCU-Caller" !== this.callsTable[n].data.MCUType && "MCU-Callee" !== this.callsTable[n].data.MCUType || this.myWebRTC_Event.createRecordedStreamsAvailableEvent(this.callsTable[n].data.confId, this.callsTable[n].callerId, this.callsTable[n].calleeId, this.callsTable[n].callId)), this.clearCallTimeouts(this.callsTable[n]), 0 !== this.callsTable[n].incomingcandidatesQueue.length && this.callsTable[n].incomingcandidatesQueue.splice(0, this.callsTable[n].incomingcandidatesQueue.length), this.callsTable.splice(n, 1), k.log("Call is terminated"), s = this.callsTable.length, this.miniVideo && 0 !== s && (k.log("calling attachMediaStream"), this.attachMediaStream(this.miniVideo, this.callsTable[0].callLocalStream))) : k.log("No call removed"), this.MCUClient.publishCallId === e && (this.publishCallId = null)
        }, this.removeCall = function(e) {
            k.info("removeCall");
            var i = null,
                n = 0,
                a = null;
            return -1 !== e ? (k.log("Session terminated."), null !== this.callsTable[e].callLocalStream && this.selectedLocalStream !== this.callsTable[e].callLocalStream && (!0 === this.callsTable[e].generatedLocalStream ? k.log("This is a created MediaStream") : !1 === this.autoAnswer && (k.log("Stopping call local Stream"), this.stopStream(this.callsTable[e].callLocalStream), c.createUserMediaStopEvent(this.callsTable[e].callId, "media"))), null !== this.callsTable[e].screenStream && (k.log("stopping screenStream"), this.stopStream(this.callsTable[e].screenStream), c.createUserMediaStopEvent(this.callsTable[e].callId, "screen")), null !== this.callsTable[e].pc && (k.log("Closing PC"), this.qosEnable && void 0 !== this.callsTable[e].qm && null !== this.callsTable[e].qm && "function" == typeof this.callsTable[e].qm.saveStatsToDb && (this.callsTable[e].qm.saveStatsToDb(!0), clearInterval(this.callsTable[e].statisticId)), this.csmEnable && this.callsTable[e].csm !== t && null !== this.callsTable[e].csm && clearInterval(this.callsTable[e].csmIntervalId), this.callsTable[e].pc.close(), this.callsTable[e].pc = null), 0 !== this.callsTable[e].disconnectionWarningTimeout && (k.debug("clearing disconnectionWarningTimeout"), clearTimeout(this.callsTable[e].disconnectionWarningTimeout), this.callsTable[e].disconnectionWarningTimeout = 0), i = this.callsTable[e].callId + "-" + this.callsTable[e].calleeId, this.removeRemoteVideoDisplay(i), a = this.callsTable[e].callType, this.clearCallTimeouts(this.callsTable[e]), 0 !== this.callsTable[e].incomingcandidatesQueue.length && this.callsTable[e].incomingcandidatesQueue.splice(0, this.callsTable[e].incomingcandidatesQueue.length), k.log("Removing call from table"), this.callsTable.splice(e, 1), k.log("Call is terminated"), n = this.callsTable.length, this.miniVideo && 0 !== n && (k.log("Calling attachMediaStream"), this.attachMediaStream(this.miniVideo, this.callsTable[0].callLocalStream))) : k.log("No call removed"), a
        }, this.removeCallFromTableWithConfIdandRemoteId = function(e, t, i) {
            k.info("removeCallFromTableWithConfIdandRemoteId() with reason :" + i), i = null;
            var n = null;
            return n = this.findCallIndexWithConfIdAndRemoteId(e, t), this.removeCall(n)
        }, this.removeCallFromTableWithCallIdandRemoteId = function(e, t, i) {
            k.info("removeCallFromTableWithCallIdandRemoteId() with reason :" + i), k.log("callId :" + e), k.log("remoteId :" + t), i = null;
            var n = 0;
            return n = this.findCallIndexWithCallIdAndRemoteId(e, t), this.removeCall(n)
        }, this.transitionToActive = function() {
            k.info("transitionToActive"), this.remoteVideo && (this.remoteVideo.style.opacity = 1), setTimeout(this.callback(this, "callback2"), 1e3)
        }, this.callback2 = function() {
            this.miniVideo && (this.miniVideo.style.opacity = 1)
        }, this.initMediaElementState = function() {
            !1 === this.autoAnswer ? this.localVideo && (this.localVideo.style.opacity = 0, this.localVideo.src = "") : this.localVideo && (this.localVideo.style.opacity = 1), this.remoteVideo && (this.remoteVideo.style.opacity = 0, this.remoteVideo.src = ""), this.miniVideo && (this.miniVideo.style.opacity = 0), !0 === this.autoAnswer ? k.log("autoAnswer Activated : localStream is not stopped") : this.miniVideo && (this.miniVideo.src = "")
        }, this.toggleVideoMute = function(e) {
            k.info("toggleVideoMute");
            var i = 0,
                n = this.callsTable.length,
                a = 0;
            if (e === t || null === e)
                for (k.info("no callId defined, toggleVideoMute all local video"), this.isVideoMuted ? null !== this.localStream && (k.info("localStream unMuteTracks"), this.unMuteTracks(this.localStream.getVideoTracks())) : null !== this.localStream && (k.info("localStream muteTracks"), this.muteTracks(this.localStream.getVideoTracks())), this.isVideoMuted = !this.isVideoMuted, i = 0; i < n; i += 1) null !== this.callsTable[i].callLocalStream && (this.callsTable[i].isVideoMuted ? (k.info("unmuting call :", this.callsTable[i].callId), this.unMuteTracks(this.callsTable[i].callLocalStream.getVideoTracks())) : (k.info("muting call :", this.callsTable[i].callId), this.muteTracks(this.callsTable[i].callLocalStream.getVideoTracks())), this.callsTable[i].isVideoMuted = !this.callsTable[i].isVideoMuted);
            else k.info("callId is defined :", e), -1 !== (a = this.findCallIndexWithCallId(e)) && null !== this.callsTable[a].callLocalStream && (this.callsTable[a].isVideoMuted ? (k.info("unmuting call :", this.callsTable[a].callId), this.unMuteTracks(this.callsTable[a].callLocalStream.getVideoTracks())) : (k.info("muting call :", this.callsTable[a].callId), this.muteTracks(this.callsTable[a].callLocalStream.getVideoTracks())), this.callsTable[a].isVideoMuted = !this.callsTable[a].isVideoMuted)
        }, this.unMuteTracks = function(e) {
            var t = 0;
            if (0 !== e.length) {
                for (t = 0; t < e.length; t += 1) e[t].enabled = !0;
                k.log("tracks unMuted.")
            } else k.log("No tracks available.")
        }, this.muteTracks = function(e) {
            var t = 0;
            if (0 !== e.length) {
                for (t = 0; t < e.length; t += 1) e[t].enabled = !1;
                k.log("tracks muted.")
            } else k.log("No tracks available.")
        }, this.toggleAudioMute = function(e) {
            k.info("toggleAudioMute");
            var i = 0,
                n = this.callsTable.length,
                a = 0;
            if (e === t || null === e)
                for (k.info("no callId defined, toggleAudioMute all local audio"), this.isAudioMuted ? null !== this.localStream && (k.info("localStream unMuteTracks"), this.unMuteTracks(this.localStream.getAudioTracks())) : null !== this.localStream && (k.info("localStream muteTracks"), this.muteTracks(this.localStream.getAudioTracks())), this.isAudioMuted = !this.isAudioMuted, i = 0; i < n; i += 1) null !== this.callsTable[i].callLocalStream && (this.callsTable[i].isAudioMuted ? (k.info("unmuting call :", this.callsTable[i].callId), this.unMuteTracks(this.callsTable[i].callLocalStream.getAudioTracks())) : (k.info("muting call :", this.callsTable[i].callId), this.muteTracks(this.callsTable[i].callLocalStream.getAudioTracks())), this.callsTable[i].isAudioMuted = !this.callsTable[i].isAudioMuted);
            else k.info("callId is defined :", e), -1 !== (a = this.findCallIndexWithCallId(e)) && null !== this.callsTable[a].callLocalStream && (this.callsTable[a].isAudioMuted ? (k.info("unmuting call :", this.callsTable[a].callId), this.unMuteTracks(this.callsTable[a].callLocalStream.getAudioTracks())) : (k.info("muting call :", this.callsTable[a].callId), this.muteTracks(this.callsTable[a].callLocalStream.getAudioTracks())), this.callsTable[a].isAudioMuted = !this.callsTable[a].isAudioMuted)
        }, this.xhr = function(e, t, i, n) {
            var a = new XMLHttpRequest;
            a.onreadystatechange = function() {
                4 == a.readyState && 200 == a.status && i(a.responseText)
            }, void 0 !== n && (a.upload.onprogress = n), a.open("POST", e), a.send(t)
        }, this.takeSnapshot = function(e, i, a, s, o, l, r) {
            k.info("takeSnapshot");
            var h = null,
                u = null,
                C = document.createElement("canvas"),
                p = 0,
                g = null,
                m = null,
                f = (new Date).toJSON().replace(new RegExp(":", "g"), "-"),
                v = null;
            switch (s) {
                case "Desactivated":
                    p = 0;
                    break;
                case "Low":
                    p = 2;
                    break;
                case "Medium":
                    p = 4;
                    break;
                case "High":
                    p = 6;
                    break;
                default:
                    k.log("blurLevel not defined switch case : " + s)
            }
            if (r !== t) {
                if (k.log("takeSnapshot of defined video Id :" + r), null === (v = document.getElementById(r))) return k.log("Cannot find video with Id :" + r), k.log("Leaving takeSnapshot"), void this.myWebRTC_Event.createErrorEvent("localVideo Div Name is not correct for takeSnapshot", "INCORRECT_VIDEOID_FOR_SNAPSHOT")
            } else if (k.warn("ApiRTC DEPRECATED : Please add videoId for TakeSnapshot"), null !== this.localVideo) v = this.localVideo, k.log("using localVideo for takeSnapshot");
            else {
                if (null === (v = document.getElementById("myLocalVideo"))) return k.log("Cannot find video with Id : myLocalVideo"), void this.myWebRTC_Event.createErrorEvent("localVideo Div Name is not correct for takeSnapshot", "INCORRECT_VIDEOID_FOR_SNAPSHOT");
                k.log("using Video with Id : myLocalVideo for takeSnapshot")
            }
            C.width = v.clientWidth, C.height = v.clientHeight, k.log("snapshot.width : " + C.width), k.log("snapshot.height :" + C.height), (h = C.getContext("2d")).drawImage(v, 0, 0, C.width, C.height), (u = document.createElement("img")).src = C.toDataURL("image/png"), u.style.padding = 5, u.width = C.width, u.height = C.height, 0 !== p ? (g = h.getImageData(0, 0, C.width, C.height), k.log("av pixels data : " + g.data), g = n(u, g, p), k.log("ap pixels data : " + g.data), h.putImageData(g, 0, 0), u.src = C.toDataURL("image/png")) : k.log("blur on photo is desactivated"), "object" == typeof i ? null !== i ? i.src = u.src : k.log("localPhotoIdOrDiv is null") : null !== document.getElementById(i) ? document.getElementById(i).src = u.src : k.log("localPhotoId is not defined"), m = new FormData, o !== t ? (k.log("sessionId !== undefined :" + o), m.append("destFileName", this.clientId + "-" + f + ".png"), m.append("data", C.toDataURL("image/png")), m.append("sessionId", o)) : (k.log("Upload on data1"), m.append("photo", C.toDataURL("image/png")), m.append("clientId", this.clientId), m.append("apiKey", d.session.apiKey)), this.xhr(e, m, function(e) {
                if (k.log("fileName :", e), null !== e) try {
                    var t = JSON.parse(e);
                    "OK" === t.resultCode && (k.log("files loaded, filename :" + t.fileUrl), c.createSnapShotPhotoUploaded(t.fileUrl))
                } catch (e) {
                    k.log("Parsing error:", e)
                }
                "Photo received" !== e && "An error occurred." !== e && "Photo-" !== e.substring(0, 6) || c.createSnapShotPhotoUploaded(e)
            }, l)
        }, this.takeSnapshotAndSendOnDataChannel = function(e, i, n, a) {
            k.info("takeSnapshotAndSendOnDataChannel");
            var s = null,
                o = document.createElement("canvas"),
                l = null,
                r = null;
            if (i !== t) {
                if (k.log("takeSnapshot of defined video Id :" + i), null === (l = document.getElementById(i))) return k.log("Cannot find video with Id :" + i), k.log("Leaving takeSnapshot"), void this.myWebRTC_Event.createErrorEvent("localVideo Div Name is not correct for takeSnapshot", "INCORRECT_VIDEOID_FOR_SNAPSHOT")
            } else k.warn("ApiRTC DEPRECATED : Please add videoId for TakeSnapshot");
            o.width = l.clientWidth, o.height = l.clientHeight, k.log("snapshot.width : " + o.width), k.log("snapshot.height :" + o.height), o.getContext("2d").drawImage(l, 0, 0, o.width, o.height), (s = document.createElement("img")).src = o.toDataURL("image/png"), s.style.padding = 5, s.width = o.width, s.height = o.height, "object" == typeof e ? null !== e ? e.src = s.src : k.log("localPhotoIdOrDiv is null") : null !== document.getElementById(e) ? document.getElementById(e).src = s.src : k.log("localPhotoId is not defined"), r = o.toDataURL("image/png"), this.sendDataWithCallId(n, {
                file: r,
                name: "nomFichier",
                type: "image/png-dataUrl"
            }, a)
        }, this.callWithNumber = function(e, i, n, a) {
            k.info("Click on Call Button, video activated : " + i), k.log("callConfiguration : ", a);
            var s = null,
                o = 0,
                l = null,
                r = null,
                c = null;
            return "" !== e && e !== this.clientId ? (this.setStatus("Calling Destination number :" + e), s = new p(this), k.log("Calling destination number :" + e), s.generateCallId(), s.callerId = this.clientId, s.calleeId = e, s.dest_roomId = e, s.audioOnly = !i, s.remoteId = e, s.callConfiguration = a, a !== t && null !== a ? ("VIDEO" === a.mediaTypeForOutgoingCall || "AUDIO" === a.mediaTypeForOutgoingCall || "VIDEOONLY" === a.mediaTypeForOutgoingCall || "NONE" === a.mediaTypeForOutgoingCall ? (k.log("Setting mediaTypeForOutgoingCall :" + a.mediaTypeForOutgoingCall), s.mediaTypeForOutgoingCall = a.mediaTypeForOutgoingCall) : k.log("mediaTypeForOutgoingCall is not set"), a.mediaRoutingMode !== t && null !== a.mediaRoutingMode && s.setCallMediaRoutingMode(a.mediaRoutingMode), a.turnServerAddress !== t && null !== a.turnServerAddress && s.setCallTurnServer(a.turnServerAddress), a.hasOwnProperty("forceCallType") && (s.callType = a.forceCallType)) : k.log("callConfiguration is not set"), s.checkDTLSCompliancy(), l = s.callId, r = apiRTC.session.getConnectedUserInfo(e, "userData"), k.log("userInfo :", r), (c = JSON.parse(r)) !== t && "true" === c.react && (k.log("userInfoJson.react :", JSON.stringify(c.react)), k.log("userInfoJson.osName :", JSON.stringify(c.osName)), "iOS" === c.osName && (k.log("Callee : React and iOS detected, setting H264 as preferred codec for the call"), s.preferH264Codec = !0)), 0 === e.toString().indexOf("0") || 0 === e.toString().indexOf("+") ? (k.log("Prefix 0 or + detected, calling a SIP device"), n !== t && null !== n ? n.pubSub = "sipConnector" : (n = {}).pubSub = "sipConnector", s.trickleIce = !1) : k.log("Establishing Web call"), !0 === s.audioOnly && (s.callType = "audio"), n !== t ? s.data = n : n = {}, n !== t && !0 === n.dataCall && (s.dataCall = !0), !0 === this.accessToLocalMedia && !0 === this.autoAnswer || s.dataCall || null !== this.selectedLocalStream ? (s.dataCall ? k.log("Datachannel call") : k.log("User has already granted access to local media and AutoAnswer activated : establishing call"), s.establishCall()) : s.getUserMediaOnCall(), o = this.callsTable.push(s), k.log("Call Number is :" + o), !0 === this.autoAnswer && this.displayHangUpButtonInCommand()) : (this.setStatus("Dialed call number is not correct :" + e + ".you can be reached at this number : " + this.clientId), k.log("Call Number is incorrect")), l
        }, this.startTestCall = function(e, i) {
            k.info("startTestCall : video activated : " + e);
            var n = null,
                a = 0,
                s = null,
                o = {};
            return this.setStatus("Starting test call."), (n = new p(this)).generateCallId(), n.callerId = this.clientId, n.calleeId = 12345, n.dest_roomId = 12345, n.audioOnly = !e, n.remoteId = 12345, n.callConfiguration = i, i !== t && null !== i ? ("VIDEO" === i.mediaTypeForOutgoingCall || "AUDIO" === i.mediaTypeForOutgoingCall || "VIDEOONLY" === i.mediaTypeForOutgoingCall || "NONE" === i.mediaTypeForOutgoingCall ? (k.log("Setting mediaTypeForOutgoingCall :" + i.mediaTypeForOutgoingCall), n.mediaTypeForOutgoingCall = i.mediaTypeForOutgoingCall) : k.log("mediaTypeForOutgoingCall is not set"), i.mediaRoutingMode !== t && null !== i.mediaRoutingMode && n.setCallMediaRoutingMode(i.mediaRoutingMode), i.turnServerAddress !== t && null !== i.turnServerAddress && n.setCallTurnServer(i.turnServerAddress)) : k.log("callConfiguration is not set"), n.checkDTLSCompliancy(), s = n.callId, o.pubSub = "testCallKurentoConnector", n.data = o, !0 === n.audioOnly && (n.callType = "audio"), !0 === this.accessToLocalMedia && !0 === this.autoAnswer || n.dataCall || null !== this.selectedLocalStream ? (n.dataCall ? k.log("Datachannel call") : k.log("User has already granted access to local media and AutoAnswer activated : establishing call"), n.establishCall()) : n.getUserMediaOnCall(), a = this.callsTable.push(n), k.log("Call Number is :" + a), !0 === this.autoAnswer && this.displayHangUpButtonInCommand(), s
        }, this.extensionInstallationSuccessCallback = function() {
            k.info("extensionInstallationSuccessCallback"), d.session.apiCCWebRTCClient.webRTCClient.apiRTCExtensionInstalled = !0
        }, this.extensionInstallationFailureCallback = function(e, t) {
            k.info("extensionInstallationFailureCallback : Error :" + e + ", " + t), e = null, t = null, c.createDesktopCaptureEvent("Extension_installation_Error", this.waitingShareScreenCallId, this.waitingShareScreenDestNumber, this.waitingCaptureSourceType), this.setStatus('Inline extension installation is not possible, please install extension using following link: <a href="https://chrome.google.com/webstore/detail/apizee-desktop-capture/mjjnofoemoepfididplbfimokpnpcoeg?hl=fr" target="_blank">ApiRTC desktopCapture extension</a>')
        }, this.manageNotInstalledExtension = function(e, t, i) {
            k.info("manageNotInstalledExtension"), this.setStatus("ApiRTC extension need to be installed to enable screen sharing.<br>You can be reached at this number : " + this.clientId), k.warn("apiRTC extension not installed"), c.createDesktopCaptureEvent("Extension_not_installed", e, t), k.warn("Starting apiRTC extension installation"), this.waitingShareScreenDestNumber = t, this.waitingShareScreenCallId = e, this.waitingCaptureSourceType = i, chrome.webstore.install("https://chrome.google.com/webstore/detail/mjjnofoemoepfididplbfimokpnpcoeg", this.callback(this, "extensionInstallationSuccessCallback"), this.callback(this, "extensionInstallationFailureCallback"))
        }, this.shareScreen = function(i, n, a) {
            k.info("shareScreen");
            var s = null,
                o = null,
                l = 0;
            if ("Chrome" === f || "Firefox" === f && T > 52)
                if ("" !== i && i !== this.clientId)
                    if (o = new p(d.session.apiCCWebRTCClient.webRTCClient), k.log("Calling destination number :" + i), o.generateCallId(), s = o.callId, o.callerId = this.clientId, o.calleeId = i, o.dest_roomId = i, o.audioOnly = !1, o.screenSharing = !0, o.remoteId = i, o.callType = "screenSharing", o.captureSourceType = a, o.checkDTLSCompliancy(), n !== t && (o.data = n), l = d.session.apiCCWebRTCClient.webRTCClient.callsTable.push(o), k.log("Call Number is :" + l), "Chrome" === f) {
                        if (k.log("shareScreen on Chrome"), !1 === this.apiRTCExtensionInstalled) return this.manageNotInstalledExtension(o.callId, o.remoteId, a), s;
                        a !== t && null !== a || (a = ["screen", "window", "tab", "audio"]), e.postMessage({
                            command: "getDesktopId",
                            callNumber: s,
                            remoteId: i,
                            captureSourceType: a,
                            browser_major_version: T
                        }, "*")
                    } else k.log("shareScreen on Firefox"), o.getUserMediaOnCall();
            else this.setStatus("Dialed call number is not correct :" + i + ".You can be reached at this number : " + this.clientId), k.log("Call Number is incorrect");
            else k.log("shareScreen is not supported on this browser"), c.createDesktopCaptureEvent("Browser_Not_Compatible", s, i);
            return k.info("shareScreen, callId :", s), s
        }, this.startScreenSharingOnCall = function(i, n) {
            k.info("getScreenMedia for callId :" + i);
            var a = null;
            if ("chrome" === this.myWebRTC_Adapter.webrtcDetectedBrowser)
                if (null !== (a = this.findCallWithCallId(i))) {
                    if (!1 === this.apiRTCExtensionInstalled) return void this.manageNotInstalledExtension(a.callId, a.remoteId, n);
                    n !== t && null !== n || (n = ["screen", "window", "tab", "audio"]), e.postMessage({
                        command: "getDesktopId",
                        callNumber: a.callId,
                        remoteId: a.remoteId,
                        captureSourceType: n,
                        browser_major_version: T
                    }, "*")
                } else k.log("call not found");
            else k.log("shareScreen is only available for chrome Browser"), c.createDesktopCaptureEvent("Browser_Not_Compatible", a.callId, a.remoteId)
        }, this.toggleVideoScreen = function(e) {
            k.info("toggleVideoScreen for callId :" + e);
            var t = this.findCallWithCallId(e);
            null !== t ? t.toggleVideoScreen() : k.log("call not found")
        }, this.switchVideoToScreen = function(e) {
            k.info("switchVideoToScreen for callId :" + e);
            var t = this.findCallWithCallId(e);
            null !== t ? t.switchVideoToScreen() : k.log("call not found")
        }, this.switchScreenToVideo = function(e) {
            k.info("switchScreenToVideo for callId :" + e);
            var t = this.findCallWithCallId(e);
            null !== t ? t.switchScreenToVideo() : k.log("call not found")
        }, this.callbymail = function(e) {
            k.info("Click on Call per mail Button"), a(e) ? (k.log("Calling Destination mail :" + e), this.socket.emit("webrtc_invite_permail", e), i.channel.socket.emit("webrtc_invite_permail", e)) : k.log("Mail address is not correct :" + e)
        }, this.callperURL = function(e) {
            k.info("Call per URL");
            var t = null,
                i = 0;
            t = new p(this), k.log("Calling Destination number :" + e), t.generateCallId(), t.callerId = this.clientId, t.calleeId = e, t.dest_roomId = e, t.audioOnly = !1, t.getUserMediaOnCall(), t.remoteId = e, t.checkDTLSCompliancy(), i = this.callsTable.push(t), k.log("Call Number is :" + i)
        }, this.acceptCall = function(e, i) {
            k.info("acceptCall for callId :" + e), k.log("acceptCall() - callConfiguration : ", i);
            var n = null;
            null !== (n = this.findCallWithCallId(e)) ? (k.log("acceptCall() - Call found"), n.isAccepted = !0, null !== i && i !== t ? ("VIDEO" === i.mediaTypeForIncomingCall || "AUDIO" === i.mediaTypeForIncomingCall || "VIDEOONLY" === i.mediaTypeForIncomingCall || "NONE" === i.mediaTypeForIncomingCall ? (k.log("acceptCall() - Setting mediaTypeForIncomingCall :" + i.mediaTypeForIncomingCall), n.mediaTypeForIncomingCall = i.mediaTypeForIncomingCall) : k.log("acceptCall() - mediaTypeForIncomingCall is not set"), i.mediaRoutingMode !== t && null !== i.mediaRoutingMode && n.setCallMediaRoutingMode(i.mediaRoutingMode), i.turnServerAddress !== t && null !== i.turnServerAddress && n.setCallTurnServer(i.turnServerAddress)) : k.log("acceptCall() - callConfiguration is not set"), this.unidirectionelCallOnly ? (k.log("acceptCall() - unidirectional call"), n.onUserMediaSuccessTestUni()) : !0 === n.accessToMedia || null !== this.selectedLocalStream || n.dataCall ? (k.log("acceptCall() - User has already granted access to local media and AutoAnswer activated : establishing call"), n.establishCall()) : k.log("acceptCall() - call will be established when user accept his media")) : k.log("Call not found")
        }, this.refuseCall = function(e, i) {
            k.info("refuseCall for callId :" + e);
            var n = null,
                a = null;
            a = i !== t ? i : "User_Refuse_Call", null !== (n = this.findCallWithCallId(e)) ? (k.log("Call found"), "MCU-Callee" === n.data.MCUType ? (n.myWebRTC_Stack.sendBye(n.callId, n.callerId, n.dest_roomId, n.calleeId, "User_Media_Error", n.data), this.removeCallFromTableWithCallIdandRemoteId(n.callId, n.calleeId, a)) : (n.myWebRTC_Stack.sendBye(n.callId, n.calleeId, n.dest_roomId, n.callerId, a, n.data), this.removeCallFromTableWithCallIdandRemoteId(n.callId, n.callerId, a)), 0 === this.callsTable.length && (k.log("No more established calls for client"), this.initMediaElementState())) : k.log("Call not found")
        }, this.addMedia = function(e, t, i) {
            k.info("addMedia for callId :" + e);
            var n = null;
            return null !== (n = this.findCallWithCallId(e)) && ("publish" !== n.data.type ? (this.addingUserMedia = !0, !0 === t && (k.info("stopping current media ..."), n.removeStream(n.callLocalStream), n.stopStream(n.callLocalStream), c.createUserMediaStopEvent(e, "media")), void 0 !== i && (this.localStream = i, n.callLocalStream = i, this.selectedLocalStream = i), !0 === this.accessToLocalMedia && !0 === this.autoAnswer || null !== this.selectedLocalStream ? (k.log("User has already granted access to local media and AutoAnswer activated : establishing call"), n.establishCall()) : n.getUserMediaOnCall()) : (k.log("call was a publish, restarting call for device update..."), k.log("this.data.type :" + n.data.type), k.log("this.dest_roomId :" + n.dest_roomId), k.log("this.callType :" + n.callType), this.removeCallFromTableWithCallIdAndSendBye(n.callId, "updateMediaDeviceOnCall"), e = d.session.apiCCWebRTCClient.publish(n.dest_roomId, "restarted", null, this.audioOnly), c.createEvent({
                eventType: "callRestarting",
                dataType: n.data.type,
                "destRoom ": n.dest_roomId,
                "callType ": n.callType
            }))), e
        }, this.updateMediaDeviceOnCall = function(e, t) {
            k.info("updateMediaDeviceOnCall for callId :" + e);
            return e = this.addMedia(e, !0, t)
        }, this.findCallWithRoomId = function(e) {
            var t = 0,
                i = this.callsTable.length;
            for (t = 0; t < i; t += 1)
                if (this.callsTable[t].dest_roomId === e) return this.callsTable[t];
            return k.log("Call not found"), null
        }, this.findCallIndexWithCallIdAndRemoteId = function(e, t) {
            k.info("findCallIndexWithCallIdAndRemoteId");
            var i = 0,
                n = this.callsTable.length;
            for (k.trace("callsNumber : " + n), i = 0; i < n; i += 1)
                if (this.callsTable[i].callId == e && (k.log("callId found"), k.log("this.callsTable[i].callee :" + this.callsTable[i].callee), k.log("this.callsTable[i].calleeId :" + this.callsTable[i].calleeId), !0 === this.callsTable[i].callee && this.callsTable[i].callerId == t || !1 === this.callsTable[i].callee && this.callsTable[i].calleeId == t)) return k.log("Call found with callId and remoteId"), i;
            return k.log("Call not found"), -1
        }, this.findCallIndexWithConfIdAndRemoteId = function(e, t) {
            k.info("findCallIndexWithConfIdAndRemoteId"), k.log("confId :" + e), k.log("remoteId :" + t);
            var i = 0,
                n = this.callsTable.length;
            for (i = 0; i < n; i += 1)
                if (k.log("this.callsTable[i].data.confId :" + this.callsTable[i].data.confId), this.callsTable[i].data.confId == e && (!0 === this.callsTable[i].callee && this.callsTable[i].callerId == t || !1 === this.callsTable[i].callee && this.callsTable[i].calleeId == t)) return k.log("Call found with confId and remoteId"), i;
            return k.log("Call not found"), -1
        }, this.findCallIndexWithCallId = function(e) {
            var t = 0,
                i = this.callsTable.length;
            for (t = 0; t < i; t += 1)
                if (this.callsTable[t].callId == e) return k.log("Call found with callId"), t;
            return k.log("Call not found"), -1
        }, this.findCallWithCallId = function(e) {
            var t = 0,
                i = this.callsTable.length;
            for (k.trace("callsNumber :" + i), t = 0; t < i; t += 1)
                if (k.log("this.callsTable[i].callId :" + this.callsTable[t].callId), this.callsTable[t].callId == e) return this.callsTable[t];
            return k.log("Call not found"), null
        }, this.findCallWithStreamId = function(e) {
            k.info("findCallWithStreamId :" + e);
            var t = 0,
                i = this.callsTable.length;
            for (k.trace("callsNumber :" + i), t = 0; t < i; t += 1)
                if (k.log("this.callsTable[i].streamId :" + this.callsTable[t].streamId), this.callsTable[t].streamId == e) return k.log("Call found"), this.callsTable[t];
            return k.log("Call not found"), null
        }, this.findCallWithCallIdAndRemoteId = function(e, t) {
            var i = 0,
                n = this.callsTable.length;
            for (k.trace("callsNumber :" + n), i = 0; i < n; i += 1)
                if (this.callsTable[i].callId === e && (!0 === this.callsTable[i].callee && this.callsTable[i].callerId == t || !1 === this.callsTable[i].callee && this.callsTable[i].calleeId == t)) return this.callsTable[i];
            return k.log("Call not found"), null
        }, this.findCallWithRemoteId = function(e) {
            k.info("findCallWithRemoteId");
            var t = 0,
                i = this.callsTable.length;
            for (k.trace("callsNumber :" + i), t = 0; t < i; t += 1)
                if (!0 === this.callsTable[t].callee && this.callsTable[t].callerId == e || !1 === this.callsTable[t].callee && this.callsTable[t].calleeId == e) return k.log("Call found with remoteId"), this.callsTable[t];
            return k.log("Call not found"), null
        }, this.remoteVideoDisplayManager = function() {
            k.info("remoteVideoDisplayManager");
            var t = 0,
                i = null,
                n = 0,
                a = 0,
                s = 0,
                o = 0,
                l = .75 * o,
                r = 0,
                c = 0;
            for (this.remoteVideo && (0 === this.maxWidthRemoteVideo && (this.maxWidthRemoteVideo = this.remoteVideo.clientWidth), 0 === this.maxHeightRemoteVideo && (this.maxHeightRemoteVideo = this.remoteVideo.clientHeight), n = (i = this.remoteVideo.children).length, a = this.maxWidthRemoteVideo, s = this.maxHeightRemoteVideo, k.log("maxWidth" + a), k.log("maxHeight" + s), l = .75 * (o = this.remoteVideo.clientWidth)), o > a && (o = a), (l = .75 * (o /= n)) > s && (o = 4 / 3 * (l = s)), r = o / a * 100, c = l / s * 100, r += "%", c += "%", k.log("widthinPercent" + r), k.log("heightinPercent" + c), t = 0; t < n; t += 1) i[t].style.cssText = "width:" + r + ";height:" + c + ";";
            l = e.innerHeight - l - 60
        }, this.removeRemoteVideoDisplay = function(e) {
            k.info("removeRemoteVideoDisplay with callId =" + e);
            var t = "callId_" + e,
                i = 0,
                n = null,
                a = 0;
            for (this.remoteVideo && (a = (n = this.remoteVideo.children).length), i = 0; i < a; i += 1)
                if (n[i].id === t) return this.remoteVideo.removeChild(n[i]), void k.log("VideoDisplay removed for " + t);
            this.remoteVideoDisplayManager()
        }, this.setStatus = function(e) {
            null !== this.statusDiv ? this.statusDiv.innerHTML = e : k.log("Status Div Null")
        }, this.displayCallButtonInCommand = function() {
            if (null !== this.commandDiv) {
                this.commandDiv.innerHTML = '<form name="form1" action=""><input type="texte" name="mail" value="" placeholder="Enter Destination number..."><a href="#" onClick = "apiCC.session.apiCCWebRTCClient.call(document.forms.form1.mail.value);"><img src="http://www.apizee.com/Demo/images/Call.png" height="30px"></a></input></form>'
            }
        }, this.displayHangUpButtonInCommand = function() {
            k.info("displayHangUpButtonInCommand"), null !== this.commandDiv && (this.commandDiv.innerHTML = '<a href="#" onClick = "apiCC.session.apiCCWebRTCClient.toggleAudioMute()"> <img src="http://www.apizee.com/Demo/images/Microphone.png" height="30px" disabled="true"></a><a href="#" onClick = "apiCC.session.apiCCWebRTCClient.toggleVideoMute();"> <img src="http://www.apizee.com/Demo/images/Camera2.png" height="30px" disabled="true"></a><a href="#" onClick = "apiCC.session.apiCCWebRTCClient.hangUp()"> <img src="http://www.apizee.com/Demo/images/Hangup.png" height="30px" disabled="true"> </a>')
        }, this.checkURLForCallDestination = function() {
            var e = 0;
            return "room" === location.search.substring(1, 5) && (k.log("Call establishment using URL"), e = location.search.substring(6), k.log("Destination call number is :" + e)), e
        }, this.releaseUserMedia = function() {
            k.info("releaseUserMedia"), null !== this.localStream && (k.log("stopping localStream"), this.stopStream(this.localStream), c.createUserMediaStopEvent(null, "media"), this.accessToLocalMedia = !1, this.autoAnswer = !1, k.log("this.autoAnswer :" + this.autoAnswer)), null !== this.screenStream && this.screenStream !== t && (k.log("stopping screenStream"), this.stopStream(this.screenStream), c.createUserMediaStopEvent(null, "screen"))
        }, this.startDataChannelOnCall = function(e) {
            k.info("startDataChannelOnCall with callId :" + e);
            var t = this.findCallWithCallId(e);
            t ? (k.log("Call found", t), t.addingDataChannelOnCallOngoing = !0, t.createDataChannel()) : k.log("Call not found")
        }, this.sendDataWithCallId = function(e, t, i) {
            k.info("sendDataWithCallId :" + e);
            var n = this.findCallWithCallId(e);
            n ? (k.log("Call found", n), n.sendData(t, i)) : k.log("Call not found")
        }, this.setVideoBandwidth = function(e) {
            this.videoBandwidth = e
        }, this.setAudioBandwidth = function(e) {
            this.audioBandwidth = e
        }, this.setDataBandwidth = function(e) {
            this.dataBandwidth = e
        }, this.callback = function(e, t) {
            return this.closureHandler = function(i) {
                return e[t](i)
            }, this.closureHandler
        }, this.callbackWithParams = function(e, t) {
            return this.closureHandler = function(i, n, a) {
                return e[t](i, n, a)
            }, this.closureHandler
        }
    }, d.ApiCCIMClient = function(e, i) {
        this.convTable = [], this.myWebRTC_Event = new r, this.nickname = e.nickname, this.photoURL = null, this.userDataSetted = !1, this.myWebRTC_Stack = new u(e.channel.socket), this.findIMIdWithDestID = function(e) {
            var t = 0,
                i = this.convTable.length;
            for (k.log("findIMIdWithDestID = " + e), t = 0; t < i; t += 1)
                if (k.log("this.convTable[i].dest_roomId = " + this.convTable[t].dest_roomId), this.convTable[t].dest_roomId == e) return this.convTable[t].IMId;
            return k.log("Conversation IMId not found"), 0
        }, this.addInConvTable = function(e) {
            k.info("addInConvTable");
            var t = 0,
                i = this.convTable.length;
            for (t = 0; t < i; t += 1)
                if (k.log("this.convTable[i].dest_roomId = " + this.convTable[t].dest_roomId), this.convTable[t].dest_roomId == e.dest_roomId) return void(this.convTable[t].IMId = e.IMId);
            k.log("Conversation not found in the table, adding .."), this.convTable.push(e)
        }, this.sendMessage = function(i, n, a, s) {
            k.info("Call sending message function .... from :" + this.nickname + " message :" + n);
            var o = this.findIMIdWithDestID(i),
                l = null,
                r = null,
                c = null,
                h = null,
                u = e.channel.getNewCSeq();
            return 0 === o ? k.log("Creation of a new IM conversation") : k.log("Message is for existing conversation with ID : " + o), k.log("IMConvId :" + o), l = {
                type: "IMMessage",
                IMId: o,
                senderId: e.apiCCId,
                nickname: this.nickname,
                photoURL: this.photoURL,
                dstRoomId: i,
                data: n,
                cSeq: u,
                convData: s
            }, r = JSON.stringify(l), c = document.createElement("message"), k.log("C->S: " + r), a !== t ? (k.log("Ack management activated"), h = setTimeout(function() {
                a({
                    reason: "timeoutReached",
                    cSeq: u
                }), delete d.session.messageTimeOutTable[u]
            }, e.messageTimeOutTimer), k.log("timeOutId: " + h), e.messageTimeOutTable[u] = h, e.channel.socket.emit("IMMessage", r, function(e) {
                k.log("callback on IMMessage"), k.log("data :", e), k.log("callback reason :" + e.reason), k.log("callback convId :" + e.convId), k.log("cSeq :" + e.cSeq), a(e), d.session.messageTimeOutTable[u] !== t ? (k.log("clearing timeOutId: " + d.session.messageTimeOutTable[u]), clearTimeout(d.session.messageTimeOutTable[u]), delete d.session.messageTimeOutTable[u]) : k.warn("messageTimeOutTable was already deleted : timeout may have been reached before Ack")
            })) : (k.log("Ack management not activated"), e.channel.socket.emit("IMMessage", r)), null !== this.conversation && (c.innerHTML = "<b>me :</b> " + s + "<br>", this.conversation.appendChild(c), this.conversation.scrollTop = this.conversation.scrollHeight), u
        }, this.newConversationCreated = function(e) {
            k.info("newConversationCreated :" + e), k.log("msg.dstRoomId :" + e.dstRoomId), k.log("msg.IMId :" + e.IMId);
            var t = {
                dest_roomId: e.dstRoomId,
                IMId: e.IMId
            };
            this.addInConvTable(t)
        }, this.receiveMessage = function(e) {
            k.info("Call receiveMessage message :" + e);
            var t = null,
                i = null;
            i = {
                dest_roomId: e.senderId,
                IMId: e.IMId
            }, this.addInConvTable(i), null !== this.conversation && ((t = document.createElement("message")).innerHTML = "<b>" + e.nickname + ":</b> " + e.data + "<br>", this.conversation.appendChild(t), this.conversation.scrollTop = this.conversation.scrollHeight), this.myWebRTC_Event.createReceiveIMMessageEvent(e.senderId, e.nickname, e.photoURL, e.data, e.UUCSeq, e.IMId)
        }, this.createGroupChat = function(t, i) {
            k.info("createGroupChat with contacts : " + t + "," + i);
            var n = null,
                a = null;
            n = {
                type: "createGroupChat",
                nickname: this.nickname,
                photoURL: this.photoURL,
                contactId1: t,
                contactId2: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("createGroupChat", a)
        }, this.groupChatCreation = function(e) {
            k.info("groupChatCreation"), this.myWebRTC_Event.createGroupChatCreationEvent(e.status, e.groupChatId, e.contactId1, e.invitationSendedToInitialDestId, e.contactId2, e.invitationSendedToNewContactId)
        }, this.joinGroupChat = function(t) {
            k.info("joinGroupChat : " + t);
            var i = null,
                n = null;
            i = {
                type: "joinGroupChat",
                groupChatId: t
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("joinGroupChat", n)
        }, this.groupChatInvitation = function(e) {
            k.info("groupChatInvitation"), this.myWebRTC_Event.createGroupChatInvitationEvent(e.groupChatId, e.senderId, e.senderNickname, e.senderPhotoURL, e.contactList)
        }, this.answerToGroupChatInvitation = function(t, i) {
            if (k.info("answerToGroupChatInvitation: " + t + " : " + i), !0 === i || !1 === i) {
                var n = null,
                    a = null;
                n = {
                    type: "groupChatInvitationAnswer",
                    groupChatId: t,
                    senderId: e.apiCCId,
                    nickname: this.nickname,
                    photoURL: this.photoURL,
                    accept: i
                }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("groupChatInvitationAnswer", a)
            } else k.log("accept value is not correct")
        }, this.groupChatMemberUpdate = function(e) {
            k.info("groupChatMemberUpdate"), this.myWebRTC_Event.createGroupChatMemberUpdateEvent(e.groupChatId, e.contactList, e.status)
        }, this.addUserInGroupChat = function(t, i) {
            k.info("addUser : " + i + "in Group Chat with Id :" + t);
            var n = null,
                a = null;
            n = {
                type: "addUserInGroupChat",
                groupChatId: t,
                nickname: this.nickname,
                photoURL: this.photoURL,
                contactId: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("addUserInGroupChat", a)
        }, this.addUserInGroupChatAnswer = function(e) {
            k.info("addUserInGroupChatAnswer"), this.myWebRTC_Event.createAddUserInGroupChatEvent(e.invitationSended, e.groupChatId, e.contactId)
        }, this.leaveGroupChat = function(t) {
            k.info("Leave Group Chat with Id :" + t);
            var i = null,
                n = null;
            i = {
                type: "leaveGroupChat",
                groupChatId: t,
                nickname: this.nickname,
                photoURL: this.photoURL
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("leaveGroupChat", n)
        }, this.sendMessageToGroupChat = function(t, i) {
            k.info("Call sending message to Group Chat .... from :" + this.nickname + " message :" + i);
            var n = null,
                a = null;
            n = {
                type: "groupChatMessage",
                groupChatId: t,
                senderId: e.apiCCId,
                nickname: this.nickname,
                data: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("groupChatMessage", a)
        }, this.receiveGroupChatMessage = function(e) {
            k.info("receiveGroupChatMessage"), this.myWebRTC_Event.createReceiveGroupChatMessageEvent(e.groupChatId, e.senderId, e.nickname, e.data)
        }, this.getConversationHistory = function(t) {
            k.info("getConversationHistory");
            var i = null,
                n = null;
            i = {
                type: "getConversationHistory",
                convId: t
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("getConversationHistory", n)
        }, this.receiveConversationHistory = function(e) {
            k.info("receiveConversationHistory"), k.log("msg.convId :" + e.convId);
            var t = 0,
                i = 0,
                n = [],
                a = null;
            if (null !== e.convHistory)
                for (k.log("msg.convHistory.length :" + e.convHistory.length), i = e.convHistory.length, n = [], t = 0; t < i; t += 1) a = JSON.parse(e.convHistory[t]), n.push(a);
            this.myWebRTC_Event.createReceiveConversationHistoryEvent(e.convId, n, e.status)
        }, this.setUserData = function(t) {
            k.info("setUserData"), this.photoURL = t.photoURL, e.photoURL = t.photoURL, k.log("photoURL :" + this.photoURL);
            var i = null,
                n = null;
            i = {
                type: "setUserData",
                nickname: this.nickname,
                photoURL: this.photoURL
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("setUserData", n), this.userDataSetted = !0
        }, this.getUserData = function(t) {
            k.info("getUserData");
            var i = null,
                n = null;
            i = {
                type: "getUserData",
                contactId: t
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("getUserData", n)
        }, this.receiveUserDataAnswer = function(e) {
            k.info("receiveUserDataAnswer"), this.myWebRTC_Event.createUserDataAnswerEvent(e.userFound, e.contactId, e.nickname, e.photoURL)
        }, this.initialize = function(t) {
            var i = null,
                n = null;
            this.conversation = document.getElementById(t), null === this.conversation && (k.log("conversationElementId Div Name is not correct : INCORRECT_DIV_NAME_CONVERSATION"), k.log("conversationElementId is null")), i = {
                type: "registerIM",
                username: this.nickname
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("registerIM", n)
        }, this.initialize(i)
    }, d.ApiCCDataClient = function(e) {
        k.info("apiCC.ApiCCDataClient"), this.sendData = function(i, n, a) {
            k.info("Call sending data function .... to :" + i + " message :" + n);
            var s = null,
                o = null,
                l = e.channel.getNewCSeq(),
                r = null;
            return s = {
                type: "dataMessage",
                senderId: e.apiCCId,
                dstRoomId: i,
                data: n,
                cSeq: l
            }, o = JSON.stringify(s), k.log("C->S: " + o), a !== t ? (k.log("Ack management activated"), r = setTimeout(function() {
                a({
                    reason: "timeoutReached",
                    cSeq: l
                }), delete d.session.messageTimeOutTable[l]
            }, e.messageTimeOutTimer), k.log("timeOutId: " + r), e.messageTimeOutTable[l] = r, e.channel.socket.emit("dataMessage", o, function(e) {
                k.log("callback on dataMessage"), k.log("callback reason :" + e.reason), k.log("cSeq :" + e.cSeq), a(e), d.session.messageTimeOutTable[l] !== t ? (k.log("clearing timeOutId: " + d.session.messageTimeOutTable[l]), clearTimeout(d.session.messageTimeOutTable[l]), delete d.session.messageTimeOutTable[l]) : k.warn("messageTimeOutTable was already deleted : timeout may have been reached before Ack")
            })) : (k.log("Ack management not activated"), e.channel.socket.emit("dataMessage", o)), l
        }, this.sendDataToGroup = function(t, i) {
            k.info("[ApiCCDataClient] sendDataToGroup - " + t);
            var n, a = e.getConnectedUsersList(t);
            for (n = 0; n < a.length; n++) e.apiCCId != a[n].userId && this.sendData(a[n].userId, i)
        }, this.receiveData = function(e) {
            k.info("receiveData :" + e.data), c.createReceiveDataEvent(e.senderId, e.dstRoomId, e.data)
        }
    }, D = function(e, t) {
        k.info("RoomManager"), this.myWebRTC_Event = new r, this.createRoom = function(t) {
            k.info("RoomManager:createRoom with roomType : " + t);
            var i = null,
                n = null;
            i = {
                type: "createRoom",
                roomType: t,
                nickname: e.nickname,
                photoURL: e.photoURL
            }, n = JSON.stringify(i), k.log("C->S: " + n), e.channel.socket.emit("createRoom", n)
        }, this.roomCreation = function(e) {
            k.info("RoomManager:roomCreation"), this.myWebRTC_Event.createRoomCreationEvent(e.status, e.roomId, e.roomType), t(e)
        }, this.inviteInRoom = function(t, i, n, a) {
            k.info("RoomManager:inviteInRoom with roomType : " + n);
            var s = null,
                o = null;
            s = {
                type: "inviteInRoom",
                roomId: t,
                contactId: i,
                roomType: n,
                nickname: e.nickname,
                photoURL: e.photoURL,
                context: a
            }, o = JSON.stringify(s), k.log("C->S: " + o), e.channel.socket.emit("inviteInRoom", o)
        }, this.inviteInRoomStatus = function(e) {
            k.info("inviteInRoomStatus"), t(e)
        }, this.roomInvitation = function(e) {
            k.info("roomInvitation :" + e), this.myWebRTC_Event.createRoomInvitationEvent(e.roomId, e.senderId, e.senderNickname, e.senderPhotoURL, e.contactList, e.roomType), t(e)
        }, this.requestContactListInRoom = function(t) {
            k.info("requestContactListInRoom :" + t);
            var i = null,
                n = null;
            i = {
                type: "requestContactListInRoom",
                roomId: t
            }, n = JSON.stringify(i), e.channel.socket.emit("requestContactListInRoom", n)
        }, this.onContactListInRoom = function(e) {
            k.info("onContactListInRoom :" + e), this.myWebRTC_Event.createContactListInRoomEvent(e.roomId, e.contactList, e.roomType), t(e)
        }, this.answerToRoomInvitation = function(t, i, n) {
            if (k.info("answerToRoomInvitation: " + t + " : " + i), !0 === i || !1 === i) {
                var a = null,
                    s = null;
                a = {
                    type: "roomInvitationAnswer",
                    roomId: t,
                    senderId: e.apiCCId,
                    nickname: e.nickname,
                    photoURL: e.photoURL,
                    accept: i,
                    roomType: n
                }, s = JSON.stringify(a), k.log("C->S: " + s), e.channel.socket.emit("roomInvitationAnswer", s)
            } else k.log("accept value is not correct")
        }, this.roomMemberUpdate = function(e) {
            k.info("roomMemberUpdate"), this.myWebRTC_Event.createRoomMemberUpdateEvent(e.roomId, e.contactList, e.status, e.roomType), t(e)
        }, this.sendMessageToRoom = function(t, i, n) {
            k.info("Call sending message to Room .... from :" + e.apiCCId + " message :" + n);
            var a = null,
                s = null;
            a = {
                type: "roomMessage",
                roomId: t,
                senderId: e.apiCCId,
                nickname: e.nickname,
                roomType: i,
                data: n
            }, s = JSON.stringify(a), k.log("C->S: " + s), e.channel.socket.emit("roomMessage", s)
        }, this.receiveRoomMessage = function(e) {
            k.info("receiveRoomMessage"), this.myWebRTC_Event.createReceiveRoomMessageEvent(e.roomId, e.senderId, e.nickname, e.data, e.roomType), t(e)
        }, this.joinRoom = function(t, i) {
            k.info("Join Room with Id :" + t);
            var n = null,
                a = null;
            n = {
                type: "joinRoom",
                roomId: t,
                nickname: e.nickname,
                photoURL: e.photoURL,
                roomType: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("joinRoom", a)
        }, this.leaveRoom = function(t, i) {
            k.info("Leave Room with Id :" + t);
            var n = null,
                a = null;
            n = {
                type: "leaveRoom",
                roomId: t,
                nickname: e.nickname,
                photoURL: e.photoURL,
                roomType: i
            }, a = JSON.stringify(n), k.log("C->S: " + a), e.channel.socket.emit("leaveRoom", a)
        }
    }, d.ApiCCWhiteBoardClient = function(i, n, a, s, o) {
        function l(e) {
            var t = 1,
                i = setInterval(function() {
                    t <= .1 && (clearInterval(i), e.style.display = "none"), e.style.opacity = t, e.style.filter = "alpha(opacity=" + 100 * t + ")", t -= .1 * t
                }, 50)
        }
        k.info("Loading apiCC.ApiCCWhiteBoardClient"), this.roomId = null, this.whiteBoardDisconnectionTimeoutId = 0, this.sessionStarted = !1, this.prev = {}, this.lastEmit = Date.now(), this.clients = {}, this.listenedPeers = {}, this.touchScreenActivated = !1, this.touchControlPoint = {}, this.drawElements = [], this.ghostElements = {}, this.userCursorColor = null, this.cursors = {}, this.cursorStyle = "cross", this.availableCursorStyles = ["circle", "cross"], this.currentScale = 1, this.dx = 0, this.dy = 0, this.instructionsFaded = !1, this.canvas = null, this.ctx = null, this.currentTool = "pen", this.currentColor = "rgba(0, 0, 0, 1)", this.currentBrushWidth = 1, this.readOnly = !1, this.isDrawing = !1, this.focusOnDrawing = !1, this.paperSheetId = 0, this.drawingId = 0, this.availableTools = ["pen", "ellipse", "rectangle", "erase", "void", "arrow"], this.objectTools = ["arrow", "rectangle", "ellipse"], this.disconnectionTimer = o !== t ? o : 3e4, k.log("Setting Whiteboard disconnectionTimer to : " + this.disconnectionTimer), this.setCanvas = function(e) {
            k.info("[ApiCCWhiteBoardClient] setCanvas()"), null !== this.canvas && (k.log("Unsetting old canvas events"), this.sessionStarted && !this.readOnly && (this.canvas.onmousedown = null, this.canvas.onmouseup = null, this.canvas.onmouseleave = null, this.canvas.onmousemove = null, this.touchScreenActivated && (this.canvas.removeEventListener("touchstart", this.onTouchStart, !1), this.canvas.removeEventListener("touchend", this.onTouchEnd, !1), this.canvas.removeEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.removeEventListener("touchleave", this.onTouchEnd, !1), this.canvas.removeEventListener("touchmove", this.onTouchMove, !1)))), null !== e && null !== document.getElementById(e) ? (this.canvas = document.getElementById(e), this.ctx = this.canvas.getContext("2d"), this.sessionStarted && !this.readOnly && (this.canvas.onmousedown = this.onmousedown, this.canvas.onmouseup = this.onmouseup, this.canvas.onmouseleave = this.onmouseleave, this.canvas.onmousemove = this.onmousemove, this.touchScreenActivated && (this.canvas.addEventListener("touchstart", this.onTouchStart, !1), this.canvas.addEventListener("touchend", this.onTouchEnd, !1), this.canvas.addEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.addEventListener("touchleave", this.onTouchEnd, !1), this.canvas.addEventListener("touchmove", this.onTouchMove, !1)))) : (null !== e && null === document.getElementById(e) && k.warn("No such element whose id is : " + e), this.canvas = null, this.ctx = null)
        }, this.setCanvas(n), this.setCursorsDiv = function() {
            k.warn("[ApiCCWhiteBoardClient] setCursorsDiv() - method obsolete, please use setUserCursorColor to set a cursor pointer that will be seen by other users")
        }, this.setUserCursorColor = function(e) {
            k.info("[ApiCCWhiteBoardClient] setUserCursorColor() : " + e), null === e || "invisble" === e ? this.userCursorColor = "invisible" : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e) ? this.userCursorColor = e : (k.warn("[ApiCCWhiteBoardClient] setUserCursorColor() color " + e + " is invalid, defaulting to #000000"), this.userCursorColor = "#000000")
        }, this.setUserCursorColor(a), this.setCursorStyle = function(e) {
            k.info("[ApiCCWhiteBoardClient] setCursorStyle() : " + e), this.availableCursorStyles.indexOf(e) > -1 ? (this.userCursorColor = "invisible", this.cursorStyle = e) : k.error("[ApiCCWhiteBoardClient] setCursorStyle() style " + e + " is invalid")
        }, this.setFocusOnDrawing = function(e) {
            k.info("[ApiCCWhiteBoardClient] setFocusOnDrawing()"), this.focusOnDrawing = e
        }, this.createRoom = function() {
            k.info("[ApiCCWhiteBoardClient] createRoom()"), i.roomMgr.createRoom("whiteBoard"), this.paperSheetId = 1
        }, this.requestContactListInRoom = function(e) {
            k.log("[ApiCCWhiteBoardClient] requestContactListInRoom :" + e), i.roomMgr.requestContactListInRoom(e)
        }, this.setDrawingTool = function(e) {
            k.info("[ApiCCWhiteBoardClient] setDrawingTool()"), this.availableTools.indexOf(e) > -1 && (this.currentTool = e, this.ghostElements[d.session.apiCCId] = null)
        }, this.setReadOnly = function(e) {
            k.info("[ApiCCWhiteBoardClient] setReadOnly()"), this.ghostElements[d.session.apiCCId] = null, this.readOnly = !0 === e, this.readOnly && null !== this.canvas ? (this.canvas.onmousedown = null, this.canvas.onmouseup = null, this.canvas.onmouseleave = null, this.canvas.onmousemove = null, this.touchScreenActivated && (this.canvas.removeEventListener("touchstart", this.onTouchStart, !1), this.canvas.removeEventListener("touchend", this.onTouchEnd, !1), this.canvas.removeEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.removeEventListener("touchleave", this.onTouchEnd, !1), this.canvas.removeEventListener("touchmove", this.onTouchMove, !1))) : null !== this.canvas && (this.canvas.onmousedown = this.onmousedown, this.canvas.onmouseup = this.onmouseup, this.canvas.onmouseleave = this.onmouseleave, this.canvas.onmousemove = this.onmousemove, this.touchScreenActivated && (this.canvas.addEventListener("touchstart", this.onTouchStart, !1), this.canvas.addEventListener("touchend", this.onTouchEnd, !1), this.canvas.addEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.addEventListener("touchleave", this.onTouchEnd, !1), this.canvas.addEventListener("touchmove", this.onTouchMove, !1)))
        }, this.setBrushSize = function(e) {
            k.info("[ApiCCWhiteBoardClient] setBrushSize()"), !isNaN(e) && e > 0 && (this.currentBrushWidth = e)
        }, this.setBrushColor = function(e) {
            k.info("[ApiCCWhiteBoardClient] setBrushColor()"), this.currentColor = e
        }, this.setScale = function(e) {
            k.info("[ApiCCWhiteBoardClient] setScale()"), e > 0 ? (this.currentScale = e, this.redraw()) : k.warn("Scale factor must be > 0!")
        }, this.getScale = function() {
            return k.info("[ApiCCWhiteBoardClient] getScale()"), this.currentScale
        }, this.setOffset = function(e, t) {
            k.info("[ApiCCWhiteBoardClient] setOffset()");
            var i = parseInt(e, 10),
                n = parseInt(t, 10);
            isNaN(i) || isNaN(n) || (this.dx = Number(i), this.dy = Number(n), this.redraw())
        }, this.getOffset = function() {
            return k.info("[ApiCCWhiteBoardClient] getOffset()"), {
                x: this.dx,
                y: this.dy
            }
        }, this.printSharedText = function(e, t, n, a, s, o) {
            k.info("[ApiCCWhiteBoardClient] printSharedText()"), this.setBrushStyle(this.currentColor, this.currentBrushWidth), this.drawingId++;
            var l, r = {
                x: e,
                y: t,
                drawing: !1,
                tool: this.currentTool,
                cursorColor: this.userCursorColor,
                color: this.currentColor,
                width: this.currentBrushWidth,
                id: d.session.apiCCId,
                drawingId: this.drawingId,
                drawObject: {
                    type: "text",
                    x: e,
                    y: t,
                    text: n,
                    size: a,
                    font: s,
                    border: o,
                    userId: d.session.apiCCId,
                    drawingId: this.drawingId,
                    time: Date.now()
                }
            };
            (l = r.drawObject).color = r.color, l.width = r.width, this.addNewDrawing(l), i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", r)
        }, this.addPeerListener = function(e, t) {
            k.info("[ApiCCWhiteBoardClient] addPeerListener()"), this.listenedPeers.hasOwnProperty(e) || (this.listenedPeers[e] = []), this.listenedPeers[e].push(t)
        }, this.inviteInRoom = function(e, t, n) {
            k.info("[ApiCCWhiteBoardClient] inviteInRoom()"), i.roomMgr.inviteInRoom(e, t, "whiteBoard", n)
        }, this.answerToRoomInvitation = function(e, t) {
            k.info("[ApiCCWhiteBoardClient] answerToRoomInvitation()");
            var n = t && null === this.roomId,
                a = null;
            return null === this.roomId ? i.roomMgr.answerToRoomInvitation(e, n, "whiteBoard") : k.error("[ApiCCWhiteBoardClient] user is already in a whiteboard session, room invitation could not be answered"), n && (k.log("[ApiCCWhiteBoardClient] user joining room"), this.paperSheetId = 0, this.drawingId = 0, a = {
                x: 0,
                y: 0,
                drawing: !1,
                tool: "pen",
                cursorColor: this.userCursorColor,
                color: this.currentColor,
                width: 1,
                paperSheetId: this.paperSheetId,
                drawingId: this.drawingId,
                needCatchUp: "*||-1",
                id: i.apiCCId
            }, this.roomId = e, i.roomMgr.sendMessageToRoom(e, "whiteBoard", a)), n
        }, this.joinRoom = function(e) {
            if (k.info("[ApiCCWhiteBoardClient] joinRoom()"), null === this.roomId && null !== e) {
                i.roomMgr.joinRoom(e, "whiteBoard"), this.paperSheetId = 0, this.drawingId = 0;
                var t = {
                    x: 0,
                    y: 0,
                    drawing: !1,
                    tool: "pen",
                    cursorColor: this.userCursorColor,
                    color: this.currentColor,
                    width: 1,
                    paperSheetId: this.paperSheetId,
                    drawingId: this.drawingId,
                    needCatchUp: "*||-1",
                    id: i.apiCCId
                };
                i.roomMgr.sendMessageToRoom(e, "whiteBoard", t), this.roomId = e
            } else k.error("[ApiCCWhiteBoardClient] user is already in a whiteboard session or tried to join a null session")
        }, this.leaveRoom = function(e) {
            k.info("[ApiCCWhiteBoardClient] leaveRoom()"), i.roomMgr.leaveRoom(e, "whiteBoard"), this.roomId = null
        }, this.clearPaper = function() {
            k.info("[ApiCCWhiteBoardClient] clearPaper()"), this.deleteHistory()
        }, this.refreshCanvas = function() {
            if (null !== this.canvas && null !== this.ctx) {
                var e = this.canvas.width;
                this.canvas.width = e
            }
        }, this.deleteHistory = function() {
            k.info("[ApiCCWhiteBoardClient] deleteHistory()"), this.refreshCanvas(), this.drawElements = [], this.ghostElements[d.session.apiCCId] = null, this.paperSheetId++, this.drawingId = 0;
            var e = {
                x: 0,
                y: 0,
                drawing: !1,
                tool: "pen",
                cursorColor: this.userCursorColor,
                color: this.currentColor,
                width: 1,
                paperSheetId: this.paperSheetId,
                drawElements: this.drawElements,
                id: i.apiCCId
            };
            i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", e)
        }, this.setBrushStyle = function(e, t) {
            null !== this.ctx && (this.ctx.strokeStyle = e, this.ctx.fillStyle = e, this.ctx.lineWidth = t)
        }, this.redraw = function() {
            k.info("[ApiCCWhiteBoardClient] redraw()");
            var e, t, i;
            for (this.refreshCanvas(), e = 0; e < this.drawElements.length; e++) this.drawSingleObject(this.drawElements[e]);
            for (t = Object.keys(this.ghostElements), e = 0; e < t.length; e++) null !== this.ghostElements[t[e]] && this.drawSingleObject(this.ghostElements[t[e]]);
            for (t = Object.keys(this.cursors), e = 0; e < t.length; e++)
                if (null !== this.cursors[t[e]] && "invisible" !== this.cursors[t[e]].color && (0 !== this.cursors[t[e]].x || 0 !== this.cursors[t[e]].y)) switch (i = {
                    fromx: (this.cursors[t[e]].x - this.dx) * this.currentScale - 13,
                    fromy: (this.cursors[t[e]].y - this.dy) * this.currentScale - 13,
                    tox: (this.cursors[t[e]].x - this.dx) * this.currentScale + 13,
                    toy: (this.cursors[t[e]].y - this.dy) * this.currentScale + 13
                }, this.setBrushStyle(this.cursors[t[e]].color, 4), this.cursorStyle) {
                    case "circle":
                        this.ctx.globalAlpha = .4, this.fillEllipse(i.fromx, i.fromy, i.tox, i.toy), this.drawEllipse(i.fromx + 2, i.fromy + 2, i.tox - 2, i.toy - 2), this.ctx.globalAlpha = 1;
                        break;
                    case "cross":
                        this.ctx.globalAlpha = .7, this.ctx.beginPath(), this.ctx.moveTo(i.fromx + (i.tox - i.fromx) / 2, i.fromy), this.ctx.lineTo(i.fromx + (i.tox - i.fromx) / 2, i.toy), this.ctx.lineCap = "butt", this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(i.fromx, i.fromy + (i.toy - i.fromy) / 2), this.ctx.lineTo(i.tox, i.fromy + (i.toy - i.fromy) / 2), this.ctx.lineCap = "butt", this.ctx.stroke(), this.ctx.globalAlpha = 1
                }
        }, this.addNewDrawing = function(e) {
            this.drawElements.push(e), this.drawSingleObject(e)
        }, this.drawSingleObject = function(e) {
            if (null !== this.ctx && null !== this.canvas) {
                var t = {};
                switch (this.setBrushStyle(e.color, e.width), this.ctx.scale(this.currentScale, this.currentScale), t.fromx = e.fromx - this.dx, t.tox = e.tox - this.dx, t.x = e.x - this.dx, t.fromy = e.fromy - this.dy, t.toy = e.toy - this.dy, t.y = e.y - this.dy, e.type) {
                    case "arrow":
                        this.drawArrow(t.fromx, t.fromy, t.tox, t.toy);
                        break;
                    case "ellipse":
                        this.drawEllipse(t.fromx, t.fromy, t.tox, t.toy);
                        break;
                    case "rectangle":
                        this.drawRectangle(t.fromx, t.fromy, t.tox, t.toy);
                        break;
                    case "pen":
                        this.drawLine(t.fromx, t.fromy, t.tox, t.toy);
                        break;
                    case "erase":
                        this.eraseArea(t.fromx, t.fromy);
                        break;
                    case "text":
                        this.drawText(t.x, t.y, e.text, e.size, e.font, e.border)
                }
                this.ctx.scale(1 / this.currentScale, 1 / this.currentScale)
            }
        }, this.drawLine = function(e, t, i, n) {
            null !== this.ctx && (this.ctx.beginPath(), this.ctx.moveTo(e, t), this.ctx.lineTo(i, n), this.ctx.lineCap = "round", this.ctx.stroke())
        }, this.drawText = function(e, t, i, n, a, s) {
            if (null !== this.ctx) {
                var o, l, r = "Arial";
                void 0 !== a && null !== a && (r = a), this.ctx.font = n + "px " + r, this.ctx.fillText(i, e, t), void 0 !== s && null !== s && (o = this.ctx.strokeStyle, l = this.ctx.lineWidth, this.ctx.strokeStyle = s, this.ctx.lineWidth = 1, this.ctx.strokeText(i, e, t), this.ctx.strokeStyle = o, this.ctx.lineWidth = l)
            }
        }, this.eraseArea = function(e, t) {
            null !== this.ctx && this.ctx.clearRect(e - this.ctx.lineWidth - 1, t - this.ctx.lineWidth - 1, 2 * this.ctx.lineWidth + 2, 2 * this.ctx.lineWidth + 2)
        }, this.drawArrow = function(e, t, i, n) {
            if (null !== this.ctx) {
                var a = Math.atan2(n - t, i - e);
                this.ctx.beginPath(), this.ctx.lineCap = "butt", this.ctx.moveTo(e, t), this.ctx.lineTo(i, n), this.ctx.stroke(), this.ctx.save(), this.ctx.beginPath(), this.ctx.translate(i, n), this.ctx.rotate(a + Math.PI / 2), this.ctx.moveTo(0, -this.ctx.lineWidth), this.ctx.lineTo(5 * this.ctx.lineWidth * .5 + 1, 10 + .25 * this.ctx.lineWidth), this.ctx.lineTo(-5 * this.ctx.lineWidth * .5 - 1, 10 + .25 * this.ctx.lineWidth), this.ctx.closePath(), this.ctx.restore(), this.ctx.fill()
            }
        }, this.drawEllipse = function(e, t, i, n) {
            if (null !== this.ctx) {
                var a = {
                        x: Math.abs(e - i) / 2,
                        y: Math.abs(t - n) / 2
                    },
                    s = {
                        x: e - (e - i) / 2,
                        y: t - (t - n) / 2
                    };
                this.ctx.beginPath(), this.ctx.ellipse(s.x, s.y, a.x, a.y, 0, 0, 2 * Math.PI), this.ctx.stroke()
            }
        }, this.fillEllipse = function(e, t, i, n) {
            if (null !== this.ctx) {
                var a = {
                        x: Math.abs(e - i) / 2,
                        y: Math.abs(t - n) / 2
                    },
                    s = {
                        x: e - (e - i) / 2,
                        y: t - (t - n) / 2
                    };
                this.ctx.beginPath(), this.ctx.ellipse(s.x, s.y, a.x, a.y, 0, 0, 2 * Math.PI), this.ctx.fill()
            }
        }, this.drawRectangle = function(e, t, i, n) {
            if (null !== this.ctx) {
                this.ctx.beginPath();
                var a = e,
                    s = t;
                e > i && (a = i), t > n && (s = n), this.ctx.rect(a, s, Math.abs(e - i), Math.abs(t - n)), this.ctx.stroke()
            }
        }, this.getContext = function() {
            return this.ctx
        }, this.loadPhotoInBackground = function(e) {
            k.info("[ApiCCWhiteBoardClient] loadPhotoInBackground :" + e);
            var t = document.getElementsByTagName("body")[0];
            t.style.backgroundImage = "url(" + e + ")", t.style.backgroundPosition = "50% 50%", t.style.backgroundRepeat = "no-repeat"
        }, this.messageProcessing = function(e) {
            var t, n, a, s = null,
                o = null,
                l = !1,
                r = {};
            if (this.cursors[e.id] || (k.log("[ApiCCWhiteBoardClient] messageProcessing - creating cursor for new user : " + e.id), this.cursors[e.id] = {
                    id: e.id
                }), this.cursors[e.id].x = e.x, this.cursors[e.id].y = e.y, this.cursors[e.id].lastUpdate = Date.now(), e.cursorColor && null !== e.cursorColor ? this.cursors[e.id].color = e.cursorColor : this.cursors[e.id].color = "#000000", "invisible" !== this.cursors[e.id].color && (l = !0), null !== this.ghostElements[e.id] && (this.ghostElements[e.id] = null, l = !0), this.listenedPeers.hasOwnProperty(e.id))
                for (n = {
                        id: e.id,
                        x: e.x,
                        y: e.y,
                        tool: e.tool,
                        drawing: e.drawing
                    }, t = 0; t < this.listenedPeers[e.id].length; t++) "function" == typeof this.listenedPeers[e.id][t] ? this.listenedPeers[e.id][t](n) : k.warn("[ApiCCWhiteBoardClient] Peer listenener is not a function!");
            if (e.drawing && this.clients[e.id] && ((o = {
                    fromx: void 0 !== e.prevX ? e.prevX : this.clients[e.id].x,
                    fromy: void 0 !== e.prevY ? e.prevY : this.clients[e.id].y,
                    tox: e.x,
                    toy: e.y
                }).type = null !== e.tool ? e.tool : "pen", o.color = e.color, o.width = e.width, o.userId = e.id, this.objectTools.indexOf(o.type) > -1 ? e.prevX && e.prevY && (this.ghostElements[e.id] = o, l = !0) : this.addNewDrawing(o), this.focusOnDrawing && ((s = this.canvas.parentNode).scrollLeft = this.currentScale * (e.x - this.dx) - s.clientWidth / 2, s.scrollTop = this.currentScale * (e.y - this.dy) - s.clientHeight / 2)), e.drawObject && ((o = e.drawObject).color = e.color, o.width = e.width, this.ghostElements[e.id] = null, this.addNewDrawing(o), this.focusOnDrawing && ((s = this.canvas.parentNode).scrollLeft = this.currentScale * (e.x - this.dx) - s.clientWidth / 2, s.scrollTop = this.currentScale * (e.y - this.dy) - s.clientHeight / 2)), e.hasOwnProperty("paperSheetId")) {
                if (e.paperSheetId < this.paperSheetId) k.log("[ApiCCWhiteBoardClient] - messageProcessing : sending update to peer"), r = {
                    x: 0,
                    y: 0,
                    drawing: !1,
                    tool: "pen",
                    cursorColor: this.userCursorColor,
                    color: this.currentColor,
                    width: 1,
                    paperSheetId: this.paperSheetId,
                    drawingId: this.drawingId,
                    drawElements: this.drawElements,
                    id: i.apiCCId
                }, i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", r);
                else if (e.paperSheetId > this.paperSheetId) {
                    if (k.log("[ApiCCWhiteBoardClient] - messageProcessing : peer has a more recent version : " + this.paperSheetId + " vs " + e.paperSheetId), e.hasOwnProperty("drawElements")) {
                        for (k.log("[ApiCCWhiteBoardClient] - messageProcessing : receiving update from peer"), this.drawElements = e.drawElements, t = 0; t < this.drawElements.length; t++) this.drawElements[t].hasOwnProperty("userId") && this.drawElements[t].hasOwnProperty("drawingId") && (this.clients[this.drawElements[t].userId] = {
                            x: 0,
                            y: 0,
                            drawing: !1,
                            tool: "pen",
                            cursorColor: null,
                            color: null,
                            width: 1,
                            paperSheetId: this.paperSheetId,
                            drawingId: this.drawElements[t].drawingId,
                            id: this.drawElements[t].userId
                        });
                        this.paperSheetId = e.paperSheetId, this.drawingId = 0, l = !0
                    }
                } else if (e.hasOwnProperty("drawingId"))
                    if (0 !== e.drawingId && void 0 === this.clients[e.id] || void 0 !== this.clients[e.id] && this.clients[e.id].hasOwnProperty("drawingId") && e.drawingId - this.clients[e.id].drawingId > 1) k.log("[ApiCCWhiteBoardClient] - messageProcessing : catchup from peer required : " + e.drawingId), r = {
                        x: 0,
                        y: 0,
                        drawing: !1,
                        tool: "pen",
                        cursorColor: this.userCursorColor,
                        color: this.currentColor,
                        width: 1,
                        paperSheetId: this.paperSheetId,
                        drawingId: this.drawingId,
                        id: i.apiCCId
                    }, void 0 !== this.clients[e.id] && this.clients[e.id].hasOwnProperty("drawingId") ? r.needCatchUp = e.id + "||" + e.drawingId : r.needCatchUp = e.id + "||" + -1, i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", r);
                    else if (e.hasOwnProperty("needCatchUp") && (e.needCatchUp.startsWith(i.apiCCId + "||") || e.needCatchUp.startsWith("*||"))) {
                    for (k.log("[ApiCCWhiteBoardClient] - messageProcessing : letting peer catchup: " + e.id), a = e.needCatchUp.split("||")[1], r = {
                            x: 0,
                            y: 0,
                            drawing: !1,
                            tool: "pen",
                            cursorColor: this.userCursorColor,
                            color: this.currentColor,
                            width: 1,
                            paperSheetId: this.paperSheetId,
                            drawingId: this.drawingId,
                            catchUpData: [],
                            catchUpDest: e.id,
                            id: i.apiCCId
                        }, t = 0; t < this.drawElements.length; t++) this.drawElements[t].hasOwnProperty("userId") && this.drawElements[t].hasOwnProperty("drawingId") && this.drawElements[t].userId === i.apiCCId && this.drawElements[t].drawingId > parseInt(a, 10) && r.catchUpData.push(this.drawElements[t]);
                    i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", r)
                }
                e.hasOwnProperty("catchUpData") && e.hasOwnProperty("catchUpDest") && e.catchUpDest.toString() === i.apiCCId.toString() && (k.log("[ApiCCWhiteBoardClient] - messageProcessing : catching up: " + e.id), this.drawElements = e.catchUpData.concat(this.drawElements), l = !0)
            }
            l && this.redraw(), this.clients[e.id] = e
        }, this.start = function() {
            k.info("[ApiCCWhiteBoardClient] starting WhiteBoardClient"), this.isDrawing = !1, this.prev = {}, this.lastEmit = Date.now(), this.currentScale = 1, this.dx = 0, this.dy = 0, this.drawingId = 0, this.clients = {}, this.listenedPeers = {}, this.cursors = {}, this.drawElements = [], this.touchScreenActivated = !1, this.sessionStarted = !0, null !== this.canvas && (this.canvas.onmousedown = this.onmousedown, this.canvas.onmouseup = this.onmouseup, this.canvas.onmouseleave = this.onmouseleave, this.canvas.onmousemove = this.onmousemove)
        }, this.stop = function() {
            k.info("[ApiCCWhiteBoardClient] Stopping WhiteBoardClient"), this.sessionStarted = !1, this.paperSheetId = 0, this.drawingId = 0, this.listenedPeers = {}, null !== this.canvas && (this.canvas.onmousedown = null, this.canvas.onmouseup = null, this.canvas.onmouseleave = null, this.canvas.onmousemove = null, this.touchScreenActivated && (this.canvas.removeEventListener("touchstart", this.onTouchStart, !1), this.canvas.removeEventListener("touchend", this.onTouchEnd, !1), this.canvas.removeEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.removeEventListener("touchleave", this.onTouchEnd, !1), this.canvas.removeEventListener("touchmove", this.onTouchMove, !1)))
        }, this.getTouchOffSet = function(t) {
            k.info("[ApiCCWhiteBoardClient] getTouchOffSet():");
            var i = null,
                n = null,
                a = 0,
                s = 0,
                o = null,
                l = {};
            return l.offsetX = 0, l.offsetY = 0, i = t.target, n = e.getComputedStyle(i, null), a = parseInt(n.borderLeftWidth, 10), s = parseInt(n.borderTopWidth, 10), o = i.getBoundingClientRect(), l.offsetX = t.clientX - a - o.left, l.offsetY = t.clientY - s - o.top, k.log("offset.offsetX :" + l.offsetX), k.log("offset.offsetY :" + l.offsetY), l
        }, this.toggleTouchScreen = function() {
            !0 === this.touchScreenActivated ? this.deactivateTouchScreen() : this.activateTouchScreen()
        }, this.activateTouchScreen = function() {
            null !== this.canvas ? (this.touchScreenActivated = !0, this.canvas.addEventListener("touchstart", this.onTouchStart, !1), this.canvas.addEventListener("touchend", this.onTouchEnd, !1), this.canvas.addEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.addEventListener("touchleave", this.onTouchEnd, !1), this.canvas.addEventListener("touchmove", this.onTouchMove, !1)) : k.warn("Trying to activateTouchScreen() while canvas is null.")
        }, this.deactivateTouchScreen = function() {
            null !== this.canvas ? (this.touchScreenActivated = !1, this.canvas.removeEventListener("touchstart", this.onTouchStart, !1), this.canvas.removeEventListener("touchend", this.onTouchEnd, !1), this.canvas.removeEventListener("touchcancel", this.onTouchCancel, !1), this.canvas.removeEventListener("touchleave", this.onTouchEnd, !1), this.canvas.removeEventListener("touchmove", this.onTouchMove, !1)) : k.warn("Trying to deactivateTouchScreen() while canvas is null.")
        }, this.sendDrawingData = function(e, t, n) {
            var a = {
                x: e.offsetX,
                y: e.offsetY,
                drawing: t,
                tool: this.currentTool,
                cursorColor: this.userCursorColor,
                color: this.currentColor,
                width: this.currentBrushWidth,
                id: d.session.apiCCId,
                prevX: this.prev.x,
                prevY: this.prev.y,
                paperSheetId: this.paperSheetId
            };
            null !== n && (a.drawObject = n, a.drawObject.drawingId = this.drawingId, a.drawObject.userId = d.session.apiCCId, this.drawingId++), a.drawingId = this.drawingId, i.roomMgr.sendMessageToRoom(this.roomId, "whiteBoard", a)
        }, this.onmousedown = function(t) {
            t.preventDefault();
            var i, n = t.target || t.srcElement,
                a = n.currentStyle || e.getComputedStyle(n, null),
                o = parseInt(a.borderLeftWidth, 10),
                r = parseInt(a.borderTopWidth, 10),
                c = n.getBoundingClientRect(),
                d = {
                    offsetX: this.dx + 1 / this.currentScale * (t.clientX - o - c.left),
                    offsetY: this.dy + 1 / this.currentScale * (t.clientY - r - c.top)
                },
                h = null;
            this.prev.x = d.offsetX, this.prev.y = d.offsetY, this.isDrawing = !0, null === (h = document.getElementById(s)) || this.instructionsFaded || (l(h), this.instructionsFaded = !0), "erase" === this.currentTool && (this.sendDrawingData(d, this.isDrawing, null), this.lastEmit = Date.now(), i = {
                type: this.currentTool,
                fromx: this.prev.x,
                fromy: this.prev.y,
                color: this.currentColor,
                width: this.currentBrushWidth,
                drawingId: this.drawingId,
                time: Date.now()
            }, this.drawingId++, this.addNewDrawing(i), this.redraw())
        }.bind(this), this.onmouseup = function(t) {
            var i, n = null,
                a = null,
                s = 0,
                o = 0,
                l = null,
                r = {
                    offsetX: 0,
                    offsetY: 0
                };
            this.isDrawing && this.objectTools.indexOf(this.currentTool) > -1 && (a = (n = t.target || t.srcElement).currentStyle || e.getComputedStyle(n, null), s = parseInt(a.borderLeftWidth, 10), o = parseInt(a.borderTopWidth, 10), l = n.getBoundingClientRect(), r.offsetX = this.dx + 1 / this.currentScale * (t.clientX - s - l.left), r.offsetY = this.dy + 1 / this.currentScale * (t.clientY - o - l.top), i = {
                type: this.currentTool,
                fromx: this.prev.x,
                fromy: this.prev.y,
                tox: r.offsetX,
                toy: r.offsetY,
                color: this.currentColor,
                width: this.currentBrushWidth,
                time: Date.now()
            }, this.sendDrawingData(r, this.isDrawing, i), this.ghostElements[d.session.apiCCId] = null, this.redraw(), this.addNewDrawing(i), this.prev.x = r.offsetX, this.prev.y = r.offsetY), this.isDrawing = !1, this.ghostElements[d.session.apiCCId] = null
        }.bind(this), this.onmouseleave = function() {
            this.isDrawing = !1, this.sendDrawingData({
                offsetX: 0,
                offsetY: 0
            }, this.isDrawing, null), this.ghostElements[d.session.apiCCId] = null, this.redraw()
        }.bind(this), this.onmousemove = function(t) {
            var i, n = null,
                a = null,
                s = 0,
                o = 0,
                l = null,
                r = {};
            a = (n = t.target || t.srcElement).currentStyle || e.getComputedStyle(n, null), s = parseInt(a.borderLeftWidth, 10), o = parseInt(a.borderTopWidth, 10), l = n.getBoundingClientRect(), r.offsetX = this.dx + 1 / this.currentScale * (t.clientX - s - l.left), r.offsetY = this.dy + 1 / this.currentScale * (t.clientY - o - l.top), Date.now() - this.lastEmit > 30 && (this.sendDrawingData(r, this.isDrawing, null), this.lastEmit = Date.now(), this.isDrawing ? (i = {
                type: this.currentTool,
                fromx: this.prev.x,
                fromy: this.prev.y,
                color: this.currentColor,
                width: this.currentBrushWidth,
                userId: d.session.apiCCId,
                time: Date.now()
            }, "pen" === this.currentTool || "erase" === this.currentTool ? ("pen" === this.currentTool && (i.tox = r.offsetX, i.toy = r.offsetY), i.drawingId = this.drawingId, this.drawingId++, this.addNewDrawing(i), this.prev.x = r.offsetX, this.prev.y = r.offsetY) : this.objectTools.indexOf(this.currentTool) > -1 && (i.tox = r.offsetX, i.toy = r.offsetY, this.ghostElements[d.session.apiCCId] = i), this.redraw()) : "erase" === this.currentTool && (this.redraw(), i = {
                type: "rectangle",
                fromx: r.offsetX - this.currentBrushWidth,
                fromy: r.offsetY - this.currentBrushWidth,
                tox: parseInt(r.offsetX, 10) + parseInt(this.currentBrushWidth, 10),
                toy: parseInt(r.offsetY, 10) + parseInt(this.currentBrushWidth, 10),
                color: "#444444",
                width: 1
            }, this.drawSingleObject(i), i.color = "#DDDDDD", i.fromx = i.fromx - 1, i.fromy = i.fromy - 1, i.tox = i.tox + 1, i.toy = i.toy + 1, this.drawSingleObject(i)))
        }.bind(this), this.onTouchStart = function(e) {
            k.info("[ApiCCWhiteBoardClient] handleStart"), e.preventDefault();
            var t = e.changedTouches,
                i = null,
                n = {};
            this.isDrawing = !0, (n = this.getTouchOffSet(t[0])).offsetX = this.dx + 1 / this.currentScale * n.offsetX, n.offsetY = this.dy + 1 / this.currentScale * n.offsetY, this.prev.x = n.offsetX, this.prev.y = n.offsetY, this.sendDrawingData(n, !1, null), null !== (i = document.getElementById(s)) && l(i)
        }.bind(this), this.onTouchEnd = function(t) {
            k.info("[ApiCCWhiteBoardClient] handleEnd :" + t);
            var i, n = null,
                a = null,
                s = {},
                o = t.changedTouches;
            this.isDrawing && this.objectTools.indexOf(this.currentTool) > -1 && (a = (n = t.target || t.srcElement).currentStyle || e.getComputedStyle(n, null), parseInt(a.borderLeftWidth, 10), parseInt(a.borderTopWidth, 10), n.getBoundingClientRect(), (s = this.getTouchOffSet(o[0])).offsetX = this.dx + 1 / this.currentScale * s.offsetX, s.offsetY = this.dy + 1 / this.currentScale * s.offsetY, i = {
                type: this.currentTool,
                fromx: this.prev.x,
                fromy: this.prev.y,
                tox: s.offsetX,
                toy: s.offsetY,
                color: this.currentColor,
                width: this.currentBrushWidth,
                time: Date.now()
            }, this.sendDrawingData(s, this.isDrawing, i), this.addNewDrawing(i), this.prev.x = s.offsetX, this.prev.y = s.offsetY), this.isDrawing = !1, this.ghostElements[d.session.apiCCId] = null, t = null
        }.bind(this), this.onTouchCancel = function(e) {
            k.info("[ApiCCWhiteBoardClient] handleCancel :" + e), this.isDrawing = !1, this.ghostElements[d.session.apiCCId] = null, e = null
        }.bind(this), this.onTouchMove = function(e) {
            k.info("[ApiCCWhiteBoardClient] handleMove :" + e);
            var t, i = e.changedTouches,
                n = {};
            Date.now() - this.lastEmit > 30 && ((n = this.getTouchOffSet(i[0])).offsetX = this.dx + 1 / this.currentScale * n.offsetX, n.offsetY = this.dy + 1 / this.currentScale * n.offsetY, this.sendDrawingData(n, this.isDrawing, null), this.lastEmit = Date.now(), this.isDrawing && ((n = this.getTouchOffSet(i[0])).offsetX = this.dx + 1 / this.currentScale * n.offsetX, n.offsetY = this.dy + 1 / this.currentScale * n.offsetY, t = {
                type: this.currentTool,
                fromx: this.prev.x,
                fromy: this.prev.y,
                color: this.currentColor,
                width: this.currentBrushWidth,
                userId: d.session.apiCCId,
                time: Date.now()
            }, "pen" === this.currentTool || "erase" === this.currentTool ? ("pen" === this.currentTool && (t.tox = n.offsetX, t.toy = n.offsetY), t.drawingId = this.drawingId, this.drawingId++, this.addNewDrawing(t), this.prev.x = n.offsetX, this.prev.y = n.offsetY) : this.objectTools.indexOf(this.currentTool) > -1 && (t.tox = n.offsetX, t.toy = n.offsetY, this.ghostElements[d.session.apiCCId] = t, this.redraw())))
        }.bind(this)
    }, d.ApiCCCoBrowsingClient = function(e) {
        k.info("apiCC.ApiCCCoBrowsingClient"), this.createRoom = function() {
            k.info("createRoom()"), e.roomMgr.createRoom("coBrowsing")
        }, this.inviteInRoom = function(t, i) {
            k.info("inviteInRoom()"), e.roomMgr.inviteInRoom(t, i, "coBrowsing")
        }, this.answerToRoomInvitation = function(t, i) {
            k.info("answerToRoomInvitation()"), e.roomMgr.answerToRoomInvitation(t, i, "coBrowsing")
        }, this.leaveRoom = function(t) {
            k.info("leaveRoom()"), e.roomMgr.leaveRoom(t, "coBrowsing")
        }
    }, d.ApiCCWebRTCClient = function(i, n, a, s, o, l) {
        k.info("apiCC.ApiCCWebRTCClient"), this.myWebRTC_Event = new r, this.webRTCClient = new g(i), this.webRTCClient.channelReady = !0, "undefined" == typeof apiRTC_React && this.webRTCClient.initialize(n, a, s, o, l), this.manageWebRTCPlugin = function(t, i) {
            k.info("manageWebRTCPlugin");
            var n = "";
            n = "https:" != e.location.protocol ? "http" : "https", $LAB.script(function() {
                return n + "://cdn.temasys.com.sg/adapterjs/0.14.x/adapter.debug.js"
            }).wait(function() {
                k.log("End of .js loading for plugin"), AdapterJS.WebRTCPlugin.isPluginInstalled(AdapterJS.WebRTCPlugin.pluginInfo.prefix, AdapterJS.WebRTCPlugin.pluginInfo.plugName, AdapterJS.WebRTCPlugin.pluginInfo.type, function() {
                    return d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.RTCSessionDescription = RTCSessionDescription, d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.RTCIceCandidate = RTCIceCandidate, d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.RTCPeerConnection = RTCPeerConnection, d.session.apiCCWebRTCClient.webRTCClient.myWebRTC_Adapter.getUserMedia = navigator.getUserMedia, d.session.apiCCWebRTCClient.webRTCClient.attachMediaStream = attachMediaStream, t()
                }, function() {
                    return i(), d.session.apiCCWebRTCClient.myWebRTC_Event.createEvent({
                        eventType: "webRTCPluginInstallation"
                    }), null
                })
            })
        }, this.call = function(e, n, a) {
            "RECORD" === n && k.warn("DEPRECATED : usage of data parameter on call() as a string with 'RECORD' value will be deprecated in a next version of apiRTC. Please consider using a JSON Data parameter instead : data = {isRecorded : true}");
            return !0 === this.webRTCClient.recordedCall && (k.log("recordedCall option is activated"), n !== t && "RECORD" !== n || (n = {}), n.MCUType = "MCU-Caller", n.confId = Math.floor(1000001 * Math.random()).toString()), n !== t && ("RECORD" !== n && !0 !== n.isRecorded || (k.log("recordedCall option is activated"), n !== t && "RECORD" !== n || (n = {}), n.MCUType = "MCU-Caller", n.confId = Math.floor(1000001 * Math.random()).toString())), a !== t && null !== a && !0 === a.record && (k.log("callConfiguration record option is activated"), n !== t && "RECORD" !== n || (n = {}), n.MCUType = "MCU-Caller", n.confId = Math.floor(1000001 * Math.random()).toString()), k.log("session.webRTCPluginActivated =", i.webRTCPluginActivated), ("IE" === f || "Safari" === f && T < 11) && !0 === i.webRTCPluginActivated ? (k.log("managing call with WebRTC Plugin"), this.manageWebRTCPlugin(function() {
                k.log("manageWebRTCPlugin cb in call"), d.session.apiCCWebRTCClient.webRTCClient.callWithNumber(e, !0, n, a)
            }, function() {
                k.log("actionOnInstallationNeeded")
            }), "WebRTCPlugin") : (k.log("managing call with browser"), this.webRTCClient.callWithNumber(e, !0, n, a))
        }, this.getStatsFromCall = function(e, t) {
            var i = this.webRTCClient.findCallWithCallId(e);
            null === i ? t(new Error("Call was not found"), null) : null === i.pc ? t(new Error("Call has no peerconnection"), null) : i.pc.getStats(null, function(e) {
                t(null, e)
            })
        }, this.testCall = function(e) {
            return k.log("session.webRTCPluginActivated =", i.webRTCPluginActivated), ("IE" === f || "Safari" === f && T < 11) && !0 === i.webRTCPluginActivated ? (k.log("managing call with WebRTC Plugin"), this.manageWebRTCPlugin(function() {
                k.log("manageWebRTCPlugin cb in call"), d.session.apiCCWebRTCClient.webRTCClient.startTestCall(!0, e)
            }, function() {
                k.log("actionOnInstallationNeeded")
            }), "WebRTCPlugin") : (k.log("managing call with browser"), this.webRTCClient.startTestCall(!0, e))
        }, this.activateScreenSharing = function(e) {
            this.webRTCClient.activateScreenSharing(e)
        }, this.shareScreen = function(e, t, i) {
            return this.webRTCClient.shareScreen(e, t, i)
        }, this.startScreenSharingOnCall = function(e, t) {
            k.info("startScreenSharingOnCall"), this.webRTCClient.startScreenSharingOnCall(e, t)
        }, this.startDataChannel = function(e, i) {
            k.info("startDataChannel");
            return i !== t ? i.dataCall = !0 : (i = {}).dataCall = !0, this.webRTCClient.callWithNumber(e, !0, i, null)
        }, this.startDataChannelOnCall = function(e) {
            this.webRTCClient.startDataChannelOnCall(e)
        }, this.sendDataWithCallId = function(e, t, i) {
            this.webRTCClient.sendDataWithCallId(e, t, i)
        }, this.callAudio = function(e, t, i) {
            return k.info("callAudio"), this.webRTCClient.callWithNumber(e, !1, t, i)
        }, this.callbymail = function(e) {
            this.webRTCClient.callbymail(e)
        }, this.addMedia = function(e) {
            return e = this.webRTCClient.addMedia(e)
        }, this.hangUp = function(e) {
            this.webRTCClient.onHangup(e)
        }, this.getMyMedia = function(e, t) {
            if (k.info("getMyMedia : ", e), "screen" === e) {
                var i = {};
                this.webRTCClient.shareScreen("LOCAL", i, t)
            } else this.webRTCClient.getUserMedia()
        }, this.releaseStream = function(e) {
            k.info("releaseStream : ", e), k.info("releaseStream.callId : ", e.callId), e.callId !== t ? this.webRTCClient.removeCallFromTableWithCallIdAndSendBye(e.callId, "stop_ScreenSharing") : this.webRTCClient.stopStream(e)
        }, this.autoAnswerUserMediaSuccessHandler = function(e) {
            k.info("autoAnswerUserMediaSuccessHandler :" + e), e = null, this.webRTCClient.autoAnswer = !0
        }, this.autoAnswerUserMediaErrorHandler = function(e) {
            k.info("autoAnswerUserMediaErrorHandler :" + e), e = null, this.webRTCClient.autoAnswer = !1
        }, this.activateAutoAnswer = function() {
            d.addEventListener("userMediaSuccess", this.callback(this, "autoAnswerUserMediaSuccessHandler")), d.addEventListener("userMediaError", this.callback(this, "autoAnswerUserMediaErrorHandler")), this.webRTCClient.getUserMedia()
        }, this.getAutoAnswer = function() {
            return this.webRTCClient.autoAnswer
        }, this.setUnidirectionalCall = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.unidirectionelCallOnly = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setUnidirectionalCall()", "PARAMETER_ERROR_SETUNIDIRCALL")
        }, this.setPreferVP9Codec = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.preferVP9Codec = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setPreferVP9Codec()", "PARAMETER_ERROR_SETPREFERVP9CODEC")
        }, this.setPreferH264Codec = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.preferH264Codec = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setPreferH264Codec()", "PARAMETER_ERROR_SETPREFERH264CODEC")
        }, this.getUnidirectionalCall = function() {
            return this.webRTCClient.unidirectionelCallOnly
        }, this.toggleVideoMute = function(e) {
            this.webRTCClient.toggleVideoMute(e)
        }, this.isVideoMuted = function(e) {
            k.info("isVideoMuted :", e);
            var i;
            return e === t || null === e ? this.webRTCClient.isVideoMuted : (k.info("callId is defined :", e), -1 !== (i = this.webRTCClient.findCallIndexWithCallId(e)) ? this.webRTCClient.callsTable[i].isVideoMuted : void 0)
        }, this.toggleAudioMute = function(e) {
            this.webRTCClient.toggleAudioMute(e)
        }, this.isAudioMuted = function(e) {
            k.info("isAudioMuted :", e);
            var i;
            return e === t || null === e ? this.webRTCClient.isAudioMuted : (k.info("callId is defined :", e), -1 !== (i = this.webRTCClient.findCallIndexWithCallId(e)) ? this.webRTCClient.callsTable[i].isAudioMuted : void 0)
        }, this.setNtoNConf = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.NtoNConf = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setNtoNConf()", "PARAMETER_ERROR_SETNTONCONF")
        }, this.getNtoNConf = function() {
            return this.webRTCClient.NtoNConf
        }, this.setRTPMedia = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.RTPMedia = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setRTPMedia()", "PARAMETER_ERROR_SETRTPMEDIA")
        }, this.getRTPMedia = function() {
            return this.webRTCClient.RTPMedia
        }, this.setMediaRoutingMode = function(e) {
            "hostOnly" === e ? this.webRTCClient.mediaRoutingMode = this.webRTCClient.mediaRoutingModeEnum.hostOnly : "stun" === e ? this.webRTCClient.mediaRoutingMode = this.webRTCClient.mediaRoutingModeEnum.stun : "stunOnly" === e ? this.webRTCClient.mediaRoutingMode = this.webRTCClient.mediaRoutingModeEnum.stunOnly : "turn" === e ? this.webRTCClient.mediaRoutingMode = this.webRTCClient.mediaRoutingModeEnum.turn : "turnOnly" === e ? this.webRTCClient.mediaRoutingMode = this.webRTCClient.mediaRoutingModeEnum.turnOnly : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setMediaRoutingMode()", "PARAMETER_ERROR_SETMEDIAROUTINGMODE")
        }, this.enableQos = function(e, t) {
            k.info("this.enableQos=" + e), this.webRTCClient.qosEnable = e, this.webRTCClient.qosInterval = t || this.webRTCClient.qosInterval
        }, this.enableCallStatsMonitoring = function(e, t) {
            this.webRTCClient.csmEnable = e, t && (this.webRTCClient.csmIntervalMs = t)
        }, this.getMediaRoutingMode = function() {
            var e = null;
            return this.webRTCClient.mediaRoutingMode === this.webRTCClient.mediaRoutingModeEnum.hostOnly ? e = "hostOnly" : this.webRTCClient.mediaRoutingMode === this.webRTCClient.mediaRoutingModeEnum.stun ? e = "stun" : this.webRTCClient.mediaRoutingMode === this.webRTCClient.mediaRoutingModeEnum.stunOnly ? e = "stunOnly" : this.webRTCClient.mediaRoutingMode === this.webRTCClient.mediaRoutingModeEnum.turn ? e = "turn" : this.webRTCClient.mediaRoutingMode === this.webRTCClient.mediaRoutingModeEnum.turnOnly && (e = "turnOnly"), e
        }, this.setMediaTypeForIncomingCall = function(e) {
            k.info("setMediaTypeForIncomingCall :", e), "VIDEO" === e || "AUDIO" === e || "VIDEOONLY" === e || "NONE" === e ? this.webRTCClient.mediaTypeForIncomingCall = e : k.log("setMediaTypeForIncomingCall, value is not correct", e)
        }, this.setMediaTypeForOutgoingCall = function(e) {
            k.info("setMediaTypeForOutgoingCall :", e), "VIDEO" === e || "AUDIO" === e || "VIDEOONLY" === e || "NONE" === e ? this.webRTCClient.mediaTypeForOutgoingCall = e : k.log("setMediaTypeForOutgoingCall, value is not correct", e)
        }, this.setStereo = function(e) {
            k.info("setStereo :", e), !0 === e ? (this.webRTCClient.setStereo = e, this.webRTCClient.gum_config = {
                audio: {
                    mandatory: {
                        echoCancellation: !1,
                        googEchoCancellation: !1
                    },
                    optional: []
                },
                video: {
                    mandatory: {},
                    optional: []
                }
            }) : !1 === e ? this.webRTCClient.setStereo = e : k.log("setStereo, value is not correct", e)
        }, this.setMCUConnector = function(e) {
            k.info("setMCUConnector :", e), k.log("setting value :", e), "mcu4.apizee.com" === e ? this.webRTCClient.MCUClient.pubConnector = "janusConnector" : "mcu3.apizee.com" === e ? this.webRTCClient.MCUClient.pubConnector = "groupKurentoConnector" : k.log("value is incorrect :", e)
        }, this.setAllowAsymetricMediaCalls = function(e) {
            k.info("setAllowAsymetricMediaCalls :", e), !0 === e ? this.webRTCClient.allowAsymetricMediaCalls = e : !1 === e ? this.webRTCClient.allowAsymetricMediaCalls = e : k.log("setAllowAsymetricMediaCalls, value is not correct", e)
        }, this.takeSnapshot = function(e, t, n, a, s, o) {
            this.webRTCClient.takeSnapshot(e, t, i.apiKey, n, a, s, o)
        }, this.takeSnapshotAndSendOnDataChannel = function(e, t, i, n) {
            this.webRTCClient.takeSnapshotAndSendOnDataChannel(e, t, i, n)
        }, this.setUserAcceptOnIncomingCall = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.userAcceptOnIncomingCall = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setUserAcceptOnIncomingCall()", "PARAMETER_ERROR_SETUSERACCEPTONINCOCALL")
        }, this.setUserAcceptOnIncomingDataCall = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.userAcceptOnIncomingDataCall = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setUserAcceptOnIncomingDataCall()", "PARAMETER_ERROR_SETUSERACCEPTONINCOCALL")
        }, this.setHideLocalVideoOnCall = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.hideLocalVideoOnCall = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : hideLocalVideoOnCall()", "PARAMETER_ERROR_SETHIDELOCALVIDEOONCALL")
        }, this.setAllowMultipleCalls = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.allowMultipleCalls = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setAllowMultipleCalls()", "PARAMETER_ERROR_SETALLOWMULTIPLECALLS")
        }, this.setPcConfig = function(e) {
            k.info("Setting PC_config to :" + e), this.webRTCClient.pc_config = e
        }, this.setPcConstraints = function(e) {
            k.info("Setting PC_constraints to :" + e), this.webRTCClient.pc_constraints = e
        }, this.setGetUserMediaConfig = function(e) {
            this.webRTCClient.setGetUserMediaConfig(e)
        }, this.setTrickleIce = function(e) {
            k.info("Setting trickleIce to :" + e), !0 === e || !1 === e ? this.webRTCClient.trickleIce = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setTrickleIce()", "PARAMETER_ERROR_SETTRICKLEICE")
        }, this.setRecordedCall = function(e) {
            !0 === e || !1 === e ? this.webRTCClient.recordedCall = e : this.myWebRTC_Event.createErrorEvent("parameter error when calling function : setRecordedCall()", "PARAMETER_ERROR_SETRECORDEDCALL")
        }, this.getRecordedCall = function() {
            return this.webRTCClient.recordedCall
        }, this.acceptCall = function(e, t) {
            this.webRTCClient.acceptCall(e, t)
        }, this.refuseCall = function(e) {
            k.info("refuseCall method"), this.webRTCClient.refuseCall(e)
        }, this.toggleVideoScreen = function(e) {
            k.info("toggleVideoScreen method"), this.webRTCClient.toggleVideoScreen(e)
        }, this.switchVideoToScreen = function(e) {
            k.info("switchVideoToScreen method"), this.webRTCClient.switchVideoToScreen(e)
        }, this.switchScreenToVideo = function(e) {
            k.info("switchScreenToVideo method"), this.webRTCClient.switchScreenToVideo(e)
        }, this.updateMediaDeviceOnCall = function(e, t) {
            return k.info("updateMediaDeviceOnCall method"), e = this.webRTCClient.updateMediaDeviceOnCall(e, t)
        }, this.releaseUserMedia = function() {
            this.webRTCClient.releaseUserMedia()
        }, this.setAllowedAudioCodecs = function(e) {
            this.webRTCClient.allowedAudioCodecs = e
        }, this.setAllowedVideoCodecs = function(e) {
            this.webRTCClient.allowedVideoCodecs = e
        }, this.setAudioBandwidth = function(e) {
            this.webRTCClient.setAudioBandwidth(e)
        }, this.setVideoBandwidth = function(e) {
            this.webRTCClient.setVideoBandwidth(e)
        }, this.setDataBandwidth = function(e) {
            this.webRTCClient.setDataBandwidth(e)
        }, this.createMCUSession = function(e, t) {
            k.info("createMCUSession"), !1 === this.webRTCClient.MCUClient.TBLibIsLoaded ? $LAB.script(function() {
                return "//static.opentok.com/webrtc/v2.2/js/opentok.min.js"
            }).wait(function() {
                d.session.apiCCWebRTCClient.webRTCClient.MCUClient.TBLibIsLoaded = !0, d.session.apiCCWebRTCClient.webRTCClient.MCUClient.initDivElements(e, t), d.session.apiCCWebRTCClient.webRTCClient.MCUClient.createSession()
            }) : (this.webRTCClient.MCUClient.initDivElements(e, t), this.webRTCClient.MCUClient.createSession())
        }, this.joinMCUSession = function(e) {
            k.info("joinMCUSession"), this.webRTCClient.MCUClient.joinSession(e)
        }, this.getMCUStreamList = function() {
            return k.info("getMCUStreamList"), this.webRTCClient.MCUClient.getStreamList()
        }, this.getStreamFromList = function(e) {
            return k.info("getStreamFromList"), this.webRTCClient.MCUClient.getStreamFromList(e)
        }, this.getStreamIdOfUser = function(e) {
            return k.info("getStreamIdOfUser"), this.webRTCClient.MCUClient.getStreamIdOfUser(e)
        }, this.getCallIdFromStreamId = function(e) {
            k.info("getCallIdFromStreamId");
            var t = this.webRTCClient.findCallWithStreamId(e);
            return null === t ? (k.log("call not found in getCallIdFromStreamId"), null) : t.callId
        }, this.getCallIdFromRemoteMCUUser = function(e) {
            k.info("getCallIdFromRemoteMCUUser");
            var t = null,
                i = null;
            return t = this.webRTCClient.MCUClient.getStreamIdOfUser(e), null === (i = this.webRTCClient.findCallWithStreamId(t)) ? (k.log("call not found in getCallIdFromRemoteMCUUser"), null) : i.callId
        }, this.publish = function(e, t, i, n, a, s) {
            return k.info("publish"), this.webRTCClient.MCUClient.publish(e, t, i, n, a, s)
        }, this.unpublish = function(e) {
            k.info("unpublish"), this.webRTCClient.MCUClient.unpublish(e)
        }, this.publishScreen = function(e, t, i, n) {
            return k.info("publishScreen"), this.webRTCClient.MCUClient.publishScreen(e, t, i, n)
        }, this.subscribe = function(e, t, i) {
            return k.info("subscribe :", e), "boolean" == typeof t && (k.warn("DEPRECATED : usage of audioOnly parameter on subscribe() is now replaced by mediatype with value VIDEO, AUDIOONLY or VIDEOONLY and will be deprecated in a next version of apiRTC"), t = !0 === t ? "AUDIOONLY" : "VIDEO"), this.webRTCClient.MCUClient.subscribeToStreams(e, t, i)
        }, this.unsubscribe = function(e) {
            k.info("unsubscribe :", e), this.webRTCClient.MCUClient.unsubscribe(e)
        }, this.startStreaming = function(e, t, i, n) {
            k.info("startStreaming"), this.webRTCClient.MCUClient.startStreaming(e, t, i, n)
        }, this.stopStreaming = function(e) {
            k.info("stopStreaming"), this.webRTCClient.MCUClient.stopStreaming(e)
        }, this.startRecording = function(e, t, i, n) {
            k.info("startRecording"), this.webRTCClient.MCUClient.startRecording(e, t, i, n)
        }, this.stopRecording = function(e) {
            k.info("stopRecording"), this.webRTCClient.MCUClient.stopRecording(e)
        }, this.startComposite = function() {
            k.info("startComposite"), this.webRTCClient.MCUClient.startComposite()
        }, this.stopComposite = function() {
            k.info("stopComposite"), this.webRTCClient.MCUClient.stopComposite()
        }, this.startCompositeRecording = function(e, t, i) {
            k.info("startCompositeRecording"), this.webRTCClient.MCUClient.startCompositeRecording(e, t, i)
        }, this.stopCompositeRecording = function() {
            k.info("stopCompositeRecording"), this.webRTCClient.MCUClient.stopCompositeRecording()
        }, this.takeSnapshotOnMCUSession = function(e) {
            return k.info("takeSnapshotOnMCUSession"), this.webRTCClient.MCUClient.takeSnapshot(e)
        }, this.sendMCUSessionInvitation = function(e, t, i) {
            this.webRTCClient.MCUClient.sendSessionInvitation(e, t, i)
        }, this.sendMCUSessionInvitationToGroupChat = function(e, t) {
            this.webRTCClient.MCUClient.sendSessionInvitationToGroupChat(e, t)
        }, this.acceptMCUSessionInvitation = function(e, t, i, n) {
            !1 === this.webRTCClient.MCUClient.TBLibIsLoaded ? $LAB.script(function() {
                return "//static.opentok.com/webrtc/v2.2/js/opentok.min.js"
            }).wait(function() {
                d.session.apiCCWebRTCClient.webRTCClient.MCUClient.TBLibIsLoaded = !0, d.session.apiCCWebRTCClient.webRTCClient.MCUClient.initDivElements(i, n), d.session.apiCCWebRTCClient.webRTCClient.MCUClient.acceptSessionInvitation(e, t)
            }) : (this.webRTCClient.MCUClient.initDivElements(i, n), this.webRTCClient.MCUClient.acceptSessionInvitation(e, t))
        }, this.leaveMCUSession = function() {
            this.webRTCClient.MCUClient.leaveSession()
        }, this.recordStream = function(e) {
            k.info("recordStream :", e), MediaRecorder !== t ? this.webRTCClient.recordMgr.record(e) : k.debug("MediaRecorder is not supported on this browser, leaving recordStream process")
        }, this.stopRecordStream = function(e) {
            k.info("stopRecordStream"), MediaRecorder !== t ? this.webRTCClient.recordMgr.stop(e) : k.debug("MediaRecorder is not supported on this browser, leaving recordStream process")
        }, this.getMediaDevices = function(e) {
            k.info("getMediaDevices"), this.webRTCClient.getMediaDevices(e)
        }, this.setAudioSourceId = function(e) {
            k.info("setAudioSourceId :" + e), this.webRTCClient.audioSourceId = e
        }, this.setAudioOutputId = function(e) {
            k.info("setaudioOutputId :" + e), this.webRTCClient.audioOutputId = e
        }, this.setVideoSourceId = function(e) {
            k.info("setVideoSourceId :" + e), this.webRTCClient.videoSourceId = e
        }, this.attachMediaStream = function(e, t) {
            k.info("attachMediaStream"), this.webRTCClient.attachMediaStream(e, t)
        }, this.addStreamInDiv = function(e, i, n, a, s, o) {
            var l = null;
            (l = "audio" === i ? document.createElement("audio") : document.createElement("video")).id = a, l.autoplay = !0, l.muted = o, l.style.width = s.width, l.style.height = s.height, void 0 !== this.webRTCClient.audioOutputId && null !== this.webRTCClient.audioOutputId ? (k.log("audioOutputId set to: " + this.webRTCClient.audioOutputId), l.setSinkId(this.webRTCClient.audioOutputId).then(function() {
                k.log("Success, audio output device attached")
            })) : k.log("No audioOutputId set"), document.getElementById(n).appendChild(l), e !== t && this.attachMediaStream(l, e)
        }, this.removeElementFromDiv = function(e, t) {
            var i = null;
            null !== (i = document.getElementById(t)) && (k.log("Removing video element with Id : " + t), document.getElementById(e).removeChild(i))
        }, this.setSelectedStream = function(e) {
            k.info("[WebRTCClient] setSelectedStream()"), this.webRTCClient.autoAnswer = !0, this.webRTCClient.selectedLocalStream = e
        }, this.callback = function(e, t) {
            return this.closureHandler = function(i) {
                return e[t](i)
            }, this.closureHandler
        }
    }, d.ApiCCSession = function(e) {
        function a(e) {
            return e instanceof Array ? (k.log("data instanceof Array"), !0) : (k.log("data not instanceof Array"), !1)
        }
        if (this.apiCCId = null, this.apiKey = null, this.nickname = null, this.photoURL = null, this.apiCCWebRTCClient = null, this.apiCCIMClient = null, this.apiCCDataClient = null, this.apiCCIDCookie = null, this.channel = null, this.recordActivated = e.recordActivated, this.sessionId = null, this.apiCCWhiteBoardClient = null, this.apiCCWhiteBoardClients = {}, this.apiCCCoBrowsingClient = null, this.ccsServer = e.ccsServer, this.userData = e.userData, this.apiDBActivated = e.ApiDBActivated, this.webRTCPluginActivated = e.webRTCPluginActivated, this.token = e.token, this.tryAudioCallAfterUserMediaError = e.tryAudioCallAfterUserMediaError, this.deactivateReloadOnCancel = e.deactivateReloadOnCancel, this.updateUserDataToBeDone = !1, this.connectedUsersList = [], this.messageTimeOutTable = [], e.messageTimeOutTimer !== t ? this.messageTimeOutTimer = e.messageTimeOutTimer : this.messageTimeOutTimer = 1e4, k.log("messageTimeOutTimer set to : " + this.messageTimeOutTimer), e.presenceGroup !== t ? this.presenceGroup = e.presenceGroup : this.presenceGroup = ["default"], e.subscribeToPresenceGroup !== t ? this.subscribeToPresenceGroup = e.subscribeToPresenceGroup : this.subscribeToPresenceGroup = ["default"], this.isDeviceWebRTCCompliant = function() {
                var e = M.getOS().name,
                    t = M.getBrowser(),
                    i = M.getDevice().type,
                    a = parseInt(t.version, 10);
                if ("iOS" === e) return k.log("isDeviceWebRTCCompliant FALSE : IOS"), !1;
                if ("Chrome" === t.name && a >= 47 && !n()) return k.log("isDeviceWebRTCCompliant FALSE : Chrome V >= 47 and http"), !1;
                if ("mobile" === i || "tablet" === i || "Android" === e) switch (t.name) {
                    case "Chrome":
                        return a >= 36;
                    case "Firefox":
                        return a >= 40;
                    case "Android Browser":
                        return a >= 44;
                    case "Opera Mobile":
                        return a >= 30;
                    default:
                        return k.log("isDeviceWebRTCCompliant FALSE : unknown Mobile = " + t.name), !1
                } else {
                    if (("IE" === t.name || "Safari" === t.name && T < 11) && !0 !== this.webRTCPluginActivated) return k.log("isDeviceWebRTCCompliant FALSE : IE or Safari"), !1;
                    if ("Vivaldi" === t.name && a < 45) return k.log("isDeviceWebRTCCompliant FALSE : Vivaldi and version < 45"), !1
                }
                return k.log("isDeviceWebRTCCompliant TRUE"), !0
            }, this.isDeviceDTLSCompliant = function() {
                var e = M.getBrowser(),
                    t = parseInt(e.version, 10);
                return !("Chrome" === e.name && t < 44) || (k.log("isDeviceDTLSCompliant FALSE : Chrome V < 44"), !1)
            }, void 0 === this.userData || null === this.userData ? (this.userData = {}, this.userData.webRtcCompliant = this.isDeviceWebRTCCompliant(), this.userData.dtlsCompliant = this.isDeviceDTLSCompliant()) : void 0 === this.userData.webRtcCompliant || null === this.userData.webRtcCompliant ? (this.userData.webRtcCompliant = this.isDeviceWebRTCCompliant(), this.userData.dtlsCompliant = this.isDeviceDTLSCompliant()) : k.log("userData webRtcCompliant set to :", this.userData.webRtcCompliant), this.userData.osName = b, this.userData.browser = f, this.userData.deviceType = S, this.userData.version = v, this.userData.apiRTCVersion = d.version, typeof apiRTC_React !== t && (this.userData.react = !0), this.roomManagerEventHandler = function(e) {
                k.info("roomManagerEventHandler, roomId :" + e.roomId + ", type :" + e.type + ", roomType :" + e.roomType), "whiteBoard" === e.roomType ? ("roomCreation" === e.type && (k.log("whiteBoard : roomCreation"), this.apiCCWhiteBoardClient.roomId = e.roomId), "roomInvitation" === e.type && (k.log("whiteBoard : roomInvitation"), this.apiCCWhiteBoardClient.roomId = e.roomId), "roomMessage" === e.type && this.apiCCWhiteBoardClient.messageProcessing(e.data)) : "coBrowsing" === e.roomType && "roomMessage" === e.type && k.log("coBrowsing : roomMessage :" + e)
            }, this.callback = function(e, t) {
                return this.closureHandler = function(i) {
                    return e[t](i)
                }, this.closureHandler
            }, this.roomMgr = new D(this, this.callback(this, "roomManagerEventHandler")), !0 === e.xhrPolling ? this.xhrPolling = !0 : this.xhrPolling = !1, this.getCookie = function(e) {
                return new RegExp("(?:; )?" + e + "=([^;]*);?").test(document.cookie) ? decodeURIComponent(RegExp.$1) : null
            }, this.generateApiCCID = function() {
                k.info("apiCCId is not defined by user, checking if a cookie for apiCCId exist"), "undefined" == typeof apiRTC_React && (this.apiCCIDCookie = this.getCookie("apiCCId")), null !== this.apiCCIDCookie ? (k.log("apiCCId cookie exist : " + this.apiCCIDCookie), this.apiCCId = this.apiCCIDCookie) : (k.log(" No apiCCId cookie : generating an apiCCId"), this.apiCCId = Math.floor(1000001 * Math.random()).toString(), k.log("Creation of new ApiRTC session with Id : " + this.apiCCId))
            }, this.getNumericIdFromAlpha = function(e) {
                k.log("getNumericIdFromAlpha new : " + e);
                var t = 0,
                    i = 0;
                if (0 === e.length) return t;
                for (i = 0; i < e.length; i++) t = (t << 5) - t + e.charCodeAt(i), t &= t;
                return k.log("getNumericIdFromAlpha returned value: " + (t >>> 0)), t >>> 0
            }, e === t) return alert("Error : Initialisation parameters for session creation are not defined"), k.log("Error : Initialisation parameters for session creation are not defined"), null;
        if (e.appId !== t && (this.appId = e.appId), e.siteId !== t && (this.siteId = e.siteId), e.apiKey === t) return alert('Error : Initialisation parameters: "apikey" for session creation is not defined'), k.log('Error : Initialisation parameters: "apikey" for session creation is not defined'), null;
        if (k.log("Session creation with apiKey : " + e.apiKey), this.apiKey = e.apiKey, e.onReady === t && "undefined" == typeof apiRTC_React) return alert('Error : Initialisation parameters: "onReady" for session creation is not defined'), k.log('Error : Initialisation parameters: "onReady" for session creation is not defined'), null;
        if (d.addEventListener("sessionReady", e.onReady), "undefined" == typeof apiRTC_React && (this.sessionId = this.getCookie("sessionId")), e.apiCCId === t) this.generateApiCCID();
        else if (k.log("Session creation with apiCCId defined by user : " + e.apiCCId), e.idConversionActivated === t || !0 === e.idConversionActivated)
            if (i(e.apiCCId)) this.apiCCId = e.apiCCId.toString();
            else {
                k.log("Converting this Id in a numeric one");
                var r = this.getNumericIdFromAlpha(e.apiCCId);
                r += "", k.log("Numeric Id is : " + r), i(r) ? (k.warn("Id has been converted to a numeric one"), this.apiCCId = r.toString()) : (k.warn("Error : Defined apiCCId :" + e.apiCCId + " is not numeric. ApiCCID is generated"), this.generateApiCCID())
            }
        else k.log("String id convertion is deactivated"), this.apiCCId = e.apiCCId.toString();
        null !== this.channel && (k.log("this.channel is defined"), delete this.channel), this.channel = new h(this), this.channel.initialize(), null !== e.nickname && e.nickname !== t ? (k.log("Nickname is defined :" + e.nickname), this.nickname = e.nickname) : (k.log("Nickname is not defined, setting to apiCCId value :" + this.apiCCId), this.nickname = this.apiCCId), null !== e.photoURL && e.photoURL !== t ? (k.log("photoURL is defined :" + e.photoURL), this.photoURL = e.photoURL) : (k.log("photoURL is not defined"), this.photoURL = null), this.reOpenChannel = function(e, i) {
            k.info("reOpenChannel"), this.apiCCId = e.toString(), this.apiKey = i, this.channel.socket !== t && null !== this.channel.socket && this.channel.socket.disconnect(), this.channel.channelReady = !1, this.channel.socket = null, this.channel.channelId = this.apiCCId, this.channel.initialize(), null !== this.apiCCWebRTCClient && null !== this.apiCCWebRTCClient.webRTCClient && (this.apiCCWebRTCClient.webRTCClient.socket = this.channel.socket)
        }, this.onChannelOpened = function() {
            k.info("ApiCCSession onChannelOpened"), !1 !== e.ApiDBActivated && e.ApiDBActivated !== t && null !== e.ApiDBActivated && (k.log("apiDB initialisation"), apiDB.init(this.channel.socket)), c.createSessionReadyEvent(d.session.apiCCId)
        }, this.createWebRTCClient = function(e) {
            return k.info("createWebRTCClient"), e !== t && null !== e ? (this.apiCCWebRTCClient = new d.ApiCCWebRTCClient(this, e.localVideo, e.minilocalVideo, e.remoteVideo, e.status, e.command), this.apiCCWebRTCClient.webRTCClient.getMediaDevices(this.apiCCWebRTCClient.webRTCClient.gotSources), this.apiCCWebRTCClient) : (k.log("Error : Initialisation parameters is null or not defined on WebRTCClient creation"), null)
        }, this.createWhiteBoard = function(e, t, i, n) {
            return k.info("createWhiteBoard"), this.apiCCWhiteBoardClient = new d.ApiCCWhiteBoardClient(this, e, t, i, n), this.apiCCWhiteBoardClient
        }, this.closeWhiteBoardClient = function(e) {
            k.info("closeWhiteBoardClient"), c.createClosingWhiteBoardEvent(this.apiCCWhiteBoardClient.roomId, e), this.apiCCWhiteBoardClient.leaveRoom(this.apiCCWhiteBoardClient.roomId), this.apiCCWhiteBoardClient.stop()
        }, this.createCoBrowsing = function() {
            return k.info("createCoBrowsing"), this.apiCCCoBrowsingClient = new d.ApiCCCoBrowsingClient(this), this.apiCCCoBrowsingClient
        }, this.createIMClient = function(e) {
            return k.info("createIMClient"), this.apiCCIMClient = new d.ApiCCIMClient(this, e), this.apiCCIMClient
        }, this.createDataClient = function() {
            return k.info("createDataClient"), this.apiCCDataClient = new d.ApiCCDataClient(this), this.apiCCDataClient
        }, this.updatingQuery = function(e) {
            k.info("updatingQuery");
            var i = null,
                n = null,
                a = null;
            if (i = o(e), this.userData !== t) return n = JSON.stringify(this.userData), a = encodeURIComponent(n), i.userData = a, l(i)
        }, this.setUserData = function(e) {
            k.info("setUserData in session");
            var i = null,
                n = null,
                a = 0,
                o = [],
                l = this.userData;
            if (this.userData !== t) {
                if (this.userData = s(this.userData, e), k.info("this.userData :", this.userData), k.info("actualUserData :", l), k.info("this.updateUserDataToBeDone :", this.updateUserDataToBeDone), !0 !== this.updateUserDataToBeDone && JSON.stringify(this.userData) === JSON.stringify(l)) return void k.info("userData is not changed, leaving userData processing")
            } else this.userData = e;
            for (i = {
                    type: "setUserData",
                    userData: e
                }, n = JSON.stringify(i), k.log("C->S: " + n), this.channel.socket.emit("setUserData", n), k.log("socket.io 1.X : socket.io.opts.query :" + this.channel.socket.io.opts.query), this.channel.socket.io.opts.query = this.updatingQuery(this.channel.socket.io.opts.query), k.log("socket.io 1.X : after update : socket.io.opts.query :" + this.channel.socket.io.opts.query), a = 0; a < this.connectedUsersList.length; a += 1) this.apiCCId === this.connectedUsersList[a].userId && (this.connectedUsersList[a].userData = this.userData, o[0] = this.apiCCId, c.createConnectedUsersListUpdateEvent(this.connectedUsersList[a].group, o, "userDataUpdate"))
        }, this.sendPresenceGroupManagementCommand = function(e, t) {
            k.info("sendPresenceGroupManagementCommand :" + e + " for group : " + t);
            var i = null,
                n = null,
                a = 0,
                s = t.length;
            if ("unsubscribe" === e)
                for (a = 0; a < s; a += 1) this.removeGroupDataFromConnectedUsersList(t[a]);
            i = {
                type: "presenceGroupManagement",
                command: e,
                group: t
            }, n = JSON.stringify(i), k.log("C->S: " + n), this.channel.socket.emit("presenceGroupManagement", n)
        }, this.joinPresenceGroup = function(e) {
            k.info("joinPresenceGroup :" + e), !0 === a(e) ? this.sendPresenceGroupManagementCommand("join", e) : k.log("group parameter value is not correct, need to be a JSON array")
        }, this.leavePresenceGroup = function(e) {
            k.info("leavePresenceGroup :" + e), !0 === a(e) ? this.sendPresenceGroupManagementCommand("leave", e) : k.log("group parameter value is not correct, need to be a JSON array")
        }, this.subscribePresenceGroup = function(e) {
            k.info("subscribePresenceGroup :" + e), !0 === a(e) ? this.sendPresenceGroupManagementCommand("subscribe", e) : k.log("group parameter value is not correct, need to be a JSON array")
        }, this.unsubscribePresenceGroup = function(e) {
            k.info("unsubscribePresenceGroup :" + e), !0 === a(e) ? this.sendPresenceGroupManagementCommand("unsubscribe", e) : k.log("group parameter value is not correct, need to be a JSON array")
        }, this.getConversationList = function(e) {
            k.info("getConversationList request");
            var i = null,
                n = null;
            i = e !== t ? {
                type: "getConversationList",
                lastConversationNb: e
            } : {
                type: "getConversationList",
                lastConversationNb: 50
            }, n = JSON.stringify(i), k.log("C->S: " + n), this.channel.socket.emit("getConversationList", n)
        }, this.receiveConversationListAnswer = function(e) {
            k.info("receiveConversationListAnswer"), k.log("msg.convList.length :" + e.convList.length);
            var t = 0,
                i = e.convList.length,
                n = [],
                a = null;
            for (t = 0; t < i; t += 1) k.log("i =" + t), a = JSON.parse(e.convList[t]), n.push(a);
            c.createReceiveConversationListAnswerEvent(n)
        }, this.getContactOccurrencesFromConversationList = function(e) {
            k.info("getContactOccurrencesFromConversationList request");
            var i = null,
                n = null;
            i = e !== t ? {
                type: "getContactOccurrencesFromConversationList",
                lastConversationNb: e
            } : {
                type: "getContactOccurrencesFromConversationList",
                lastConversationNb: 50
            }, n = JSON.stringify(i), k.log("C->S: " + n), this.channel.socket.emit("getContactOccurrencesFromConversationList", n)
        }, this.receiveContactOccurrencesFromConversationListAnswer = function(e) {
            k.info("receiveContactOccurrencesFromConversationListAnswer"), k.log("msg.contactOccurrencesTable.length :" + e.contactOccurrencesTable.length), c.createReceiveContactOccurrencesFromConversationListAnswerEvent(e.contactOccurrencesTable)
        }, this.getConversationDetailReport = function(e) {
            k.info("getConversationDetailReport for convId :" + e);
            var t = null,
                i = null;
            t = {
                type: "getConversationDetailReport",
                convId: e
            }, i = JSON.stringify(t), k.log("C->S: " + i), this.channel.socket.emit("getConversationDetailReport", i)
        }, this.receiveConversationDetailReportAnswer = function(e) {
            k.info("receiveConversationDetailReportAnswer"), k.log("msg.CDR :" + e.CDR), c.createReceiveConversationDetailReportAnswerEvent(e.CDR)
        }, this.manageConnectedUsersList = function(e, t, i, n) {
            k.info("manageConnectedUsersList");
            var a = 0,
                s = 0,
                o = 0,
                l = !1,
                r = 0;
            for (k.trace("manageConnectedUsersList.length :" + e.length), k.trace("this.connectedUsersList.length :" + this.connectedUsersList.length), k.log("state :" + t), k.log("group :" + i), o = 0; o < e.length; o += 1) e[o].group = i;
            if ("online" === t) {
                for (k.log("state : online"), a = 0; a < e.length; a += 1) {
                    if (k.log("connectedUsersListWithStatus  :" + a), 0 === this.connectedUsersList.length) {
                        k.log("this.connectedUsersList is empty"), this.connectedUsersList = e, k.log("this.connectedUsersList[0].group :" + this.connectedUsersList[0].group), c.createConnectedUsersListUpdateEvent(i, n, t);
                        break
                    }
                    for (s = 0; s < this.connectedUsersList.length; s += 1)
                        if (e[a].userId === this.connectedUsersList[s].userId && e[a].group === this.connectedUsersList[s].group) {
                            l = !0, JSON.stringify(this.connectedUsersList[s].userData) !== JSON.stringify(e[a].userData) && (k.log("userData is updated"), this.connectedUsersList[s].userData = e[a].userData, c.createConnectedUsersListUpdateEvent(i, n, t));
                            break
                        }
                    if (!1 === l) {
                        k.log("Adding user in connectedUsersList :" + e[a].userId), this.connectedUsersList.push(e[a]);
                        var h = [];
                        h[0] = e[a].userId, c.createConnectedUsersListUpdateEvent(i, h, t)
                    }
                }!0 === this.updateUserDataToBeDone && (void 0 !== this.userData && null !== this.userData && (k.log("Sending userData to make sure that it is up to date :", d.session.userData), d.session.setUserData(d.session.userData)), this.updateUserDataToBeDone = !1)
            } else {
                for (k.log("state : offline"), k.log("connectedUsersListWithStatus  :", e), k.log("this.connectedUsersList  :", JSON.stringify(this.connectedUsersList)), a = 0; a < e.length; a += 1)
                    for (k.log("connectedUsersListWithStatus  :" + a), r = this.connectedUsersList.length, s = 0; s < r; s += 1)
                        if (e[a].userId === this.connectedUsersList[s].userId && e[a].group === this.connectedUsersList[s].group) {
                            k.log("Removing user in connectedUsersList :" + e[a].userId), k.log("... in group :" + e[a].group), this.connectedUsersList.splice(s, 1), c.createConnectedUsersListUpdateEvent(i, n, t);
                            break
                        }
                k.log("connectedUsersListWithStatus  :", e), k.log("this.connectedUsersList  :", JSON.stringify(this.connectedUsersList))
            }
        }, this.removeGroupDataFromConnectedUsersList = function(e) {
            k.info("removeGroupDataFromConnectedUsersList for group :", e);
            var t = this.connectedUsersList.length,
                i = 0,
                n = [],
                a = 0;
            for (k.info("this.connectedUsersList :", this.connectedUsersList), i = 0; i < t; i += 1) k.info("this.connectedUsersList[j].group :", this.connectedUsersList[i - a].group), k.info("group :", e), this.connectedUsersList[i - a].group === e && (k.log("Removing user in connectedUsersList :" + this.connectedUsersList[i - a].userId), this.connectedUsersList.splice(i - a, 1), a += 1, n[0] = this.connectedUsersList[i - a].userId, c.createConnectedUsersListUpdateEvent(e, n, "offline"))
        }, this.getConnectedUsersList = function(e) {
            e !== t ? k.log("getConnectedUsersList for group : " + e) : k.log("getConnectedUsersList : complete users list");
            var i = 0,
                n = [];
            if (e === t || null === e) return this.connectedUsersList;
            for (k.log("filtering list for group : " + e), i = 0; i < this.connectedUsersList.length; i += 1) this.connectedUsersList[i].group === e && n.push(this.connectedUsersList[i]);
            return n
        }, this.isClientWebRtcCompliant = function(e) {
            var t, i = null,
                n = null,
                a = 0;
            if (void 0 !== e)
                for (t = this.getConnectedUsersList(), a = 0; a < t.length; a++) t[a].userId === e && void 0 !== (n = t[a].userData) && null !== n && void 0 !== n.webRtcCompliant && (i = n.webRtcCompliant);
            return i
        }, this.isClientDTLSCompliant = function(e) {
            var t, i = !0,
                n = null,
                a = 0;
            if (void 0 !== e)
                for (t = this.getConnectedUsersList(), a = 0; a < t.length; a++) t[a].userId === e && (n = t[a].userData, k.log("userData :", n), void 0 !== n && null !== n && void 0 !== n.dtlsCompliant && (i = n.dtlsCompliant));
            return i
        }, this.getConnectedUserIdsList = function(e) {
            k.info("getConnectedUserIdsList, group :", e);
            var i = 0,
                n = 0,
                a = [],
                s = !1,
                o = {},
                l = [];
            if (e !== t ? k.log("getConnectedUserIdsList for group : " + e) : k.log("getConnectedUserIdsList : complete users list"), e === t || null === e) l = JSON.parse(JSON.stringify(this.connectedUsersList));
            else
                for (i = 0; i < this.connectedUsersList.length; i += 1) this.connectedUsersList[i].group === e && l.push(this.connectedUsersList[i]);
            for (i = 0; i < l.length; i += 1) {
                for (s = !1, n = 0; n < a.length; n++)
                    if (a[n].userId === l[i].userId) {
                        s = !0;
                        break
                    }!1 === s && ((o = {}).userId = l[i].userId, o.callState = l[i].callState, o.userData = l[i].userData, a.push(o))
            }
            return a
        }, this.getGroupsFromConnectedUsersList = function(e) {
            k.info("getGroupsFroConnectedUsersList");
            var t = 0,
                i = [],
                n = !1;
            for (t = 0; t < this.connectedUsersList.length; t += 1) this.connectedUsersList[t].userId === e && (k.log("Matching Entry found :" + JSON.stringify(this.connectedUsersList[t].group)), n = !0, i.push(this.connectedUsersList[t].group));
            return !0 === n ? JSON.stringify(i) : "User_Not_Found"
        }, this.getConnectedUserInfo = function(e, t) {
            k.info("getConnectedUserInfo"), k.log("getConnectedUserInfo userId :", e), k.log("getConnectedUserInfo infoType :", t);
            var i = 0,
                n = null,
                a = null;
            switch (t) {
                case "all":
                    for (k.log("all"), i = 0; i < this.connectedUsersList.length; i += 1)
                        if (this.connectedUsersList[i].userId === e) return k.log("Matching Entry found :" + JSON.stringify(this.connectedUsersList[i])), n = this.getGroupsFromConnectedUsersList(e), a = JSON.parse(JSON.stringify(this.connectedUsersList[i])), a.groups = n, delete a.group, JSON.stringify(a);
                    break;
                case "callState":
                    for (k.log("callState"), i = 0; i < this.connectedUsersList.length; i += 1)
                        if (this.connectedUsersList[i].userId === e) return k.log("Matching Entry found :" + JSON.stringify(this.connectedUsersList[i].callState)), this.connectedUsersList[i].callState;
                    break;
                case "userData":
                    for (k.log("userData"), i = 0; i < this.connectedUsersList.length; i += 1)
                        if (this.connectedUsersList[i].userId === e) return k.log("Matching Entry found :" + JSON.stringify(this.connectedUsersList[i].userData)), JSON.stringify(this.connectedUsersList[i].userData);
                    break;
                case "groups":
                    return k.log("groups"), n = this.getGroupsFromConnectedUsersList(e);
                default:
                    k.log("infoType not defined switch case : " + t)
            }
            return "User_Not_Found"
        }, this.isConnectedUser = function(e) {
            k.info("isConnectedUser");
            var t = 0,
                i = !1;
            for (t = 0; t < this.connectedUsersList.length; t += 1)
                if (k.log(JSON.stringify(this.connectedUsersList[t])), this.connectedUsersList[t].userId === e) return i = !0, k.log("isConnected :" + i), i;
            return k.log("isConnected :" + i), i
        }, this.displayConnectedUsersList = function() {
            k.info("displayConnectedUsersList");
            var e = 0;
            for (e = 0; e < this.connectedUsersList.length; e += 1) k.log("User :" + this.connectedUsersList[e].userId + " on group :" + this.connectedUsersList[e].group)
        }, this.updatePresence = function(e) {
            k.info("updatePresence" + e), k.log("updatePresence for group :" + e.group), this.manageConnectedUsersList(e.connectedUsersListWithStatus, e.state, e.group, e.connectedUsersList), this.displayConnectedUsersList(), c.createUpdatePresenceEvent(e.connectedUsersList, e.state, e.connectedUsersListWithStatus)
        }, this.updateUserStatus = function(e) {
            k.info("updateUserStatus" + e), c.createUpdateUserStatusEvent(e)
        }, this.sendDebugCommand = function(e, t, i) {
            k.info("sendDebugCommand :" + e), new u(this.channel.socket).sendDebugCommand("getClientSocketsInfo", t, i)
        }, this.processSignalingMessage = function(e) {
            var i = null,
                n = !1;
            "invite" === e.type ? this.apiCCWebRTCClient ? (k.log("this.webRTCPluginActivated =", this.webRTCPluginActivated), ("IE" === f || "Safari" === f && T < 11) && !0 === this.webRTCPluginActivated ? (k.log("managing call with WebRTC Plugin"), this.apiCCWebRTCClient.manageWebRTCPlugin(function() {
                k.log("manageWebRTCPlugin cb on Invite"), d.session.apiCCWebRTCClient.webRTCClient.processInvite(e)
            }, function() {
                k.log("actionOnInstallationNeeded"), k.log("sending bye to be done"), new u(d.session.channel.socket).sendBye(e.callId, e.calleeId, e.roomId, e.callerId, "WebRTC_Plugin_Installation_needed", e.data)
            })) : (k.log("managing call with browser"), this.apiCCWebRTCClient.webRTCClient.processInvite(e))) : k.warn("WebRTCClient is not created") : "200OK" === e.type ? this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.process200OK(e) : k.warn("WebRTCClient is not created") : "candidate" === e.type ? this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.processCandidate(e) : k.warn("WebRTCClient is not created") : "bye" === e.type ? this.apiCCWebRTCClient ? (k.log("bye message from:" + e.clientId + " for callId : " + e.callId), this.apiCCWebRTCClient.webRTCClient.onRemoteHangup(e.callId, e.clientId, e.roomId, e.reason, e.confId, e.data)) : k.warn("WebRTCClient is not created") : "update" === e.type ? this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.processUpdate(e) : k.warn("WebRTCClient is not created") : "200update" === e.type ? this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.process200Update(e) : k.warn("WebRTCClient is not created") : "newConversationCreated" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.newConversationCreated(e) : k.warn("IMClient is not created") : "IMMessage" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.receiveMessage(e) : k.warn("IMClient is not created") : "groupChatCreation" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.groupChatCreation(e) : k.warn("IMClient is not created") : "groupChatInvitation" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.groupChatInvitation(e) : k.warn("IMClient is not created") : "groupChatMemberUpdate" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.groupChatMemberUpdate(e) : k.warn("IMClient is not created") : "addUserInGroupChatAnswer" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.addUserInGroupChatAnswer(e) : k.warn("IMClient is not created") : "groupChatMessage" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.receiveGroupChatMessage(e) : k.warn("IMClient is not created") : "conversationHistoryAnswer" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.receiveConversationHistory(e) : k.warn("IMClient is not created") : "getUserDataAnswer" === e.type ? this.apiCCIMClient ? this.apiCCIMClient.receiveUserDataAnswer(e) : k.warn("IMClient is not created") : "dataMessage" === e.type ? this.apiCCDataClient ? this.apiCCDataClient.receiveData(e) : k.warn("DataClient is not created") : "apiRTCDataMessage" === e.type ? (k.log("apiRTCDataMessage :" + e), e.data !== t ? "callOrder" === e.data.type ? (k.log("callOrder received"), this.apiCCWebRTCClient ? (i = this.apiCCWebRTCClient.webRTCClient.callWithNumber(e.data.caller, !0, {
                MCUType: "MCU-Callee",
                confId: e.data.confId
            }, null), this.apiCCWebRTCClient.webRTCClient.myWebRTC_Event.createIncomingCallEvent(this.clientId, e.data.caller, e.data.caller, i, !1, 1, !1, "video", !0, "web", "media")) : k.warn("WebRTCClient is not created")) : k.log("msg.data.type is not managed :" + e.data.type) : k.log("msg.data === undefined")) : "conversationListAnswer" === e.type ? this.receiveConversationListAnswer(e) : "contactOccurrencesFromConversationListAnswer" === e.type ? this.receiveContactOccurrencesFromConversationListAnswer(e) : "conversationDetailReport" === e.type ? this.receiveConversationDetailReportAnswer(e) : "updatePresence" === e.type ? (k.log("updatePresence"), this.updatePresence(e)) : "updateUserStatus" === e.type ? (k.log("updateUserStatus"), this.updateUserStatus(e)) : "receiveMCUSessionId" === e.type ? (k.log("receiveMCUSessionId"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.receiveSessionId(e) : k.warn("WebRTCClient is not created")) : "joinSessionAnswer" === e.type ? (k.log("joinSessionAnswer"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.joinSessionAnswer(e) : k.warn("WebRTCClient is not created")) : "availableStreams" === e.type ? this.apiCCWebRTCClient ? (k.log("message availableStreams received"), this.apiCCWebRTCClient ? (n = this.apiCCWebRTCClient.webRTCClient.MCUClient.newAvailableStream(e.msg), c.createMCUAvailableStreamEvent(e.msg, n)) : k.warn("WebRTCClient is not created")) : k.warn("WebRTCClient is not created") : "availableComposite" === e.type ? this.apiCCWebRTCClient ? (k.log("message availableComposite received"), this.apiCCWebRTCClient ? (n = this.apiCCWebRTCClient.webRTCClient.MCUClient.newAvailableStream(e.msg), c.createMCUAvailableCompositeEvent(e.msg, n)) : k.warn("WebRTCClient is not created")) : k.warn("WebRTCClient is not created") : "onRemoveStream" === e.type ? this.apiCCWebRTCClient ? (k.log("message onRemoveStream received:", e), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.removeMCUStream(e.callId, e.msg.id) : k.warn("WebRTCClient is not created")) : k.warn("WebRTCClient is not created") : "MCUSessionInvitation" === e.type ? (k.log("MCUSessionInvitation"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.receiveSessionInvitation(e) : k.warn("WebRTCClient is not created")) : "MCUSessionInvitationToGroupChat" === e.type ? (k.log("MCUSessionInvitationToGroupChat"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.receiveSessionInvitation(e) : k.warn("WebRTCClient is not created")) : "recordingStarted" === e.type ? (k.log("recordingStarted"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.recordingStarted(e) : k.warn("WebRTCClient is not created")) : "recordingStreamAvailable" === e.type ? (k.log("recordingStreamAvailable"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.recordingStreamAvailable(e) : k.warn("WebRTCClient is not created")) : "streamingStarted" === e.type ? (k.log("streamingStarted"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.streamingStarted(e) : k.warn("WebRTCClient is not created")) : "streamingStopped" === e.type ? (k.log("streamingStopped"), this.apiCCWebRTCClient ? this.apiCCWebRTCClient.webRTCClient.MCUClient.streamingStopped(e) : k.warn("WebRTCClient is not created")) : "sessionId" === e.type ? (k.log("sessionId :" + e.sessionId), this.sessionId = e.sessionId) : "roomCreation" === e.type ? (k.log("roomCreation"), this.roomMgr.roomCreation(e)) : "inviteInRoomStatus" === e.type ? (k.log("inviteInRoomStatus"), this.roomMgr.inviteInRoomStatus(e)) : "contactListInRoom" === e.type ? (k.log("contactListInRoom"), this.roomMgr.onContactListInRoom(e)) : "roomInvitation" === e.type ? (k.log("roomInvitation"), this.roomMgr.roomInvitation(e)) : "roomMessage" === e.type ? (k.log("roomMessage"), this.roomMgr.receiveRoomMessage(e)) : "roomMemberUpdate" === e.type ? (k.log("roomMemberUpdate"), this.roomMgr.roomMemberUpdate(e)) : "Ack" === e.type ? k.log("Ack received") : "error" === e.type ? (k.log("error received"), c.createErrorEvent(e.errorInfo, e.errorCode)) : k.log("Error : No type for this message")
        }
    }, e.apiRTC = e.apiCC = e.CC = d
}(window);

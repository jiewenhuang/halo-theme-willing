"use strict";
var leonus = {
    saveData: (e, n) => {
        localStorage.setItem(e, JSON.stringify({time: Date.now(), data: n}))
    },
    loadData: (e, n) => {
        let t = JSON.parse(localStorage.getItem(e));
        if (t) {
            let e = Date.now() - t.time;
            if (-1 < e && e < 6e4 * n) return t.data
        }
        return 0
    },
    switchDarkMode: () => {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(), saveToLocal.set("theme", "dark", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(), saveToLocal.set("theme", "light", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)), "function" == typeof utterancesTheme && utterancesTheme(), "object" === ("undefined" == typeof FB ? "undefined" : _typeof(FB)) && window.loadFBComment(), window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((function () {
            return window.disqusReset()
        }), 200)
    },
    switchPostChart: () => {
        let e = "light" === document.documentElement.getAttribute("data-theme") ? "#4c4948" : "rgba(255,255,255,0.7)";
        if (document.getElementById("posts-chart") && postsOption) try {
            let n = postsOption;
            n.title.textStyle.color = e, n.yAxis.nameTextStyle.color = e, n.xAxis.axisLabel.color = e, n.yAxis.axisLabel.color = e, n.xAxis.axisLine.lineStyle.color = e, n.yAxis.axisLine.lineStyle.color = e, n.series[0].markLine.data[0].label.color = e, postsChart.setOption(n)
        } catch (e) {
        }
        if (document.getElementById("tags-chart") && tagsOption) try {
            let n = tagsOption;
            n.title.textStyle.color = e, n.yAxis.nameTextStyle.color = e, n.xAxis.axisLabel.color = e, n.yAxis.axisLabel.color = e, n.xAxis.axisLine.lineStyle.color = e, n.yAxis.axisLine.lineStyle.color = e, n.series[0].markLine.data[0].label.color = e, tagsChart.setOption(n)
        } catch (e) {
        }
        if (document.getElementById("categories-chart") && categoriesOption) try {
            let n = categoriesOption;
            n.title.textStyle.color = e, n.legend.textStyle.color = e, n.legend.pageTextStyle.color = e, n.series[0].label.color = e, categoriesChart.setOption(n)
        } catch (e) {
        }
    },
    // randomLink: () => {
    //     let e = leonus.loadData("links", 30);
    //     if (e) {
    //         let n = document.querySelectorAll("#friend-links-in-footer .footer-item");
    //         if (!n.length) return;
    //         for (let t = 0; t < 5; t++) {
    //             let o = parseInt(Math.random() * e.length);
    //             n[t].innerText = e[o].name, n[t].href = e[o].link, e.splice(o, 1)
    //         }
    //     } else fetch("/link.json").then((e => e.json())).then((e => { leonus.saveData("links", e.link_list), leonus.randomLink() }))
    // },
    share: () => {
        let e = window.location.origin + window.location.pathname;
        new ClipboardJS(".share", {
            text: function () {
                return "标题：" + document.title + "\n链接：" + e
            }
        }), btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
    },
    loadBG: () => {
        try {
            let e = leonus.loadData("blogbg", 1440);
            e ? leonus.changeBg(e, 1) : localStorage.removeItem("blogbg")
        } catch (e) {
            localStorage.removeItem("blogbg")
        }
    },
    changeBg: (e, n) => {
        let t = document.getElementById("web_bg");
        "#" == e.charAt(0) ? (t.style.backgroundColor = e, t.style.backgroundImage = "none") : t.style.backgroundImage = e, document.querySelector("#nav").style.background = "var(--card-bg)", n || (btf.snackbarShow("壁纸切换成功，将于一天后到期~"), leonus.saveData("blogbg", e))
    },
    randomBg: e => {
        let n = "https://api.leonus.cn/";
        n += "fj" == e ? "fengjing" : "mv" == e ? "meinv" : "dongman", fetch(n).then((e => e.text())).then((e => {
            leonus.changeBg("url('" + e + "')")
        })).catch()
    },
    runtime: () => {
        var runtimeshow = document.getElementById("runtimeshow");
        var publishDate = runtimeshow.getAttribute("data-publishdate");
        var e = function (e) {
            return e > 9 ? e : "0" + e
        };
        let n = new Date(publishDate).getTime(),
            t = (new Date).getTime(),
            o = Math.round((t - n) / 1e3),
            a = "本站已运行：";
        o >= 86400 && (a += e(parseInt(o / 86400)) + " 天 ", o %= 86400), o >= 3600 && (a += e(parseInt(o / 3600)) + " 时 ", o %= 3600), o >= 60 && (a += e(parseInt(o / 60)) + " 分 ", o %= 60), o >= 0 && (a += e(o) + " 秒");
        let l = document.getElementById("runtime");
        l && (l.innerHTML = a), setTimeout(leonus.runtime, 1e3)
    },
    sidebar: () => {
        let e = document.querySelectorAll("#sidebar-menus .menus_items .site-page.group");
        e && e.forEach((n => {
            n.addEventListener("click", (() => {
                e.forEach((e => {
                    e != n && e.classList.add("hide")
                }))
            }))
        }))
    },
    twIcon: () => {
        document.querySelectorAll(".tk-content a").forEach((e => {
            0 == e.innerText.indexOf("@") && (e.style.color = "#f56c6cb3")
        }));
        let e = document.querySelectorAll(".tk-master .tk-main .tk-row .tk-meta .tk-tag-green");
        e.length > 0 && e.forEach((e => {
            e.className = "Leonus", e.innerHTML = '<svg style="width:15px;height:15px;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="is-badge icon"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"></path></svg>'
        }))
    },
    // randomPost: () => {
    //     let e = leonus.loadData("postLinks", 30);
    //     if (e)
    //         for (;;) { let n = e[Math.floor(Math.random() * e.length)]; if (n != location.pathname) return void pjax.loadUrl(n) }
    //     fetch("/sitemap.xml").then((e => e.text())).then((e => (new window.DOMParser).parseFromString(e, "text/xml"))).then((e => {
    //         let n = e.querySelectorAll("url loc"),
    //             t = [];
    //         n.forEach((e => {
    //             let n = e.innerHTML.split("/");
    //             t.push("/" + n[3] + "/" + n[4])
    //         })), leonus.saveData("postLinks", t), leonus.randomPost()
    //     }))
    // },
    // comCount: () => {
    //     function e(e) { try { document.querySelectorAll(".card_comment").forEach((n => { n.innerHTML = e })), document.querySelector(".card-info .card_comment").parentNode.title = "累计评论数：" + e } catch (e) {} }
    //     if (document.querySelector(".card_comment")) {
    //         let n = leonus.loadData("comCount", 5);
    //         n ? e(n) : fetch("https://api.leonus.cn/comCount").then((e => e.text())).then((n => { e(n), leonus.saveData("comCount", n) })).catch()
    //     }
    // },
    winbox: "",
    createWinbox: () => {
        let e = document.createElement("div");
        document.body.appendChild(e), leonus.winbox = WinBox({
            id: "changeBgBox",
            index: 999,
            title: "切换背景",
            x: "center",
            y: "center",
            minwidth: "300px",
            height: "60%",
            background: "var(--leonus-blue)",
            onmaximize: () => {
                e.innerHTML = "<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}.winbox{border-radius:0}</style>"
            },
            onrestore: () => {
                e.innerHTML = ""
            }
        }), leonus.winResize(), window.addEventListener("resize", leonus.winResize), leonus.winbox.body.innerHTML = '\n    <style>\n        #changeBgBox .note {\n            font-size: 14px;\n            margin: 0 0 10px;\n            padding: 9px 0 9px 2.3rem;\n        }\n        #changeBgBox .note:not(.no-icon)::before,\n        #changeBgBox .note>.note-icon {\n            left: 0.5em;\n        }\n        #changeBgBox button {\n            padding:12px 0 !important;\n        }\n        #changeBgBox a.imgbox {\n            text-decoration: none !important;\n        }\n        #changeBgBox .toggle>.toggle-content {\n            margin: 0;\n        }\n    </style>\n    <div id="article-container" style="padding:10px;"><div class="note info flat"><p>点击对应样式即可切换背景。<br>相册图片也可以当作壁纸哦~ <a href="/wallpaper/">前往相册</a></p>\n    </div>\n    <div class="note pink icon-padding flat"><i class="note-icon fa-solid fa-image"></i><p>有效期为一天，到期切回默认壁纸。</p>\n    </div>\n\n    <p><button onclick="localStorage.removeItem(\'blogbg\');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>\n    \n    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>\n    <details class="toggle"><summary class="toggle-button" style="">查看电脑壁纸</summary>\n        <div class="toggle-content">\n            <div class="bgbox">\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="leonus.changeBg(\'url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.MontBlancPeak_ZH-CN0459151326_1920x1080.jpg)" class="imgbox" onclick="leonus.changeBg(\'url(https://cn.bing.com/th?id=OHR.MontBlancPeak_ZH-CN0459151326_1920x1080.jpg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.MackenzieRiver_ZH-CN0214805768_1920x1080.jpg)" class="imgbox" onclick="leonus.changeBg(\'url(https://cn.bing.com/th?id=OHR.MackenzieRiver_ZH-CN0214805768_1920x1080.jpg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.PorcupineBay_ZH-CN2252758146_1920x1080.jpg)" class="imgbox" onclick="leonus.changeBg(\'url(https://cn.bing.com/th?id=OHR.PorcupineBay_ZH-CN2252758146_1920x1080.jpg\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/04/2021040311203011.jpeg)" class="imgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/04/2021040311203011.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021110119420045.jpeg)" class="imgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/11/2021110119420045.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2020/12/2020121409235638.jpeg)" class="imgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2020/12/2020121409235638.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021111016525829.jpeg)" class="imgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/11/2021111016525829.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/11/2021111016580917.jpeg)" class="imgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/11/2021111016580917.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="imgbox" style="display:flex;justify-content: center;align-items: center; background:#ff4b1f;color:white;" onclick="leonus.randomBg(\'fj\')">随机风景背景</a>\n            <a href="javascript:;" rel="noopener external nofollow" class="imgbox" style="display:flex;justify-content: center;align-items: center; background:#16bffd;color:white;" onclick="leonus.randomBg(\'mv\')">随机美女背景</a>\n            <a href="javascript:;" rel="noopener external nofollow" class="imgbox" style="display:flex;justify-content: center;align-items: center; background:#ef5350;color:white;" onclick="leonus.randomBg(\'dm\')">随机动漫背景</a>\n            </div>\n        </div>\n    </details>\n\n    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>\n    <details class="toggle"><summary class="toggle-button" style="">查看手机壁纸</summary>\n        <div class="toggle-content">\n            <div class="bgbox">\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021053107390019.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/05/2021053107390019.jpeg\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/08/2021082418471438.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/08/2021082418471438.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021053111333664.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/05/2021053111333664.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/05/2021052509214162.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/05/2021052509214162.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/10/2021101113150626.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/10/2021101113150626.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021121119294157.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/12/2021121119294157.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2022/05/2022050211365433.jpg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2022/05/2022050211365433.jpg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/01/2021011114540487.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/01/2021011114540487.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/10/2021101112481925.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/10/2021101112481925.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2020/12/2020120109592351.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2020/12/2020120109592351.jpeg)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/08/2021081519313621.jpeg)" class="pimgbox" onclick="leonus.changeBg(\'url(https://img.vm.laomishuo.com/image/2021/08/2021081519313621.jpeg)\')"></a>\n            </div>\n        </div>\n    </details>\n\n    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>\n    <details class="toggle"><summary class="toggle-button" style="">查看渐变背景</summary>\n        <div class="toggle-content">\n            <div class="bgbox">\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="leonus.changeBg(\'linear-gradient(to right, #eecda3, #ef629f)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(255, 110, 127), rgb(191, 233, 255))" onclick="leonus.changeBg(\'linear-gradient(to right, #eecda3, #ef629f)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ff4b1f, #1fddff)" onclick="leonus.changeBg(\'linear-gradient(to right, #ff4b1f, #1fddff)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(251, 215, 134), rgb(247, 121, 125))" onclick="leonus.changeBg(\'linear-gradient(to right, rgb(251, 215, 134), rgb(247, 121, 125))\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #16bffd, #cb3066)" onclick="leonus.changeBg(\'linear-gradient(to right, #16bffd, #cb3066)\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255))" onclick="leonus.changeBg(\'linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255))\')"></a>\n            </div>\n        </div>\n    </details>\n\n    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>\n    <details class="toggle"><summary class="toggle-button" style="">查看纯色背景</summary>\n        <div class="toggle-content">\n            <div class="bgbox">\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F4E2D8" onclick="leonus.changeBg(\'#F4E2D8\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="leonus.changeBg(\'#7D9D9C\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F2D7D9" onclick="leonus.changeBg(\'#F2D7D9\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #76BA99" onclick="leonus.changeBg(\'#76BA99\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #9FC088" onclick="leonus.changeBg(\'#9FC088\')"></a>\n            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #CEAB93" onclick="leonus.changeBg(\'#CEAB93\')"></a>\n            </div>\n        </div>\n    </details>\n'
    },
    winResize: () => {
        if (!document.querySelector("#changeBgBox").classList.contains("min")) {
            var e = document.documentElement.clientWidth;
            e <= 768 ? leonus.winbox.resize(.95 * e + "px", "90%").move("center", "center") : leonus.winbox.resize(.6 * e + "px", "70%").move("center", "center")
        }
    },
    toggleWinbox: () => {
        document.querySelector("#changeBgBox") ? leonus.winbox.toggleClass("hide") : leonus.createWinbox()
    },
    // switchLine: () => {
    //     if ("b.leonus.cn" == location.host && (document.querySelector(".announcement_content").innerHTML = '您当前使用的是Vercel线路，欢迎使用主线路访问本站：<a style="color: var(--leonus-purple);" href="https://blog.leonus.cn/">blog.leonus.cn</a>', document.querySelectorAll(".menus_item:last-child ul li:first-child a").forEach((e => { e.href = "https://blog.leonus.cn/" }))), leonus.loadData("line", 60)) return;
    //     let e = location.host;
    //     document.referrer.match(/b.leonus.cn/i) && "blog.leonus.cn" == e && setTimeout((() => { btf.snackbarShow("欢迎使用主线路访问本站。"), leonus.saveData("line", 1) }), 500), document.referrer.match(/blog.leonus.cn/i) && "b.leonus.cn" == e && setTimeout((() => { btf.snackbarShow("欢迎使用Vercel线路访问本站。"), leonus.saveData("line", 1) }), 500)
    // },
    // searchSize: () => {
    //     if (document.querySelector(".algolia-poweredBy").addEventListener("DOMNodeInserted", (() => { document.querySelector("svg.ais-PoweredBy-logo").setAttribute("viewBox", "290 0 290 64") })), document.body.clientWidth > 768) return;
    //     let e = document.querySelector("#algolia-hits");
    //     e.addEventListener("DOMNodeInserted", (() => { e.children[0].style.maxHeight = document.documentElement.clientHeight - 210 + "px" }))
    // },
    // linkCom: e => { var n = document.querySelector(".el-textarea__inner"); "bf" == e ? (n.value = "```yml\n", n.value += "- name: \n  link: \n  avatar: \n  descr: \n  rss: ", n.value += "\n```", n.setSelectionRange(15, 15)) : (n.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\nRSS地址：", n.setSelectionRange(5, 5)), n.focus() },
    owoBig: () => {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        let e = 1,
            n = "",
            t = document.createElement("div"),
            o = document.querySelector("body");
        t.id = "owo-big", o.appendChild(t), new MutationObserver((a => {
            for (let l = 0; l < a.length; l++) {
                let r = a[l].addedNodes,
                    i = "";
                if (2 == r.length && "OwO-body" == r[1].className) i = r[1];
                else {
                    if (1 != r.length || "tk-comment" != r[0].className) continue;
                    i = r[0]
                }
                i.onmouseover = a => {
                    e && ("OwO-body" == i.className && "IMG" == a.target.tagName || "tk-owo-emotion" == a.target.className) && (e = 0, n = setTimeout((() => {
                        let e = 3 * a.path[0].clientHeight,
                            n = 3 * a.path[0].clientWidth,
                            l = a.x - a.offsetX - (n - a.path[0].clientWidth) / 2,
                            r = a.y - a.offsetY;
                        l + n > o.clientWidth && (l -= l + n - o.clientWidth + 10), l < 0 && (l = 10), t.style.cssText = `display:flex; height:${e}px; width:${n}px; left:${l}px; top:${r}px;`, t.innerHTML = `<img src="${a.target.src}">`
                    }), 300))
                }, i.onmouseout = () => {
                    t.style.display = "none", e = 1, clearTimeout(n)
                }
            }
        })).observe(document.getElementById("post-comment"), {subtree: !0, childList: !0})
    },
    percent: () => {
        let e = document.documentElement.scrollTop || window.pageYOffset,
            n = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
            t = Math.round(e / n * 100),
            o = document.querySelector("#go-up"),
            a = document.querySelector("#go-down");
        o && (t <= 95 ? (o.childNodes[0].style.display = "none", o.childNodes[1].style.display = a.style.display = "block", o.childNodes[1].innerHTML = t) : (o.childNodes[1].style.display = a.style.display = "none", o.childNodes[0].style.display = "block"))
    },
    showLoading: () => {
        document.querySelector("#loading-box").classList.remove("loaded")
    },
    hideLoading: () => {
        document.querySelector("#loading-box").classList.add("loaded")
    },
    talkTime: null,
    // indexTalk: () => {
    //     if (leonus.talkTime && (clearInterval(leonus.talkTime), leonus.talkTime = null), !document.getElementById("bber-talk")) return;
    //
    //     function e(e) {
    //         let n = "";
    //         e.forEach(((e, t) => { n += `<li class="item item-${t+1}">${e}</li>` }));
    //         let t = document.querySelector("#bber-talk .talk-list");
    //         t.innerHTML = n, leonus.talkTime = setInterval((() => { t.appendChild(t.children[0]) }), 3e3)
    //     }
    //     let n = leonus.loadData("talk", 10);
    //     n ? e(n) : fetch("https://m.leonus.cn/api/memo?creatorId=1&tag=说说&limit=10").then((e => e.json())).then((n => { e(n = function(e) { let n = []; return e.forEach((e => { n.push(e.content.replace(/#(.*?)\s/g, "").replace(/```/g, "").replace(/\!\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-image"></i>').replace(/\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-link"></i>')) })), n }(n.data)), leonus.saveData("talk", n) }))
    // },
    topCategoriesBarScroll: function () {
        if (document.querySelector(".categoryBar-list")) {
            let e = document.querySelector(".categoryBar-list");
            e.addEventListener("mousewheel", (function (n) {
                let t = -n.wheelDelta / 2;
                e.scrollLeft += t, n.preventDefault()
            }), !1)
        }
    },
    setPageTitle: () => {
        document.querySelector("#page_title a").innerHTML = document.title.replace(/\s*\|\s*Leonus/g, "")
    },
    // logInfo: () => {
    //     console.log(`Welcome to:\n%cLeonus blog:%c https://blog.leonus.cn%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2021/10/15 00:00:00").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
    // },
    pagination: () => {
        document.querySelector(".pagination") && 1 == document.querySelector(".pagination").children.length && (document.querySelector("#pagination").style.display = "none")
    },
    newYearTimer: null,
    newYear: () => {
        if (clearTimeout(leonus.newYearTimer), !document.querySelector("#newYear")) return;
        let e = new Date("2023-01-22 00:00:00").getTime() / 1e3,
            n = {0: "周日", 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六"};

        function t(e) {
            return e > 9 ? e : "0" + e
        }

        !function o() {
            let a = new Date;
            document.querySelector("#newYear .today").innerHTML = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + " " + n[a.getDay()];
            let l = e - Math.round(a.getTime() / 1e3);
            if (l < 0) document.querySelector("#newYear .title").innerHTML = "Happy New Year!", document.querySelector("#newYear .newYear-time").innerHTML = '<span class="happyNewYear">新年快乐</p>';
            else if (document.querySelector("#newYear .title").innerHTML = "距离2023年春节：", l > 86400) document.querySelector("#newYear .newYear-time").innerHTML = `<span class="day">${Math.ceil(l / 86400)}<span class="unit">天</span></span>`;
            else {
                let e = t(parseInt(l / 3600));
                l %= 3600;
                let n = t(parseInt(l / 60));
                l %= 60;
                let a = t(l);
                document.querySelector("#newYear .newYear-time").innerHTML = `<span class="time">${e}:${n}:${a}</span></span>`, leonus.newYearTimer = setTimeout(o, 1e3)
            }
        }(), jQuery(document).ready((function (e) {
            e("#newYear").wpSuperSnow({
                flakes: ["https://cdn.leonus.cn/img/yb1.webp", "https://cdn.leonus.cn/img/yb2.webp", "https://cdn.leonus.cn/img/yb3.webp"],
                totalFlakes: "100",
                zIndex: "1",
                maxSize: "30",
                maxDuration: "20",
                useFlakeTrans: !1
            })
        }))
    },
//     newYearBgNum: 1,
//     newYearBgTimer: null,
//     newYearBg: () => {
//         clearInterval(leonus.newYearBgTimer);
//         let e = document.querySelector("#newYear-main");
//         e && (e.style.backgroundImage = `url(https://cdn.leonus.cn/img/tunian${leonus.newYearBgNum}.webp)`, leonus.newYearBgTimer = setInterval((() => { e.style.backgroundImage = `url(https://cdn.leonus.cn/img/tunian${3==leonus.newYearBgNum?leonus.newYearBgNum=1:leonus.newYearBgNum+=1}.webp)` }), 1e4))
//     },
    swiper: () => {
        var e = new Swiper(".blog-slider", {
                navigation: {nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev"},
                passiveListeners: !0,
                loop: !0,
                autoplay: {disableOnInteraction: !0, delay: 2e3},
                mousewheel: !0,
                pagination: {el: ".blog-slider__pagination", clickable: !0}
            }),
            n = document.getElementById("swiper_container");
        null !== n && (n.onmouseenter = () => {
            e.autoplay.stop()
        }, n.onmouseleave = () => {
            e.autoplay.start()
        })
    }
};
//     photos: () => {
//         fetch("https://m.leonus.cn/api/memo?creatorId=1&tag=相册").then((e => e.json())).then((e => {
//             let n = "",
//                 t = [];
//             e.data.forEach((e => { t = t.concat(e.content.match(/\!\[.*?\]\(.*?\)/g)) })), t.forEach((e => {
//                 let t, o, a = e.replace(/!\[.*?\]\((.*?)\)/g, "$1"),
//                     l = e.replace(/!\[(.*?)\]\(.*?\)/g, "$1"); - 1 != l.indexOf(" ") ? (t = l.split(" ")[0], o = l.split(" ")[1]) : o = l, n += `<div class="gallery-photo"><a href="${a}" data-fancybox="gallery" class="fancybox" data-thumb="${a}"><img class="photo-img" loading='lazy' decoding="async" src="${a}"></a>`, o && (n += `<span class="photo-title">${o}</span>`), t && (n += `<span class="photo-time">${t}</span>`), n += "</div>"
//             })), document.querySelector(".gallery-photos.page").innerHTML = n, imgStatus.watch(".photo-img", (() => { waterfall(".gallery-photos") })), window.Lately && Lately.init({ target: ".photo-time" })
//         })).catch()
//     }
// };
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var jarvismode = false; var jarviscomm = false; let vol;
var canVaryLight = false;
let canJarvis = false;
let canBob = false;
var nvol = 3; var lvol = 80;
var micwait_ms = 32;
var darkened = false;
var toggledMenubar = false;
var toggledMenu = false;

function getImageLightness(imageSrc, callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function () {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        for (var x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
    }
}

if (urlParams.get("jmode") == "true") { canJarvis = true; }
if (urlParams.get("subs") == "true") { document.getElementById("output").style.display = "initial"; }
if (urlParams.get("nvol") != null) { nvol = urlParams.get("nvol"); }
if (urlParams.get("talklit") != null && urlParams.get("talklit") == "true") { darkened = true }
if (urlParams.get("lvol") != null) { lvol = urlParams.get("lvol"); }
if (urlParams.get("bkcol") != null) { document.body.style.backgroundColor = "#" + urlParams.get("bkcol"); } else { document.body.style.backgroundColor = "#0F0"; }
if (urlParams.get("bob") != null) { if (urlParams.get("bob") == "true") { canBob = true; micwait_ms = 50; } }
if (urlParams.get("light") != null) { if (urlParams.get("light") == "true") { canVaryLight = true; } }

if (urlParams.get("bkimg") != null) {
    document.body.style.backgroundImage = "url('" + urlParams.get("bkimg") + "')";

    if (canVaryLight) {
        getImageLightness(urlParams.get("bkimg"), function (brightness) {
            document.getElementById("vtpic").style = "filter: brightness(" + (brightness / 255) + ");";
        });
    }
}

var nsopen = "open.png";
var nsopenalt = "open_alt.png";
var nsclose = "close.png";
var nsopenloud = "openloud.png";

var nsjc = "jarvisc.png";
var nsjo = "jarviso.png";

var joimg = urlParams.get("jarviso");
var jcimg = urlParams.get("jarvisc");

if (joimg == null) joimg = "jarviso.png";
if (jcimg == null) jcimg = "jarvisc.png";

const vtpic = document.getElementById("vtpic");
const velem = document.getElementById("vol");

const volstr = document.getElementById("volstr");

//Cookies//
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//Cookies//

var opimg = urlParams.get("open");
var opaltimg = urlParams.get("openalt");
var climg = urlParams.get("close");
var oplimg = urlParams.get("openloud");

if (getCookie("loadedsuit") != '') {
    var suit = getCookie(getCookie("loadedsuit"));
    var ssuit = suit.split(",");

    climg = ssuit[0]; nsclose = ssuit[0];
    opimg = ssuit[1]; nsopen = ssuit[1];
    oplimg = ssuit[2]; nsopenloud = ssuit[2];

    jcimg = ssuit[3]; nsjc = ssuit[3];
    joimg = ssuit[4]; nsjo = ssuit[4];
}

if (urlParams.get("bob") == "true") {
    document.getElementById("chkbobot").checked = true;
} else {
    document.getElementById("chkbobot").checked = false;
}

if (urlParams.get("light") == "true") {
    document.getElementById("chklit").checked = true;
} else {
    document.getElementById("chklit").checked = false;
}

if (urlParams.get("jmode") == "true") {
    document.getElementById("chkjarvis").checked = true;
} else {
    document.getElementById("chkjarvis").checked = false;
}

if (urlParams.get("subs") == "true") {
    document.getElementById("chksubs").checked = true;
} else {
    document.getElementById("chksubs").checked = false;
}

if (urlParams.get("talklit") == "true") {
    document.getElementById("chkDWS").checked = true;
} else {
    document.getElementById("chkDWS").checked = false;
}

if (urlParams.get("lang") != null) document.getElementById("chklang").value = urlParams.get("lang")
else document.getElementById("chklang").value = "en-EN";

if (urlParams.get("nvol") != null) document.getElementById("chkvoln").value = urlParams.get("nvol")
else document.getElementById("chkvoln").value = "7";

if (urlParams.get("lvol") != null) document.getElementById("chkvoll").value = urlParams.get("lvol")
else document.getElementById("chkvoll").value = "70";


if (urlParams.get("open") != null) document.getElementById("chkopen").value = urlParams.get("open")
else document.getElementById("chkopen").value = "open.png";

if (urlParams.get("openalt") != null) document.getElementById("chkopenalt").value = urlParams.get("openalt")
else document.getElementById("chkopenalt").value = "open_alt.png";

if (urlParams.get("close") != null) document.getElementById("chkclose").value = urlParams.get("close")
else document.getElementById("chkclose").value = "close.png";

if (urlParams.get("openloud") != null) document.getElementById("chkol").value = urlParams.get("openloud")
else document.getElementById("chkol").value = "openloud.png";

if (urlParams.get("jarvisc") != null) document.getElementById("chkjc").value = urlParams.get("jarvisc")
else document.getElementById("chkjc").value = "jarvisc.png";

if (urlParams.get("jarviso") != null) document.getElementById("chkjo").value = urlParams.get("jarviso")
else document.getElementById("chkjo").value = "jarviso.png";

if (urlParams.get("bkcol") != null) document.getElementById("chkbkc").value = urlParams.get("bkcol")
else document.getElementById("chkbkc").value = "0F0";

if (urlParams.get("bkimg") != null) document.getElementById("chkbki").value = urlParams.get("bkimg")
else document.getElementById("chkbki").value = "";


const audioContext = new AudioContext();

const startAudio = async (context, volvar) => {
    await context.audioWorklet.addModule('awlet/volume-meter-processor.js');
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const micNode = context.createMediaStreamSource(mediaStream);
    const volumeMeterNode = new AudioWorkletNode(context, 'volume-meter');
    
    volumeMeterNode.port.onmessage = ({ data }) => {
        vol = Math.round(data * 500);
    };
    micNode.connect(volumeMeterNode).connect(context.destination);
};

window.addEventListener("click", async function(event) {
    await startAudio(audioContext, vol);
    audioContext.resume();
});

if (darkened) {
    vtpic.style.filter = "brightness(60%)";
}


var chanced = false;

setInterval(() => {
    volstr.innerHTML = vol;

    if (urlParams.get('close') && urlParams.get('open') && urlParams.get('openloud') && urlParams.get('jarvisc') && urlParams.get('jarviso')) {
        if (vol > 0 && vol < nvol) {
            chanced = false;
            if (canBob) { unbob(); }
            if (darkened) { undarken(); }

            if (jarvismode) {
                if (vtpic.src != jcimg) vtpic.src = jcimg;
            } else {
                if (vtpic.src != climg) vtpic.src = climg;
            }
        } else if (vol > nvol && vol < lvol) {
            if (canBob) { bob(); }
            if (darkened) { darken(); }

            if (jarvismode) {
                if (vtpic.src != joimg) vtpic.src = joimg;
            } else {
                if (vtpic.src != joimg && !chanced) {
                    if (urlParams.get('openalt') != null) {
                        var chance = Math.random();

                        if (chance > 0.3) {
                            vtpic.src = opimg;
                        } else {
                            vtpic.src = opaltimg;
                        }
                    } else {
                        vtpic.src = opimg;
                    }

                    chanced = true;
                }
            }
        } else if (vol > lvol) {
            if (jarvismode) {
                if (vtpic.src != joimg) vtpic.src = joimg;
            } else {
                if (vtpic.src != oplimg) vtpic.src = oplimg;
            }
        }
    } else {
        if (vol < nvol) {
            if (canBob) { unbob(); }
            if (darkened) { undarken(); }
            if (jarvismode) {
                if (vtpic.src != jcimg) vtpic.src = jcimg;
            } else {
                if (vtpic.src != nsclose) vtpic.src = nsclose;
            }
        } else if (vol > nvol && vol < lvol) {
            if (canBob) { bob(); }
            if (darkened) { darken(); }
            if (jarvismode) {
                if (vtpic.src != joimg) vtpic.src = joimg;
            } else {
                if (vtpic.src != nsopen) vtpic.src = nsopen;
            }
        } else if (vol > lvol) {
            if (jarvismode) {
                if (vtpic.src != joimg) vtpic.src = joimg;
            } else {
                if (vtpic.src != nsopenloud) vtpic.src = nsopenloud;
            }
        }
    }
}, micwait_ms);

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
const recolang = urlParams.get("lang");
if (recolang == null) {
    recognition.lang = "en-US";
} else {
    recognition.lang = recolang;
}

recognition.onerror = function (event) {
    console.error(event);
};

recognition.onstart = function () {
};

recognition.onend = function () {
    recognition.start();
};

recognition.onresult = function (event) {
    var interim_transcript = '';
    var final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        // Verify if the recognized text is the last with the isFinal property
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }

    // Choose which result may be useful for you
    document.getElementById("output").innerHTML = final_transcript;

    if (canJarvis) {
        if (final_transcript.includes("hey David disable subtitles") || final_transcript.includes("oye David desactiva los subtítulos") || final_transcript.includes("oye David desactivar los subtítulos")) {
            document.getElementById("output").style.display = "none";
            jarvismode = false;
        } else if (final_transcript.includes("hey David enable subtitles") || final_transcript.includes("oye David activa los subtítulos") || final_transcript.includes("oye David activar los subtítulos")) {
            document.getElementById("output").style.display = "initial";
            jarvismode = false;
        } else if (final_transcript.includes("hey David open wardrobe") || final_transcript.includes("hey David open the wardrobe") || final_transcript.includes("oye David abre el armario")) {
            jarvismode = false;
            openWardrobe();
        } else if (final_transcript.includes("hey David") || final_transcript.includes("oye David")) {
            jarvismode = true;
        } else if (final_transcript.includes("disable subtitles") || final_transcript.includes("desactiva los subtítulos")) {
            if (jarvismode) {
                document.getElementById("output").style.display = "none";
                jarvismode = false;
            }
        } else if (final_transcript.includes("enable subtitles") || final_transcript.includes("activa los subtítulos")) {
            if (jarvismode) {
                document.getElementById("output").style.display = "initial";
                jarvismode = false;
            }
        } else if (final_transcript.includes("open wardrobe") || final_transcript.includes("open the wardrobe") || final_transcript.includes("abre el armario")) {
            if (jarvismode) {
                jarvismode = false; openWardrobe();
            }
        } else if (final_transcript.includes("nevermind David") || final_transcript.includes("never mind David") || final_transcript.includes("no importa David") || final_transcript.includes("não importa Davi")) {
            jarvismode = false;
        }
    }
};

recognition.start();

const cmenu = document.getElementById("btmnav");
const btnmenu = document.getElementById("hidbtn");
const suitokmenu = document.getElementById("suitok");
const suitloadedmenu = document.getElementById("suitloaded");
const suitclearedmenu = document.getElementById("suitcleared");
const suitunwornmenu = document.getElementById("suitunworn");

const jarvischk = document.getElementById("chkjarvis");
const subsschk = document.getElementById("chksubs");
const bobotchk = document.getElementById("chkbobot");

const langchk = document.getElementById("chklang");

const nvolchk = document.getElementById("chkvoln");
const lvolchk = document.getElementById("chkvoll");

const chkopen = document.getElementById("chkopen");
const chkopenalt = document.getElementById("chkopenalt");
const chkclose = document.getElementById("chkclose");
const chkol = document.getElementById("chkol");

const chkjc = document.getElementById("chkjc");
const chkjo = document.getElementById("chkjo");

const chklitty = document.getElementById("chklit");

const bkcolchk = document.getElementById("chkbkc");
const bkimgchk = document.getElementById("chkbki");

const chkDWS = document.getElementById("chkDWS");

function openMenu() {
    cmenu.style.visibility = "visible";
    toggledMenu = true
}

function hideMenu() {
    cmenu.style.visibility = "hidden";
    toggledMenu = false
}

function applySettingsMenu() {
    if (chkopenalt.value == "") { chkopenalt.value = "open.png" }

    window.location.replace("https://davidlao27.github.io/davidVT?close=" + chkclose.value + "&open=" + chkopen.value + "&openalt=" + chkopenalt.value + "&openloud=" + chkol.value + "&jarvisc=" + chkjc.value + "&jarviso=" + chkjo.value + "&jmode=" + jarvischk.checked + "&nvol=" + nvolchk.value + "&lvol=" + lvolchk.value + "&subs=" + subsschk.checked + "&bkcol=" + bkcolchk.value + "&bkimg=" + bkimgchk.value + "&bob=" + bobotchk.checked + "&lang=" + langchk.value + "&light=" + chklitty.checked + "&talklit=" + chkDWS.checked);
}

function openWardrobe() {
    document.getElementById("suitchoose").style.visibility = "visible";
}

function openMenuWardrobe() {
    cmenu.style.visibility = "hidden";
    document.getElementById("suitchoose").style.visibility = "visible";
}

function closeWardrobe() {
    document.getElementById("suitchoose").style.visibility = "hidden";
}

function closeAftWardrobe() {
    suitokmenu.style.visibility = "hidden";
}

function closeAft2Wardrobe() {
    suitloadedmenu.style.visibility = "hidden";
}

function closeAft3Wardrobe() {
    suitclearedmenu.style.visibility = "hidden";
}

function closeAft4Wardrobe() {
    suitunwornmenu.style.visibility = "hidden";
}

function loadSuit() {
    var suit = getCookie(document.getElementById("wrsname").value);
    if (suit != '') {
        setCookie("loadedsuit", document.getElementById("wrsname").value, 365);
        var ssuit = suit.split(",");
        document.getElementById("suitchoose").style.visibility = "hidden";

        climg = ssuit[0]; nsclose = ssuit[0];
        opimg = ssuit[1]; nsopen = ssuit[1];
        oplimg = ssuit[2]; nsopenloud = ssuit[2];

        jcimg = ssuit[3]; nsjc = ssuit[3];
        joimg = ssuit[4]; nsjo = ssuit[4];

        suitloadedmenu.style.visibility = "visible";
    } else {
        alert("There is no saved suit with such name!");
    }
}

function saveSuit() {
    if (urlParams.get('close') && urlParams.get('open') && urlParams.get('openloud') && urlParams.get('jarvisc') && urlParams.get('jarviso')) {
        setCookie(document.getElementById("wrsname").value, urlParams.get('close') + "," + urlParams.get('open') + "," + urlParams.get('openloud') + "," + urlParams.get('jarvisc') + "," + urlParams.get('jarviso'), 365);
        setCookie("loadedsuit", document.getElementById("wrsname").value, 365);
        document.getElementById("suitchoose").style.visibility = "hidden";
        suitokmenu.style.visibility = "visible";
    } else {
        alert("You must wear a custom suit in order to save!");
    }
}

function unwearSuit() {
    setCookie("loadedsuit", '', 365)

    if (urlParams.get('close') && urlParams.get('open') && urlParams.get('openloud') && urlParams.get('jarvisc') && urlParams.get('jarviso')) {
        opimg = urlParams.get("open");
        opaltimg = urlParams.get("openalt");
        climg = urlParams.get("close");
        oplimg = urlParams.get("openloud");
        joimg = urlParams.get("jarviso");
        jcimg = urlParams.get("jarvisc");

        nsopen = "open.png";
        nsclose = "close.png";
        nsopenloud = "openloud.png";

        nsjc = "jarvisc.png";
        nsjo = "jarviso.png";
    } else {
        opimg = "open.png";
        climg = "close.png";
        oplimg = "openloud.png";
        joimg = "jarviso.png";
        jcimg = "jarvisc.png";

        nsopen = "open.png";
        nsclose = "close.png";
        nsopenloud = "openloud.png";

        nsjc = "jarvisc.png";
        nsjo = "jarviso.png";
    }

    document.getElementById("suitchoose").style.visibility = "hidden";
    suitunwornmenu.style.visibility = "visible";
}

function clearSuit() {
    setCookie("loadedsuit", '', 365);

    var suit = getCookie(document.getElementById("wrsname").value);
    if (suit != '') {
        setCookie(document.getElementById("wrsname").value, '', 365)

        if (urlParams.get('open'))

        if (urlParams.get('close') && urlParams.get('open') && urlParams.get('openloud') && urlParams.get('jarvisc') && urlParams.get('jarviso')) {
            opimg = urlParams.get("open");
            opaltimg = urlParams.get("openalt");
            climg = urlParams.get("close");
            oplimg = urlParams.get("openloud");
            joimg = urlParams.get("jarviso");
            jcimg = urlParams.get("jarvisc");

            nsopen = "open.png";
            nsopenalt = "open_alt.png";
            nsclose = "close.png";
            nsopenloud = "openloud.png";

            nsjc = "jarvisc.png";
            nsjo = "jarviso.png";
        } else {
            opimg = "open.png";
            opaltimg = "open_alt.png";
            climg = "close.png";
            oplimg = "openloud.png";
            joimg = "jarviso.png";
            jcimg = "jarvisc.png";

            nsopen = "open.png";
            nsopenalt = "open_alt.png";
            nsclose = "close.png";
            nsopenloud = "openloud.png";

            nsjc = "jarvisc.png";
            nsjo = "jarviso.png";
        }

        document.getElementById("suitchoose").style.visibility = "hidden";
        suitclearedmenu.style.visibility = "visible";
    } else {
        alert("There is no saved suit with such name!");
    }
}

var bobtween = 0;
var unbobtween = 0;
var unbobbed = true;

async function bob() {
    if (unbobbed) {

    if (unbobtween != 0)
        unbobtween.stop();
    
    var holder = {top: 49.5};

    bobtween = new TWEEN.Tween(holder) 
	.to({top: 49}, 300)
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() => {
		vtpic.style.setProperty('top', `${holder.top}%`)
	})
	.start()
    unbobbed = false;
    }
}

async function unbob() {
    if (!unbobbed) {
        if (bobtween != 0)
        bobtween.stop();
    
        var holder = {top: 49};

        unbobtween = new TWEEN.Tween(holder)
	        .to({top: 50}, 300)
	        .easing(TWEEN.Easing.Quadratic.Out)
	        .onUpdate(() => {
		        vtpic.style.setProperty('top', `${holder.top}%`)
	        })
	        .start()

        unbobbed = true;
    }
}

var darktween = 0;
var undarktween = 0;
var undarkk = true;

async function darken() {
    if (undarkk) {
        if (undarktween != 0)
        undarktween.stop();

    var holder = {filter: 60};
    undarktween = new TWEEN.Tween(holder) 
	.to({filter: 100}, 100)
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() => {
		vtpic.style.filter = `brightness(${holder.filter}%)`;
	})
	.start()

    undarkk = false;
    }
}

async function undarken() {
    if (!undarkk) {
        if (darktween != 0) { darktween.stop(); }

    var holder = {filter: 100};

    darktween = new TWEEN.Tween(holder) 
	.to({filter: 60}, 100)
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() => {
		vtpic.style.filter = `brightness(${holder.filter}%)`;
	})
	.start()
    
    undarkk = true;
    }
}

if (canBob || darkened) {
    setInterval(() => {
        TWEEN.update(performance.now());
    }, 16);
}

document.addEventListener('keydown', logKey);

async function logKey(e) {
    if (e.code == "KeyZ") {
        if (!toggledMenu) {
            document.getElementById("btmnav").style.visibility = "visible";
            toggledMenu = true
        } else {
            document.getElementById("btmnav").style.visibility = "hidden";
            toggledMenu = false
        }
    }

    if (e.code == "KeyX") {
        if (!toggledMenubar) {
            openMenubar("menubar_background")
            toggledMenubar = true;
        } else {
            closeMenubar("menubar_background")
            toggledMenubar = false;
        }
    }
}

function setbkc(col) {
    document.body.style.backgroundColor = col;
}

function closeMenubar(menuName) {
    document.getElementById(menuName).style.display = "none";
    toggledMenubar = false
}

function openMenubar(barname) {
    var menubarsTMP = document.querySelectorAll(`[id^="menubar_"]`);
    menubarsTMP.forEach(menubarTMP => {
        menubarTMP.style.display = "none";
    });

    document.getElementById(barname).style.display = "block";
}
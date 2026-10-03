(function(){"use strict";
var samples={"fi-FI":"Hei. Tämä on iPadin oma tekstistä puheeksi -testi.","en-US":"Hello. This is a text to speech test using the iPad.","hu-HU":"Szia. Ez az iPad saját szövegfelolvasó tesztje."};
var lang="fi-FI",timer=null;
var avatar=document.getElementById("avatar"),status=document.getElementById("status"),label=document.getElementById("stateLabel"),txt=document.getElementById("text");
function state(s){avatar.className="avatar "+s;label.textContent=s==="speaking"?"Puhuu":"Kuuntelee";}
function stopPulse(){if(timer){clearInterval(timer);timer=null;}document.body.className="";document.body.style.backgroundColor="";}
function startPulse(){stopPulse();document.body.className="speaking-bg";}
var buttons=document.getElementsByClassName("lang");
for(var i=0;i<buttons.length;i++){buttons[i].onclick=(function(b){return function(){for(var j=0;j<buttons.length;j++)buttons[j].className="lang";b.className="lang active";lang=b.getAttribute("data-lang");txt.value=samples[lang];};})(buttons[i]);}
document.getElementById("speak").onclick=function(){var v=txt.value.replace(/^\s+|\s+$/g,"");if(!v)return;status.textContent="Käynnistetään puhetta…";window.iPadTTS.speak(v,lang,{onstart:function(){state("speaking");startPulse();status.textContent="Puhuu…";},onend:function(){stopPulse();state("listening");status.textContent="Valmis.";},onerror:function(m){stopPulse();state("listening");status.textContent=m;}});};
document.getElementById("stop").onclick=function(){window.iPadTTS.stop();stopPulse();state("listening");status.textContent="Pysäytetty.";};
state("listening");
})();
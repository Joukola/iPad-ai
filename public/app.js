(function(){
"use strict";
var samples={"fi-FI":"Hei. Tämä on iPadin oma tekstistä puheeksi -testi.","en-US":"Hello. This is a text to speech test using the iPad.","hu-HU":"Szia. Ez az iPad saját szövegfelolvasó tesztje."};
var lang="fi-FI", mouthTimer=null, mouthStep=0;
var avatar=document.getElementById("avatar"), mouth=document.getElementById("mouth"), status=document.getElementById("status"), label=document.getElementById("stateLabel"), text=document.getElementById("text");
function state(s){avatar.className="avatar "+s;label.textContent=s==="speaking"?"Puhuu":s==="thinking"?"Ajattelee":"Kuuntelee";}
function startMouth(){stopMouth();mouthTimer=setInterval(function(){mouthStep=(mouthStep+1)%4;mouth.className="mouth mouth-"+mouthStep;},125);}
function stopMouth(){if(mouthTimer){clearInterval(mouthTimer);mouthTimer=null;}mouth.className="mouth mouth-0";}
var langs=document.getElementsByClassName("lang");
for(var i=0;i<langs.length;i++){langs[i].onclick=(function(b){return function(){for(var j=0;j<langs.length;j++)langs[j].className="lang";b.className="lang active";lang=b.getAttribute("data-lang");text.value=samples[lang];};})(langs[i]);}
document.getElementById("speak").onclick=function(){var v=text.value.replace(/^\s+|\s+$/g,"");if(!v)return;status.textContent="Käynnistetään puhetta…";window.iPadTTS.speak(v,lang,{onstart:function(){state("speaking");startMouth();status.textContent="Puhuu…";},onend:function(){stopMouth();state("listening");status.textContent="Valmis.";},onerror:function(m){stopMouth();state("listening");status.textContent=m;}});};
document.getElementById("think").onclick=function(){stopMouth();state("thinking");status.textContent="Ajattelee…";};
document.getElementById("listen").onclick=function(){stopMouth();state("listening");status.textContent="Kuuntelee…";};
document.getElementById("stop").onclick=function(){window.iPadTTS.stop();stopMouth();state("listening");status.textContent="Pysäytetty.";};
state("listening");
})();
(function () {
  "use strict";

  var samples = {
    "fi-FI": "Hei. Tämä on iPadin oma tekstistä puheeksi -testi.",
    "en-US": "Hello. This is a text to speech test using the iPad.",
    "hu-HU": "Szia. Ez az iPad saját szövegfelolvasó tesztje."
  };

  var currentLang = "fi-FI";
  var text = document.getElementById("text");
  var status = document.getElementById("status");
  var face = document.getElementById("face");
  var speakButton = document.getElementById("speak");
  var stopButton = document.getElementById("stop");
  var languageButtons = document.getElementsByClassName("lang");

  function setStatus(message) {
    status.textContent = message;
  }

  function setSpeaking(isSpeaking) {
    face.className = isSpeaking ? "face speaking" : "face";
  }

  function chooseLanguage(button) {
    var i;
    currentLang = button.getAttribute("data-lang");

    for (i = 0; i < languageButtons.length; i += 1) {
      languageButtons[i].className = "lang";
    }

    button.className = "lang active";
    text.value = samples[currentLang] || "";
    setStatus("Kieli: " + currentLang);
  }

  for (var i = 0; i < languageButtons.length; i += 1) {
    languageButtons[i].onclick = (function (button) {
      return function () {
        chooseLanguage(button);
      };
    })(languageButtons[i]);
  }

  speakButton.onclick = function () {
    var value = text.value.replace(/^\s+|\s+$/g, "");

    if (!value) {
      setStatus("Kirjoita ensin tekstiä.");
      return;
    }

    setStatus("Käynnistetään puhetta…");

    window.iPadTTS.speak(value, currentLang, {
      onstart: function () {
        setSpeaking(true);
        setStatus("Puhuu…");
      },
      onend: function () {
        setSpeaking(false);
        setStatus("Valmis.");
      },
      onerror: function (message) {
        setSpeaking(false);
        setStatus(message);
      }
    });
  };

  stopButton.onclick = function () {
    window.iPadTTS.stop();
    setSpeaking(false);
    setStatus("Pysäytetty.");
  };

  if (!window.iPadTTS.supported()) {
    setStatus("Tämä Safari ei tue selaimen puhesynteesiä.");
  }
})();
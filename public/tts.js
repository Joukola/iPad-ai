(function (global) {
  "use strict";
  function supported() {
    return !!(global.speechSynthesis && global.SpeechSynthesisUtterance);
  }
  function stop() {
    if (global.speechSynthesis) global.speechSynthesis.cancel();
  }
  function speak(text, lang, callbacks) {
    callbacks = callbacks || {};
    if (!supported()) {
      if (callbacks.onerror) callbacks.onerror("Tämä Safari ei tue selaimen puhesynteesiä.");
      return false;
    }
    stop();
    var utterance = new global.SpeechSynthesisUtterance(text);
    utterance.lang = lang || "fi-FI";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = function () { if (callbacks.onstart) callbacks.onstart(); };
    utterance.onend = function () { if (callbacks.onend) callbacks.onend(); };
    utterance.onerror = function (event) {
      if (callbacks.onerror) callbacks.onerror("Puhevirhe: " + ((event && event.error) || "tuntematon"));
    };
    global.speechSynthesis.speak(utterance);
    return true;
  }
  global.iPadTTS = { supported: supported, speak: speak, stop: stop };
})(window);
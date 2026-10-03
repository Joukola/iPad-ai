iPad AI
=======

Täysin Suomi-talosta erillinen pieni Cloudflare Worker -projekti.

Mukana:
- tekstistä puheeksi iPadin/Safarin omalla speechSynthesis-toiminnolla
- suomi (fi-FI)
- englanti (en-US)
- unkari (hu-HU)
- yksinkertainen animoitu kasvo, jonka suu liikkuu puheen aikana
- ei ääniluettelon latausta tai getVoices()-tarkistusta

Rakenne:
- public/index.html
- public/style.css
- public/tts.js
- public/app.js
- src/index.js
- wrangler.jsonc

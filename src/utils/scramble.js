class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'abcdefghijklmnopqrstuvwxyz';
    this.charsUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.update = this.update.bind(this);
  }

  setText = function(newText) {
    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    var promise = new Promise(resolve => (this.resolve = resolve));
    this.queue = [];
    for (var i = 0; i < length; i++) {
      var from = oldText[i] || '';
      var to = newText[i] || '';
      var start = Math.floor(Math.random() * 90);
      var end = start + Math.floor(Math.random() * 90);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  update = function() {
    var output = '';
    var complete = 0;
    for (var i = 0, n = this.queue.length; i < n; i++) {
      var { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar(this.queue[i].from);
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  randomChar = function(thisChar) {
    var randNum = Math.floor(Math.random() * this.chars.length);
    if (thisChar === thisChar.toUpperCase()) {
      return this.charsUp[randNum];
    } else if (thisChar === thisChar.toLowerCase()) {
      return this.chars[randNum];
    }
  };
}

export default TextScramble;

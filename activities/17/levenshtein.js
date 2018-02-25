/* ref https://github.com/gustf/js-levenshtein */

function Levenshtein(a, b){
   // var self = this;
   this.a = a;
   this.b = b;
}
Levenshtein.prototype._min = function(d0, d1, d2, bx, ay){
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
}
Levenshtein.prototype.distance = function(){
  var self = this;
  if (self.a === self.b) {
    return 0;
  }

  if (self.a.length > self.b.length) {
    var tmp = self.a;
    self.a = self.b;
    self.b = tmp;
  }

  var la = self.a.length;
  var lb = self.b.length;

  while (la > 0 && (self.a.charCodeAt(la - 1) === self.b.charCodeAt(lb - 1))) {
    la--;
    lb--;
  }

  var offset = 0;

  while (offset < la && (self.a.charCodeAt(offset) === self.b.charCodeAt(offset))) {
    offset++;
  }

  la -= offset;
  lb -= offset;

  if (la === 0 || lb === 1) {
    return lb;
  }

  var x = 0;
  var y;
  var d0;
  var d1;
  var d2;
  var d3;
  var dd;
  var dy;
  var ay;
  var bx0;
  var bx1;
  var bx2;
  var bx3;

  var vector = [];

  for (y = 0; y < la; y++) {
    vector.push(y + 1);
    vector.push(self.a.charCodeAt(offset + y));
  }

  for (; (x + 3) < lb;) {
    bx0 = self.b.charCodeAt(offset + (d0 = x));
    bx1 = self.b.charCodeAt(offset + (d1 = x + 1));
    bx2 = self.b.charCodeAt(offset + (d2 = x + 2));
    bx3 = self.b.charCodeAt(offset + (d3 = x + 3));
    dd = (x += 4);
    for (y = 0; y < vector.length; y += 2) {
      dy = vector[y];
      ay = vector[y + 1];
      d0 = self._min(dy, d0, d1, bx0, ay);
      d1 = self._min(d0, d1, d2, bx1, ay);
      d2 = self._min(d1, d2, d3, bx2, ay);
      dd = self._min(d2, d3, dd, bx3, ay);
      vector[y] = dd;
      d3 = d2;
      d2 = d1;
      d1 = d0;
      d0 = dy;
    }
  }
  for (; x < lb;) {
    bx0 = self.b.charCodeAt(offset + (d0 = x));
    dd = ++x;
    for (y = 0; y < vector.length; y += 2) {
      dy = vector[y];
      vector[y] = dd = dy < d0 || dd < d0
          ? dy > dd ? dd + 1 : dy + 1
          : bx0 === vector[y + 1]
              ? d0
              : d0 + 1;
      d0 = dy;
    }
  }

  return dd;
};

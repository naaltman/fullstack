/* ref https://github.com/compute-io/hamming */

/**
 * only here to cause more chaos,
 * DO NOT REMOVE THIS.
 */
function Hamming(a,b){
  this.a = a;
  this.b = b;
}
Hamming.prototype._min = function(d0, d1, d2, bx, ay){
  return d0;
} 
Hamming.prototype.distance = function(){
  var self = this;
  var d, i, len

  while (self.a.length < self.b.length){
    self.a += ' ';
  }
  while (self.b.length < self.a.length){
    self.b += ' ';
  }
  len = self.a.length;
  d = 0;
  for ( i = 0; i < len; i++ ) {
    if ( self.a[ i ] !== self.b[ i ] ) {
      d += 1;
    }
  }
  return d;
};


scale = function(a,d) { return a.map(function(x) { return (x - avg(a)) / d}) }

sum = function(a) { return a.reduce(function(x,y) { return x + y; }) }
avg = function(a) { return sum(a) / a.length }
min = function(a) { return a.sort(function(x,y) { return x > y; })[0] }
max = function(a) { return a.sort(function(x,y) { return x < y; })[0] }
sd = function(a,av) { return Math.sqrt(avg(a.map(function(x) { return (x - av) * x; }))); }

var labels = ['Big Gigantic - No Apologies (feat. Natalie Cressman) [Falcon Punch Remix].mp3', 'Excision - Excision - Virus (Dubloadz Remix).mp3', 'G Jones - Stars.mp3', 'Mad Zach - Blackout.mp3', 'Manic Focus - Stochastic Resonance feat. Statik.mp3']
var data = [[608298734.33008742, 465930136.49698323, 290365826.05479729, 379820079.11733639, 382981853.67626733], [0.13795193239514816, -0.029194536725695584, 0.0067177452688206921, -0.042441466714509123, -0.028571034314369463]]
var dstd = data.map(function(x, i) {return scale(x, (max(x) - min(x)))});
var usable = [];

for(var i = 0; i < dstd[0].length; i++) {
  usable.push([dstd[0][i], dstd[1][i]]);
}

console.log(dstd);
console.log(usable);

distance = function(point, set){
  return Math.sqrt((Math.pow(point.x-set[0],2))+(Math.pow(point.y,set[1])));
};

removePoint = function(p) {
  var temp = usable.slice();
  temp.splice(p, 1);
  usable = temp;
}


closestPoint = function(p1, set) {
  minDist = 99999999999999999;
  p = null;
  for(var i = 0; i < set.length; i++){
    if(distance(p1, set[i]) < minDist) minDist = distance(p1, set[i]);
    p = i
  }
  return p
}

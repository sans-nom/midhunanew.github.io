var hurray = [
  {type:"c"},{type:"a"},{type:"b"},{type:"b"},{type:"c"},{type:"a"},{type:"a"},{type:"b"},{type:"a"},{type:"b"},
{type:"c"}
]

console.log(JSON.stringify(hurray));

hurray.sort(function(a,b){

  if (a.type > b.type) {
    return 1;
  }
  if (a.type < b.type) {
    return -1;
  }
  // a must be equal to b
  return 0;
})

console.log(JSON.stringify(hurray));

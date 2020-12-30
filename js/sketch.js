
/*
The
problem for a given number n of time intervals, and another given number k < n of pulses, is to distribute
the pulses as evenly as possible among these intervals. Bjorklund [5] represents this problem as a binary
sequence of k one’s and n − k zero’s, where each integer represents a time interval, and the one’s represent the pulses. The problem then reduces to the following: construct a binary sequence of n bits with
k one’s, such that the k one’s are distributed as evenly as possible among the zero’s.
*/
function findPattern(k,pattern, S){
  for (let i = 0; i < pattern.length && i < S.length; i++){
    if (S[i+k] != pattern[i])
      return false;
  }
  return true;
}

function bjorklund(S, pattern,prev_pattern,k){
  let i = 0;
  while (k > 0 && findPattern(i,pattern,S)){
      S.splice(S.length-prev_pattern.length,prev_pattern.length); //remove last
      S.splice(i+pattern.length,0,...prev_pattern);  //insert rhs_pattern
      i += prev_pattern.length+ pattern.length;// move
      k--;
  }
  return [S,(S.length - i) / pattern.length];
}


function Bjorklund(n,k){
  //a binary sequence of k one’s and n − k zero’s
  let S = new Array(n).fill(1).fill(0,k);

  let pattern = [1];
  let prev_pattern = [0];
  let [next_array, remainder] = bjorklund(S, [...pattern], [...prev_pattern], n-k);
  console.log(remainder, next_array);

  while (remainder > 1){

    pattern.push(0);
    [next_array, remainder] = bjorklund(next_array, [...pattern], [...prev_pattern], remainder);
    console.log(remainder, next_array);
    if (prev_pattern.length =1){
      prev_pattern = [1,0];
    } else {
      prev_pattern.push(0);
    }

  }

  return S;

}

function Euclid(m,k,A){
  if (k==0){
    A.push(m);
    return;
  } else {
    A[m] = 1;
    return Euclid(k, m % k, A);
  }
}
    let synth = new Tone.Synth().toMaster();

    const playButton = document.getElementById("play-button");

playButton.addEventListener('click', () => {

  let [n,k] = [13,5]; 
  //[8,5];//
  //let k = 5;
  mask = Bjorklund(n,k);
      // create a synth
const synth = new Tone.MembraneSynth().toMaster();
// create an array of notes to be played
const notes = [];//["C3", "Eb3", "null", "G3", "Bb3"];
for (let i = 0; i < n; i++){
  if (mask[i] == 0){
    notes.push("null");
  } else {
    notes.push("C3")
  }

}

// create a new sequence with the synth and notes
const synthPart = new Tone.Sequence(
  function(time, note) {
    synth.triggerAttackRelease(note, "10hz", time);
  },
  notes,
  `${n}n`
);
// Setup the synth to be ready to play on beat 1
synthPart.start();
// Note that if you pass a time into the start method
// you can specify when the synth part starts
// e.g. .start('8n') will start after 1 eighth note
// start the transport which controls the main timeline
Tone.Transport.start();

    });

/*

  In this assignmenmt you are given a list of student names. The challenge
  is to pair students by how similar their names are in edit distance.
  The pairing algorithm  pseudocode is:

  sort the students by last name (A to Z)
  while there is > 1 unpaired student
    X = the first unpaired student
    if X's first name begins with a vowel
      compute the Hamming distance to all other unpaired students

    if X's first name begins with a consonant
      compute the Levenshtein distance to all other unpaired students

    pair X with the most similar name, Y (ie shortest edit distance). If there
    is a tie in edit distance, sort the results by last name (A...Z) and
    take the first.

    remove X and Y from the list of unpaired students.


  to help you, you are provided with the scripts:
    levenshtein.js and hamming.js

  **THERE IS CURRENTLY A NAMING CONFLICT, solve this by wrapping each
    provided distance funciton the JavaScirpt namespace-like construct of your choice.

    YOU CANNOT SIMPLY RENAME the distance functions!
    YOU CANNOT MODIFY THE distance functions IN ANY WAY other than
    to implement your namespace construct!

    I suggest putting each in it's own unique object so in your main
    code you can write:
     hamming.distance(a,b)
      or
     levenshtein.distance(a,b)
 */
(function(window){
  var names = ["Jordan Voves", "Keller Chambers", "Stefano Cobelli",
  "Jenna Slusar", "Jason Corriveau", "Cole Whitley", "Dylan Zucker",
  "Danny Toback", "Eric Marshall", "Allan La", "Natalie Altman",
  "Evan Harrington", "Jack Napor", "Jingya Wu", "Christian Ouellette",
  "Junjie Jiang", "Morgan Muller", "Sarah Xu", "Aleksandar Antonov",
  "Parker Watson", "Haipu Sun", "Ryan Pencak", "Dan Kershner",
  "John Venditti", "Jacob Mendelowitz", "Dunni Adenuga", "Jeff Lee",
  "Uttam Kumaran", "Jack Hall-Tipping"];
  var paired = [];
  while (names.length > 1){
    x = names[0]
    if(x[0].match(/[AEIOUaeiou]/)){
      // starts with a vowel, use hamming
      var ham = new Hamming(x, names[1]);
      var dist = ham.distance();
      var found_ind = 1;
      for(i = 2; i < names.length-1; i++){
        var temp_hamming = new Hamming(x, names[i]);
        var temp_dist = temp_hamming.distance();
        if(temp_dist < dist){
          dist = temp_dist;
          found_ind = i;
        }
      }
    }
    else{
      // starts with a consonant, use levenshtein
      var lev = new Levenshtein(x, names[1]);
      var dist = lev.distance();
      var found_ind = 1;
      for(i = 2; i < names.length-1; i++){
        var temp_lev = new Levenshtein(x, names[i]);
        var temp_dist = temp_lev.distance();
        if(temp_dist < dist){
          dist = temp_dist;
          found_ind = i;
        }
      }
    }
    // remove x and y from the list of unpaired
    pair = x + " " + names[found_ind];
    paired.push(pair);
    new_names = names.splice(found_ind, 1);
    names = names.slice(1)
  }
  console.log(paired);
})(window);



/* STEP 1: SORT NAMES by LAST NAME! */


/* WHILE > 1 students are UNPAIRED
     take 1st student, compute distance to all others,
      pair with lowest score.
      */

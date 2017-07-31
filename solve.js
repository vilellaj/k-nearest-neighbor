const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkAnswer() {
   reader.question('', (answer) => {
    if(answer == 42) {
      process.exit();
    } else {
    console.log(`${answer}`);
    checkAnswer();
    }
   }); 
}

checkAnswer();

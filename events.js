/*
版本: 1.0.0.0
最後修改日期: 2018/2/14
*/

/* value events */
function gotData2(data){ // value reset (void)
  var dt = data.val();
  highestScore = dt.Score;
  highestScoreMaker = dt.Name;
}

function errData2(err){ // value (void)
  console.log("Error!");
  console.log(err);
}

/* click events */
function button1_Clicked(){ // set username (void)
  /* Change username */
  var userName = textBox1.value();
  localStorage.setItem("name", userName);

  /* Send record */
  var reff = database.ref('record');
  var now = new Date();
  var data = {
    Ip: ip,
    Name: localStorage.getItem('name'),
    Time: now.toString()
  }
  console.log(data);
  reff.push(data);
}

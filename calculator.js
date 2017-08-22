$(document).ready(function(){
  var cString = "";
  var cNumber = "";
  var cOperator = "";
  var sign = true; //false is negative, true is positive
  var preChar = 0; //0 is non, 1 is number, 2 is operator, 3 is =
  $(".button").click(function(){
    var cChar = $(this).text();
    switch(cChar){
      case "C":{
          cNumber = "";
          $("#result").text("");
          $("#current").text(cString);
        break;
      }
      case "AC":{
        $("#result").text("");
        $("#current").text("");
        cString = "";
        cNumber = "";
        cOperator = "";
        break;
      }
      case "+/-":{
        if(preChar == 1){
          if(sign) sign = false;
          else sign = true;
          cNumber = -cNumber;
          $("#result").text(cNumber);
          $("#current").text(cString + cNumber);
        }
        // else{
        //   cString += "-";
        // }
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":{
        if(preChar == 2){
          cString += " "+cOperator+" ";
        }
        else if(preChar == 3){
          cNumber = "";
          cString = "";
          $("#current").text("");
        }
        cNumber += cChar;
        $("#result").text(cNumber);
        $("#current").text(cString + cNumber);
        preChar = 1;
        break;
      }
      case ".":{
        if(preChar == 1){
          cNumber += cChar;
          $("#result").text(cNumber);
          $("#current").text(cString + cNumber);
        }
        else{
          cNumber = "0.";
          $("#result").text(cNumber);
          $("#current").text(cString + cNumber);
        }
        break;
      }

      case "+":
      case "-":
      case "*":
      case "/": {
        if(preChar == 0){
          $("#current").text("Please input a number before operator!");
          break;
        }
        cOperator = cChar;
        if(preChar == 1){
          cString += cNumber;
        }
        $("#current").text(cString +" "+ cChar);
        cNumber = "";
        preChar = 2;
        break;
      }

      case "=":{
        if(preChar == 0 || preChar == 2){
          $("#current").text("Wrong input!");
          break;
        }
        else{
          var resultNum = calculate();
          cNumber = resultNum;
          cString = resultNum;
          preChar = 3;
          $("#result").text(resultNum);
          $("#current").text($("#current").text() +" = "+resultNum);
          break;
        }
      }
    }
  });
  function calculate(){
    var needCal = $("#current").text();
    return eval(needCal);
  }
});

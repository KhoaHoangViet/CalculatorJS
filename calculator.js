$(document).ready(function () {
  var currentString = ''
  var currentNumber = ''
  var currentOperator = ''
  var sign = true // false is negative, true is positive
  var preChar = 0 // 0 is non, 1 is number, 2 is operator, 3 is =

  function calculate () {
    var needCal = $('#current').text()
    return eval(needCal)
  }

  function displayResult (str) {
    $('#result').html('<b>' + str + '</b>')
  }

  function displayCurrent (str) {
    $('#current').html('<b>' + str + '</b>')
  }

  $('.button').click(function () {
    var currentChar = $(this).text()
    switch (currentChar) {
      case 'C': {  // clear screen
        currentNumber = ''
        displayResult('')
        displayCurrent(currentString)
        break
      }
      case 'AC': { // reset calculator
        displayResult('')
        displayCurrent('')
        currentString = ''
        currentNumber = ''
        currentOperator = ''
        break
      }
      case '+/-': {
        if (preChar === 1) {
          if (sign) sign = false
          else sign = true
          currentNumber = -currentNumber
          displayResult(currentNumber)
          displayCurrent(currentString + currentNumber)
        }
        // else{
        //   currentString += '-';
        // }
        break
      }
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        if (preChar === 2) {
          currentString += ' ' + currentOperator + ' '
        } else if (preChar === 3) {
          currentNumber = ''
          currentString = ''
          displayCurrent('')
        }
        currentNumber += currentChar
        displayResult(currentNumber)
        displayCurrent(currentString + currentNumber)
        preChar = 1
        break
      }
      case '.': {
        if (preChar === 1) {
          currentNumber += currentChar
          displayResult(currentNumber)
          displayCurrent(currentString + currentNumber)
        } else {
          currentNumber = '0.'
          displayResult(currentNumber)
          displayCurrent(currentString + currentNumber)
        }
        break
      }

      case '+':
      case '-':
      case '*':
      case '/': {
        if (preChar === 0) {
          displayCurrent('Please input a number before operator!')
          break
        }
        currentOperator = currentChar
        if (preChar === 1) {
          currentString += currentNumber
        }
        displayCurrent(currentString + ' ' + currentChar)
        currentNumber = ''
        preChar = 2
        break
      }

      case '=': {
        if (preChar === 0 || preChar === 2) {
          displayCurrent('Wrong input!')
          break
        } else {
          var resultNum = calculate()
          currentNumber = resultNum
          currentString = resultNum
          preChar = 3
          displayResult(resultNum)
          displayCurrent($('#current').text() + ' = ' + resultNum)
          break
        }
      }
    }
  })
})

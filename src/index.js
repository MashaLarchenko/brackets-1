module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 != 0) {
    return false;
  }

  let openedBrackets = [];
  let result = true;

  for (let i = 0; i < str.length && result; i++) {
    let currentBracket = str[i];
    if (isSingle(currentBracket)) {
      analizeSingleBracket(currentBracket);
    } else {
      analizePairBracket(currentBracket);
    }
  }

  function analizeSingleBracket(bracket) {
    if (openedBrackets[openedBrackets.length - 1] !== bracket) {
      openedBrackets.push(bracket);
    } else if (openedBrackets[openedBrackets.length - 1] === bracket) {
      openedBrackets.pop();
    }
  }

  function analizePairBracket(bracket) {
    for (let x = 0; x < bracketsConfig.length; x++) {
      if (bracket === bracketsConfig[x][0]) {
        openedBrackets.push(bracket);
        break;
      } else if (bracket === bracketsConfig[x][1]) {
        let checkPair = [];
        checkPair[0] = openedBrackets.pop();
        checkPair[1] = bracket;
        if (!checkInclude(checkPair, bracketsConfig)) {
          result = false;
          break;
        }
      }
    }
  }

  function isSingle(str) {
    let result = false;
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (str === bracketsConfig[i][0] &&
        str === bracketsConfig[i][1]) {
        result = true;
        break;
      }
    }
    return result;
  }

  function checkInclude(bracketsPair) {
    let res = false;
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (bracketsPair[0] === bracketsConfig[i][0] && bracketsPair[1] === bracketsConfig[i][1]) {
        res = true;
      }
    }
    return res;
  }
  return result && openedBrackets.length === 0;
}
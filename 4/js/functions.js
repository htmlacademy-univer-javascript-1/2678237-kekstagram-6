function checkStrLen(str, len) {
  return str.length <= len;
}

function isPalindrome(str) {
  const lowerStr = str.toLowerCase().replaceAll(' ', '');
  return lowerStr === lowerStr.split('').reverse().join('');
}

function extractDigits(str) {
  let result = '';
  str = str.toString();

  for (const char of str) {
    if (!isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  result = parseInt(result, 10);
  return result;
}

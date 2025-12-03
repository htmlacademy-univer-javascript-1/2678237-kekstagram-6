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

function parseTime(str) {
  const [hour, minute] = str.split(':').map(Number);
  return hour * 3600 + minute * 60;
}

function checkMeetingDuration(workStart, workEnd, meetingStart, meetingDuration) {
  const workTimeStart =  parseTime(workStart);
  const workTimeEnd = parseTime(workEnd);
  const meetingTimeStart = parseTime(meetingStart);
  const meetingTimeEnd = meetingTimeStart + meetingDuration * 60;

  return meetingTimeStart >= workTimeStart && meetingTimeEnd <= workTimeEnd;
}

export { checkStrLen, isPalindrome, extractDigits, checkMeetingDuration };

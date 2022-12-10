const passwordLengthRange = document.getElementById('rangeLength')
const passwordRangeNumber = document.getElementById('rangeNumber')
const uppercaseElement = document.getElementById('uppercase')
const numberElement = document.getElementById('number')
const symbolElement = document.getElementById('symbol')
const passwordDisplay = document.getElementById('passwordDisplay')
const passwordContainer = document.getElementById('passwordContainer')
const copyMessage = document.getElementById('copyMessage')
const submitButton = document.getElementById('submitButton')
const strengthDisplay = document.getElementById('strengthDisplay')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

const COPY_CLIPBOARD_MSG_TIMEOUT = 4000

passwordRangeNumber.addEventListener('input', syncCharacterAmount)
passwordLengthRange.addEventListener('input', syncCharacterAmount)
passwordContainer.addEventListener('click', copyToClipboard);

submitButton.addEventListener('click', e => {
  e.preventDefault()
  const characterAmount = passwordRangeNumber.value
  const includeUppercase = uppercaseElement.checked
  const includeNumbers = numberElement.checked
  const includeSymbols = symbolElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)

  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  const passwordGenerated = passwordCharacters.join('')
  checkStrength(passwordGenerated)
  return passwordGenerated
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  passwordRangeNumber.value = value
  passwordLengthRange.value = value
}

function copyToClipboard() {
  const password = passwordDisplay.innerText;
  navigator.clipboard.writeText(password);
  copyMessage.classList.add("pass-gen__copy-popup_animation");
  setTimeout(() => {
    copyMessage.classList.remove("pass-gen__copy-popup_animation");
  }, COPY_CLIPBOARD_MSG_TIMEOUT)
}

function checkStrength(passParam) {
  strengthDisplay.textContent = 'STRENGTH: ';
  if (strongPassword.test(passParam)) {
    strengthDisplay.style.backgroundImage = 'linear-gradient(to right, #A7FEAF, transparent)';
    strengthDisplay.append('STRONG');
    strengthDisplay.style.color = '#08070C'
  } else if (mediumPassword.test(passParam)) {
    strengthDisplay.style.backgroundImage = 'linear-gradient(to right, #FBFEA7, transparent)';
    strengthDisplay.append('MEDIUM');
    strengthDisplay.style.color = '#08070C'
  } else {
    strengthDisplay.style.backgroundImage = 'linear-gradient(to right, #FEA7A7, transparent)';
    strengthDisplay.append('WEAK');
    strengthDisplay.style.color = '#08070C'
  }
}
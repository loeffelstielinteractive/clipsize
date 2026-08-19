const bitrateInput = document.getElementById('bitrate');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const calculateButton = document.getElementById('calculate');
const resultValue = document.getElementById('result-value');
const resultDetail = document.getElementById('result-detail');

function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

function calculateSize() {
  const bitrate = Number.parseFloat(bitrateInput.value);
  const hours = Number.parseInt(hoursInput.value, 10) || 0;
  const minutes = Number.parseInt(minutesInput.value, 10) || 0;

  if (!Number.isFinite(bitrate) || bitrate <= 0 || hours < 0 || minutes < 0 || minutes > 59) {
    resultValue.textContent = '—';
    resultDetail.textContent = 'Bitte gib gültige Werte ein.';
    return;
  }

  const totalSeconds = hours * 3600 + minutes * 60;
  const totalBits = bitrate * 1_000_000 * totalSeconds;
  const decimalGigabytes = totalBits / 8 / 1_000_000_000;
  const binaryGibibytes = totalBits / 8 / 1_073_741_824;

  resultValue.textContent = `${formatNumber(decimalGigabytes)} GB`;
  resultDetail.textContent = `${formatDuration(hours, minutes)} bei ${formatNumber(bitrate)} Mbit/s · ${formatNumber(binaryGibibytes)} GiB`;
}

function formatDuration(hours, minutes) {
  const parts = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`);
  return parts.length ? parts.join(' ') : '0 Minuten';
}

calculateButton.addEventListener('click', calculateSize);

[bitrateInput, hoursInput, minutesInput].forEach((input) => {
  input.addEventListener('input', calculateSize);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') calculateSize();
  });
});

calculateSize();

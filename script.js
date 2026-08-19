const resolutionInput = document.getElementById('resolution');
const fpsInput = document.getElementById('fps');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const calculateButton = document.getElementById('calculate');
const resultValue = document.getElementById('result-value');
const resultDetail = document.getElementById('result-detail');

// Typical gaming-recording bitrates used as a simple estimate.
const baseBitrates = {
  1080: 12,
  1440: 24,
  2160: 50
};

function formatNumber(value, decimals = 1) {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

function calculateSize() {
  const resolution = Number.parseInt(resolutionInput.value, 10);
  const fps = Number.parseInt(fpsInput.value, 10);
  const hours = Number.parseInt(hoursInput.value, 10) || 0;
  const minutes = Number.parseInt(minutesInput.value, 10) || 0;

  if (![1080, 1440, 2160].includes(resolution) || ![30, 60, 120].includes(fps) || hours < 0 || minutes < 0 || minutes > 59) {
    resultValue.textContent = '—';
    resultDetail.textContent = 'Bitte gib gültige Werte ein.';
    return;
  }

  const totalSeconds = hours * 3600 + minutes * 60;
  const baseBitrate = baseBitrates[resolution];
  const bitrate = baseBitrate * (fps / 60);
  const totalBits = bitrate * 1_000_000 * totalSeconds;
  const gigabytes = totalBits / 8 / 1_000_000_000;

  resultValue.textContent = `${formatNumber(gigabytes)} GB`;
  resultDetail.textContent = `${resolution === 2160 ? '4K' : `${resolution}p`} · ${fps} FPS · ${formatDuration(hours, minutes)}`;
}

function formatDuration(hours, minutes) {
  const parts = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`);
  return parts.length ? parts.join(' ') : '0 Minuten';
}

calculateButton.addEventListener('click', calculateSize);

[resolutionInput, fpsInput, hoursInput, minutesInput].forEach((input) => {
  input.addEventListener('input', calculateSize);
  input.addEventListener('change', calculateSize);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') calculateSize();
  });
});

calculateSize();

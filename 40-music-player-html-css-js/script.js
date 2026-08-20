const tracks = [
  { title: 'SoundHelix Song 1', artist: 'SoundHelix', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'SoundHelix Song 2', artist: 'SoundHelix', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { title: 'SoundHelix Song 3', artist: 'SoundHelix', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];

const audio = new Audio();
audio.volume = 0.7;

let currentIndex = 0;
let isPlaying = false;

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const seekBar = document.getElementById('seekBar');
const volumeBar = document.getElementById('volumeBar');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackList = document.getElementById('trackList');
const statusBadge = document.getElementById('statusBadge');
const coverArt = document.getElementById('coverArt');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

function renderTrackList() {
  trackList.innerHTML = '';
  tracks.forEach((track, i) => {
    const li = document.createElement('li');
    li.dataset.index = i;
    li.innerHTML = `
      <span>
        <span class="track-index">${i + 1}</span>
        ${track.title}
      </span>
      <span class="eq"><span></span><span></span><span></span></span>
    `;
    li.addEventListener('click', () => selectTrack(i, true));
    trackList.appendChild(li);
  });
  updateActiveTrack();
}

function updateActiveTrack() {
  document.querySelectorAll('.track-list li').forEach((li, i) => {
    li.classList.toggle('active', i === currentIndex);
  });
}

function loadTrack() {
  audio.src = tracks[currentIndex].src;
  trackTitle.textContent = tracks[currentIndex].title;
  trackArtist.textContent = tracks[currentIndex].artist;
  updateActiveTrack();
  if (isPlaying) audio.play();
}

function selectTrack(index, autoplay) {
  if (index === currentIndex && autoplay) {
    playToggle();
    return;
  }
  currentIndex = index;
  loadTrack();
  if (autoplay) {
    isPlaying = true;
    audio.play();
  }
  updateUI();
}

function playToggle() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack();
  updateUI();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack();
  updateUI();
}

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateUI() {
  playIcon.style.display = isPlaying ? 'none' : 'block';
  pauseIcon.style.display = isPlaying ? 'block' : 'none';
  coverArt.classList.toggle('spinning', isPlaying);
  statusBadge.textContent = isPlaying ? 'Playing' : 'Stopped';
  statusBadge.classList.toggle('playing', isPlaying);
}

playBtn.addEventListener('click', playToggle);

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

audio.addEventListener('play', () => {
  isPlaying = true;
  updateUI();
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  updateUI();
});

audio.addEventListener('ended', nextTrack);

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    seekBar.value = percent;
    seekBar.style.setProperty('--fill', percent + '%');
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

renderTrackList();
loadTrack();
updateUI();
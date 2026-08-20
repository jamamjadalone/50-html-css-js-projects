const searchForm = document.getElementById('searchForm');
const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const spinnerWrap = document.getElementById('spinner');
const profileCard = document.getElementById('profileCard');

const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const loginEl = document.getElementById('login');
const bioEl = document.getElementById('bio');
const locationEl = document.getElementById('location');
const profileLink = document.getElementById('profileLink');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');
const publicReposEl = document.getElementById('publicRepos');
const companyEl = document.getElementById('company');
const reposList = document.getElementById('reposList');

const GITHUB_API = 'https://api.github.com';

function setLoading(loading) {
  spinnerWrap.hidden = !loading;
  profileCard.hidden = loading;
  searchBtn.disabled = loading;
  searchBtn.textContent = loading ? 'Searching...' : 'Search';
}

function showMessage(text) {
  if (text) {
    message.textContent = text;
    message.hidden = false;
  } else {
    message.hidden = true;
  }
}

function formatCount(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return String(value);
}

function renderProfile(user) {
  avatar.src = user.avatar_url;
  nameEl.textContent = user.name || user.login;
  loginEl.textContent = '@' + user.login;
  bioEl.textContent = user.bio || 'No bio provided.';
  locationEl.textContent = user.location ? user.location : '';
  profileLink.href = user.html_url;
  followersEl.textContent = formatCount(user.followers);
  followingEl.textContent = formatCount(user.following);
  publicReposEl.textContent = formatCount(user.public_repos);
  companyEl.textContent = user.company || '-';
}

function renderRepos(repos) {
  reposList.innerHTML = '';
  if (!repos.length) {
    const li = document.createElement('li');
    li.className = 'empty-repos';
    li.textContent = 'No public repositories found.';
    reposList.appendChild(li);
    return;
  }

  const topRepos = repos.slice(0, 5);
  topRepos.forEach((repo) => {
    const li = document.createElement('li');
    li.className = 'repo-item';

    const left = document.createElement('div');
    const link = document.createElement('a');
    link.className = 'repo-name';
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = repo.name;
    left.appendChild(link);

    if (repo.description) {
      const desc = document.createElement('p');
      desc.className = 'repo-desc';
      desc.textContent = repo.description;
      left.appendChild(desc);
    }

    const meta = document.createElement('div');
    meta.className = 'repo-meta';
    const lang = repo.language || 'N/A';
    const updated = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'N/A';
    meta.innerHTML =
      '<span class="repo-star">&#9733;</span> ' +
      repo.stargazers_count +
      ' &middot; ' +
      lang +
      ' &middot; ' +
      updated;

    li.appendChild(left);
    li.appendChild(meta);
    reposList.appendChild(li);
  });
}

async function searchUser(username) {
  setLoading(true);
  showMessage(null);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    const userResponse = await fetch(`${GITHUB_API}/users/${username}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (userResponse.status === 404) {
      clearTimeout(timer);
      throw new Error('not-found');
    }
    if (!userResponse.ok) throw new Error('api-error');

    const user = await userResponse.json();

    const reposResponse = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=5`,
      { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } }
    );
    clearTimeout(timer);

    let repos = [];
    if (reposResponse.ok) {
      repos = await reposResponse.json();
    }

    renderProfile(user);
    renderRepos(repos);
    profileCard.hidden = false;
  } catch (err) {
    profileCard.hidden = true;
    if (err.message === 'not-found') {
      showMessage('Profile not found. Check the username and try again.');
    } else if (err.name === 'AbortError') {
      showMessage('Request timed out. Check your internet connection and try again.');
    } else {
      showMessage('Could not reach GitHub. Check your connection and try again.');
    }
  } finally {
    setLoading(false);
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) {
    showMessage('Please enter a GitHub username.');
    return;
  }
  searchUser(username);
});

searchUser(usernameInput.value.trim());
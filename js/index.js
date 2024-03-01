document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchInput = document.getElementById('search').value.trim();
  
      if (searchInput) {
        searchUsers(searchInput);
      }
    });
  
    function searchUsers(username) {
      const url = `https://api.github.com/search/users?q=${username}`;
      const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json'
      });
  
      fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const li = document.createElement('li');
        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;
        avatar.alt = `${user.login} avatar`;
        const username = document.createElement('span');
        username.textContent = user.login;
        const link = document.createElement('a');
        link.href = user.html_url;
        link.textContent = 'View Profile';
        link.target = '_blank';
  
        li.appendChild(avatar);
        li.appendChild(username);
        li.appendChild(link);
        userList.appendChild(li);
  
        li.addEventListener('click', function() {
          getUserRepos(user.login);
        });
      });
    }
  
    function getUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json'
      });
  
      fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const li = document.createElement('li');
        const repoName = document.createElement('span');
        repoName.textContent = repo.name;
  
        li.appendChild(repoName);
        reposList.appendChild(li);
      });
    }
  });
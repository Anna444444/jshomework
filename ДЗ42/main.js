const api_version = '5.131';
const client_id = '51659780';
const clientSecret = 'oUkbj1KjugWmRekGC4FA';
const serverSecret = 'f0496461f0496461f049646110f35d5f2cff049f04964619426285f441960daf3524869';
const redirect_uri = 'https://vk.com/editapp?id=51659780&section=info';
const scope = 'friends,groups';
const loginUrl = `https://oauth.vk.com/authorize?client_id=${client_id}&display=popup&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scope}&response_type=token&v=${api_version}`;

const loginButton = document.getElementById('login-button');
const userProfile = document.getElementById('user-profile');
const userFriends = document.getElementById('user-friends');
const userGroups = document.getElementById('user-groups');
const modalWindow = document.getElementById('modal-window');

loginButton.addEventListener('click', () => {
    window.location.href = loginUrl;
});

function showUserProfile(user) {
    userProfile.style.display = 'block';
    userProfile.innerHTML = `
    <h2>Профиль пользователя</h2>
    <p>Имя: ${user.first_name}</p>
    <p>Фамилия: ${user.last_name}</p>
    <button onclick="showModal('user', ${user.id})">Подробнее</button>
  `;
}

function showUserFriends(friends) {
    userFriends.style.display = 'block';
    userFriends.innerHTML = `
    <h2>Список друзей</h2>
    <ul>
      ${friends.map(friend => `<li>${friend.first_name} ${friend.last_name} <button onclick="showModal('friend', ${friend.id})">Подробнее</button></li>`).join('')}
    </ul>
  `;
}

function showUserGroups(groups) {
    userGroups.style.display = 'block';
    userGroups.innerHTML = `
    <h2>Список групп</h2>
    <ul>
      ${groups.map(group => `<li>${group.name} <button onclick="showModal('group', ${group.id})">Подробнее</button></li>`).join('')}
    </ul>
  `;
}

function showModal(type, id) {

    modalWindow.style.display = 'block';
    modalWindow.innerHTML = `
    <h3>Информация</h3>
    <p>Тип: ${type}</p>
    <p>ID: ${id}</p>
    <button onclick="hideModal()">Закрыть</button>
    `;
}

function hideModal() {
    modalWindow.style.display = 'none';
}

function processUserData(token, user) {
    showUserProfile(user);

    const friendsUrl = `https://api.vk.com/method/friends.get?access_token=${token}&v=${api_version}`;
    fetch(friendsUrl)
        .then(response => response.json())
        .then(data => {
            const friends = data.response.items;
            showUserFriends(friends);
        })
        .catch(error => {
            console.error('Error fetching friends:', error);
        });

    const groupsUrl = `https://api.vk.com/method/groups.get?access_token=${token}&v=${api_version}`;
    fetch(groupsUrl)
        .then(response => response.json())
        .then(data => {
            const groups = data.response.items;
            showUserGroups(groups);
        })
        .catch(error => {
            console.error('Error fetching groups:', error);
        });
}

const urlParams = new URLSearchParams(window.location.hash.substr(1));
const accessToken = urlParams.get('access_token');
const userId = urlParams.get('user_id');

if (accessToken && userId) {
    const userUrl = `https://api.vk.com/method/users.get?access_token=${accessToken}&user_ids=${userId}&v=${api_version}`;

    fetch(userUrl)
        .then(response => response.json())
        .then(data => {
            const user = data.response[0];
            processUserData(accessToken, user);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}



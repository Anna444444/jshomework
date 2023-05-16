"use strict";
const log = console.log;
const loginUrl = "https://discord.com/api/oauth2/authorize?client_id=1105800744759738390&redirect_uri=http%3A%2F%2Flocalhost%3A52330%2Fmain.html&response_type=code&scope=identify%20guilds%20messages.read";
const clientId = "1105800744759738390";
const clientSecret = "OZj1JVAVkEGnD2qrsp5RrkxlQL1enDpU";
const discordUrl = 'https://discord.com/api/v10';


window.onload = () => {
    let url = window.location;
    if (url.search) main(url);
    else login();
}

function login() {
    let link = document.querySelector('#login a');
    link.href = loginUrl;
    let area = link.parentElement;
    area.style.display = 'block';
}

async function main(url) {
    let area = document.querySelector('#main');
    area.style.display = 'block';
    
    let thisUrl = new URL(url.href);
    let params = Object.fromEntries(thisUrl.searchParams);        
    log(params);

    url = discordUrl+'/oauth2/token';

    let data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('code', params.code);
    data.append('redirect_uri', thisUrl.origin + thisUrl.pathname);

    let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data
    });
    let responseData = await response.json();
    log(responseData);

    url = discordUrl + '/users/@me';
    response = await fetch(url, {
        headers: {'Authorization': responseData.token_type+' '+responseData.access_token}
    });
    let user = await response.json();
    log(user);
}


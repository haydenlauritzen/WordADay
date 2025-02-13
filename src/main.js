import { TwitterApi } from 'twitter-api-v2';
import { apiconfig } from './apiconfig.js';
import { WordList } from './wordList.js';
import fetch from 'node-fetch';
const wl = new WordList();
const userClient = new TwitterApi({
    appKey: apiconfig.appKey,
    appSecret: apiconfig.appSecret,
    accessToken: apiconfig.accessToken,
    accessSecret: apiconfig.accessSecret
});
// const rwClient = userClient.readWrite
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function queryWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data[0].meanings[0].definitions[0].definition);
    return data[0].meanings[0].definitions[0].definition;
}
while (true) {
    let word;
    do {
        word = wl.getWord();
    } while (!word);
    const def = await queryWord(word);
    userClient.v1.tweet('The Word Of The Day Is: ' + word + '\n' + 'The Definition is: ' + def);
    await delay(24 * 60 * 60 * 1000);
}

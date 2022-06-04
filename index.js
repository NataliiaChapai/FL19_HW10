const nickname = document.getElementById('nickname');
const btnRef = document.querySelector('#start');
const countBtn = document.querySelector('#countBtn');
const bestResultBtn = document.querySelector('#bestResult');
const bestResultOfAllBtn = document.querySelector('#bestResultOfAll');
const clearBestResultBtn = document.querySelector('#clearBestResult');
const clearAllBestResultsBtn = document.querySelector('#clearAllBestResults');
const time = 5000;
let count = 0;
let bestResult = 0;
let bestOfAllResult = 0;
let getBestResult = 0;

btnRef.addEventListener('click', onStartClick);
bestResultBtn.addEventListener('click', onBestResultBtnClick);
clearBestResultBtn.addEventListener('click', onClearBestResultBtnClick);
clearAllBestResultsBtn.addEventListener('click', onClearAllBestResultBtnClick);
bestResultOfAllBtn.addEventListener('click', onBestResultOfAllBtnClick);

function onStartClick() {
    try {
        if (nickname.value.trim()) {
            countBtn.addEventListener('click', onCountBtnClick);
            window.setTimeout(resultMessage, time);
        } else {
            throw 'error'; 
        } 
    } catch (error) {
            return alert('Empty nickname');
        }
}

function onCountBtnClick() {
    count += 1;
    console.log(count);
}

function resultMessage() {
    countBtn.removeEventListener('click', onCountBtnClick);
    alert(`You clicked ${count} times`);
    
    if (count > bestResult) {
        let user = nickname.value;
        bestResult = count;
        sessionStorage.setItem('user', bestResult);
        
        localStorage.setItem(user, bestResult);
    }
    count = 0;
    return;
}

function onBestResultBtnClick() {
    getBestResult = sessionStorage.getItem('user');
    if (!getBestResult) {
        alert('Best result is: 0');
    } else {
        alert(`Best result is: ${getBestResult}`);
    }
}

function onClearBestResultBtnClick() {
    sessionStorage.removeItem('user'); 
    alert('Best result is cleared')
}

function onClearAllBestResultBtnClick() {
    localStorage.clear(); 
    alert('Best result for the whole time is cleared')
}

function onBestResultOfAllBtnClick() {
    let bestResult = 0;
    let bestUser = null;
    for (let i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(localStorage.key(i))) > bestResult) {
            bestResult = localStorage.getItem(localStorage.key(i));
            bestUser = localStorage.key(i);
            console.log(bestResult, bestUser);
        }
    }
    alert(`Best result for the whole time is: ${bestResult} by ${bestUser}`)
}
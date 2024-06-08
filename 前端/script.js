/**
 * start with 24.6.1
 * end with 24.6.7.23:57
 */

let mineNumber = 10;
let xLength = 9;
let yLength = 9;

class Cell extends HTMLButtonElement {
    static genre
    static isShow
    static x
    static y
    static isFlag = false
    constructor(genre, isShow, x, y) {
        super()
        this.genre = genre
        this.isShow = isShow
        this.x = x
        this.y = y
        this.classList.add("cell-unShow")

        this.addEventListener('mousedown', this.handleMouseDown.bind(this))
        this.addEventListener('contextmenu', this.handleRightClick.bind(this))
    }

    initGenre() {
        this.genre = data[this.x][this.y]
    }

    handleMouseDown(event) {
        if (event.button === 0) {
            this.handleLeftClick(event)
        }
    }

    handleLeftClick(event) {
        if (!this.isFlag) {
            if (!isBegin) {
                isBegin = true
                onEvent(this.x, this.y, Genre.BEGIN)
            }
            this.isShow = true
            this.showThis()
            if (this.genre == 0) this.showAround()
            if (this.genre == -1) onEvent(this.x, this.y, Genre.SHOWMINE)
            judgIsWin()
        } else {
            this.showFloor()
            this.isFlag = false
            minusFlagCard()
        }
    }

    showFloor() {
        this.style.backgroundImage = 'url("photo/floor.png")'
    }

    showThis() {
        this.style.backgroundImage = 'url("photo/' + this.genre + '.png")'
    }

    showAround() {
        onEvent(this.x, this.y, Genre.SHOWAROUND)
    }

    handleRightClick(event) {
        event.preventDefault();
        if (!this.isShow) {
            this.showFlag()
            this.isFlag = true
        }
    }

    showFlag() {
        this.style.backgroundImage = 'url("photo/flag.png")'
        addFlagCard()
    }
}
customElements.define('custom-cell', Cell, { extends: 'button' })

const flagCard = document.getElementById('flagCard')
let flagNumber = 0

function addFlagCard(){
    flagNumber++
    flagCard.innerHTML = `<h2>🚩  ${flagNumber}</h2>`
}

function minusFlagCard(){
    flagNumber--
    flagCard.innerHTML = `<h2>🚩  ${flagNumber}</h2>`
}

function initFlag(){
    flagNumber = 0
    flagCard.innerHTML = `<h2>🚩  ${flagNumber}</h2>`
}

const boomCard = document.getElementById('boomCard')

function addBoomCard(num) {
    boomCard.innerHTML = `<h2>💣 ${num}</h2>`
}

let cells = []
cells = initArr(cells)

let buttonOn = 'freePlay'

document.addEventListener('DOMContentLoaded', function () {
    initFrame()

    var submitBtn = document.getElementById('submitBtn')

    submitBtn.addEventListener('click', function () {
        initFlag()
        if (buttonOn == 'freePlay') {
            const input1 = document.getElementById('input1')
            const input2 = document.getElementById('input2')
            const input3 = document.getElementById('input3')
            xLength = input1.value
            yLength = input2.value
            mineNumber = input3.value
            addBoomCard(input3.value)
        }
        clearTable()
        cells = initArr(cells)
        data = initArr(data)
        initFrame()
        isBegin = false
        isWin = false
        reset()
    });

    buttonStyle()

    var freePlayLink = document.getElementById('freePlay')
    var competitionLink = document.getElementById('competition')

    freePlayLink.addEventListener('click', function (event) {
        buttonOn = 'freePlay'
        buttonStyle()
        toFreePlayTable()
    });

    competitionLink.addEventListener('click', function (event) {
        buttonOn = 'competition'
        buttonStyle()
        toCompetitionTable()
    });
})

function toFreePlayTable() {
    initFlag()
    isCompetitionTable = false
    const inputBar = document.getElementById('inputBar');
    inputBar.innerHTML = '';

    inputBar.innerHTML = `<input type="text" id="input1" placeholder="请输入宽">
        <input type="text" id="input2" placeholder="请输入高">
        <input type="text" id="input3" placeholder="请输入雷的数量">`

    xLength = 9
    yLength = 9
    mineNumber = 10
    addBoomCard(10)
    clearTable()
    cells = initArr(cells)
    data = initArr(data)
    initFrame()
    isBegin = false
    isWin = false
    reset()
}

function toCompetitionTable() {
    initFlag()
    isCompetitionTable = true
    const checkboxContainer = document.getElementById('inputBar');
    checkboxContainer.innerHTML = '';

    const options = [
        { value: 'simple', label: '简单(9x9:10)' },
        { value: 'common', label: '普通(16x16:40)' },
        { value: 'difficult', label: '困难(16x30:99)' }
    ];
    options.forEach((option, index) => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'customCheckBoxInput';
        checkbox.id = `checkbox-${option.value}`;
        checkbox.value = option.value;
        checkbox.checked = index === 0;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.className = 'customCheckBoxWrapper';
        label.innerHTML = `
            <div class="customCheckBox">
                <div class="inner">${option.label}</div>
            </div>
        `

        checkboxWrapper.appendChild(checkbox)
        checkboxWrapper.appendChild(label)

        checkbox.addEventListener('change', handleCheckboxChange)

        checkboxContainer.appendChild(checkboxWrapper)
    })

    xLength = 9
    yLength = 9
    mineNumber = 10
    clearTable()
    cells = initArr(cells)
    data = initArr(data)
    initFrame()
    isBegin = false
    isWin = false
    reset()
}

let isCompetitionTable = false
let difficulty = 'simple'


function handleCheckboxChange(event) {
    if (event.target.checked) {
        var otherCheckboxes = document.querySelectorAll('.customCheckBoxInput')
        otherCheckboxes.forEach(function (otherCheckbox) {
            if (otherCheckbox !== event.target) {
                otherCheckbox.checked = false
            }
        });
    }
    switch (event.target.value) {
        case 'simple': {
            xLength = 9
            yLength = 9
            mineNumber = 10
            addBoomCard(10)
            difficulty = 'simple'
        }
            break
        case 'common': {
            xLength = 16
            yLength = 16
            mineNumber = 40
            addBoomCard(40)
            difficulty = 'common'
        }
            break

        case 'difficult': {
            xLength = 16
            yLength = 30
            mineNumber = 99
            addBoomCard(99)
            difficulty = 'difficult'
        }
            break
    }
    clearTable()
    cells = initArr(cells)
    data = initArr(data)
    initFrame()
    isBegin = false
    isWin = false
    reset()
}

function removeCheckboxes() {
    const checkboxContainer = document.getElementById('checkboxContainer');
    checkboxContainer.innerHTML = '';
}

function buttonStyle() {
    const buttons = document.querySelectorAll('.menu button')

    buttons.forEach(function (button) {
        button.classList.remove('primary')
    });

    const activeButton = document.getElementById(buttonOn)
    if (activeButton) {
        activeButton.classList.add('primary')
    }
}

function clearTable() {
    const container = document.getElementById('gridContainer');
    container.innerHTML = '';

    cells = []
    data = []
}

function initFrame() {
    const container = document.getElementById('gridContainer')
    for (let i = 0; i < xLength; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < yLength; j++) {
            const cell = new Cell(9, false, i, j)
            cells[i][j] = cell
            row.appendChild(cell)
        }
        container.appendChild(row)
    }
}

var isBegin = false
var isWin = false

const Genre = {
    BEGIN: 0,
    SHOWAROUND: 1,
    SHOWMINE: 2
};

function onEvent(x, y, genre) {
    switch (genre) {
        case Genre.BEGIN: {
            initGame(x, y)
            start()
        }
            break
        case Genre.SHOWAROUND: showAround(x, y)
            break
        case Genre.SHOWMINE: showMine()
    }
}

function judgIsWin() {
    isWin = true
    loop:
    for (let i = 0; i < xLength; i++) {
        for (let j = 0; j < yLength; j++) {
            const cell = cells[i][j]
            if (cell.genre >= 0 && cell.isShow == false) {
                isWin = false
                break loop
            }
        }
    }
    if (isWin) stoptime()
}


function showMine() {
    for (let i = 0; i < xLength; i++) {
        for (let j = 0; j < yLength; j++) {
            const cell = cells[i][j]
            if (cell.genre == -1) {
                cell.showThis()
                cell.isShow = true
            }
        }
    }
    stoptime()
}

function showAround(x, y) {
    for (let m = -1; m < 2; m++) {
        for (let n = -1; n < 2; n++) {
            if (x + m >= 0 && x + m < xLength && y + n >= 0 && y + n < yLength) {
                const cell = getCell(x + m, y + n)
                if (!cell.isShow) {
                    cell.isShow = true
                    cell.showThis()
                    if (cell.genre == 0) cell.showAround()
                }
            }
        }
    }
}

function getCell(x, y) {
    if (x >= 0 && x < xLength && y >= 0 && y < yLength) {
        return cells[x][y];
    }
}

var data = []
data = initArr(data)
function initGame(x, y) {
    let set = new Set()
    let mine = []
    mine = initArr(mine)
    for (; set.size < mineNumber;) {
        const xRandom = getRandom(0, xLength - 1)
        const yRandom = getRandom(0, yLength - 1)
        if (xRandom == x && yRandom == y) continue


        if (!set.has(xRandom + "," + yRandom)) {
            mine[xRandom][yRandom] = 1
        }

        set.add(xRandom + "," + yRandom)
    }

    for (let i = 0; i < xLength; i++) {
        for (let j = 0; j < yLength; j++) {
            if (mine[i][j] == 1) {
                for (let m = -1; m < 2; m++) {
                    for (let n = -1; n < 2; n++) {
                        if (i + m >= 0 && i + m < xLength && j + n >= 0 && j + n < yLength && mine[i + m][j + n] == 0) {
                            data[i + m][j + n]++;
                        }
                    }
                }
                data[i][j] = -1;
            }
        }
    }

    for (let i = 0; i < xLength; i++) {
        for (let j = 0; j < yLength; j++) {
            const cell = cells[i][j]
            cell.initGenre()
        }
    }
}

function initArr(Array) {
    for (let i = 0; i < xLength; i++) {
        let arr = []
        for (let i = 0; i < yLength; i++) {
            arr.push(0)
        }
        Array.push(arr)
    }
    return Array
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

function timeToString(time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    let s = Math.round(seconds)
    if (s < 10) {
        return `⏰ ${hours}:${minutes}:0${Math.round(seconds)}`;
    }
    return `⏰ ${hours}:${minutes}:${Math.round(seconds)}`;
}

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById('timer').textContent = timeToString(elapsedTime / 1000 | 0);
        }, 1000);
        running = true;
    }
}

function reset() {
    stoptime();
    startTime = 0;
    elapsedTime = 0;
    document.getElementById('timer').textContent = '⏰ 00:00:00';
}

let isWaitLogin = false

function stoptime() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
    if (!islogining && isWin && isCompetitionTable) {
        isWaitLogin = true
        showModal()
    }
    if (islogining && isWin && isCompetitionTable) {
        updateUserChallengeByID(uid, elapsedTime, difficulty)
    }
}





const openModalButton = document.getElementById('openModalButton')
const modal = document.getElementById('myModal')
const closeModalButton = document.getElementById('closeModalButton')

let isAnimating = false

openModalButton.addEventListener('click', () => {
    if (!isAnimating) {
        showModal()
    }
});

closeModalButton.addEventListener('click', () => {
    if (!isAnimating) {
        closeModal()
    }
});

modal.addEventListener('click', (event) => {
    if (event.target === modal && !isAnimating) {
        closeModal();
    }
});

function showModal() {
    isAnimating = true;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }, 10);
}

function closeModal() {
    isWaitLogin = false

    isAnimating = true;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        isAnimating = false;
    }, 300);
}








const radios = document.querySelectorAll('.tabs input[type="radio"]')

radios.forEach(radio => {
    radio.addEventListener('click', function () {
        let str = '1';
        switch (this.id) {
            case 'radio-1': str = '1'
                break
            case 'radio-2': str = '2'
                break
            case 'radio-3': str = '3'
                break
        }
        selectByTyep(str)
    })
});

let tableData = []

let isInitSet = false
let nameSet = new Set()

function initNameSet() {
    for (let i = 0; i < tableData.length; i++) {
        nameSet.add(tableData[i].name)
    }
}

let uid = -1;

function login() {
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')

    if (username.value != '') {
        if (nameSet.has(username.value)) {
            let id;
            let isLogin = false
            for (let i = 0; i < tableData.length; i++) {
                if (tableData[i].name == username.value && tableData[i].password == password.value) {
                    isLogin = true
                    id = tableData[i].id
                    logining(username.value, id)
                    addLocalStorage(username.value, id)
                    break
                }
            }
            if (!isLogin) alert('账号或密码错误')
        } else {
            if (password.value != '') {
                nameSet.add(username.value)
                insertUser(username.value, password.value)
                
            }
        }
    }
}

let islogining = false

function logining(name, id) {
    if (isWaitLogin) {
        updateUserChallengeByID(id, elapsedTime, difficulty)
    }
    uid = id
    islogining = true
    closeModal()
    const text = document.getElementById('text');
    const openModalButton = document.getElementById('openModalButton');
    const tooltip = document.getElementById('tooltip');

    text.textContent = `${name}😘`;
    openModalButton.textContent = `点我重新登录👀`
    tooltip.textContent = `你的ID:${id}`
}

function addLocalStorage(name, id) {
    localStorage.clear()
    localStorage.setItem(name, id)
}

function getIDFromName(name) {
    console.log(name)
    console.log(tableData)
    for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].name == name) {
            return tableData[i].id
        }
    }
}

function selectByTyep(type) {
    fetch('http://127.0.0.1:8080/selectByType?type=' + type)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText)
            }
            return response.json()
        })
        .then(data => {
            tableData = data

            populateTable(tableData)

            if (!isInitSet) {
                initNameSet()
                isInitSet = false
            }
        })

}

function populateTable(data) {
    const tbody = document.querySelector('#data-table tbody')
    tbody.innerHTML = ''
    data.forEach(item => {
        const row = document.createElement('tr');
        let i = 0
        Object.values(item).forEach(text => {
            if (Object.keys(item)[i] != 'password') {
                const cell = document.createElement('td');
                cell.textContent = text;
                row.appendChild(cell);
            }
            i++
        });
        tbody.appendChild(row);
    });
}

function updateUserChallengeByID(id, update, difficulty) {
    console.log('updateUserChallengeByID')
    update = update / 1000 | 0
    fetch(`http://127.0.0.1:8080/updateUserChallengeByID?id=${id}&update=${update}&difficulty=${difficulty}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText)
            }
            return response.json()
        })
        .then(data => {
            
        })
}

function insertUser(name, password) {
    const data = {
        name: name,
        password: password,
        difficultTime: '暂无数据',
        commonTime: '暂无数据',
        simpleTime: '暂无数据',
        challengeTimes: '0'
    };

    fetch('http://127.0.0.1:8080/insertUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            logining(username.value, data)
            addLocalStorage(username.value, data)
        })
}
function openDrawer() {
    selectByTyep('1')
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('show');
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function () {
    selectByTyep('1')
    if (localStorage.length > 0) {
        logining(localStorage.key(0), localStorage.getItem(localStorage.key(0)))
    }
})

function toGithub(){
    location.href = 'https://github.com/mayJackied'
}

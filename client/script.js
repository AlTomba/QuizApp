let room = true;
let isAnswering = false;

console.log(room);
let box = document.getElementById("box");

let board = document.getElementById('board');
let altBoard = document.getElementById("altBoard");
let altMap = document.getElementById('altMap');
let altNotebook = document.getElementById('altNotebook');

let mathBtn = document.getElementsByClassName("boardBtn")[0];
let geoBtn = document.getElementsByClassName("boardBtn")[1];
let engBtn = document.getElementsByClassName("boardBtn")[2];

const browserZoomLevel = Math.round(window.devicePixelRatio * 100);

if(browserZoomLevel !== 100 || document.body.clientWidth < 1015){
    room = false;
    console.log(room);
    box.style.display = "none";
    altBoard.style.display = "flex";
    altBoard.innerHTML =
    `
    <button class="boardBtn" onclick="mathBtnClick()">Математика</button>
    <button class="boardBtn" onclick="geoBtnClick()">Географија</button>
    <button class="boardBtn" onclick="engBtnClick()">Англиски</button>
    `;
}

window.addEventListener('resize', () => {
    const browserZoomLevel = Math.round(window.devicePixelRatio * 100);
    if((browserZoomLevel !== 100 || document.body.clientWidth < 1015 || document.body.clientHeight < 918) && !isAnswering){
        // room = false;
        console.log(room);
        // if(isAnswering){
        //     if(typeofQuiz === "math"){

        //     }
        //     if(typeofQuiz === "eng"){

        //     }
        //     if(typeofQuiz === "geo"){

        //     }
        // }
        if(!isAnswering){
            box.style.display = "none";
            altBoard.style.display = "flex";
        }
    }else if(!isAnswering){
        console.log(room);
        box.style.display = "block";
        box.style.transform = "rotateX(355deg) translateZ(-10rem) translateY(20rem)";
        altBoard.style.display = "none";
    }
    if(browserZoomLevel !== 100 || document.body.clientWidth < 1015 || document.body.clientHeight < 918){
        room = false;
    } else{
        room = true;
    }
})

let typeofQuiz = "";
let currentQuestionIndex = 0;
let correctAnswers = 0;

let mathQuestions = [
    {
        question: "X + 29 = 432",
        answers: ["321", "403", "415", "397"],
        correctAnswer: "403"
    },
    {
        question: "28 + 4 x 9 = ?",
        answers: ["55", "41", "64", "52"],
        correctAnswer: "64"
    },
    {
        question: "1256 + 100 + 1356",
        answers: ["2712", "2612", "1356", "1875"],
        correctAnswer: "2712"
    },
    {
        question: "Колку е 15% од 200?",
        answers: ["25", "30", "35", "40"],
        correctAnswer: "30"
    },
    {
        question: "Ако има 30 ученици во еден клас и 12 се девојчиња. Колку момчиња има во класот?",
        answers: ["12", "20", "18", "24"],
        correctAnswer: "18"
    },
    {
        question: "Колку агли има еден трапез?",
        answers: ["4", "6", "3", "5"],
        correctAnswer: "4"
    },
    {
        question: "3X + 5 = 20",
        answers: ["5", "6", "7", "8"],
        correctAnswer: "5"
    },
    {
        question: "Колку е квадратен корен од 81?",
        answers: ["7", "9", "8", "10"],
        correctAnswer: "9"
    },
    {
        question: "Кој е најголемиот заеднички делител на 24 и 36?",
        answers: ["18", "4", "8", "12"],
        correctAnswer: "12"
    },
    {
        question: "Кој е прост број?",
        answers: ["145", "369", "109", "327"],
        correctAnswer: "109"
    },

]

let geoQuestions = [
    {
        question: "Каде се наоѓа Скопје?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Скопје"
    },
    {
        question: "Каде се наоѓа Охрид?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Охрид"
    },
    {
        question: "Каде се наоѓа Струга?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Струга"
    },
    {
        question: "Каде се наоѓа Тетово?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Тетово"
    },
    {
        question: "Каде се наоѓа Велес?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Велес"
    },
    {
        question: "Каде се наоѓа Прилеп?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Прилеп"
    },
    {
        question: "Каде се наоѓа Кавадарци?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Кавадарци"
    },
    {
        question: "Каде се наоѓа Штип?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Штип"
    },
    {
        question: "Каде се наоѓа Битола?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Битола"
    },
    {
        question: "Каде се наоѓа Куманово?",
        answers: ["Скопје", "Куманово", "Тетово", "Гостивар", "Велес", "Битола", "Прилеп", "Охрид", "Струга", "Кавадарци", "Неготино", "Штип", "Струмица", "Гевгелија", "Крива Паланка", "Кочани", "Кратово", "Виница", "Берово", "Делчево", "Пробиштип", "Валандово", "Стар Дојран", "Дебар", "Свети Николе", "Крушево", "Кичево", "Демир Хисар", "Македонски Брод", "Радовиш", "Ресен"],
        correctAnswer: "Куманово"
    },

]

let englishQuestions = [
    {
        question: "What is the color of the sun?",
        answers: ["Yellow", "Green", "Pink", "Black"],
        correctAnswer: "Yellow"
    },
    {
        question: "Which animal says “quack”?",
        answers: ["Frog", "Lion", "Duck", "Cow"],
        correctAnswer: "Duck"
    },
    {
        question: "A wheel is shaped like a ...",
        answers: ["triangle", "circle", "square", "rectangle"],
        correctAnswer: "circle"
    },
    {
        question: 'What does the word "happy" mean?',
        answers: ["Sad", "Joyful", "Angry", "Tired"],
        correctAnswer: "Joyful"
    },
    {
        question: 'What is the past tense of "run"?',
        answers: ["Runned", "Running", "Ran", "Runs"],
        correctAnswer: "Ran"
    },
    {
        question: 'What is the opposite of "noisy"?',
        answers: ["Quiet", "Loud", "Busy", "Crowded"],
        correctAnswer: "Quiet"
    },
    {
        question: 'Which word means the same as "brave"?',
        answers: ["Cowardly", "Fearful", "Courageous", "Timid"],
        correctAnswer: "Courageous"
    },
    {
        question: 'Choose the correct conjunction: "I wanted to play outside, ___ it started to rain."',
        answers: ["and", "but", "so", "or"],
        correctAnswer: "but"
    },
    {
        question: "Which word is spelled correctly?",
        answers: ["Recieve", "Receive", "Recive", "Reciev"],
        correctAnswer: "Receive"
    },
    {
        question: 'Which word is a synonym for "big"?',
        answers: ["Small", "Huge", "Tiny", "Narrow"],
        correctAnswer: "Huge"
    }
]

// mathBtn.addEventListener('click', () => {
//     isAnswering = true;
//     typeofQuiz = "math";
//     box.style.transform = "rotateX(360deg) translateZ(40rem) translateY(27rem) translateX(0rem)";
//     setTimeout(() => {
//         box.style.display = "none";
//         altNotebook.style.display = "none";
//         altMap.style.display = "none";
//         altBoard.style.display = "flex";
//         showQuestion("mathQuestions", mathQuestions, currentQuestionIndex, "");
//     }, 1050);
// })

// geoBtn.addEventListener('click', () => {
//     isAnswering = true;
//     typeofQuiz = "geo";
//     if(room === true){
//         box.style.transform = "rotateX(360deg) translateZ(7rem) translateY(28rem) rotateY(90deg) translateX(-56rem)";
//         setTimeout(() => {
//             box.style.display = "none";
//             altBoard.style.display = "none";
//             altNotebook.style.display = "none";
//             altMap.style.display = "flex";
//             altMap.style.flexDirection = "column";
//             showQuestion("geoQuestions", geoQuestions, currentQuestionIndex, "");
//         }, 1050);
//     } else if(room === false){
//         box.style.display = "none";
//         altBoard.style.display = "none";
//         altNotebook.style.display = "none";
//         altMap.style.display = "flex";
//         altMap.style.flexDirection = "column";
//         showQuestion("geoQuestions", geoQuestions, currentQuestionIndex, "");
//     }
// })

// engBtn.addEventListener('click', () => {
//     isAnswering = true;
//     typeofQuiz = "eng";
//     box.style.transform = "rotateX(270deg) translateZ(-48rem) translateY(-45rem) translateX(2rem)";
//     setTimeout(() => {
//         box.style.display = "none";
//         altBoard.style.display = "none";
//         altMap.style.display = "none";
//         altNotebook.style.display = "flex";
//         showQuestion("englishQuestions", englishQuestions, currentQuestionIndex, "");
//     }, 1050);
// })

function mathBtnClick(){
    isAnswering = true;
    typeofQuiz = "math";
    if(room){
        box.style.transform = "rotateX(360deg) translateZ(40rem) translateY(27rem) translateX(0rem)";
        setTimeout(() => {
            box.style.display = "none";
            altNotebook.style.display = "none";
            altMap.style.display = "none";
            altBoard.style.display = "flex";
            showQuestion("mathQuestions", mathQuestions, currentQuestionIndex, "");
        }, 1050);
    } else {
        altNotebook.style.display = "none";
        altMap.style.display = "none";
        altBoard.style.display = "flex";
        showQuestion("mathQuestions", mathQuestions, currentQuestionIndex, "");
    }
}

function engBtnClick(){
    isAnswering = true;
    typeofQuiz = "eng";
    if(room){
        box.style.transform = "rotateX(270deg) translateZ(-48rem) translateY(-45rem) translateX(2rem)";
        setTimeout(() => {
            box.style.display = "none";
            altBoard.style.display = "none";
            altMap.style.display = "none";
            altNotebook.style.display = "flex";
            showQuestion("englishQuestions", englishQuestions, currentQuestionIndex, "");
        }, 1050);
    } else{
        altMap.style.display = "none";
        altBoard.style.display = "none";
        altNotebook.style.display = "flex";
        showQuestion("englishQuestions", englishQuestions, currentQuestionIndex, "")
    }
}

function geoBtnClick(){
    isAnswering = true;
    typeofQuiz = "geo";
    if(room){
        box.style.transform = "rotateX(360deg) translateZ(7rem) translateY(28rem) rotateY(90deg) translateX(-56rem)";
        setTimeout(() => {
            box.style.display = "none";
            altBoard.style.display = "none";
            altNotebook.style.display = "none";
            altMap.style.display = "flex";
            altMap.style.flexDirection = "column";
            showQuestion("geoQuestions", geoQuestions, currentQuestionIndex, "");
        }, 1050);
    } else{
        box.style.display = "none";
        altBoard.style.display = "none";
        altNotebook.style.display = "none";
        altMap.style.display = "flex";
        altMap.style.flexDirection = "column";
        showQuestion("geoQuestions", geoQuestions, currentQuestionIndex, "");
    }
}

function showQuestion(arrName, array, currentQuestionI, answer){
    // let array = shuffle(arrayI);
    if(answer === ""){
        correctAnswers = 0;
    }
    currentQuestionIndex += 1;
    
    if(answer !== ""){
        if(answer == array[currentQuestionI - 1].correctAnswer){
            correctAnswers += 1;
            console.log(correctAnswers);
        }
    }

    if(currentQuestionI == array.length ){
        shuffle(mathQuestions);
        shuffle(geoQuestions);
        shuffle(englishQuestions);
        currentQuestionIndex = 0;
        altBoard.innerHTML = "";
        altMap.innerHTML = "";
        altNotebook.innerHTML = "";
        if(arrName === "mathQuestions"){
            altBoard.innerHTML = 
            `
                <div>Точни одговори: ${correctAnswers} од ${array.length}</div>
                <div id="btnMathWrapper">
                    <button class='answerBtnMath' onclick='showQuestion("mathQuestions", mathQuestions, ${currentQuestionIndex}, "")'>Пробај пак</button>
                    <button class='answerBtnMath' onclick='returnBack(altBoard)'>Назад</button>
                </div>
            `;
        }
        if(arrName === "geoQuestions"){
            altMap.innerHTML = 
            `
                <h1>Точни одговори: ${correctAnswers} од ${array.length}</h1>
                <div id="btnGeoWrapper">
                    <button class='btnGeo' onclick='showQuestion("geoQuestions", geoQuestions, ${currentQuestionIndex}, "")'>Пробај пак</button>
                    <button class='btnGeo' onclick='returnBack(altMap)'>Назад</button>
                </div>
            `;
        }
        if(arrName === "englishQuestions"){
            altNotebook.innerHTML = 
            `
                <h1>Correct answers: ${correctAnswers} out of ${array.length}</h1>
                <div id="btnEngWrapper">
                    <button class='answerBtnEng' onclick='showQuestion("englishQuestions", englishQuestions, ${currentQuestionIndex}, "")'>Try again</button>
                    <button class='answerBtnEng' onclick='returnBack(altNotebook)'>Go back</button>
                </div>
            `;
        }
        return;
    }

    let question = `<h1>${array[currentQuestionI].question}</h1>`;
    let answers = '';

    if(arrName === "mathQuestions"){
        array[currentQuestionI].answers.forEach(answer => {
            answers += `<button class="answerBtnMath" onclick="showQuestion('mathQuestions', mathQuestions, ${currentQuestionIndex}, '${answer}')">${answer}</button>`
        });
        altBoard.innerHTML = question + answers;
    }
    if(arrName === "geoQuestions") {
        // altMap.style.background = "url(./assets/images/Macedonia-fix.png) center no-repeat";
        // altMap.style.backgroundSize = "100% 100%";
        array[currentQuestionI].answers.forEach(answer => {
            answers += `<button class="answerBtnGeo" onclick="showQuestion('geoQuestions', geoQuestions, ${currentQuestionIndex}, '${(answer)}')"></button>`
        });
        altMap.innerHTML = question + answers;
    }
    if(arrName === "englishQuestions"){
        array[currentQuestionI].answers.forEach(answer => {
            answers += `<button class="answerBtnEng" onclick="showQuestion('englishQuestions', englishQuestions, ${currentQuestionIndex}, '${answer}')">${answer}</button>`
        });
        altNotebook.innerHTML = question + answers;
    }

}

function returnBack(element){
    if(room){
        shuffle(mathQuestions);
        shuffle(geoQuestions);
        shuffle(englishQuestions);
        console.log(room);
        isAnswering = false;
        element.style.display = "none";
        box.style.display = "block";
        box.style.transform = "rotateX(355deg) translateZ(-10rem) translateY(20rem)";
        altBoard.innerHTML =
        `
        <button class="boardBtn" onclick="mathBtnClick()">Математика</button>
        <button class="boardBtn" onclick="geoBtnClick()">Географија</button>
        <button class="boardBtn" onclick="engBtnClick()">Англиски</button>
        `;
    } else{
        shuffle(mathQuestions);
        shuffle(geoQuestions);
        shuffle(englishQuestions);
        isAnswering = false;
        element.style.display = "none";
        altBoard.style.display = "flex";
        altBoard.innerHTML =
        `
        <button class="boardBtn" onclick="mathBtnClick()">Математика</button>
        <button class="boardBtn" onclick="geoBtnClick()">Географија</button>
        <button class="boardBtn" onclick="engBtnClick()">Англиски</button>
        `;
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}


shuffle(mathQuestions);
shuffle(geoQuestions);
shuffle(englishQuestions);



























// for(let i = 0; i < array[currentQuestionIndex].answers.length; i++){

// }

// `<h1>${array.question}</h1>
// <button click="showQuestion(array, currentQuestionIndex + 1, answer)"></button>
// <button click="showQuestion(array, currentQuestionIndex + 1, answer)"></button>
// <button click="showQuestion(array, currentQuestionIndex + 1, answer)"></button>
// <button click="showQuestion(array, currentQuestionIndex + 1, answer)"></button>    
// `;
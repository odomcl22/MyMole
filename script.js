document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const startButton = document.getElementById('startButton');
    const uploadImageInput = document.getElementById('uploadImage');
    let score = 0;
    let timeLeft = 30;
    let timerId;
    let moleTimerId;
    let customMoleImage = '';

    function randomHole() {
        holes.forEach(hole => hole.classList.remove('active'));
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.classList.add('active');

        // Set the mole image
        const img = randomHole.querySelector('img') || document.createElement('img');
        if (customMoleImage) {
            img.src = customMoleImage;
        } else {
            img.src = 'https://emoji.gg/assets/emoji/5575-mole.png'; // Default mole image
        }
        randomHole.appendChild(img);
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        timerId = setInterval(countDown, 1000);
        moleTimerId = setInterval(randomHole, 800);
    }

    function countDown() {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerId);
            clearInterval(moleTimerId);
            alert('Game over! Your score is ' + score);
        }
    }

    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole.classList.contains('active')) {
                score++;
                scoreDisplay.textContent = score;
                hole.classList.remove('active');
            }
        });

        // Add touch event listener for mobile devices
        hole.addEventListener('touchstart', () => {
            if (hole.classList.contains('active')) {
                score++;
                scoreDisplay.textContent = score;
                hole.classList.remove('active');
            }
        });
    });

    startButton.addEventListener('click', startGame);

    uploadImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                customMoleImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

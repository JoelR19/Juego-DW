const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');

let playerX = 0;
let playerY = 0;
const speed = 25;
let enemies = [];
let isAttacking = false;

// Cambia a la imagen de ataque cuando se presiona la barra espaciadora
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (playerY > 0) playerY -= speed;
            break;
        case 'ArrowDown':
            if (playerY < gameArea.clientHeight - player.clientHeight) playerY += speed;
            break;
        case 'ArrowLeft':
            if (playerX > 0) playerX -= speed;
            break;
        case 'ArrowRight':
            if (playerX < gameArea.clientWidth - player.clientWidth) playerX += speed;
            break;
        case ' ':
            if (!isAttacking) {
                isAttacking = true;
                player.src = '../img/golpe.png'; // Imagen de ataque
                hitEnemies();
            }
            break;
    }
    player.style.transform = `translate(${playerX}px, ${playerY}px)`;
});

// Volver a la imagen normal cuando se suelta la barra espaciadora
document.addEventListener('keyup', (event) => {
    if (event.key === ' ' && isAttacking) {
        isAttacking = false;
        player.src = '../img/player.png'; // Imagen normal
    }
});

// Crear enemigos aleatorios con imágenes
function spawnEnemy() {
    const enemy = document.createElement('img');
    enemy.className = 'enemy';
    enemy.src = '../img/enemy.webp'; //imagen del enemigo
    enemy.alt = 'Enemigo';
    enemy.style.position = 'absolute';
    enemy.style.top = Math.random() * (gameArea.clientHeight - 30) + 'px';
    enemy.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

// Verificar colisiones con enemigos
function hitEnemies() {
    enemies.forEach((enemy, index) => {
        if (isColliding(player, enemy)) {
            document.getElementById("kill").textContent = "¡Has golpeado a un enemigo!";
            enemy.remove();
            enemies.splice(index, 1); // Eliminar el enemigo del array
        }
    });
}

// Verificar colisiones
function isColliding(player, enemy) {
    const pRect = player.getBoundingClientRect();
    const eRect = enemy.getBoundingClientRect();
    return !(
        pRect.top > eRect.bottom ||
        pRect.bottom < eRect.top ||
        pRect.right < eRect.left ||
        pRect.left > eRect.right
    );
}

// Generar enemigos cada 2 segundos
setInterval(spawnEnemy, 2000);

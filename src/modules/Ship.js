export default class Ship {
  constructor(length, startX, startY, isHorizontal) {
    this.length = length;
    this.startX = startX; // Начальная позиция по X
    this.startY = startY; // Начальная позиция по Y
    this.isHorizontal = isHorizontal; // Направление корабля
    this.hits = new Array(length).fill(false); // Массив для попаданий
  }

  // Метод для обработки попадания
  hit(x, y) {
    let hitIndex;
    if (this.isHorizontal) {
      hitIndex = x - this.startX; // Смещение по X для горизонтального корабля
    } else {
      hitIndex = y - this.startY; // Смещение по Y для вертикального корабля
    }

    if (hitIndex >= 0 && hitIndex < this.length) {
      this.hits[hitIndex] = true; // Помечаем попадание
    }
  }

  // Проверка, затонул ли корабль
  isSunk() {
    return this.hits.every((hit) => hit); // Все сегменты должны быть поражены
  }
}

export class Game {
    public players: string[] = ['Hans', 'Peter', 'Fredi'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(`/assets/img/cards/` + i + `_of_clubs.png`);
            this.stack.push(`/assets/img/cards/` + i + `_of_diamonds.png`);
            this.stack.push(`/assets/img/cards/` + i + `_of_hearts.png`);
            this.stack.push(`/assets/img/cards/` + i + `_of_spades.png`);
        }
        this.stack.push(`assets/img/cards/14_black_joker.png`);
        this.stack.push(`assets/img/cards/14_red_joker.png`);

        shuffle(this.stack);
    }
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}


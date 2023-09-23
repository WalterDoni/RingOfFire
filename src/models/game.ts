export class Game {
    public players: string[] = [];
    public player_images: string [] = [];
    public avatars: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';
  

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(i +'_of_spades');
            this.stack.push(i +'_of_hearts');
            this.stack.push(i+ '_of_clubs');
            this.stack.push(i +'_of_diamonds');
        }


        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            player_images: this.player_images,
            avatars: this.avatars,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
    }

}


/**
 * Shuffle an array random.
 * 
 * @param {Array} array - Defines witch array should be shuffeld randomly
 * @returns {Array} - The shuffled  array.
 */
function shuffle(array: any) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
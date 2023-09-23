import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog'
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, getDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameId: string = '';
  game!: Game
  gameOver = false;
  addMorePlayer = false;
  firestore: Firestore = inject(Firestore);
  collectionInstance = collection(this.firestore, 'games');


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  /**
 *  Create a new game.
 *  Subscribes to route parameters and get game data when route parameters change.
 */
  ngOnInit() {
    this.newGame();
    this.route.params.subscribe(params => {
      this.getGameData(params);
    });

  }

  newGame() {
    this.game = new Game();
  }


  /**
 * Retrieves game data from the Firestore-database, based on the provided route parameters and updates the component data.
 * @param {any} params - includes the game-id
 * @function docData -> get data from current document
 */
  async getGameData(params: any) {
    this.gameId = params['id'];
    let docRef = doc(this.collectionInstance, this.gameId);
    let game = docData(docRef);
    game.subscribe((game: any) => {
      this.setGameData(game);
    });
  }

  /**
   * @param game -> change or create any value for the current game.
   */
  setGameData(game: any) {
    this.game.players = game.players;
    this.game.player_images = game.player_images;
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.stack = game.stack;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.currentCard = game.currentCard;

  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }

  /**
   * Takes a card in the game.
   * This function performs the following actions:
   * First if- Checks if additional players need to be added when there are less than 2 players in the game.
   * Second if - Checks if the game is over when the card stack is empty and shows the Game Over screen.
   * Third if- Checks if the card can be picked and the game can be continued.
   */
  takeCard() {
    if (this.game.players.length < 2) {
      this.addMorePlayer = true;
      return;
    } else {
      this.addMorePlayer = false;
    }
    if (this.game.stack.length == 0) {
      this.GameOverScreen()
    }
    else if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.continueWithGame();
    }
  }

  continueWithGame() {
    this.game.currentCard = this.game.stack.pop()!; //pop() take the last part from the array // "!" -> make sure that the value cant be null or undefined
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1500);
  }


  GameOverScreen() {
    this.gameOver = true;
    this.game.stack.push(...this.game.playedCards);
    this.game.playedCards = [];
    this.saveGame();
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

/**
 * Open a dialog window to change the picture from a player or to delete the selected player.
 */
  editPlayer(playerID: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerID, 1);
          this.game.player_images.splice(playerID, 1);
        } else {
          this.game.player_images[playerID] = change;
        }

        this.saveGame();
      }
    });

  }

  /**
 * Open a dialog window to create a player.
 */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('male.jpg');
        this.saveGame();
      }
    });
  }


  saveGame() {
    let currentGame = doc(this.getGamesRef(), this.gameId);
    updateDoc(currentGame, this.game.toJson());
  }
}
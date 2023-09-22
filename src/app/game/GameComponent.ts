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
  firestore: Firestore = inject(Firestore);
  collectionInstance = collection(this.firestore, 'games');


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe(params => {
      this.getGameData(params);
    });

  }

  newGame() {
    this.game = new Game();
  }

  async getGameData(params: any) {
    this.gameId = params['id'];
    let docRef = doc(this.collectionInstance, this.gameId);
    let game = docData(docRef);
    game.subscribe((game: any) => {
      this.setGameData(game);
      console.log(game);

    });
  }

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


  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    }
    else if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
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
  }


  editPlayer(playerID: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
    });
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerID, 1);
          this.game.player_images.splice(playerID, 1);
        }
        this.game.player_images[playerID] = change;
        this.saveGame();
      }
    });

  }
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
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData, DocumentReference, Firestore, QueryDocumentSnapshot, addDoc, collection, getFirestore, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { collectionData, doc } from 'rxfire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
  

export class StartScreenComponent {
  game!: Game;
  firestore: Firestore = inject(Firestore);
  gamesCollection = collection(this.firestore, 'games');
  gameDataArray: DocumentData[] = []; // Array zur Speicherung der Sammlungsdaten

  constructor(private router: Router) { }

    async newGame() {
      const game = new Game();
      await addDoc(collection(this.firestore, 'games'), game.toJson())
        .catch((err) => {
          console.error(err);
        })
        .then((docRef: any) => {
          console.log('Document written with ID', docRef.id);
          this.router.navigateByUrl('/game/' + docRef.id);
        });
    }

    
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
allProfilePictures = ['dog.png', 'male.jpg', 'female.png','female1.png','mouse.png','penguin.png']



constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}
}

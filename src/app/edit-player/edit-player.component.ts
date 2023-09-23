import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
allProfilePictures = ['male.jpg','male2.jpg','male3.jpg','male4.jpg', 'female.jpg','female2.jpg','female3.jpg','female4.jpg',]



constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}
}

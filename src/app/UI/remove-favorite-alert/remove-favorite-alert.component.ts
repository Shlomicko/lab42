import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {Beer} from '../../core/models';

@Component({
  selector: 'app-remove-favorite-alert',
  templateUrl: './remove-favorite-alert.component.html',
  styleUrls: ['./remove-favorite-alert.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveFavoriteAlertComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}, private mdDialogRef: MatDialogRef<RemoveFavoriteAlertComponent>) {
  }

  private close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  public cancel(): void {
    this.close(false);
  }

}

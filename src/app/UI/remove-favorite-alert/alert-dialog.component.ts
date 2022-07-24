import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AlertDialogCloseData, AlertDialogConfig} from "../../core/models";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-remove-favorite-alert',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule, FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDialogComponent {
  protected checked: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogConfig,
              private dialogRef: MatDialogRef<AlertDialogComponent>) {
  }

  private close(value: boolean): void {
    this.dialogRef.close({value, dontShowAgain: this.checked});
  }

  public confirm(): void {
    this.close(true);
  }

  public cancel(): void {
    this.close(false);
  }

}

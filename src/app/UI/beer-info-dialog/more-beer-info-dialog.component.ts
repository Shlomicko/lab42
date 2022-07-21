import { ChangeDetectionStrategy, Component, HostListener, Inject, Output } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {Beer} from "../../core/models";

@Component({
  selector: 'app-beer-info-dialog',
  templateUrl: './more-beer-info-dialog.component.html',
  styleUrls: ['more-beer-info-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreBeerInfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Beer, private mdDialogRef: MatDialogRef<MoreBeerInfoDialogComponent>) { }

  private close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  public cancel(): void {
    this.close(false);
  }

  @HostListener("keydown.esc")
  public onEsc(): void {
    this.close(false);
  }
}

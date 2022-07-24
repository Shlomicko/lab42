import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private dialog: MatDialog) {
  }

  public open<T, D, R>(component: ComponentType<T>, config: D): MatDialogRef<T, R> {
    return this.dialog.open(component, {data: {...config}});
  }

}

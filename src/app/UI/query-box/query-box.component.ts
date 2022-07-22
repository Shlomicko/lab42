import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-query-box',
  templateUrl: './query-box.component.html',
  styleUrls: ['./query-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryBoxComponent {

  @Output() onSubmitQuery: EventEmitter<string> = new EventEmitter<string>();

  protected queryControl: FormControl<string> = new FormControl<string>('',
    {
      nonNullable: true,
      validators: Validators.required
    });

  @HostListener("keydown.enter")
  protected submitQuery(): void {
    this.onSubmitQuery.emit(this.queryControl.value);
  }
}

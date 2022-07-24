import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {noneEmptyStringValidator} from "../../core/validators";

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
      validators: noneEmptyStringValidator()
    });

  @HostListener("keydown.enter")
  protected submitQuery(): void {
    this.onSubmitQuery.emit(this.queryControl.value);
  }
}

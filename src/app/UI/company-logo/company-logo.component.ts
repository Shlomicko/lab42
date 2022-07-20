import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

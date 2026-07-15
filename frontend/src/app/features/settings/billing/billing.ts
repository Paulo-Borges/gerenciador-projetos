import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-billing',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './billing.html',
  styleUrls: ['./billing.scss']
})
export class Billing {}

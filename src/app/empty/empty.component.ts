import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageStateService } from '../service/page-state.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent {




  constructor(
    private router: Router,
    private pageState: PageStateService,

  ){}

  ngOnInit() {
}

}





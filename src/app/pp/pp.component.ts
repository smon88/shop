import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-pp',
  imports: [LoadingComponent],
  templateUrl: './pp.component.html',
  styleUrl: './pp.component.css',
})
export class PpComponent implements OnInit {
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

import { Component } from '@angular/core';
import { LoadingComponent } from "../shared/components/loading/loading.component";

@Component({
  selector: 'app-tyt',
  imports: [LoadingComponent],
  templateUrl: './tyt.component.html',
  styleUrl: './tyt.component.css'
})
export class TytComponent {
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

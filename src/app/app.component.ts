import { Component } from '@angular/core';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastService: ToastService){}
  title = 'movieplan-frontend';

    message:any = this.toastService.getMessage();
    show:string = this.toastService.getShow();

}

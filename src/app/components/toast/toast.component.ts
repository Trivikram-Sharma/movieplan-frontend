import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }
  // @Input() public message:any;
  // @Input() public show:any;
  message:any = this.toastService.getMessage();
  show:string = this.toastService.getShow();
}

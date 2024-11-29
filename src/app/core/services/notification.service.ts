import {inject, Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toaster = inject(ToastrService)
  constructor() { }

  showSuccess(message: string, title: string, position = 'toast-top-right') {
    this.toaster.success(message, title, {
      positionClass: position,
    });
  }

  showError(message: string, title: string, timeOut = 5000) {
    this.toaster.error(message, title, {timeOut: timeOut});
  }

  showInfo(message: string, title: string, position = 'toast-bottom-center') {
    this.toaster.info(message, title,{
      positionClass: position,
      easing: ""
    });
  }

  showWarning(message: string, title: string) {
    this.toaster.warning(message, title);
  }
  clearAllMessage(){
    this.toaster.clear();
  }

}

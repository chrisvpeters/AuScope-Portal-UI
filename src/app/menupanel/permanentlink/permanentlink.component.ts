import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserStateService } from 'app/services/user/user-state.service';
import { User } from 'app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePermanentLinkModalComponent } from 'app/modalwindow/permanentlink/create-permanentlink.modal.component';

@Component({
  selector: '[appPermanentLink]',
  templateUrl: './permanentlink.component.html',
  styleUrls: ['../menupanel.scss']
})
export class PermanentLinkComponent {

  public user: User;
  public permanentlink = "";
  public showPermanentLink = false;
  public shorteningMode = false;

  constructor(private userStateService: UserStateService, private modalService: NgbModal) {
    this.userStateService.user.subscribe(user => {
      this.user = user;
    });
  }

  /**
   * Generate the permanent link
   */
  public generateAnonymousPermanentLink() {
    if (this.showPermanentLink) {
      this.shorteningMode = true;
      this.userStateService.addState(null, null, true, true).subscribe(response => {
        const link = environment.hostUrl + '?state=' + response;
        this.permanentlink = link;
        this.shorteningMode = false;
      });
    }
  }

  /**
   * Show the create permanent link dialog for a logged in user
   */
  public showPermanentLinkDialog() {
    this.modalService.open(CreatePermanentLinkModalComponent, {
      size: 'lg',
      backdrop: false
    });
  }

}

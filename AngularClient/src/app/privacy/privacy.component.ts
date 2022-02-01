import {Component, OnInit} from '@angular/core';
import {RepositoryService} from "../shared/services/repository.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public claims: { type: string, value: string }[] = [];

  constructor(private _repository: RepositoryService) {
  }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () => {
    this._repository.getData('api/companies/privacy').subscribe({
      next: ((res) => {
        this.claims = res as [];
      })
    });
  }

}

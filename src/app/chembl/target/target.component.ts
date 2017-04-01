import {Component, OnInit} from '@angular/core';
import {Pagination} from "../../share/pagination";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent extends Pagination implements OnInit {

  constructor(private apollo: Apollo) {
    super()
  }

  fetchMore() {
  }

  ngOnInit() {
  }

}

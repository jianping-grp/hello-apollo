import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';

const versionInfo = gql`
query{
  allversion{
    edges{
      node{
        id,
        name,
        creationDate,
        comments
      }
    }
  }
}
`

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  version: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: versionInfo
    }).subscribe(({data}) => {
      this.version = data
    })
    console.log(this.version)
  }

}

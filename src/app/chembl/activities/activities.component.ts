import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';

const versionInfo = gql`
query{
  allactivities(first: 10){
    edges{
      node{
        id,
        pchemblValue,
        activityComment,
        standardType
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
  data: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: versionInfo
    }).subscribe(({data}) => {
      this.data = data;
    })
  }

}

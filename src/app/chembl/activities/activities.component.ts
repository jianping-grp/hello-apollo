import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';

const moleculeDcitionaryGQL = gql`
query allmoleculedictionary($cursor: String, $num: Int) {
  allmoleculedictionary(first: $num, after: $cursor) {
    edges {
      cursor
      node {
        id
        molregno
        prefName
        oral
        moleculeType
        naturalProduct
        maxPhase
        prodrug
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
`
const pageListGQL = gql`
query allmoleculedictionary($cursor: String, $num: Int) {
  allmoleculedictionary(first: $num, after: $cursor) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
`
const moreActivities = gql`
  query activities($cursor: String){
    moreActivities(cursor: $cursor){
      edges{
        cursor
        node{
          id,
          pchemblValue,
          activitiesComment
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
  pageList: Array<{ string, number }>;
  currentPage: number;
  dataObs: ApolloQueryObservable<any>;
  currentPageNum: number;
  currentEndCursor: string;
  currentStartCursor: string;
  itemsPerPage: number;
  pageLimitation: number;


  constructor(private apollo: Apollo) {
  }

  private pagination() {

    if(this.currentPageNum === 0){
      let i = 0;
      for(i=0; i<this.pageLimitation; i++){
        this.apollo.watchQuery({
          query: pageListGQL,
          variables: {
            cursor: null,
            num: this.itemsPerPage
          }
        }).subscribe()
      }
    }
  }

  gotoPage(cursor: string, num: number) {
    this.apollo.watchQuery({
      query: moleculeDcitionaryGQL,
      variables: {cursor: cursor, num: num}
    }).subscribe(({data}) => this.data = data);
    this.currentPage
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: moleculeDcitionaryGQL,
      variables: {
        cursor: null,
        num: 10
      }
    }).subscribe(({data}) => this.data = data);
    console.log(this.data)
    this.currentPage = 0;
    this.currentEndCursor = null;
    this.currentStartCursor = null;
    this.itemsPerPage = 10;
    this.pageLimitation = 10;
  }

}

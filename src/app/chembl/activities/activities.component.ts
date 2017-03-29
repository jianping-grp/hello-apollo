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
  cachedData: any;
  pageList: Array<{ cursor: string, pageNum: number }>;
  currentPage: number;
  dataObs: ApolloQueryObservable<any>;
  currentPageNum: number;
  currentItems: Array<any>;
  currentEndCursor: string;
  currentStartCursor: string;
  itemsPerPage: number;
  pageLimitation: number;
  cachedItemList: Array<any>;


  constructor(private apollo: Apollo) {
  }

  getData(after: string=null, before: string=null, first: number=null, last: number=null){
    this.apollo.watchQuery({
      query: moleculeDcitionaryGQL,
      variables: {
        after: after,
        before: before,
        first: first,
        last: last
      }
    }).subscribe(({data}) => this.cachedData = data)
  }

  gotoPage(cursor: string, num: number) {

  }

  ngOnInit() {
    this.currentPage = 0;
    this.currentEndCursor = null;
    this.currentStartCursor = null;
    this.itemsPerPage = 10;
    this.pageLimitation = 10;
    this.pageList = [];
    this.getData(this.currentStartCursor,)

  }

}

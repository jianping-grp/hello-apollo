import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import * as _ from '@types/lodash';

const moleculeDcitionaryGQL = gql`
query allmoleculedictionary($after: String, $before: String, $first: Int, $last: Int) {
  allmoleculedictionary(after: $after, before: $before, first: $first, last: $last) {
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
  pageNumList: Array<number>;
  currentPage: number;
  dataObs: ApolloQueryObservable<any>;
  currentPageNum: number;
  currentItems: Array<any>;
  currentEndCursor: string;
  currentStartCursor: string;
  itemsPerPage: number;
  pageLimitation: number;
  cachedItemList: Array<any>;
  pageInfo: any;
  hasPrevious: boolean;
  hasNext: boolean;


  constructor(private apollo: Apollo) {
  }

  getData(after: string = null, before: string = null, first: number = null, last: number = null) {
    this.apollo.watchQuery({
      query: moleculeDcitionaryGQL,
      variables: {
        after: after,
        before: before,
        first: first,
        last: last
      }
    }).subscribe(({data}) => {
        this.cachedItemList = data['allmoleculedictionary']['edges'];
        this.pageInfo = data['allmoleculedictionary']['pageInfo']
      }
    )
  }

  gotoPage(cursor: string, num: number) {

  }

  pagination() {
    if (this.pageNumList === []) {
      let numOfPage = _.ceil(this.cachedItemList.length / this.itemsPerPage);
      this.pageNumList = _.range(numOfPage);
    }
    else{
      if(this.pageNumList.indexOf(this.currentPageNum) < 3){
        //todo calculate the number with itemPerPage and pageLimitation
        if(this.pageInfo.hasPreviousPage){

        }
      }

    }
  }

  ngOnInit() {
    this.currentPage = 0;
    this.currentEndCursor = null;
    this.currentStartCursor = null;
    this.itemsPerPage = 10;
    this.pageLimitation = 10;
    this.pageNumList = [];
    this.getData(this.currentStartCursor, null, this.pageLimitation * this.itemsPerPage, null)
    this.hasNext = this.cachedData['pageInfo'].hasNextPage;
    this.hasPrevious = false

  }

}

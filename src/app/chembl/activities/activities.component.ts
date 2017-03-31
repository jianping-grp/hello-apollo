import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';

const activitesGQL = gql`
  query allactivities($after: String, $first: Int, $before: String, $last: Int){
    allactivities(after: $after, first: $first, before: $before, last: $last){
      edges{
        cursor
        node{
          activityId
          pchemblValue
          standardFlag
          standardType
          standardValue
          standardUnits
          molregno{
            molregno
          }
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
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

  activitesObs: ApolloQueryObservable<any>;
  itemsPrePage: number = 10;
  pageLimite: number = 10;
  currentPageNum: number = 1;
  cachedList: any; // full cached item list
  currentList: Array<any>; //items to show in current page
  pageInfo: any;  //page info obj that hold: hasNextPage, hasPreviousPage, endCursor, startCursor
  loading: boolean = true;

  constructor(private apollo: Apollo) {
  }


  public pageChanged(event: any) {
    console.log('changed to page ' + event.page)
    this.currentPageNum = event.page;
    this.setCurrentList();

    //fire fetch more if there are more items (hasNextPage in pageInfo is true)
    if ((
      this.currentPageNum + 3) * this.itemsPrePage >= this.cachedList.length
      && this.pageInfo.hasNextPage
    ) {
      this.fetchMore()
    }
  }

  private  setCurrentList() {
    if (this.currentPageNum * this.itemsPrePage >= this.cachedList.length) {
      this.currentList = this.cachedList.slice((this.currentPageNum - 1) * this.itemsPrePage);
    }
    else {
      this.currentList = this.cachedList.slice(
        (this.currentPageNum - 1) * this.itemsPrePage,
        this.currentPageNum * this.itemsPrePage
      )
    }
  }

  ngOnInit() {
    this.activitesObs = this.apollo.watchQuery({
      query: activitesGQL,
      variables: {
        after: null,
        first: 100,
        before: null,
        last: null,
      }
    });

    this.activitesObs.subscribe(({data, loading}) => {
      console.log('table initialized.')
      this.cachedList = data['allactivities'].edges;
      this.pageInfo = data['allactivities'].pageInfo;
      this.loading = loading;
      this.setCurrentList();
    })

  }

  fetchMore() {
    this.activitesObs.fetchMore({
      variables: {
        after: null,
        first: 100,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev
        }
        console.log('fetch more fired!')
        this.pageInfo = fetchMoreResult['allactivities'].pageInfo;
        this.cachedList.concat(fetchMoreResult['allactivities'].edges)

      }
    })
  }

}

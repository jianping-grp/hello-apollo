import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pagination} from "../../share/pagination";


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
export class ActivitiesComponent extends Pagination implements OnInit {

  constructor(private apollo: Apollo) {
    super()
  }

  ngOnInit() {
    this.obs$ = this.apollo.watchQuery({
      query: activitesGQL,
      variables: {
        after: null,
        first: 100,
        before: null,
        last: null,
      }
    });

    this.obs$.subscribe(({data, loading}) => {
      console.log('table initialized.')
      this.cachedList = data['allactivities'].edges;
      this.pageInfo = data['allactivities'].pageInfo;
      this.loading = loading;
      this.setCurrentList();
    })

  }

  fetchMore() {
    this.obs$.fetchMore({
      variables: {
        after: this.pageInfo.endCursor,
        first: 100,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev
        }
        console.log('fetch more fired!')
        this.pageInfo = fetchMoreResult['allactivities'].pageInfo;
        this.cachedList = this.cachedList.concat(fetchMoreResult['allactivities'].edges)
        console.log('current cached list is: ' + this.cachedList.length)
        this.setCurrentList()

      }
    })
  }

}

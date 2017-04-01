import {ApolloQueryObservable} from "apollo-angular";

export abstract class Pagination {
  obs$: ApolloQueryObservable<any>;
  itemsPerPage: number = 10;
  pageLimite: number = 10;
  currentPageNum: number = 1;
  cachedList: any;
  currentList: Array<any>;
  pageInfo: any;
  loading: boolean = true;
  abstract fetchMore();

  // get items to show on page form cached list based current page number.
  protected  setCurrentList() {
    if (this.currentPageNum * this.itemsPerPage >= this.cachedList.length) {
      this.currentList = this.cachedList.slice((this.currentPageNum - 1) * this.itemsPerPage);
    }
    else {
      this.currentList = this.cachedList.slice(
        (this.currentPageNum - 1) * this.itemsPerPage,
        this.currentPageNum * this.itemsPerPage
      )
    }
  }

  // actions when page changed
  public pageChanged(event: any) {
    let cachesPageNum = Math.ceil(this.cachedList.length / this.itemsPerPage)
    console.log('has next page: ' + this.pageInfo.hasNextPage)
    if (event.page <= cachesPageNum - 4) {
      //do not need to prefetch more data
      this.setCurrentList();
    }
    else {
      this.fetchMore();
      this.obs$.subscribe(() => {
        console.log('fetch more done!');
        this.setCurrentList();
      })

    }
    console.log('changed to page ' + event.page)
    this.currentPageNum = event.page;
  }


}

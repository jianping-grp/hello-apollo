import { HelloApolloPage } from './app.po';

describe('hello-apollo App', () => {
  let page: HelloApolloPage;

  beforeEach(() => {
    page = new HelloApolloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

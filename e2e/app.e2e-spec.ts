import { FoodTrackerPage } from './app.po';

describe('food-tracker App', function() {
  let page: FoodTrackerPage;

  beforeEach(() => {
    page = new FoodTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

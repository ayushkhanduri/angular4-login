import { TodoLoginPage } from './app.po';

describe('todo-login App', () => {
  let page: TodoLoginPage;

  beforeEach(() => {
    page = new TodoLoginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

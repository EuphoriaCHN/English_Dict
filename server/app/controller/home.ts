import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;

    const data = await ctx.model.EnglishDictUsers.findAll();

    return ctx.body = data;
  }
}

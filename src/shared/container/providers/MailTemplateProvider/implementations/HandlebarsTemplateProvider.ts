import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

export default class HandlebarsTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(template, 'utf-8');

    const parseTemplate = handlebars.compile(templateFile);

    return parseTemplate(variables);
  }
}

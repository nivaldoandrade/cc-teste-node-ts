import IMailProvider from '@shared/container/providers/MailTemplateProvider/dtos/IMailTemplateDTO';

interface ISendMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: ISendMailContact;
  from?: ISendMailContact;
  subject: string;
  templateData: IMailProvider;
}

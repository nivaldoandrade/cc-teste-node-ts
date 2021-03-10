interface IMailTemplateVariable {
  [key: string]: string | number;
}

export default interface IMailTemplateDTO {
  template: string;
  variables: IMailTemplateVariable;
}

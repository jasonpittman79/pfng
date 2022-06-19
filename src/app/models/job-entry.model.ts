export class JobEntry {
  id: string = "";
  employer: string = "";
  dates: string = "";
  title: string = "";
  highlights: Array<string> = [];

  public constructor(
      fields?: {
        id?: string;
        employer?: string;
        dates?: string;
        title?: string;
        highlights?: Array<string>;
      }) {}
}

export interface IBookmark {
  name: string;
  url: string;
  timestamp: number; // basically Date.now(), updates on every edit
  id: string;
}

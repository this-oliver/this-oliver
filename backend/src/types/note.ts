interface INote {
  title: string;
  content: string;
  publish: boolean;
  views: number;
  slug: string;
  tags: string[];
}

export { INote }
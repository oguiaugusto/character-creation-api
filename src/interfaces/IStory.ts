export interface IStoryDTO {
  title: string;
  description: string | null;
  picture: string | null;
  authorId: string;
}

export interface IStory extends IStoryDTO {
  id: string;
}

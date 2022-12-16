import { IStoryRepository } from '../../repositories/Story/IStoryRepository';

class StoryUtils {
  public static checkSameTitle = async (
    repository: IStoryRepository,
    title: string,
    authorId: string,
  ) => {
    const storiesWithSameTitle = await repository.findByTitle(title);
    const authorHasStoryWithSameTitle = storiesWithSameTitle
      .some((sameTitleStory) => (sameTitleStory.authorId === authorId));

    return authorHasStoryWithSameTitle;
  };
}

export default StoryUtils;

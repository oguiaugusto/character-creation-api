enum Messages {
  SERVER_ONLINE = 'Server Online!',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_ALREADY_EXISTS = 'User already exists',
  USER_NOT_FOUND_USERNAME = 'User not found, check your username',
  INVALID_PASSWORD = 'Invalid password',
  TOKEN_NOT_PROVIDED = 'Token not provided',
  INVALID_TOKEN = 'Invalid token',
  TOKEN_EXPIRED = 'Token expired',
  STORY_WITH_SAME_TITLE = 'You already have a story with this title',
  AUTHOR_DOES_NOT_EXIST = 'Author does not exist',
  STORY_NOT_FOUND = 'Story not found',
  YOU_DONT_HAVE_PERMISSION = 'You don\'t have permission to do this',
}

export default Messages;

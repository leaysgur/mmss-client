# mmss-client

My Mp3 Streaming Server CLIENT.

## Spec
- 3 view modes
  - settings
  - search
  - player
- Show settings
  - if auth token is missing or invalid
  - if query strings has mode=settings
- Show search
  - if query strings has mode=search
- Show player
  - if else

### Settings
- edit and save auth token in localStorage

### Search
- search through JSON
  - by artist name
  - by album name

### Player
- select and play music


## Development
```
npm run dev
```

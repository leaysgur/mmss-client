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
- Edit and save auth token in localStorage

### Search
- Search through JSON
  - by artist name

### Player
- Select and play music
- Sync w/ MediaSession API


## Development
```
npm run dev
```

## Production
```
npm run build
# deploy public directory
```

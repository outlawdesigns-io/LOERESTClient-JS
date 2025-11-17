# LOE REST Client (JavaScript)

A lightweight JavaScript/Node.js client for interacting with the **Library of Everything (LOE)** REST API using OAuth2 authentication.
This package provides modular access to LOE models—anime, docs, episodes, movies, songs, and holding-bay items—along with robust token handling and a shared singleton interface.

---

## 🚀 Features

* 🔐 **OAuth2 client credentials authentication**
* 🔄 **Automatic token refresh**
* 📦 Organized model access:

  * `anime`
  * `doc`
  * `episode`
  * `movie`
  * `song`
  * `holdingbay` (special pre-ingest items)
* 🧩 **Singleton mode** for shared instances
* ⚙️ Clean, consistent `axios`-based API

---

## 📦 Installation

```bash
npm install @outlawdesigns/loe-rest-client
```

---

## 🧠 Basic Usage

### Initialize the API Client

```js
import loeClient from '@outlawdesigns/loe-rest-client';

// Create the singleton instance
loeClient.init('https://loe-service.outlawdesigns.io', 'openid profile email');

// Initialize OAuth provider
await loeClient.get().auth.init(
  'https://auth.outlawdesigns.io/oauth2/token',
  'your-client-id',
  'your-client-secret'
);

// Perform OAuth2 client credentials flow
await loeClient.get().auth.clientCredentialFlow(
  'openid profile email',
  [ 'https://loe-service.outlawdesigns.io' ]
);

// Example call: fetch 3 most recent songs
const recent = await loeClient.get().songs.getRecent(3);
console.log(recent);
```

### Token Verification Example

```js
const token = loeClient.get().auth.getAccessToken();

const tokenResp = await loeClient.get().auth.verifyAccessToken(
  token,
  ['https://loe-service.outlawdesigns.io']
);

console.log(tokenResp);
```

### Accessing the Singleton Anywhere

```js
import loeClient from '@outlawdesigns/loe-rest-client';

const song = await loeClient.get().song.get(42);
```

---

## 🔐 Authentication Flow

The LOE REST Client uses **`@outlawdesigns/authenticationclient`** to handle:

* Token acquisition
* Token refresh
* Attaching `Authorization: Bearer <token>` headers
* Token verification

### Typical Flow

```js
// 1. init() creates the API + axios wrapper
loeClient.init(apiUrl, oauthScope);

// 2. Provide OAuth endpoint + credentials
await loeClient.get().auth.init(authUrl, clientId, clientSecret);

// 3. Client credentials flow to obtain tokens
await loeClient.get().auth.clientCredentialFlow(oauthScope, [apiUrl]);

// 4. Make API calls
const movies = await loeClient.get().movie.getAll();
```

---

## 🧩 Available Model Modules

### 🎵 `api.song`

Supports LOE’s rich music feature set.

| Method                            | Description                      |
| --------------------------------- | -------------------------------- |
| `getAll()`                        | Get all songs                    |
| `get(id)`                         | Fetch a song                     |
| `create(songObj)`                 | Create a song                    |
| `search(field, query)`            | Search songs                     |
| `browse(field)`                   | Browse unique values for a field |
| `getRecent(limit)`                | Fetch `n` most recent songs      |
| `getMyPlaylists()`                | Retrieve user playlists          |
| `getPlaylist(id)`                 | Get a specific playlist          |
| `savePlaylist(obj)`               | Save playlist                    |
| `rate(id, rating)`                | Rate a song                      |
| `getRating(id)`                   | Fetch a rating                   |
| `count()`                         | Count total songs                |
| `group(field)`                    | Group by field                   |
| `getRandomPlaylist(genre, limit)` | Randomized playlist              |

---

### 🎬 `api.movie`

Standard CRUD + metadata operations.

### 📺 `api.episode`

Episode-level metadata for TV/anime content.

### 🎭 `api.anime`

Anime metadata (similar to episode model).

### 📄 `api.doc`

Document/Ebook metadata.

### 📥 `api.holdingbay`

Read-only staging area for media not yet classified:

| Method        | Description                         |
| ------------- | ----------------------------------- |
| `getMovies()` | Items possibly classified as movies |
| `getSongs()`  | Music-type items                    |
| `getTv()`     | TV/episode candidates               |
| `getComics()` | Comic content                       |

---

## 🧱 Project Structure

```
src/
├── core.js
├── singleton.js
├── models/
│   ├── anime.js
│   ├── doc.js
│   ├── episode.js
│   ├── movie.js
│   ├── song.js
│   └── holdingbay.js
└── formData.js
```

---

## ⚙️ Creating a Direct Client (Non-Singleton)

```js
import { createApiClient } from '@outlawdesigns/loe-rest-client/core.js';

const api = createApiClient(apiUrl, oauthScope);
await api.auth.init(authUrl, clientId, clientSecret);
await api.auth.clientCredentialFlow(oauthScope, [apiUrl]);
```

---

## 👤 Author

Maintained by **Outlaw Designs**
[https://github.com/outlawdesigns-io](https://github.com/outlawdesigns-io)

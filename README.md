# xenforo-dl

This repository is a modified, Windows-compatible version of `xenforo-dl`.

Original project and core implementation by **Patrick Kan**:
- https://github.com/patrickkfkan/xenforo-dl

Windows compatibility and packaging updates in this fork by **Lala Sabathil**.

A [XenForo](https://xenforo.com/) forum downloader written in [Node.js](https://nodejs.org):

- Scrapes content from forum pages
- For each thread, downloads attachments and saves messages in text files
- Supports downloading a single thread or all threads in a forum
- Supports continuing from previous download

Since the downloader works through scraping, it is not guaranteed to work with all XenForo forums. I created the downloader for my data-hoarding needs targeting a handful of sites, so it might be limited in what it can scrape. But feel free to raise issues.


## Installation

First, install [Node.js](https://nodejs.org/).

Then, in a terminal, run the following command:

```
npm i -g xenforo-dl
```

## Development

Build TypeScript sources:

```
npm run build
```

The build script is cross-platform (works on Windows, macOS and Linux).

## Bundled Windows executable

You can build a standalone Windows executable from source:

```
npm install
npm run bundle:win
```

Output:

- `release/xenforo-dl.exe` (x64)

For ARM64 Windows:

```
npm run bundle:win-arm64
```

## Usage

```
$ xenforo-dl [OPTION]... URL
```

### URL

#### Thread URLs

Pattern: `<forum_site_url>/threads/<title_slug>.<thread_id>[/page-<num>]`

Download all messages and attachments shown on page. If content spans multiple pages, download from subsequent pages as well.

If `page-<num>` is present in URL, then download will begin with the specified page.

#### Forum URLs

Pattern: `<forum_site_url>/forums/<title_slug>.<forum_id>[/page-<num>]`

Download all threads listed on page. If the forum has threads spanning multiple pages, download from subsequent pages as well.

If `page-<num>` is present in URL, then download will begin with the specified page.

#### Other URLs

For URLs not matching the above patterns, `xenforo-dl` will scrape for forum links and download from them. It is your responsibility to ensure the given URL is a valid XenForo link.

### Options

| Option    | Description |
|-----------|-------------|
| `-h`, `--help` | Display usage guide |
| `-k`, `--cookie` | (string) Cookie to set in requests. See [Cookies](#cookies). |
| `-o`, `--out-dir` | (string) Path of save directory. Default: current working directory. |
| `-d`, `--dir-structure` | Combination of flags controlling the output directory structure of downloaded threads: <ul><li>`s`: Include directory for the forum site.</li><li>`pl`: Include directory for each category or forum leading up to the target thread.</li><li>`pi`: Include directory for the immediate section or forum containing the target thread.</li><li>`t`: Include directory for the target thread itself.</li><li>`a`: Include directory for attachments.</li><li>`-`: No directory structure. Everything will be saved directly to --out-dir.</li></ul><p>Default: `splta`</p>|
| `-w`, `--overwrite` | Overwrite existing attachment files |
| `-l`, `--log-level` | Log level: `info`, `debug`, `warn` or `error`; set to `none`` to disable logging. Default: `info` |
| `-s`, `--log-file` | (string) Save logs to specified path |
| `-r`, `--max-retries` | (number) Maximum retry attempts when a download fails. Default: 3 |
| `-c`, `--max-concurrent`| (number) Maximum number of concurrent downloads for attachments. Default: 10 |
| `-p`, `--min-time-page` | (number) Minimum time, in milliseconds, to wait between page fetch requests. Default: 500 |
| `-i`, `--min-time-image` | (number) Minimum time, in milliseconds, to wait between download requests for attachments. Default: 200 |
| `--continue` | Continue from previous download |
| `-y`, `--no-prompt` | Do not prompt for confirmation to proceed |

### Cookies

Cookies allow you to download content that would otherwise be inaccessible due to lack of user credentials. To obtain a cookie for passing to `xenforo-dl` through the `--cookie` option, do the following:

1. In a browser, sign in to the target forum site.
2. Press `F12` to bring up Developer Tools.
3. Select `Network` tab, followed by `HTML` filter.
4. Press `F5` to refresh the page. Select one of the entries that appear under the `Network` tab.
5. Under `Headers` -> `Request Headers`, you should see the `Cookie` entry. Copy the value of that entry and pass it to `xenforo-dl`.

Cookies should remain valid until they expire or you sign out of the forum site.

## Changelog

v1.0.0
- Initial release

## License

MIT

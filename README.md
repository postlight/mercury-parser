# Mercury Parser - Extracting content from chaos

[![CircleCI](https://circleci.com/gh/postlight/readability-parser.svg?style=svg)](https://circleci.com/gh/postlight/readability-parser)

The Mercury Parser extracts the bits that humans care about from any URL you give it. That includes article content, titles, authors, published dates, excerpts, lead images, and more.

The Mercury Parser module powers the [Mercury Parser API](https://mercury.postlight.com/web-parser/), a free API from [Postlight](https://www.postlight.com/) that puts all of this information one API request away..

## How? Like this.

```javascript
import Mercury from 'mercury-parser';

Mercury.parse(url).then(result => console.log(result););
```

The result looks like this:

```json
{
  "title": "Thunder (mascot)",
  "content": "<div><div><p>This is the content of the page!</div></div>",
  "author": "Wikipedia Contributors",
  "date_published": "2016-09-16T20:56:00.000Z",
  "lead_image_url": null,
  "dek": null,
  "next_page_url": null,
  "url": "https://en.wikipedia.org/wiki/Thunder_(mascot)",
  "domain": "en.wikipedia.org",
  "excerpt": "Thunder Thunder is the stage name for the horse who is the official live animal mascot for the Denver Broncos",
  "word_count": 4677,
  "direction": "ltr",
  "total_pages": 1,
  "rendered_pages": 1
}
```

If Mercury is unable to find a field, that field will return `null`.

## Contributing

If you'd like to write a custom parser for a site, [here's how](src/extractors/custom/README.md).

## Contributors

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/64131?v=3" width="100px;"/><br /><sub>Adam Pash</sub>](http://adampash.com)<br />📝 [💻](https://github.com/postlight/readability-parser/commits?author=adampash) [📖](https://github.com/postlight/readability-parser/commits?author=adampash) 💡 | [<img src="https://avatars.githubusercontent.com/u/19412836?v=3" width="100px;"/><br /><sub>Toy Vano</sub>](https://github.com/spiffytoy)<br />[💻](https://github.com/postlight/readability-parser/commits?author=spiffytoy) | [<img src="https://avatars.githubusercontent.com/u/183608?v=3" width="100px;"/><br /><sub>Drew Bell</sub>](droob.org)<br />[💻](https://github.com/postlight/readability-parser/commits?author=droob) | [<img src="https://avatars.githubusercontent.com/u/305901?v=3" width="100px;"/><br /><sub>Jeremy Mack</sub>](https://twitter.com/mutewinter)<br />[💻](https://github.com/postlight/readability-parser/commits?author=mutewinter) |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwBustleComExtractor', () => {
  it('is selected properly', () => {
    // This test should be passing by default.
    // It sanity checks that the correct parser
    // is being selected for URLs from this domain
    const url =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.bustle.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.bustle.com/1481129185239.html');
    const articleUrl =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, '13 Ways To Compliment Women In The Most Empowering, Transformative Way Possible');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.bustle.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.bustle.com/1481129185239.html');
    const articleUrl =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Teresa Newsome');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.bustle.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.bustle.com/1481129185239.html');
    const articleUrl =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-12-02T18:28:24.692Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.bustle.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.bustle.com/1481129185239.html');
    const articleUrl =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://typeset-beta.imgix.net/rehost/2016/12/2/2fa248d4-0035-403f-a18d-3aeca6929b98.jpg?w=1200&h=630&fit=crop&crop=faces&auto=format&q=70');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.bustle.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.bustle.com/1481129185239.html');
    const url =
      'https://www.bustle.com/articles/194709-13-ways-to-compliment-women-in-the-most-empowering-transformative-way-possible';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'When I log into my Facebook these days, I\'m pretty much prepared for');
  });
});

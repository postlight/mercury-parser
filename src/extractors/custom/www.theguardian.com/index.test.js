import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwTheguardianComExtractor', () => {
  it('is selected properly', () => {
    // This test should be passing by default.
    // It sanity checks that the correct parser
    // is being selected for URLs from this domain
    const url =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const articleUrl =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Standing Rock protesters hold out against extraordinary police violence');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const articleUrl =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Julia Carrie Wong and  Sam Levin');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const articleUrl =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-11-29T20:26:06.000Z');
  });

  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const articleUrl =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'Apprehension and distrust pervade North Dakota protest site as promises from state that there are no plans to forcibly remove people does little to assuage fears');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const articleUrl =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://i.guim.co.uk/img/media/fc64982c5ab7b3ea7d5d38f3f74483c84c60b372/0_225_3500_2100/master/3500.jpg?w=1200&h=630&q=55&auto=format&usm=12&fit=crop&bm=normal&ba=bottom%2Cleft&blend64=aHR0cHM6Ly91cGxvYWRzLmd1aW0uY28udWsvMjAxNi8wNS8yNS9vdmVybGF5LWxvZ28tMTIwMC05MF9vcHQucG5n&s=034d7b3573a47c5ba3501a9e9e253a8f');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.theguardian.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.theguardian.com/1480457558008.html');
    const url =
      'https://www.theguardian.com/us-news/2016/nov/29/standing-rock-protest-north-dakota-shutdown-evacuation';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Police violence against Standing Rock protesters in North Dakota has risen to extraordinary');
  });
});

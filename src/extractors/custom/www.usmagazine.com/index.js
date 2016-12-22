export const WwwUsmagazineComExtractor = {
  domain: 'www.usmagazine.com',

  title: {
    selectors: [
      '??',
    ],
  },

  author: {
    selectors: [
      'a.article-byline.tracked-offpage',
    ],
  },

  date_published: {
    selectors: [
      '.article-published-date',
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      // enter selectors
    ],
  },

  content: {
    selectors: [
      // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};

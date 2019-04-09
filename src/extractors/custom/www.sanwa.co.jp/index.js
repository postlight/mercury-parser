export const WwwSanwaCoJpExtractor = {
  domain: 'www.sanwa.co.jp',

  title: {
    selectors: ['#newsContent h1'],
  },

  author: null,

  date_published: null,

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#newsContent'],

    defaultCleaner: false,

    transforms: {},

    clean: ['#smartphone', 'div.sns_box', 'div.contentFoot'],
  },
};

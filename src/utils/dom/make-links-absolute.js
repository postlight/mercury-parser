import URL from 'url';

import { getAttrs, setAttr } from 'utils/dom';

function absolutize($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const url = attrs[attr];

    if (url) {
      const absoluteUrl = URL.resolve(rootUrl, url);
      setAttr(node, attr, absoluteUrl);
    }
  });
}

function absolutizeSet($, rootUrl, attr, $content) {
  $(`[${attr}]`, $content).each((_, node) => {
    const attrs = getAttrs(node);
    const urlSet = attrs[attr];

    if (urlSet) {
      // a comma should be considered part of the candidate URL unless preceded by a descriptor
      // descriptors can only contain positive numbers followed immediately by either 'w' or 'x'
      // space characters inside the URL should be encoded (%20 or +)
      const candidates = urlSet.match(/(?:\s*)(\S+(?:\s*[\d.]+[wx])?)(?:\s*,\s*)?/g);
      const absoluteCandidates = candidates.map((candidate) => {
        // a candidate URL cannot start or end with a comma
        // descriptors are separated from the URLs by unescaped whitespace
        const parts = candidate.trim().replace(/,$/, '').split(/\s+/);
        parts[0] = URL.resolve(rootUrl, parts[0]);
        return parts.join(' ');
      });
      const absoluteUrlSet = [...new Set(absoluteCandidates)].join(', ');
      setAttr(node, attr, absoluteUrlSet);
    }
  });
}

export default function makeLinksAbsolute($content, $, url) {
  ['href', 'src'].forEach(attr => absolutize($, url, attr, $content));
  ['srcset'].forEach(attr => absolutizeSet($, url, attr, $content));

  return $content;
}

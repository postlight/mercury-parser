import { scoreParagraph } from './index';
import {
  PARAGRAPH_SCORE_TAGS,
  CHILD_CONTENT_TAGS,
  BAD_TAGS,
} from './constants';

// Score an individual node. Has some smarts for paragraphs, otherwise
// just scores based on tag.
export default function scoreNode($node) {
  const { tagName } = $node.get(0);

  // TODO: Consider ordering by most likely.
  // E.g., if divs are a more common tag on a page,
  // Could save doing that regex test on every node – AP
  if (PARAGRAPH_SCORE_TAGS.test(tagName)) {
    return scoreParagraph($node);
  } else if (tagName.toLowerCase() === 'div') {
    return 5;
  } else if (CHILD_CONTENT_TAGS.test(tagName)) {
    return 3;
  } else if (BAD_TAGS.test(tagName)) {
    return -3;
  } else if (tagName.toLowerCase() === 'th') {
    return -5;
  }

  return 0;
}

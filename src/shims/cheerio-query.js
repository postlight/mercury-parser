// This module attempts to square cheerio with jquery
// so that node-specific quirks/features of cheerio
// will also work in the browser. This mostly involves
// shimming a few functions and rewriting the jquery
// constructor so it sandboxes most of its operations
// and doesn't mutate existing dom elements in the page.

import jQuery from 'jquery';

const PARSER_CLASS = 'mercury-parsing-container';

jQuery.noConflict();
const $ = (selector, context, rootjQuery, contextOverride = true) => {
  if (contextOverride) {
    if (context && typeof context === 'string') {
      context = `.${PARSER_CLASS} ${context}`;
    } else if (!context) {
      context = `.${PARSER_CLASS}`;
    }
  }

  return new jQuery.fn.init(selector, context, rootjQuery); // eslint-disable-line new-cap
};

$.fn = $.prototype = jQuery.fn;
jQuery.extend($, jQuery); // copy's trim, extend etc to $

const removeUnusedTags = ($node) => {
  // remove scripts and stylesheets
  $node.find('script, style, link[rel="stylesheet"], meta[name="viewport"]').remove();

  return $node;
};

$.cloneHtml = () => {
  const html = removeUnusedTags($('html', null, null, false).clone());

  return html.children().wrap('<div />').wrap('<div />');
};

$.root = () => $('*').first();

$.browser = true;

const isContainer = ($node) => {
  const el = $node.get(0);
  if (el && el.tagName) {
    return el.tagName.toLowerCase() === 'container';
  }

  return false;
};

$.html = ($node) => {
  if ($node) {
    // we never want to return a parsing container, only its children
    if (isContainer($node) || isContainer($node.children('container'))) {
      return $node.children('container').html() || $node.html();
    }

    return $('<div>').append($node.eq(0).clone()).html();
  }

  const $body = removeUnusedTags($('body', null, null, false).clone());
  const $head = removeUnusedTags($('head', null, null, false).clone());
  const $parsingNode = $body.find(`.${PARSER_CLASS}`);

  if ($parsingNode.length > 0) {
    return $parsingNode.children().html();
  }

  const html = $('<container />')
    .append($(`<container>${$head.html()}</container>`))
    .append($(`<container>${$body.html()}</container>`))
    .wrap('<container />')
    .parent()
    .html();

  return html;
};

$.cleanup = () => {
  $(`.${PARSER_CLASS}`, null, null, false).remove();
};

$.load = (html, opts = {}, returnHtml = false) => {
  if (!html) {
    html = $.cloneHtml();
  } else {
    html = $('<container />').html(html);
  }

  const $body = $('body', null, null, false);
  // $('script', null, null, false).remove()
  let $parsingNode = $body.find(`.${PARSER_CLASS}`);

  if (!$parsingNode[0]) {
    $body.append(`<div class="${PARSER_CLASS}" style="display: none;" />`);
    $parsingNode = $body.find(`.${PARSER_CLASS}`);
  }

  // Strip scripts
  html = removeUnusedTags(html);

  // Remove comments
  html.find('*').contents().each(function () {
    if (this.nodeType === Node.COMMENT_NODE) { // eslint-disable-line no-undef
      $(this).remove();
    }
  });
  $parsingNode.html(html);

  if (returnHtml) return { $, html: html.html() };

  return $;
};

export default $;

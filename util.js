'use strict';

const { BASE_URL } = require('./constants');

// Standard Crawlora envelope is { code, msg, data: {...} }; return the inner data.
const unwrap = (r) =>
  r && r.data && r.data.data !== undefined ? r.data.data : (r && r.data) || {};

const apiGet = async (z, path, params) =>
  unwrap(await z.request({ url: `${BASE_URL}${path}`, method: 'GET', params: params || {} }));

const apiPost = async (z, path, body) =>
  unwrap(
    await z.request({
      url: `${BASE_URL}${path}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {}),
    })
  );

// Drop empty/undefined values so optional params aren't sent blank.
const clean = (obj) => {
  const out = {};
  for (const k of Object.keys(obj || {})) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== '') out[k] = v;
  }
  return out;
};

const enc = encodeURIComponent;

module.exports = { apiGet, apiPost, clean, enc };

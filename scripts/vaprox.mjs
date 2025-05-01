/**
 * this is the p.r.0.x.y functionality for vapor
 * pls don't skid this took me quite a bit to make
 */
import { registerSW } from "../vaprox/register-sw.mjs";
import * as BareMux from "../vaprox/baremux/index.mjs";

console.log("imported");

const connection = new BareMux.BareMuxConnection("/vaprox/baremux/worker.js");

export function search(input, template) {
  try {
    return new URL(input).toString();
  } catch (err) {}

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {}

  return template.replace("%s", encodeURIComponent(input));
}

export async function getUV(input) {
  try {
    await registerSW();
  } catch (err) {
    throw err;
  }

  let url = search(input, "https://search.brave.com/search?q=%s");

  let servUrl = localStorage.getItem("proxServer") || "wss://byod.hollow.live.cdn.cloudflare.net/wisp/";

  if ((await connection.getTransport()) !== "/vaprox/epoxy/index.mjs") {
    await connection.setTransport("/vaprox/epoxy/index.mjs", [
      { wisp: servUrl },
    ]);
  }
  if ((await connection.getTransport()) !== "/vaprox/libcurl/libcurl.mjs") {
    await connection.setTransport("/vaprox/libcurl/libcurl.mjs", [
      { wisp: servUrl },
    ]);
  }

  let encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);

  console.log("VAProx: Obtained UV encoded URL. Returning...");

  return encodedUrl;
}

// we love vaprox -everyone

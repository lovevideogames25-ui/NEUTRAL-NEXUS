// This is the pr0xy functionality for VAPOR.
//
// IF YOU SKID THIS PLEASE CREDIT ME!!!!!!!!!!!!
// -technonyte0
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
import { registerSW } from "../vaprox/register-sw.mjs";
import * as BareMux from "../vaprox/baremux/index.mjs";

console.log("VAProx: Imported modules");

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

  let url = search(input, "https://duckduckgo.com/?q=%s");

  let servUrl = localStorage.getItem("proxServer") || "wss://aluu.xyz/wisp/";

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

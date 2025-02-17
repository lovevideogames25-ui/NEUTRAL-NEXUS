// UV Configuration

self.__uv$config = {
  prefix: "/go/vapor/",
  bare: "https://homework.swat.lat/", // dont steal it bro ik you want to
  encodeUrl: (url) => {
    if (url.includes(".onion")) {
      url = url.replace(".onion", ".onion.dog");
    }
    return Ultraviolet.codec.xor.encode(url);
  },
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};

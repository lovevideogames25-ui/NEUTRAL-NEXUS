self.__uv$config = {
  prefix: "/~/vap/",
  bare: "https://prod.benrogo.net/",
  encodeUrl: (url) => {
    if (url.includes(".onion")) {
      url = url.replace(".onion", ".onion.dog");
    }
    return Ultraviolet.codec.xor.encode(url);
  },
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/vap/handle.js",
  bundle: "/vap/main.js",
  config: "/vap/cfg.js",
  sw: "/vap/sw.js",
};

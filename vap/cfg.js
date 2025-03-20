self.__uv$config = {
  prefix: "/~/vap/",
  bare: "https://bore.veronicabazan.cl/bare/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/vap/handle.js",
  bundle: "/vap/main.js",
  config: "/vap/cfg.js",
  sw: "/vap/sw.js",
};

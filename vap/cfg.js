self.__uv$config = {
  prefix: "/~/vap/",
  bare: "https://prod.benrogo.net/", // BEN AURAAAA
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/vap/handle.js",
  bundle: "/vap/main.js",
  config: "/vap/cfg.js",
  sw: "/vap/sw.js",
};

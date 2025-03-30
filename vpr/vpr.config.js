// this is vapor's ultr@v10l3t configuration.

// L no bare for u

self.__uv$config = {
  prefix: "/vpr/service/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/vpr/uv.handler.js",
  client: "/vpr/vpr.client.js",
  bundle: "/vpr/vpr.bundle.js",
  config: "/vpr/vpr.config.js",
  sw: "/vpr/vpr.sw.js",
};

// we love vaprox -everyone

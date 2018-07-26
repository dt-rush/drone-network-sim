const protobuf = require('protobufjs');
const path = require('path');

// as per https://github.com/dcodeIO/protobuf.js/issues/1089, path resolution
// is a bit funky in protobuf.js - it will look, unless you specify a root,
// for the .proto file in the default context which is the *directory of the
// script requiring this one*, so we explicitly resolve the path by joining
// with the directory that *this* script is in
const here = path.dirname(__filename);
const protoFile = path.join(here, './drone.proto');
module.exports = protobuf.loadSync(protoFile).lookupType('default.Drone');

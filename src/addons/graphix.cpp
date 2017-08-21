#include <node_api.h>
#include <assert.h>
#include "hello.hpp"
#include "dijkstra.hpp"

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

void Init(napi_env env, napi_value exports, napi_value module, void* priv) {
  napi_status status;
  napi_property_descriptor descHello = DECLARE_NAPI_METHOD("hello", Hello);
  status = napi_define_properties(env, exports, 1, &descHello);
  assert(status == napi_ok);

  napi_property_descriptor descDijkstra = DECLARE_NAPI_METHOD("dijkstra", Dijkstra);
  status = napi_define_properties(env, exports, 1, &descDijkstra);
  assert(status == napi_ok);
}

NAPI_MODULE(graphix, Init)
#include <node_api.h>
#include <map>

napi_value Dijkstra(napi_env env, napi_callback_info info);

std::vector<std::pair<int, int > > DijkstraImpl(std::map<int, std::map<int, int> > adj, int from, int to);

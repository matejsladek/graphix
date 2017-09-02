#include <node_api.h>
#include <unordered_map>
#include <vector>
#include <utility>

napi_value Dijkstra(napi_env env, napi_callback_info info);

void DijkstraImpl(std::unordered_map<int, std::vector<std::pair<int, int>>>& adj, int from, int to, std::vector<int>& distances);

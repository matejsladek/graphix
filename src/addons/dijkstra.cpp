#include <cassert>
#include <iostream>
#include <queue>
#include <unordered_set>
#include "dijkstra.hpp"

napi_value Dijkstra(napi_env env, napi_callback_info info) {
    napi_status status;
    napi_value result;
    size_t argc = 4;
    napi_value args[4];
    status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    int from, to;
    std::unordered_map<int, std::vector<std::pair<int, int>>> adj;

    status = napi_get_value_int32(env, args[1], &from);
    status = napi_get_value_int32(env, args[2], &to);

    size_t arrayLen;
    void *data_input;
    status = napi_get_arraybuffer_info(env, args[0], &data_input, &arrayLen);
    int numberOfElements = (int) arrayLen / (int) sizeof(int32_t);
    auto edges = static_cast<int*> (data_input);
    for (int i = 0; i < numberOfElements; i += 3) {
        int edgeFrom = edges[i];
        int edgeTo = edges[i+1];
        int weight = edges[i+2];
        adj[edgeFrom].push_back({edgeTo, weight});
    }

    std::vector<int> distances;
    DijkstraImpl(adj, from, to, distances);

    int sz = distances.size();
    void *output;
    napi_value argv[1];
    status = napi_create_arraybuffer(env, sz * sizeof(int32_t), &output, argv);

    auto realOutput = static_cast<int*> (output);

    for (int i = 0; i < (int)distances.size(); ++i) {
        realOutput[i] = distances[i];
    }

    napi_value global;
    status = napi_get_global(env, &global);

    napi_value cb = args[3];
    status = napi_call_function(env, global, cb, 1, argv, &result);
    assert(status == napi_ok);
    return result;
}

void DijkstraImpl(std::unordered_map<int, std::vector<std::pair<int, int>>>& adj, int from, int to, std::vector<int>& distances) {
    std::priority_queue<std::pair<int,int>, std::vector<std::pair<int,int>>, std::greater<std::pair<int,int>>> pq;
    std::unordered_set<int> marked;
    pq.push({0, from});
    while(!pq.empty()){
        auto tp = pq.top();
        pq.pop();
        int currentPoint = tp.second;
        int currentDist = tp.first;
        if(currentPoint == to) {
            distances.clear();
            distances.push_back(to);
            distances.push_back(currentDist);
            return;
        }
        if(marked.count(currentPoint) > 0) continue;
        marked.insert(currentPoint);
        distances.push_back(currentPoint);
        distances.push_back(currentDist);
        for (auto c: adj[currentPoint]){
            int nextPoint = c.first;
            int nextDist = c.second;
            if(marked.count(nextPoint) == 0) pq.push({currentDist + nextDist, nextPoint});
        }
    }
    if(to == -2) return;
    distances.clear();
    distances.push_back(to);
    distances.push_back(-1);
}

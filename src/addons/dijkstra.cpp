#include <cassert>
#include <iostream>
#include <queue>
#include <set>
#include "dijkstra.hpp"

napi_value Dijkstra(napi_env env, napi_callback_info info) {
    napi_status status;
    napi_value result;
    size_t argc = 4;
    napi_value args[4];
    status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    int from, to;
    std::map<int, std::map<int, int> > adj;

    status = napi_get_value_int32(env, args[1], &from);
    status = napi_get_value_int32(env, args[2], &to);
    size_t arrayLen;
    void **data = nullptr;
    status = napi_get_arraybuffer_info(env, args[0], data, &arrayLen);
    void *realData;
    realData = malloc(arrayLen * sizeof(int32_t));
    status = napi_get_arraybuffer_info(env, args[0], &realData, &arrayLen);
    int numberOfElements = (int) arrayLen / (int) sizeof(int32_t);
    auto edges = static_cast<int*> (realData);
    for (int i = 0; i < numberOfElements; ++i) {
        int edgeFrom = edges[i];
        int edgeTo = edges[i+1];
        int weight = edges[i+2];
        if((adj[edgeFrom][edgeTo] && adj[edgeFrom][edgeTo] > weight) || !adj[edgeFrom][edgeTo]) {
            adj[edgeFrom][edgeTo] = weight;
        }
        i += 2;
    }

    int res = DijkstraImpl(adj, from, to);

    napi_value argv[1];
    status = napi_create_int32(env, res, argv);

    napi_value global;
    status = napi_get_global(env, &global);

    napi_value cb = args[3];
    status = napi_call_function(env, global, cb, 1, argv, &result);
    assert(status == napi_ok);
    return result;
}

int DijkstraImpl(std::map<int, std::map<int, int> > adj, int from, int to) {
    std::priority_queue<std::pair<int,int>, std::vector<std::pair<int,int>>, std::greater<std::pair<int,int>> > pq;
    std::set<int> marked;
    pq.push({from, 0});
    while(!pq.empty()){
        auto tp = pq.top();
        pq.pop();
        int currentPoint = tp.first;
        int currentDist = tp.second;
        if(currentPoint == to) return currentDist;
        if(marked.count(currentPoint) > 0) continue;
        marked.insert(currentPoint);
        for (auto c: adj[currentPoint]){
            int nextPoint = c.first;
            int nextDist = c.second;
            pq.push({nextPoint, currentDist + nextDist});
        }
    }
    return -1;
}

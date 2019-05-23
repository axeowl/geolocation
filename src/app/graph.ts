import {PriorityQueue} from './priority-queue';

export class Graph {
    noOfVertices: any = [];
    AdjList: any;
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }
    addEdge(x, y , w) {
        // get the list for vertex v and put the
        // vertex w denoting edge betweeen v and w
        this.AdjList.get(x).push({node: y, weight: w});
        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(y).push({node: x, weight: w});
    }
    printGraph() {
        // get all the vertices
        const get_keys = this.AdjList.keys();
        // iterate over the vertices
        for (const i of Array.from(get_keys)) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j.node + " " + "(" + j.weight + ")" + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
}

import { Link } from './models';
import { DataTransformations } from './data-transformation';

// Given the following example of JSON structure:
const data = {
    "products": {
        1: {"name": "apple", "weight": 5},
        2: {"name": "orange", "weight": 15},
        3: {"name": "cherry", "weight": 10},
        4: {"name": "plum", "weight": 8},
        5: {"name": "banana", "weight": 13},
    },
    "links": [
        {"group": "Group B", "productId": 3, "position": 2},
        {"group": "Group B", "productId": 2, "position": 5},
        {"group": "Group B", "productId": 1, "position": 0},
        {"group": "Group A", "productId": 4, "position": 3},
        {"group": "Group A", "productId": 2, "position": 2},
        {"group": "Group A", "productId": 5, "position": 1}
    ]
};

const links: Array<Link> = [];
const products: any = data.products;

// Converting json result to our models
for (let item of data.links) {
    const product: any = products[item.productId];

    links.push({group: item.group, 
        product: {id: item.productId, name: product.name, weight: product.weight}, 
        position: item.position})
}

const testDataTransformation = new DataTransformations(links);  // create DataTransformation object
const columnGroups = testDataTransformation.getColGroups();     // get column groups
const rowGroups = testDataTransformation.getRowGroups();        // get row groups

console.log('columnGroups', columnGroups.getArray());
console.log('rowGroups', rowGroups.getArray());

console.log('columnGroups.summarizeColumn(0): ', columnGroups.summarizeColumn(0)); // 36
console.log('columnGroups.summarizeRow(1)', columnGroups.summarizeRow(1)); // 25

console.log('rowGroups.summarizeColumn(2)', rowGroups.summarizeColumn(2)); // 23
console.log('rowGroups.summarizeRow(1)', rowGroups.summarizeRow(1)); // 30
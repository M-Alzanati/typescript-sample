"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DataTransformations = void 0;
// Grouping rows
var RowGroups = /** @class */ (function () {
    function RowGroups(links) {
        this.links = [];
        this.links = links;
    }
    RowGroups.prototype.summarizeColumn = function (idx, groupedRows) {
        if (groupedRows === void 0) { groupedRows = []; }
        var tempResult = new Array();
        if (!groupedRows.length) {
            groupedRows = this.getArray();
        }
        for (var r = 0; r < groupedRows.length; r++) {
            tempResult.push(groupedRows[r][idx].weight);
        }
        return tempResult.reduce(function (acc, current) { return acc + current; });
    };
    RowGroups.prototype.summarizeRow = function (idx, groupedRows) {
        if (groupedRows === void 0) { groupedRows = []; }
        if (!groupedRows.length) {
            groupedRows = this.getArray();
        }
        return groupedRows[idx].map(function (e) { return e.weight; }).reduce(function (acc, current) { return acc + current; });
    };
    RowGroups.prototype.getArray = function () {
        var _this = this;
        var result = [];
        var mySet = new Set();
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var item = _a[_i];
            mySet.add(item.group);
        }
        Array.from(mySet).sort().forEach(function (key) {
            var temp = _this.links
                .filter(function (e) { return e.group === key; })
                .sort(function (a, b) { return a.position - b.position; })
                .map(function (link) {
                return { group: link.group, name: link.product.name, weight: link.product.weight };
            });
            result.push(temp);
        });
        return result;
    };
    return RowGroups;
}());
// Grouping columns
var ColumnGroups = /** @class */ (function (_super) {
    __extends(ColumnGroups, _super);
    function ColumnGroups(links) {
        return _super.call(this, links) || this;
    }
    ColumnGroups.prototype.getArray = function () {
        var result = [];
        var rowGroups = _super.prototype.getArray.call(this);
        var rowSize = rowGroups.length;
        var colSize = rowGroups[0].length;
        for (var c = 0; c < colSize; c++) {
            var tempResult = new Array();
            for (var r = 0; r < rowSize; r++) {
                tempResult.push(rowGroups[r][c]);
            }
            result.push(tempResult);
        }
        return result;
    };
    return ColumnGroups;
}(RowGroups));
// Object to hold a refernce for data transformation tasks
var DataTransformations = /** @class */ (function () {
    function DataTransformations(links) {
        this.links = [];
        this.links = links;
    }
    DataTransformations.prototype.getRowGroups = function () {
        return new RowGroups(this.links);
    };
    DataTransformations.prototype.getColGroups = function () {
        return new ColumnGroups(this.links);
    };
    return DataTransformations;
}());
exports.DataTransformations = DataTransformations;

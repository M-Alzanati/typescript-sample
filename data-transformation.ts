import { Link, Result } from './models';

// Data grouping contract
interface IDataGroup {
    getArray(): Array<Array<Result>>;
    summarizeColumn(idx: number, groupedRows: Array<Array<Result>>): number;
    summarizeRow(idx: number, groupedRows: Array<Array<Result>>): number;
}

// Grouping rows
class RowGroups implements IDataGroup {
    links: Array<Link> = [];

    constructor(links: Array<Link>) {
        this.links = links;
    }

    summarizeColumn(idx: number, groupedRows: Array<Array<Result>> = []): number {
        const tempResult = new Array<number>();
        
        if (!groupedRows.length) {
            groupedRows = this.getArray();
        }
        
        for (let r = 0; r < groupedRows.length; r++) {
            tempResult.push(groupedRows[r][idx].weight);
        }

        return tempResult.reduce((acc, current) => acc + current);
    }

    summarizeRow(idx: number, groupedRows: Array<Array<Result>> = []): number {
        if (!groupedRows.length) {
            groupedRows = this.getArray();
        }

        return groupedRows[idx].map(e => e.weight).reduce((acc, current) => acc + current);
    }

    getArray(): Array<Array<Result>> {
        const result: Array<Array<Result>> = [];

        const mySet = new Set<string>();
        for (let item of this.links) {
            mySet.add(item.group);
        }

        Array.from(mySet).sort().forEach(key => {
            const temp = this.links
                .filter(e => e.group === key)
                .sort((a, b) => a.position - b.position)
                .map(link => {
                    return { group: link.group, name: link.product.name, weight: link.product.weight } as Result;
                });

            result.push(temp);
        });
        
        return result;
    }
}

// Grouping columns
class ColumnGroups extends RowGroups implements IDataGroup {
    constructor(links: Array<Link>) {
        super(links);
    }

    getArray(): Array<Array<Result>> {
        const result: Array<Array<Result>> = [];
        const rowGroups = super.getArray();

        const rowSize = rowGroups.length;
        const colSize = rowGroups[0].length;

        for (let c = 0; c < colSize; c++) {
            const tempResult = new Array<Result>();
            for (let r = 0; r < rowSize; r++) {
                tempResult.push(rowGroups[r][c]);
            }

            result.push(tempResult);
        }

        return result;
    }
}

// Object to hold a refernce for data transformation tasks
export class DataTransformations {
    links: Array<Link> = [];

    constructor(links: Array<Link>) {
        this.links = links;
    }

    getRowGroups(): RowGroups {
        return new RowGroups(this.links);
    }

    getColGroups(): ColumnGroups {
        return new ColumnGroups(this.links);
    }
}

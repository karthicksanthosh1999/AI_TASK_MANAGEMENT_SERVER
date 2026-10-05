interface IPaginationData {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export class PaginationDto<T> {
    public data: T[];
    public pagination: IPaginationData;

    constructor(data: T[], pagination: IPaginationData) {
        this.data = data,
        this.pagination = pagination
    }
}
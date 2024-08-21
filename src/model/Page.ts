export interface Page<T> {
    items: T[];
    totalItems: number;
    isFirst: boolean;   
    islLast: boolean;
    page: number;
    totalPages: number;
    limit: number;
    pageSize: number;

    
}
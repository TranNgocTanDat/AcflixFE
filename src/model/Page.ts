export interface Page<T> {
    items: T[];
    totalItems: number;
    isFirst: boolean;   
    islLast: boolean;
    page: number;
    limit: number;
    offset: number

    
}
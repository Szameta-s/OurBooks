import { Guid } from "guid-typescript";

export class Book {
    id: number;
    userId: string;
    title: string;
    author: string;
    price: number;
    genre: string;
    shortDescription: string;
    longDescription: string;
    imgURL: string;
    cover: string;
    ownerId: string;
    userName: string;
    borrowTime: string;
    isForBorrow: boolean;
    isBorrowed: boolean;
}
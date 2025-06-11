import * as fs from "fs";
import { readQuotes, writeQuotes } from "../fileHandler";
import { Quote } from "../types";

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('fileHandler', () => {
    const mockQuotes: Quote[] = [
        { id: '1', text: 'Test quote 1', author: 'Author 1', tags: ['test', 'quote1'] },
        { id: '2', text: 'Test quote 2', author: 'Author 2', tags: ['test', 'quote2'] }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('readQuote', () => {
        it('should read and parse quotes from file', () => {
            mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockQuotes));
            const result = readQuotes();

            expect(result).toEqual(mockQuotes)
            expect(mockedFs.readFileSync).toHaveBeenCalled();
        });

        it('should return empty array when file read fails', () => {
            mockedFs.readFileSync.mockImplementation(() => {
                throw new Error('File not found')
            });
            const result = readQuotes();
            expect(result).toEqual([]);
        })
    });

    describe('writeQuotes', () => {
        it('should write quotes to file', () => {
            mockedFs.writeFileSync.mockImplementation(() => { });
            const result = writeQuotes(mockQuotes);
            expect(result).toBe(true);
            expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
                expect.any(String),
                JSON.stringify(mockQuotes, null, 2),
                'utf8'
            )
        })
    })
})
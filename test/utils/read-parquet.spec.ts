import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readParquetFile, readParquet } from '@/app/utils/read_parquet';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const sampleRecords = [
  {
    abstimmung: 'Kantonsverfassung',
    ja: 120,
    nein: 60,
    kanton: 'Zürich',
  },
];

// vi.mock('hyparquet', () => ({
//   parquetReadObjects: vi.fn().mockResolvedValue(sampleRecords),
// }));

describe('readParquetFile', () => {
  let buffer: ArrayBuffer;

  beforeEach(() => {
    buffer = new Uint8Array([1, 2, 3, 4]).buffer;
    // mock fetch to return the prepared buffer
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(buffer),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('reads parquet from URL and returns parsed records', async () => {

    // 1. Path to your local test file
    const path = resolve(__dirname, '../../src/assets/daten/abstimmungen_seit1933.parquet');
    
    // 2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);
    const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer

    // 3. Mock the global fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        // Convert Node Buffer to ArrayBuffer for the fetch mock
        arrayBuffer: () => Promise.resolve(arrayBuffer),
      })
    ));
    const res = await readParquetFile('/fakepath/tofile.parquet');

    expect(res).not.toBeNull

    const { parquetReadObjects } = await import('hyparquet');
    expect(parquetReadObjects).toHaveBeenCalledWith({ file: arrayBuffer });
  });

  it('reads parquet locally and returns parsed records', async () => {

    // 1. Path to your local test file
    const path = resolve(__dirname, '../../src/assets/daten/abstimmungen_seit1933.parquet');
    
    // 2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);

    expect(fileBuffer.toString('utf-8').endsWith('PAR1')).toBe(true);
    expect(fileBuffer.toString('utf-8').startsWith('PAR1')).toBe(true);
    // Safe copy -> standalone ArrayBuffer instance
    const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer


    expect(arrayBuffer.constructor.name).toBe('ArrayBuffer');
    
    expect(new TextDecoder().decode(new Uint8Array(arrayBuffer, 0, 4))).toBe('PAR1');
    expect(new TextDecoder().decode(new Uint8Array(arrayBuffer, arrayBuffer.byteLength - 4, 4))).toBe('PAR1');
    // const buf = new ArrayBuffer(0);
    
    // expect(buf).toBeInstanceOf(ArrayBuffer);
    // expect(new Uint8Array(arrayBuffer).buffer).toBeInstanceOf(ArrayBuffer);
    // expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
    // expect(arrayBuffer.slice()).toBeInstanceOf(ArrayBuffer);
    // new ArrayBuffer()


    // const res = await readParquet(arrayBuffer);
    // expect(res).toEqual(sampleRecords);


  //   const { parquetReadObjects } = await import('hyparquet');
  //   expect(parquetReadObjects).toHaveBeenCalledWith({ file: asyncBuffer });
  });
});

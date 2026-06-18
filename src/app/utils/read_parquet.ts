import { parquetReadObjects } from 'hyparquet';


/**
 * Reading the parquet file from url (locally or remote) and resolving to parquest objects
 * @param url the url to the local or remote file
 * @returns 
 */
export async function readParquetFile(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer instanceof ArrayBuffer) {
    return readParquet(arrayBuffer);
  } else  {    
    return readParquet(new Uint8Array(arrayBuffer).buffer);
  }
}
/**
 * Reading parquet file from array Buffer and resolving to parquest objects
 * @param arrayBuffer the array buffer with the parquest data (starting with / ending with markers for parquet file format as delimiters)
 * @returns 
 */
export async function readParquet(arrayBuffer: ArrayBuffer) {
  if (arrayBuffer.byteLength === 0) throw new Error('File is empty');

  // This returns an array of objects: { columnName: value }
  const records = await parquetReadObjects({ 
    file: arrayBuffer 
  });

  return records; // Array of Record<string, any>
}

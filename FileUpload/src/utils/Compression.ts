import { compressToUTF16, decompressFromUTF16 } from "async-lz-string";

export async function compress(str: string): Promise<string> {
  return await compressToUTF16(str);
}

export async function decompress(str: string): Promise<string> {
  return await decompressFromUTF16(str);
}

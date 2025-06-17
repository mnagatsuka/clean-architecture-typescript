/**
 * 指定されたDB種別に応じたデータアクセスのインスタンスを返す（同期・非同期両対応）
 * @param dbType DB種別（例: "inmemory", "postgres"）
 * @param factories DB種別ごとのインスタンス生成関数（同期・非同期の両方を許容）
 * @param args ファクトリ関数に渡す引数
 * @returns T型またはPromise<T>型のインスタンス
 */
export async function createDataAccess<T, A extends unknown[]>(
  dbType: string,
  factories: Record<string, (...args: A) => T | Promise<T>>,
  ...args: A
): Promise<T> {
  const factory = factories[dbType]
  if (!factory) throw new Error(`Unsupported DB_TYPE: ${dbType}`)
  return await factory(...args)
}

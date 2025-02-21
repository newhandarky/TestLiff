import { ExtendedInit } from '@line/liff-mock';

declare module '@line/liff' {
  interface Config {
    mock?: boolean; // 添加 mock 屬性
  }

  interface Liff {
    init: ExtendedInit; // 擴展 init 方法
    $mock: LiffMockApi; // 添加 $mock 屬性
  }
}


export function splitAmount(amount: number): string[] {
    const amountStr: string = amount.toFixed(2); // 转换为带两位小数的字符串
     // 分割为字符数组
    return amountStr.split('');
}
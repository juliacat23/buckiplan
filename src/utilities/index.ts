export function checkNotNull<T>(value: T | null | undefined): T {
    if (value == null) throw new Error();
    return value;
}

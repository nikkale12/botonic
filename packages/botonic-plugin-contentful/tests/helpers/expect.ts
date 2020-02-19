import 'jest-expect-message'

export function expectEqualExceptOneField(
  o1: any,
  o2: any,
  fieldName: string
): void {
  for (const f of Object.keys(o1)) {
    if (f == fieldName) continue
    // eslint-disable-next-line jest/valid-expect
    expect(o2[f], `for field '${f}'`).toEqual(o1[f])
  }
}

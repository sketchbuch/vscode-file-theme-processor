import { isHiddenFile } from './isHiddenFile'

describe('Utils > Fs > isHiddenFile()', () => {
  test('Returns true if the fileName begins with a "."', () => {
    expect(isHiddenFile('.')).toBe(true)
    expect(isHiddenFile('..')).toBe(true)
    expect(isHiddenFile('.afile')).toBe(true)
  })

  test('Returns false if the fileName does not begin with a "."', () => {
    expect(isHiddenFile('test.txt')).toBe(false)
  })
})

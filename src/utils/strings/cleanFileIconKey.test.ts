import { cleanFileIconKey } from './cleanFileIconKey'

interface TestObject {
  cleanedKey: string
  key: string
  replace: string
  search: string
}

type TestObjects = TestObject[]

describe('Utils > Strings > cleanFileIconKey()', () => {
  const testReplacement = ({ cleanedKey, key, replace, search }: TestObject) => {
    test(`Replaces "${search}" with "${replace}"`, () => {
      expect(cleanFileIconKey(key)).toBe(cleanedKey)
    })
  }

  const testKeys: TestObjects = [
    { cleanedKey: 'some-key', key: 'some.key', replace: '-', search: '.' },
    { cleanedKey: 'some-key', key: 'some/key', replace: '/', search: '.' },
    { cleanedKey: 'cpp', key: 'c++', replace: 'p', search: '+' },
    { cleanedKey: 'ch', key: 'c#', replace: 'h', search: '#' },
  ]

  testKeys.forEach((testObj) => {
    testReplacement(testObj)
  })
})

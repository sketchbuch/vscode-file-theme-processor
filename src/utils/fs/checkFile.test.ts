import mockFs from 'mock-fs'
import * as path from 'path'
import { mockFsStructure } from '../../tests/mockFsStructure'
import { checkFile } from './checkFile'

describe('Utils > Fs > checkFile()', () => {
  beforeEach(() => {
    mockFs(mockFsStructure)
  })

  afterEach(() => {
    mockFs.restore()
  })

  test('Returned object is as expected if the file does not exist', () => {
    expect(checkFile(path.join('a', 'non-existent', 'file'))).toEqual({
      isFile: false,
      isFolder: false,
    })
  })

  test('Returned object is as expected if the file does exist and is a file', () => {
    expect(checkFile(path.join('check', 'file', 'test-file.txt'))).toEqual({
      isFile: true,
      isFolder: false,
    })
  })

  test('Returned object is as expected if the file does exist and is a directory', () => {
    expect(checkFile(path.join('check', 'folder'))).toEqual({ isFile: false, isFolder: true })
  })
})

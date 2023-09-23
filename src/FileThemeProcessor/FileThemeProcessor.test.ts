import { ExtensionContext } from 'vscode'
import { getMockContext } from '../tests/mockContext'

/**
 * Test worked when using code directly in extension, but only types can be used in
 * tests from vscode. Using values including Enums does not work.
 *
 * Skipping until a solution is found.
 */
describe.skip('FileThemeProcessor()', () => {
  let mockContext: ExtensionContext
  let getStore: jest.SpyInstance
  //let themeProcessor: FileThemeProcessor
  let updateStore: jest.SpyInstance

  beforeEach(() => {
    mockContext = getMockContext()
    getStore = jest.spyOn(mockContext.globalState, 'get')
    //themeProcessor = new FileThemeProcessor(mockContext)
    updateStore = jest.spyOn(mockContext.globalState, 'update')
  })

  afterEach(() => {
    getStore.mockRestore()
    updateStore.mockRestore()
  })

  test('getThemeData() returns expected theme data if there is no data', () => {
    //const data = themeProcessor.getThemeData()
    /* expect(data).toEqual({
      data: null,
      localResourceRoots: [],
      state: 'loading',
      themeId: null,
    }) */
  })

  test('getThemeData() returns expected theme data if there is data', async () => {
    /* const mockData: ThemeCacheData = {
      localResourceRoots: ['some/path/to/serve/from'],
      themeData: {
        fonts: [],
        iconDefinitions: {
          typescript: {
            fontId: DEFAULT_THEME,
            fontSize: '120%',
          },
        },
      },
      themeId: DEFAULT_THEME,
      timestamp: 1695041763,
    }

    await mockContext.globalState.update('themeProcessor-cache', mockData)
    const data = themeProcessor.getThemeData() */
    /* expect(data).toEqual({
      data: mockData.themeData,
      localResourceRoots: mockData.localResourceRoots,
      state: 'loading',
      themeId: mockData.themeId,
    }) */
  })

  test('subscribe && unsubscribe work as expected', () => {
    /* const observer = { notify: () => null } as FileThemeProcessorObserver

    expect(themeProcessor.unsubscribe(observer)).toBe(false)
    themeProcessor.subscribe(observer)
    expect(themeProcessor.unsubscribe(observer)).toBe(false) */
  })
})

import mockFs from 'mock-fs'

/**
 * Test worked when using code directly in extension, but only types can be used in
 * tests from vscode. Using values including Enums does not work.
 *
 * Skipping until a solution is found.
 */
describe.skip('Utils > Theme >', () => {
  describe('getDefaultExtThemeData():', () => {
    /*  test('Returns null if theme is not found', () => {
      expect(getDefaultExtThemeData('non-existent-theme')).toBeNull()
    })

    test('Returns null if the theme ID is not a theme extension', () => {
      expect(getDefaultExtThemeData('vscode.css')).toBeNull()
    })

    test('Returns ext data if the theme ID is a theme extension', () => {
      expect(getDefaultExtThemeData(DEFAULT_THEME)).toEqual({
        extId: 'vscode.vscode-theme-seti',
        extPath: '/usr/share/code/resources/app/extensions/theme-seti',
        themeId: DEFAULT_THEME,
        themePath: `./icons/${DEFAULT_THEME}-icon-theme.json`,
      })
    }) */
  })

  describe('getUserExtThemeData():', () => {
    const EXT_NONTHEME = 'ext-nontheme'
    const EXT_THEME = 'ext-theme'
    const mockContent = {
      contributes: {
        iconThemes: [{ id: EXT_THEME, path: `'./icons/${EXT_THEME}-icon-theme.json'` }],
      },
    }

    beforeAll(() => {
      mockFs({
        '.vscode': {
          extensions: {
            [EXT_NONTHEME]: {
              'package.json': '{contributes: {iconThemes: []}}',
            },
            [EXT_THEME]: {
              'package.json': JSON.stringify(mockContent),
            },
          },
        },
      })
    })

    afterAll(() => {
      mockFs.restore()
    })

    test('Returns null if theme is not found', async () => {
      /* const result = await getUserExtThemeData('non-existent-theme')

      expect(result).toBeNull() */
    })

    test('Returns null if the theme ID is not a theme extension', async () => {
      /* const result = await getUserExtThemeData(EXT_NONTHEME)

      expect(result).toBeNull() */
    })

    test('Returns ext data if the theme ID is a theme extension', async () => {
      /* const result = await getUserExtThemeData(EXT_THEME)

      expect(result).toEqual({
        extId: EXT_THEME,
        extPath: `/home/stephen/.vscode/extensions/${EXT_THEME}`,
        themeId: mockContent.contributes.iconThemes[0].id,
        themePath: mockContent.contributes.iconThemes[0].path,
      }) */
    })
  })
})

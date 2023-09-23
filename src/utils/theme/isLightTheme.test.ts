import * as vscode from 'vscode'

import { isLightTheme } from './isLightTheme'

describe('Utils > Theme > isLightTheme()', () => {
  test('Returns false if the theme is "Dark"', () => {
    expect(isLightTheme({ kind: 2 } as vscode.ColorTheme)).toBe(false)
  })

  test('Returns false if the theme is "HighContrast"', () => {
    expect(isLightTheme({ kind: 3 } as vscode.ColorTheme)).toBe(
      false
    )
  })

  test('Returns true if the theme is "Light"', () => {
    expect(isLightTheme({ kind: 1 } as vscode.ColorTheme)).toBe(true)
  })

  test('Returns true if the theme is "HighContrastLight"', () => {
    expect(
      isLightTheme({ kind: 4 } as vscode.ColorTheme)
    ).toBe(true)
  })
})

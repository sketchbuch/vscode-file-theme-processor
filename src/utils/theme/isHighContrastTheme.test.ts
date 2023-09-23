import * as vscode from 'vscode'

import { isHighContrastTheme } from './isHighContrastTheme'

describe('Utils > Theme > isHighContrastTheme()', () => {
  test('Returns false if the theme is "Dark"', () => {
    expect(isHighContrastTheme({ kind: 2 } as vscode.ColorTheme)).toBe(
      false
    )
  })

  test('Returns false if the theme is "Light"', () => {
    expect(isHighContrastTheme({ kind: 1 } as vscode.ColorTheme)).toBe(
      false
    )
  })

  test('Returns true if the theme is "HighContrast"', () => {
    expect(
      isHighContrastTheme({ kind: 3 } as vscode.ColorTheme)
    ).toBe(true)
  })

  test('Returns true if the theme is "HighContrastLight"', () => {
    expect(
      isHighContrastTheme({ kind: 4 } as vscode.ColorTheme)
    ).toBe(true)
  })
})

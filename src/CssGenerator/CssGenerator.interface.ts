import * as vscode from 'vscode'
import { ThemeJson } from '../FileThemeProcessor/FileThemeProcessor.interface'

export interface CssCache {
  [key: string]: CssData
}

export interface CssData {
  defCount: number // The number of CSS rules in iconCss
  fontFaceCss: string
  iconCss: string
}

export type CssDefinition = string[]

export type CssDefinitions = { [key: string]: CssDefinition }

export interface CssProp {
  key: string
  value: string
}

/**
 * CSS Generators should implement this interface.
 */
export interface CssGeneratorIntreface {
  /**
   * Get CSS for the webview form the theme data.
   */
  getCss(themeData: ThemeJson, themeId: string, webview: vscode.Webview): CssData
}

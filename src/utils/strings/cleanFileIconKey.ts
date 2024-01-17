/**
 * Replaces characters in file icon keys that result in invalid CSS selectors.
 */
export const cleanFileIconKey = (fileIconKey: string): string => {
  return fileIconKey
    .replace(/\./g, '-')
    .replace(/\//g, '-')
    .replace(/\+/g, 'p')
    .replace(/#/g, 'h')
    .replace(/,/g, '') // See: https://github.com/sketchbuch/vsc-workspace-sidebar/issues/112
}

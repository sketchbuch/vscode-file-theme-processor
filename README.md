# VSCode File Theme Data Processor

Provides VSCode webviews with access to file icon theme data and generates required css to render file icon themes in webviews.

---

There is no API way to get file icons in webviews, only tree views. This package will let you render file icon from the current file icon theme inside your webviews.

It uses a observer pattern so your webview(s) can subscribe to the file processor to be notified about changs to the theme.

## Install

Install like any other package using your package manager of choice, for example: `yarn add vscode-file-theme-processor` or `pnpm add vscode-file-theme-processor`.

## How to Use

After installing you should create an instance of `FileThemeProcessor` in your extension, pass the extension context as an argument to the constructor.

Then pass the `FileThemeProcessor` instance to your webview's constructor.

```typescript
export const activate = (vscodeExtContext: vscode.ExtensionContext): void => {
  const fileThemeProcessor = new FileThemeProcessor(vscodeExtContext)
  const workspaceViewProvider = new YourwebviewViewProvider(vscodeExtContext, fileThemeProcessor)

  ...
}
```

In your webview's constructor, subscibe to the `FileThemeProcessor` and create an instance of a `CSSGenerator`. This will be used to create the css from the data privided by the `FileThemeProcessor``.

The subscribe call is required so that your webview can be notified about changes to the file icon theme and the data cached by the `FileThemeProcessor`.

Your webview should also implement the interface `FileThemeProcessorObserver`. This will mean having a public `notify()` method that can be called by the processor.

When this happens, you should re-render your webview.

```typescript
export class YourwebviewViewProvider implements vscode.webviewViewProvider, FileThemeProcessorObserver {
  private _cssGenerator: CssGenerator

  constructor(
    private readonly _ctx: vscode.ExtensionContext,
    private readonly _fileThemeProcessor: FileThemeProcessor
  ) {
    this._cssGenerator = new CssGenerator()
    this._fileThemeProcessor.subscribe(this)
  }

  ...

  public notify() {
    this.render()
  }
}
```

Then in your render method, get the file theme data from the processor and then generate the CSS with the generator.

If the data contains localResourceRoots, update your webview's options to include them. This is so any resources used by the theme can be served to the webview. Without doing this, fonts and images from the file icon theme extension will not be useable.

The theme data also includes the state of the processor, this could be, idle, loading, error (means something when wrong loading the data), and ready (data is ready and in the cache). Your webview could react to these different states to alter what you render - this is left up to you.

```typescript
...

private render() {
  const state = store.getState().ws

  const themeData: GetThemeData = this._fileThemeProcessor.getThemeData()
  let cssData: CssData | null = null

  if (themeData.data && themeData.themeId) {
    cssData = this._cssGenerator.getCss(themeData.data, themeData.themeId, this._view.webview)
  }

  webviewView.webview.options = {
    localResourceRoots: [
      this._ctx.extensionUri,
      ...themeData.localResourceRoots.map((resouceRoot) => {
        return vscode.Uri.parse(resouceRoot)
      }),
    ],
    ...
  }
}

...
```

Pass the css and theme data to whatever templating system you are using to generate the html for your webview.

The css data should be added to a style tag in the head of your webview html.

Icons can just be a span with the required classes, i.e.:

```html
<span class="file-icon file-icon-type-ICON_TYPE"></span>
```

`ICON_TYPE` should be passed through the function `cleanFileIconKey()`. Certain characters create invalid css or have a specific meaning in css and so should not be used in css declarations or class names.

How you match decide which icons to render will depend upon your use case and are not covered in this documentation.

In your templating system, `workspace.getConfiguration('workbench').iconTheme` can be used to see if file icon themes have been switched off by the user. If this is null the user doesn't expect to see file theme icons.

## Themes

Not all themes provide the same icons. There are icons for specific folders, generic icons like a file, and icons for specific things like languages, file names, file extensionsm, etc.

There are also duplicates of all these categories for light and high contrast versions of icons.

This means that you can't guarantee what icons you will get, some themes may offer support for typescript, others may only offer an icon for the extension .ts. Some themes may off both, or none.

There is also no requirement to provide all icons. Some themes for example have hundreds of icons for languages and others only have a handful.

In case your icon is not found you should fallback to the default file icon in the theme.

## FAQ

1. **Why does this package use JSON5 instead of the native JSON API?**

Whilst developing this package I came across themes with trailing commas which broke the parsing of the extension json. Some of these themes had not been updated for over 3 years so rather than just let some of these themes break this package I switched to json5 which is more forgiving of badly formed json.

2.  **Why does this package create classes like `file-icon-type-xxx`?**

The file explorer has similar names but instead of "type" the location of the icon in the theme was used, like lang, ext, name etc. This means the explorer renders many classes for each icon like `php-name-file-icon php-lang-file-icon` which both render the same icon.

I can't see the need to distinguish between icons for language and extensions for example. It also decreases he size of the css and the html you generate as you need fewer classes.

3. **Why does the CSS Generator not cache the generated css in global storage?**

In order to generate the CSS, you need access to the webview's `asWebviewUri()` method for creating correct URLs. Looking at the source, it seems like the URLs generated could be different from web view to webview and from environment to environment.

Since I could guarantee that the URLs would always be correct for each webview, I decided not to cache the data globally but just in memory with in each css generator.

## Examples

A working example can be found in my extension [VSC Workspace Sidebar](https://github.com/sketchbuch/vsc-workspace-sidebar).

This package was created originally for this extension.

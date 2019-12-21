import * as vscode from 'vscode';
import { goToView } from './goToView';
import { goToController, isView } from './goToController';
import { addView } from './addView';
import { goToPage, goToPageModel, isPage, isPageModel } from './goToPage';
import { isController } from './view';
import { goToBlazorComponent, goToCodeBehind } from './goToBlazorComponent';

export function activate(context: vscode.ExtensionContext) {
    setContext(vscode.window.activeTextEditor);

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.goToView', goToView),
        vscode.commands.registerCommand('extension.addView', addView),
        vscode.commands.registerCommand('extension.goToController', goToController),
        vscode.commands.registerCommand('extension.goToPage', goToPage),
        vscode.commands.registerCommand('extension.goToPageModel', goToPageModel),
        vscode.commands.registerCommand('extension.goToBlazorComponent', goToBlazorComponent),
        vscode.commands.registerCommand('extension.goToCodeBehind', goToCodeBehind),

        vscode.window.onDidChangeActiveTextEditor(setContext));
}

export function deactivate() { }

function setContext(editor: vscode.TextEditor | undefined) {
    if (!editor) {
        return;
    }

    const contexts = [
        { name: 'isPage', function: isPage },
        { name: 'isPageModel', function: isPageModel },
        { name: 'isController', function: isController },
        { name: 'isView', function: isView }
    ];

    if (editor.document.isUntitled || editor.document.uri.scheme !== 'file') {
        for (const context of contexts) {
            vscode.commands.executeCommand('setContext', context.name, false);
        }

        return;
    }

    for (const context of contexts) {
        vscode.commands.executeCommand('setContext', context.name, context.function(editor.document.fileName));
    }
}
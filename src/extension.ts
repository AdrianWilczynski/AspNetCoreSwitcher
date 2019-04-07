import * as vscode from 'vscode';
import { goToView } from './goToView';
import { goToController, isView } from './goToController';
import { addView } from './addView';
import { goToPage, goToPageModel, isPage, isPageModel } from './goToPage';
import { isController } from './view';

export function activate(context: vscode.ExtensionContext) {
    setContext(vscode.window.activeTextEditor);

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.goToView', goToView),
        vscode.commands.registerCommand('extension.addView', addView),
        vscode.commands.registerCommand('extension.goToController', goToController),
        vscode.commands.registerCommand('extension.goToPage', goToPage),
        vscode.commands.registerCommand('extension.goToPageModel', goToPageModel),

        vscode.window.onDidChangeActiveTextEditor(setContext));
}

export function deactivate() { }

function setContext(editor: vscode.TextEditor | undefined) {
    if (!editor) {
        return;
    }

    if (editor.document.isUntitled || editor.document.uri.scheme !== 'file') {
        vscode.commands.executeCommand('setContext', 'isPage', false);
        vscode.commands.executeCommand('setContext', 'isPageModel', false);
        vscode.commands.executeCommand('setContext', 'isController', false);
        vscode.commands.executeCommand('setContext', 'isView', false);

        return;
    }

    vscode.commands.executeCommand('setContext', 'isPage', isPage(editor.document.fileName));
    vscode.commands.executeCommand('setContext', 'isPageModel', isPageModel(editor.document.fileName));
    vscode.commands.executeCommand('setContext', 'isController', isController(editor.document.fileName));
    vscode.commands.executeCommand('setContext', 'isView', isView(editor.document.fileName));
}
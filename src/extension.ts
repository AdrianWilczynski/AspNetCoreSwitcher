import * as vscode from 'vscode';
import { goToView } from './goToView';
import { goToController } from './goToController';
import { addView } from './addView';
import { goToPage, goToPageModel } from './goToPage';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.goToView', goToView),
        vscode.commands.registerCommand('extension.addView', addView),
        vscode.commands.registerCommand('extension.goToController', goToController),
        vscode.commands.registerCommand('extension.goToPage', goToPage),
        vscode.commands.registerCommand('extension.goToPageModel', goToPageModel));
}

export function deactivate() { }
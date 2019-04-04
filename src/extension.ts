import * as vscode from 'vscode';
import { goToView } from './goToView';
import { goToController } from './goToController';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.goToView', goToView),
        vscode.commands.registerCommand('extension.goToController', goToController));
}

export function deactivate() { }